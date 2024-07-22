import { IGif } from '@giphy/js-types';
import imageCompression from 'browser-image-compression';
import React, { FunctionComponent, useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@Components/ErrorBoundary';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import { ModalProps } from '@Components/Modal';
import MediaLibraryUploadingItem from '@Components/Modal/MediaLibraryModalBody/MediaLibraryUploadingItem';
import MediaLibraryUploadItem from '@Components/Modal/MediaLibraryModalBody/MediaLibraryUploadItem';
import UnsplashList, { UnsplashImage } from '@Components/Modal/MediaLibraryModalBody/UnsplashList';
import Tabs from '@Components/Tabs';
import { toastError } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { ALLOWED_IMAGE_FILE_TYPES, DEFAULT_DELAY_MS, MAX_IMAGE_SIZE_BYTES } from '@Config/constants';
import { useCreatePublicImageMutation } from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import { ReactComponent as PoweredByGiphyIcon } from '@Images/icons/poweredByGiphy.svg';
import { assertIsDefined } from '@Utils/assert';
import { UnreachableCaseError } from '@Utils/error';
import { mutationErrorHandler } from '@Utils/graphql';
import { logError } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import GiphyList from './GiphyList';
import styles from './MediaLibraryModalBody.module.scss';

enum Tab {
  Library = 'Library',
  Giphy = 'GIPHY',
  Unsplash = 'Unsplash',
}

interface PublicMediaLibraryModalData extends ModalProps {
  onItemSelect: (item?: { url: string }) => void;
}

const PublicMediaLibraryModalBody: FunctionComponent<PublicMediaLibraryModalData> = ({ onItemSelect, closeModal }) => {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState(Tab.Library);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>();
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = useDebounce(searchText, DEFAULT_DELAY_MS);

  const [createPublicImageMutation] = useCreatePublicImageMutation({
    onError: mutationErrorHandler('msg_error_title_create_media_library_item'),
  });

  const createPublicImage = async (image: File) => {
    const result = await createPublicImageMutation({
      variables: {
        input: {
          image,
        },
      },
    });

    setUploadedImageSrc(undefined);
    const uploadedImage = result.data?.createPublicImage?.publicImage;
    assertIsDefined(uploadedImage);
    onItemSelect({ url: uploadedImage.image });
    closeModal();
  };

  const handleGiphyItemSelect = async (item: IGif) => {
    onItemSelect({ url: item.images.downsized.url });
    closeModal();
  };

  const handleUnsplashItemSelect = async (item: UnsplashImage) => {
    onItemSelect({ url: `${item.urls.raw}&fm=jpg&w=1920&q=85&fit=max` });
    closeModal();
  };

  const handleOnFileDropAccepted = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const file = files[0];

    imageCompression.getDataUrlFromFile(file).then(setUploadedImageSrc);

    if (file.type === 'image/gif') {
      createPublicImage(file);
      return;
    }

    imageCompression(file, {
      maxWidthOrHeight: 1920,
      maxSizeMB: 5,
      useWebWorker: false,
      initialQuality: 0.8,
    }).then((compressedFile) => {
      createPublicImage(new File([compressedFile], file.name));
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

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Typography styleType={TextType.LargeBoldHeadline} WrapperElement="div">
          {t('msg_label_media_library_modal_title')}
        </Typography>
        <Tabs value={activeTab} options={Object.values(Tab)} onChange={setActiveTab} />
      </div>
      {activeTab !== Tab.Library && (
        <>
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
        </>
      )}

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
                {uploadedImageSrc && <MediaLibraryUploadingItem src={uploadedImageSrc} />}
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
    </div>
  );
};

export default PublicMediaLibraryModalBody;
