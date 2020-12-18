import React, { FC } from 'react';
import { Field } from 'formik';

export const InputField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  maxLength,
}) => (
  <div className="input-field">
    <label htmlFor={name} className="input-field__label">
      {label}
    </label>
    <Field name={name}>
      {({
        field,
        meta: { touched, error },
      }) => (
        <div>
          <input
            {...field}
            id={name}
            placeholder={placeholder}
            type="text"
            maxLength={maxLength}
            className="input-field__input"
          />
          {touched && error && (
            <div className="input-field__error">{error}</div>
          )}
        </div>
      )}
    </Field>
  </div>
);

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  maxLength: number;
}
