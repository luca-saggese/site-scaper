import React from 'react';
import { Field, FieldInputProps, FieldMetaState, UseFieldConfig } from 'react-final-form';

export interface FormFieldRenderProps<FieldValue, T extends HTMLElement = HTMLElement> {
  input: FieldInputProps<FieldValue, T>;
  meta: FieldMetaState<FieldValue>;
}

type FormFieldProps<TComponentProps extends FormFieldRenderProps<unknown>> = {
  name: string;
  component: React.ComponentType<TComponentProps>;
} & UseFieldConfig<TComponentProps['input']['value']> &
  Omit<TComponentProps, keyof FormFieldRenderProps<unknown>>;

const FormField = <TComponentProps extends FormFieldRenderProps<unknown>>(props: FormFieldProps<TComponentProps>) => {
  return <Field {...props} />;
};

export default FormField;
