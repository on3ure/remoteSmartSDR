import React, { FC } from 'react';
import { Field } from 'formik';

export const InputField: FC<InputFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  maxLength,
}) => (
  <div className="input-field">
    <label htmlFor={name} className="input-field__label">
      {label}
    </label>
    <Field
      id={id}
      name={name}
    >
      {({
        field,
        meta: { touched, error },
      }) => (
        <div>
          <input
            {...field}
            placeholder={placeholder}
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
  id: string;
  name: string;
  label: string;
  placeholder: string;
  maxLength: number;
}
