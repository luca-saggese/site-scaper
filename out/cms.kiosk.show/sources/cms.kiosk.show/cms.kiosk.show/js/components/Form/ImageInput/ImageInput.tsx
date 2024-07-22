import classnames from 'classnames';
import React from 'react';

import FieldError from '@Components/Form/FieldError';
import Image from '@Components/Image';
import { useModal } from '@Components/Modal';
import { MediaLibraryModalBody } from '@Components/Modal/MediaLibraryModalBody';
import Typography, { TextType } from '@Components/Typography';
import { useMediaLibraryImageQuery } from '@Graphql/graphqlTypes.generated';
import { isValidUrl } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import { FormFieldRenderProps } from '../FormField';

import styles from './ImageInput.module.scss';

interface ImageInputProps extends FormFieldRenderProps<string> {
  label: string;
  className?: string;
  title?: string;
  tParams?: Record<string, unknown>;
}

const ImageInput: React.FunctionComponent<ImageInputProps> = ({
  label,
  className,
  input,
  meta,
  tParams = {},
  title,
}) => {
  const t = useTranslation();
  const { showModal } = useModal();

  const image = input.value;
  const isUrl = isValidUrl(image);

  const { data } = useMediaLibraryImageQuery({
    variables: { id: image },
    skip: !image || isUrl,
  });

  const imageUrl = isUrl ? image : data?.mediaLibraryImage?.image;

  const handleButtonClick = () => {
    input.onFocus();
    showModal({
      component: MediaLibraryModalBody,
      props: {
        selectedImageId: isUrl ? undefined : image,
        onItemSelect: (item) => {
          input.onChange(item && (item.id || item.url));
          input.onBlur();
        },
      },
    });
  };

  return (
    <div className={classnames(styles.container, className)} title={title}>
      {label && (
        <Typography WrapperElement="label" htmlFor={input.name}>
          {label}
        </Typography>
      )}
      <button
        type="button"
        id={input.name}
        className={imageUrl ? styles.input : styles.emptyInput}
        onClick={handleButtonClick}
      >
        {imageUrl ? (
          <>
            <Image className={styles.image} src={imageUrl} />
            <Typography styleType={TextType.TinyLink} className={styles.editBadge}>
              {t('msg_common_edit')}
            </Typography>
          </>
        ) : (
          <Typography styleType={TextType.LowerCaseLink}>{t('msg_label_image_input_empty')}</Typography>
        )}
      </button>
      <FieldError tParams={tParams} meta={meta} />
    </div>
  );
};

export default ImageInput;
