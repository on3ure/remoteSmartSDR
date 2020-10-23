import React, { FC } from 'react';
import { Field } from 'formik';

const InputField: FC<InputFieldProps> = ({
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
      placeholder={placeholder}
      maxLength={maxLength}
      className="input-field__input"
    />
  </div>
);

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  maxLength: number;
}

export default InputField;
