import React, { FC } from 'react';

import { Field } from 'formik';

export const Slider: FC<SliderProps> = ({
  name,
  label,
  max,
  values,
  actualValues,
}) => (
  <div className="slider">
    <Field>
      {({ form, field }) => {
        let actualValuesIndex: number = 0;
        const valueFromFormData: number = field.value[name];

        if (valueFromFormData) {
          actualValuesIndex = actualValues.findIndex(value => value === valueFromFormData.toString())
        }

        const onRangeChange = (event): void => {
          event.preventDefault();

          const { value }: { value: string } = event.target;
          form.setFieldValue(name, actualValues[value]);
        };

        return (
          <>
            <div className="slider__value">
              {values[actualValuesIndex]}ms
            </div>
            <label htmlFor={name} className="slider__label">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type="range"
              min="0"
              max={max}
              onChange={onRangeChange}
              defaultValue={actualValuesIndex}
              className="slider__range"
            />
          </>
        );
      }}
   </Field>
  </div>
);

interface SliderProps {
  name: string;
  label: string;
  max: number;
  values: number[];
  actualValues: string[];
}
