import React from 'react';
import { useForm } from 'react-final-form';

import FormField from '@Components/Form/FormField';
import ImageInput from '@Components/Form/ImageInput';
import Select from '@Components/Form/Select';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Toggle from '@Components/Form/Toggle';
import UrlInput, { UrlInputProps } from '@Components/Form/UrlInput';
import { useModal } from '@Components/Modal';
import GoogleDriveInfoModalBody from '@Components/Modal/GoogleDriveInfoModalBody';
import GoogleSlidesInfoModalBody from '@Components/Modal/GoogleSlidesInfoModalBody';
import InstagramInfoModalBody from '@Components/Modal/InstagramInfoModalBody';
import LinkedInInfoModalBody from '@Components/Modal/LinkedInInfoModalBody';
import { toastError } from '@Components/Toastify';
import { MINIMUM_SHOW_DURATION } from '@Config/constants';
import { getErrorCodeTranslationKey } from '@Config/errors';
import { YoutubeVideoDocument, YoutubeVideoQuery, YoutubeVideoQueryVariables } from '@Graphql/graphqlTypes.generated';
import ConnectToDropboxField from '@Routes/show/pages/editor/ConnectToDropboxField';
import { allowOnlyInteger, googleSlidesUrl, integerMinMax, url } from '@Utils/form';
import graphqlClient from '@Utils/graphqlClient';
import { formatTime } from '@Utils/helpers';

import styles from './SchemaFields.module.scss';

export enum TemplateSchemaPropertyType {
  String = 'string',
  Integer = 'integer',
  Url = 'url',
  Boolean = 'boolean',
  Image = 'image',
  Dropbox = 'dropbox',
}

export enum TemplateSchemaPropertySubType {
  GoogleSlides = 'google_slides',
  GoogleDrive = 'google_drive',
  Youtube = 'youtube',
  LinkedInPost = 'linkedin_post',
  InstagramPost = 'instagram_post',
}

export interface TemplateSchemaProperty {
  type: TemplateSchemaPropertyType;
  subtype?: TemplateSchemaPropertySubType;
  order: number;
  title: string;
  tooltip?: string;
  values?: string[];
  minimum?: number;
  maximum?: number;
}

export interface TemplateSchema {
  properties: Record<string, TemplateSchemaProperty>;
}

interface SchemaFieldsProps {
  schema: string;
  path: string;
  index: number;
  onSlideInfoChange: () => void;
}

const SchemaFields: React.FunctionComponent<SchemaFieldsProps> = ({ schema, path, index, onSlideInfoChange }) => {
  const form = useForm();
  const { showModal } = useModal();

  const templateSchema: TemplateSchema = JSON.parse(schema);

  return (
    <>
      {Object.keys(templateSchema.properties)
        .sort((propertyKeyA, propertyKeyB) => {
          const propertyA = templateSchema.properties[propertyKeyA];
          const propertyB = templateSchema.properties[propertyKeyB];
          return propertyA.order - propertyB.order;
        })
        .map((propertyKey) => {
          const property = templateSchema.properties[propertyKey];
          const name = `${path}.data.${propertyKey}`;
          const label = property.title;
          const { tooltip } = property;

          if (property.type === TemplateSchemaPropertyType.Dropbox) {
            return <ConnectToDropboxField key={propertyKey} label={label} />;
          }

          if (property.type === TemplateSchemaPropertyType.Boolean) {
            return (
              <FormField
                key={propertyKey}
                type="checkbox"
                className={styles.field}
                name={name}
                label={label}
                component={Toggle}
                title={tooltip}
              />
            );
          }

          if (property.type === TemplateSchemaPropertyType.Image) {
            return (
              <FormField
                key={propertyKey}
                className={styles.field}
                name={name}
                label={label}
                component={ImageInput}
                title={tooltip}
              />
            );
          }

          if (property.type === TemplateSchemaPropertyType.Url) {
            if (property.subtype === TemplateSchemaPropertySubType.GoogleSlides) {
              return (
                <FormField<UrlInputProps>
                  key={propertyKey}
                  name={name}
                  label={label}
                  component={UrlInput}
                  validate={googleSlidesUrl}
                  formatOnBlur
                  format={(newValue) => {
                    try {
                      const googleUrl = new URL(newValue);
                      googleUrl.search = '';
                      googleUrl.pathname = googleUrl.pathname.replace('/pub', '/embed');
                      return googleUrl.href;
                    } catch (e) {
                      return undefined;
                    }
                  }}
                  className={styles.field}
                  onHelpClick={() => {
                    showModal({ component: GoogleSlidesInfoModalBody });
                  }}
                  title={tooltip}
                />
              );
            }

            if (property.subtype === TemplateSchemaPropertySubType.GoogleDrive) {
              return (
                <FormField<UrlInputProps>
                  key={propertyKey}
                  className={styles.field}
                  name={name}
                  label={label}
                  component={UrlInput}
                  validate={url}
                  title={tooltip}
                  onHelpClick={() => {
                    showModal({ component: GoogleDriveInfoModalBody });
                  }}
                />
              );
            }

            if (property.subtype === TemplateSchemaPropertySubType.LinkedInPost) {
              return (
                <FormField<UrlInputProps>
                  key={propertyKey}
                  className={styles.field}
                  name={name}
                  label={label}
                  component={UrlInput}
                  title={tooltip}
                  validate={url}
                  onPaste={(event) => {
                    try {
                      const frameString = event.clipboardData.getData('text');
                      const doc = new DOMParser().parseFromString(frameString, 'text/html');
                      const iframe = doc.body.children[0] as HTMLIFrameElement;
                      const result = iframe.src;

                      if (!result) {
                        throw Error('Not a linkedin post');
                      }
                      event.preventDefault();

                      form.change(`${path}.data.post`, result);
                      onSlideInfoChange();
                    } catch (error) {
                      form.change(`${path}.data.post`, event.currentTarget.value);
                    }
                  }}
                  onHelpClick={() => {
                    showModal({ component: LinkedInInfoModalBody });
                  }}
                />
              );
            }

            if (property.subtype === TemplateSchemaPropertySubType.InstagramPost) {
              return (
                <FormField<UrlInputProps>
                  key={propertyKey}
                  className={styles.field}
                  name={name}
                  label={label}
                  component={UrlInput}
                  validate={url}
                  title={tooltip}
                  formatOnBlur
                  format={(newValue) => {
                    try {
                      const instagramUrl = new URL(newValue);
                      instagramUrl.search = '';
                      return instagramUrl.href;
                    } catch (e) {
                      return undefined;
                    }
                  }}
                  onHelpClick={() => {
                    showModal({ component: InstagramInfoModalBody });
                  }}
                />
              );
            }

            if (property.subtype === TemplateSchemaPropertySubType.Youtube) {
              return (
                <FormField<UrlInputProps>
                  key={propertyKey}
                  className={styles.field}
                  name={name}
                  label={label}
                  component={UrlInput}
                  onBlur={async (event) => {
                    const youtubeUrl = event.currentTarget.value;

                    if (!youtubeUrl) {
                      return;
                    }

                    try {
                      const response = await graphqlClient.query<YoutubeVideoQuery, YoutubeVideoQueryVariables>({
                        query: YoutubeVideoDocument,
                        variables: { url: youtubeUrl },
                      });

                      const newValue = formatTime(
                        Number(response.data.youtubeVideo?.duration) || MINIMUM_SHOW_DURATION
                      );
                      const oldValue = form.getState().values.slides[index].duration;

                      if (newValue === oldValue) {
                        return;
                      }

                      form.change(`${path}.duration`, newValue);
                      onSlideInfoChange();
                    } catch (error) {
                      toastError('msg_error_title_youtube', getErrorCodeTranslationKey(error.graphQLErrors[0].message));
                    }
                  }}
                  validate={url}
                  title={tooltip}
                />
              );
            }

            return (
              <FormField
                key={propertyKey}
                className={styles.field}
                name={name}
                label={label}
                component={UrlInput}
                validate={url}
                title={tooltip}
              />
            );
          }

          if (property.type === TemplateSchemaPropertyType.Integer) {
            return (
              <FormField
                key={propertyKey}
                className={styles.field}
                name={name}
                label={label}
                component={TextInput}
                format={(value) => (value ? String(value) : '')}
                parse={allowOnlyInteger}
                title={tooltip}
                validate={(value) => integerMinMax(value ? String(value) : '', property.minimum, property.maximum)}
              />
            );
          }

          if (property.values) {
            return (
              <FormField
                key={propertyKey}
                className={styles.field}
                name={name}
                label={label}
                component={Select}
                options={property.values.map((value) => ({ label: value, value }))}
                parse={(newValue) => {
                  return newValue.value;
                }}
                format={(value) => {
                  return { label: value, value };
                }}
                isMulti={false}
                title={tooltip}
              />
            );
          }

          if (property.type === TemplateSchemaPropertyType.String) {
            // Todo remove at a later point (see the url field)
            if (property.subtype === TemplateSchemaPropertySubType.LinkedInPost) {
              return (
                <FormField<TextInputProps<string>>
                  key={propertyKey}
                  className={styles.field}
                  name={name}
                  label={label}
                  component={TextInput}
                  title={tooltip}
                  onPaste={(event) => {
                    try {
                      const result = event.clipboardData.getData('text').match(/urn:li:share:(.*?)"/);
                      if (!result || !result[1]) {
                        throw Error('Not a linkedin post');
                      }
                      event.preventDefault();

                      form.change(`${path}.data.post`, result[1]);
                      onSlideInfoChange();
                    } catch (error) {
                      form.change(`${path}.data.post`, event.currentTarget.value);
                    }
                  }}
                  onHelpClick={() => {
                    showModal({ component: LinkedInInfoModalBody });
                  }}
                />
              );
            }

            return (
              <FormField
                key={propertyKey}
                className={styles.field}
                name={name}
                label={label}
                component={TextInput}
                title={tooltip}
              />
            );
          }

          return null;
        })}
    </>
  );
};

export default SchemaFields;
