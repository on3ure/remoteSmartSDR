import React from 'react';

import { Field } from 'formik';

const InputField = ({ id, name, label, placeholder, maxLength }) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className="input-field__label">{label}</label>
      <Field id={id} name={name} placeholder={placeholder} maxLength={maxLength} className="input-field__input" />
    </div>
  );
};

export default InputField;
