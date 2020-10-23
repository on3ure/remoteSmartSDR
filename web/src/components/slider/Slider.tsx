import React, { FC } from 'react';

import { Field } from 'formik';

const Slider: FC<SliderProps> = ({
  id,
  name,
  label,
  min,
  max,
  steps,
}) => (
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

interface SliderProps {
  id: string;
  name: string;
  label: string;
  min: number;
  max: number;
  steps: number[];
}

export default Slider;
