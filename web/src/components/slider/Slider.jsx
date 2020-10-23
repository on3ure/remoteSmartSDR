import React, {useEffect, useState} from 'react';

import { Field } from 'formik';

const Slider = ({ id, name, label, min, max, steps }) => {
  return (
    <div className="slider">
      <Field
        render={({ form, field }) => {
          const onRangeChange = (event) => {
            const { value: newRange } = event.target;

            form.setFieldValue(name, steps[newRange]);
          };
          
          return (
            <>
              <div className="slider__value">
                {field.value[name]}ms
              </div>
              <label htmlFor={name} className="slider__label">
                {label}
              </label>
              <input
                id={id}
                name={name}
                type="range"
                min={min}
                max={max}
                onChange={onRangeChange}
                className="slider__range"
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default Slider;
