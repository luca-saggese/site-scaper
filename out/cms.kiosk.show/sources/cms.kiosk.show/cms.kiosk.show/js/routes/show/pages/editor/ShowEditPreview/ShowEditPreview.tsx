import classnames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import config from '@Config/config';
import { DEFAULT_DELAY_MS, SLIDE_TEMPLATE_HEIGHT, SLIDE_TEMPLATE_WIDTH } from '@Config/constants';
import {
  MediaLibraryImageDocument,
  MediaLibraryImageFragment,
  MediaLibraryImageQuery,
  MediaLibraryImageQueryVariables,
} from '@Graphql/graphqlTypes.generated';
import { useDebounce } from '@Hooks/useDebounce';
import useDimensions from '@Hooks/useDimensions';
import { useValueShouldUpdate } from '@Hooks/useValueShouldUpdate';
import { SlideFormModel } from '@Routes/show/pages/editor';
import { TemplateSchema, TemplateSchemaPropertyType } from '@Routes/show/pages/editor/SchemaFields';
import graphqlClient from '@Utils/graphqlClient';
import { isValidUrl, parseTime } from '@Utils/helpers';

import styles from './ShowEditPreview.module.scss';

interface ShowPreviewProps {
  activeSlide: SlideFormModel;
  showId: string;
  className?: string;
  forceAutoplayOff?: boolean;
  id?: string;
}

const useShowEditPreviewValues = (
  values: ShowPreviewProps['activeSlide']['data'] = {},
  templateSchema: TemplateSchema
) => {
  const urlFields = Object.keys(templateSchema.properties).filter(
    (propertyKey) => templateSchema.properties[propertyKey].type === TemplateSchemaPropertyType.Url
  );
  const debouncedValues = useDebounce(values, DEFAULT_DELAY_MS);
  const shouldUpdate = urlFields.every((fieldName) => debouncedValues && isValidUrl(debouncedValues[fieldName]));
  return useValueShouldUpdate(debouncedValues, shouldUpdate);
};

const ShowEditPreview: React.FC<ShowPreviewProps> = ({
  activeSlide,
  showId,
  className,
  forceAutoplayOff = false,
  id,
}) => {
  const [images, setImages] = useState<Record<string, MediaLibraryImageFragment>>({});
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(ref);
  const templateSchema: TemplateSchema = useMemo(() => JSON.parse(activeSlide.templateSchema), [
    activeSlide.templateSchema,
  ]);
  const formValues = useShowEditPreviewValues(activeSlide.data, templateSchema);
  useEffect(() => {
    Object.keys(templateSchema.properties)
      .filter((propertyKey) => templateSchema.properties[propertyKey].type === TemplateSchemaPropertyType.Image)
      .map((propertyKey) => formValues[propertyKey])
      .filter((imageId) => imageId && !images[imageId])
      .forEach((image) => {
        if (!isValidUrl(image)) {
          graphqlClient
            .query<MediaLibraryImageQuery, MediaLibraryImageQueryVariables>({
              query: MediaLibraryImageDocument,
              variables: { id: image },
            })
            .then((response) => {
              setImages((prevState) => ({ ...prevState, [image]: response.data.mediaLibraryImage }));
            });
        } else {
          setImages((prevState) => ({ ...prevState, [image]: { image } }));
        }
      });
  }, [images, templateSchema, formValues]);

  const srcDoc = useMemo(() => {
    let html = activeSlide.templateHtml;

    Object.keys(templateSchema.properties).forEach((key) => {
      let replace = formValues[key] || '';
      if (templateSchema.properties[key].type === TemplateSchemaPropertyType.Image) {
        replace = images[formValues[key]]?.image || '';
      }
      html = html.replaceAll(`{{{${key}}}}`, replace).replaceAll(`{{${key}}}`, replace);
    });

    html = html.replaceAll('{{kioskShowId}}', showId);
    html = html.replaceAll('{{kioskSlideId}}', activeSlide.id);
    html = html.replaceAll('{{kioskSlideDuration}}', String(parseTime(activeSlide.duration)));
    html = html.replaceAll('{{{kioskBackendUrl}}}', config.REACT_APP_API_BASE_URL);

    if (activeSlide.templateId === 'youtube' && forceAutoplayOff) {
      html = html.replaceAll('autoplay; ', '');
      html = html.replaceAll('event.target.playVideo();', '');
    }

    return html;
  }, [showId, templateSchema.properties, activeSlide, formValues, images, forceAutoplayOff]);

  const scale = useMemo(() => {
    return Math.min(dimensions.width / SLIDE_TEMPLATE_WIDTH, dimensions.height / SLIDE_TEMPLATE_HEIGHT);
  }, [dimensions.height, dimensions.width]);

  return (
    <div className={classnames(styles.container, className)} ref={ref}>
      <iframe
        className={styles.iframe}
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
        title="Slide preview"
        frameBorder="0"
        scrolling="no"
        srcDoc={srcDoc}
        id={id}
      />
      <div className={styles.iframeBlocker} />
    </div>
  );
};

export default ShowEditPreview;
