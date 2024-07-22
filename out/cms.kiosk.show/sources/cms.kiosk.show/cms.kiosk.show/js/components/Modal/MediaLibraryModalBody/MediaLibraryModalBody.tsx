import { IGif } from '@giphy/js-types';
import imageCompression from 'browser-image-compression';
import React, { FunctionComponent, useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { ErrorBoundary } from 'react-error-boundary';
import { Waypoint } from 'react-waypoint';

import { ButtonColor } from '@Components/Button';
import ErrorBoundaryFallback from '@Components/ErrorBoundary';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import { ModalProps, useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import MediaLibraryItem, {
  MediaLibraryItemPlaceholder,
} from '@Components/Modal/MediaLibraryModalBody/MediaLibraryItem';
import MediaLibraryUploadingItem from '@Components/Modal/MediaLibraryModalBody/MediaLibraryUploadingItem';
import MediaLibraryUploadItem from '@Components/Modal/MediaLibraryModalBody/MediaLibraryUploadItem';
import ProgressiveUploadingMessage from '@Components/Modal/MediaLibraryModalBody/ProgressiveUploadingMessage';
import UnsplashList, { UnsplashImage } from '@Components/Modal/MediaLibraryModalBody/UnsplashList';
import Tabs from '@Components/Tabs';
import { toastError } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { ALLOWED_IMAGE_FILE_TYPES, DEFAULT_DELAY_MS, DEFAULT_PAGE_SIZE, MAX_IMAGE_SIZE_BYTES } from '@Config/constants';
import {
  MediaLibraryImageFragment,
  useCreateMediaLibraryImageMutation,
  useDeleteMediaLibraryImageMutation,
  useMediaLibraryImageQuery,
  useMediaLibraryImagesQuery,
  useMeQuery,
} from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import { ReactComponent as PoweredByGiphyIcon } from '@Images/icons/poweredByGiphy.svg';
import { assertIsDefined } from '@Utils/assert';
import { UnreachableCaseError } from '@Utils/error';
import { mutationErrorHandler } from '@Utils/graphql';
import { getNodes, logError, times } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import GiphyList from './GiphyList';
import styles from './MediaLibraryModalBody.module.scss';

export enum Tab {
  Library = 'Library',
  Giphy = 'GIPHY',
  Unsplash = 'Unsplash',
}

interface MediaLibraryModalData extends ModalProps {
  selectedImageId?: string;
  onItemSelect: (item?: { id?: string; url: string }) => void;
}

const MediaLibraryModalBody: FunctionComponent<MediaLibraryModalData> = ({
  selectedImageId,
  onItemSelect,
  closeModal,
}) => {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState(Tab.Library);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>();
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = useDebounce(searchText, DEFAULT_DELAY_MS);
  const { showModal, updateModal } = useModal();

  const meQuery = useMeQuery();

  const { data: selectedImageQuery } = useMediaLibraryImageQuery({
    variables: { id: selectedImageId || '' },
    skip: !selectedImageId,
  });

  const { data, loading, fetchMore, refetch } = useMediaLibraryImagesQuery({
    variables: {
      first: DEFAULT_PAGE_SIZE,
      fileName: debounceSearchText,
    },
    fetchPolicy: 'network-only',
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        first: DEFAULT_PAGE_SIZE,
        after: data?.mediaLibraryImages.pageInfo.endCursor,
        fileName: debounceSearchText,
      },
    });
  };

  const [createMediaLibraryImageMutation] = useCreateMediaLibraryImageMutation({
    onError: mutationErrorHandler('msg_error_title_create_media_library_item'),
  });

  const [deleteMediaLibraryImageMutation] = useDeleteMediaLibraryImageMutation({
    onError: mutationErrorHandler('msg_error_title_delete_media_library_item'),
  });

  const createMediaLibraryImage = async (image: File, author: string) => {
    const result = await createMediaLibraryImageMutation({
      variables: {
        input: {
          image,
          source: 'Kiosk',
          author,
        },
      },
    });

    refetch();
    setUploadedImageSrc(undefined);
    const uploadedImage = result.data?.createMediaLibraryImage?.mediaLibraryImage;
    assertIsDefined(uploadedImage);
    return uploadedImage;
  };

  const handleGiphyItemSelect = async (item: IGif) => {
    setUploadInProgress(true);

    try {
      onItemSelect({ url: item.images.downsized.url });
      closeModal();
    } catch {
      setUploadInProgress(false);
    }
  };

  const handleUnsplashItemSelect = async (item: UnsplashImage) => {
    setUploadInProgress(true);

    try {
      onItemSelect({ url: `${item.urls.raw}&fm=jpg&w=1920&q=85&fit=max` });
      closeModal();
    } catch {
      setUploadInProgress(false);
    }
  };

  const handleOnFileDropAccepted = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const file = files[0];
    const user = meQuery.data?.me;

    imageCompression.getDataUrlFromFile(file).then(setUploadedImageSrc);

    assertIsDefined(user);

    if (file.type === 'image/gif') {
      createMediaLibraryImage(file, user.info.id);
      return;
    }

    imageCompression(file, {
      maxWidthOrHeight: 1920,
      maxSizeMB: 5,
      useWebWorker: false,
      initialQuality: 0.8,
    }).then((compressedFile) => {
      createMediaLibraryImage(new File([compressedFile], file.name), user.info.id);
    });
  };

  const handleOnFileDropRejected = (files: FileRejection[]) => {
    if (files.length > 0) {
      const rejectedFile = files[0];
      if (rejectedFile.file.size > MAX_IMAGE_SIZE_BYTES) {
        toastError('msg_error_title_upload', 'msg_error_upload_invalid_file_size');
      } else if (!ALLOWED_IMAGE_FILE_TYPES.includes(rejectedFile.file.type)) {
        toastError('msg_error_title_upload', 'msg_error_upload_invalid_file_type');
      }
    }
  };

  const items = getNodes(data?.mediaLibraryImages.edges);
  const selectedImage = selectedImageQuery?.mediaLibraryImage;
  const getInputPlaceholder = () => {
    switch (activeTab) {
      case Tab.Library:
        return 'msg_placeholder_search_files';
      case Tab.Giphy:
        return 'msg_placeholder_search_giphy';
      case Tab.Unsplash:
        return 'msg_placeholder_search_unsplash';
      default:
        throw new UnreachableCaseError(activeTab);
    }
  };

  const getHeadlineText = () => {
    if (searchText) {
      return t('msg_label_image_library_search_for', { text: searchText });
    }

    if (activeTab === Tab.Library) {
      return t('msg_label_image_library_newest_first');
    }

    if (activeTab === Tab.Giphy) {
      return t('msg_label_image_library_trending_giphy');
    }

    if (activeTab === Tab.Unsplash) {
      return t('msg_label_image_library_trending_unsplash');
    }

    throw new UnreachableCaseError(activeTab);
  };

  const showDeleteConfirmationModal = async (item: MediaLibraryImageFragment, onConfirm: () => void) => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Red,
          label: t('msg_label_delete_media_library_item_modal_confirm_button_label'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_label_delete_media_library_item_modal_cancel_button_label'),
        },
        content: (
          <Typography>
            {item.slides
              ? t('msg_label_channel_delete_used_media_library_item_modal_text', { count: item.slides })
              : t('msg_label_channel_delete_media_library_item_modal_text')}
          </Typography>
        ),
      },
    });

    if (action === 'CONFIRM') {
      onConfirm();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Typography styleType={TextType.LargeBoldHeadline} WrapperElement="div">
          {t('msg_label_media_library_modal_title')}
        </Typography>
        <Tabs value={activeTab} options={Object.values(Tab)} onChange={setActiveTab} />
      </div>
      <div
        className={styles.inputContainer}
        onClick={(event) => {
          const input = event.currentTarget.querySelector('input');
          if (input) {
            input.focus();
          }
        }}
      >
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
          placeholder={t(getInputPlaceholder())}
        />
        {activeTab === Tab.Giphy && <PoweredByGiphyIcon />}
        <Icon icon={IconType.Search} iconStyle={IconStyle.Secondary} />
      </div>
      <Typography className={styles.headlineContainer} WrapperElement="div" styleType={TextType.TinyHeadline}>
        {getHeadlineText()}
      </Typography>

      {activeTab === Tab.Library && (
        <Dropzone
          accept={ALLOWED_IMAGE_FILE_TYPES}
          maxSize={MAX_IMAGE_SIZE_BYTES}
          noClick={true}
          onDropAccepted={handleOnFileDropAccepted}
          onDropRejected={handleOnFileDropRejected}
        >
          {({ getRootProps, getInputProps, isDragActive, open }) => (
            <div {...getRootProps()} className={styles.listContainer}>
              <input {...getInputProps()} />
              {isDragActive && (
                <div className={styles.dragOverlay}>
                  <div className={styles.dragContent}>
                    <Typography
                      className={styles.dragAndDropTitle}
                      styleType={TextType.UpperCaseLink}
                      WrapperElement="div"
                    >
                      {t('msg_label_upload_user_avatar_drag_over_title')}
                    </Typography>
                    <Typography className={styles.dragAndDropText} WrapperElement="div">
                      {t('msg_label_upload_user_avatar_drag_over_drag_and_drop_message')}
                    </Typography>
                  </div>
                </div>
              )}
              <div className={styles.list}>
                <MediaLibraryUploadItem onClick={open} />
                {selectedImage && (
                  <MediaLibraryItem
                    src={selectedImage.image}
                    highlighted={true}
                    onClick={() => {
                      onItemSelect({ id: selectedImage.id, url: selectedImage.image });
                      closeModal();
                    }}
                    onDeleteClick={async () => {
                      const onConfirm = async () => {
                        onItemSelect(undefined);
                        await deleteMediaLibraryImageMutation({
                          variables: { input: { id: selectedImage.id } },
                        });
                        updateModal({
                          component: MediaLibraryModalBody,
                          props: { onItemSelect, selectedImageId: undefined },
                        });
                        refetch();
                      };

                      showDeleteConfirmationModal(selectedImage, onConfirm);
                    }}
                  />
                )}
                {uploadedImageSrc && <MediaLibraryUploadingItem src={uploadedImageSrc} />}
                {loading && times(8).map((key) => <MediaLibraryItemPlaceholder key={key} />)}
                {items
                  .filter((item) => item.id !== selectedImageId)
                  .map((item) => (
                    <MediaLibraryItem
                      key={item.id}
                      src={item.image}
                      onClick={() => {
                        onItemSelect({ id: item.id, url: item.image });
                        closeModal();
                      }}
                      onDeleteClick={async () => {
                        const onConfirm = async () => {
                          await deleteMediaLibraryImageMutation({ variables: { input: { id: item.id } } });
                          refetch();
                        };

                        showDeleteConfirmationModal(item, onConfirm);
                      }}
                    />
                  ))}
                {data?.mediaLibraryImages.pageInfo.hasNextPage && <Waypoint onEnter={loadMore} />}
              </div>
            </div>
          )}
        </Dropzone>
      )}
      {activeTab === Tab.Giphy && (
        <div className={styles.listContainer}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={logError}>
            <div className={styles.list}>
              <GiphyList
                key={debounceSearchText}
                searchText={debounceSearchText}
                onItemSelect={handleGiphyItemSelect}
              />
            </div>
          </ErrorBoundary>
        </div>
      )}
      {activeTab === Tab.Unsplash && (
        <div className={styles.listContainer}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={logError}>
            <div className={styles.list}>
              <UnsplashList
                key={debounceSearchText}
                searchText={debounceSearchText}
                onItemSelect={handleUnsplashItemSelect}
              />
            </div>
          </ErrorBoundary>
        </div>
      )}
      {uploadInProgress && (
        <div className={styles.giphyUploadingOverlay}>
          <div className={styles.giphyUploadingBackdrop} />
          <div className={styles.giphyUploadingContent}>
            <Icon icon={IconType.Loading} spin={true} />
            <ProgressiveUploadingMessage activeTab={activeTab} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibraryModalBody;
