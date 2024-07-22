import { useMutation } from '@apollo/client';
import classnames from 'classnames';
import { FORM_ERROR } from 'final-form';
import { DocumentNode } from 'graphql';
import React, { useState } from 'react';
import { Form, FormProps } from 'react-final-form';

import AutoSaveFormField from '@Components/Form/AutoSaveForm/AutoSaveFormField/AutoSaveFormField';
import FormField from '@Components/Form/FormField';
import Icon, { IconType } from '@Components/Icon';
import { toastError } from '@Components/Toastify';
import { TextType } from '@Components/Typography';
import { getErrorCodeTranslationKey } from '@Config/errors';
import { useEventHandler, useEventHandlerWithRef } from '@Hooks/useEventHandler';
import { required } from '@Utils/form';
import { callMutationForForm } from '@Utils/graphql';
import { noop } from '@Utils/helpers';

import styles from './AutoSaveForm.module.scss';

export interface AutoSaveFormProps extends Omit<FormProps, 'onSubmit'> {
  mutation: DocumentNode;
  onComplete?: () => void;
  mutationInputMapper?: (values: any) => any;
  name: string;
  label?: string;
  staticFormValues?: any;
  icon?: IconType;
  inputClassName?: string;
  fieldClassName?: string;
  fieldDisplayTextType?: TextType;
  disabled?: boolean;
}

const AutoSaveForm: React.FunctionComponent<AutoSaveFormProps> = ({
  mutation,
  onComplete = noop,
  mutationInputMapper = (values) => ({ input: values }),
  name,
  label,
  staticFormValues = {},
  initialValues,
  icon,
  inputClassName,
  fieldClassName,
  fieldDisplayTextType,
  disabled,
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useEventHandler(
    'mouseover',
    () => {
      if (!disabled) {
        setHovered(true);
      }
    },
    () => setHovered(false)
  );
  const [focused, setFocused] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);
  useEventHandlerWithRef('click', ref, () => {
    if (!disabled) {
      setFocused(true);
      if (!fieldFocused) {
        setFieldFocused(true);
      }
    }
  });

  const [submitMutation] = useMutation(mutation, {
    onCompleted: () => {
      setFocused(false);
      setFieldFocused(false);
      onComplete();
    },
  });

  const onSubmitHandler = (values: any) => {
    if (disabled) {
      return Promise.resolve();
    }
    return callMutationForForm(
      submitMutation({ variables: mutationInputMapper({ ...staticFormValues, ...values }) }),
      (errors) => {
        if (errors[FORM_ERROR]) {
          toastError('msg_error_title_unexpected_error', getErrorCodeTranslationKey(errors[FORM_ERROR]));
        }
      }
    );
  };
  const setFocusHandler = (value: boolean) => {
    if (value) {
      setFieldFocused(value);
    } else {
      setFieldFocused(value);
      setFocused(value);
    }
  };
  return (
    <Form
      onSubmit={onSubmitHandler}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form className={classnames(styles.container, disabled && styles.disabled)} onSubmit={handleSubmit} ref={ref}>
            <FormField
              name={name}
              component={AutoSaveFormField}
              label={label}
              focused={fieldFocused || focused}
              setFocused={setFocusHandler}
              handleSubmit={handleSubmit}
              validate={required()}
              inputClassName={inputClassName}
              className={fieldClassName}
              displayTextType={fieldDisplayTextType}
              disabled={disabled}
            />
            {icon && hovered && !fieldFocused && !focused && <Icon icon={icon} disabled={true} />}
          </form>
        );
      }}
    />
  );
};

export default AutoSaveForm;
