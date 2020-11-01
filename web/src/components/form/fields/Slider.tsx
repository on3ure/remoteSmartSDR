import React, { FC } from 'react';
import { Field } from 'formik';

export const Slider: FC<SliderProps> = ({
  id,
  name,
  label,
  max,
  values,
  actualValues,
}) => (
  <div className="slider">
    <Field
      render={({ form, field }) => {
        const valueFromFormData: number = field.value[name];
        const actualValuesIndex: number = actualValues.findIndex(value => value === valueFromFormData.toString());

        const onRangeChange = (event): void => {
          event.preventDefault();

          const { value }: { value: string } = event.target;
          form.setFieldValue(name, actualValues[parseInt(value, 10)]);
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
              id={id}
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
    />
  </div>
);

interface SliderProps {
  id: string;
  name: string;
  label: string;
  max: number;
  values: number[];
  actualValues: string[];
}
