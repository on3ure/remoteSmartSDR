import React, { FC, useEffect } from 'react';
import { Field } from 'formik';
import NumberFormat from 'react-number-format';

export const Frequency: FC<FrequencyProps> = ({
  name,
}) => (
  <Field>
    {({ form }) => {
      const { SmartSDRfrequency, frequencyShift } = form.values;

      const handleFrequencyShiftChange = (action: string): void => {
        switch (action) {
          case 'add':
            form.setFieldValue(name, parseInt(SmartSDRfrequency) + parseInt(frequencyShift));
            break;
          case 'sub':
            form.setFieldValue(name, parseInt(SmartSDRfrequency) - parseInt(frequencyShift));
            break;
          default:
        }
      };

      useEffect(() => {
        const keyboardPress = (event: KeyboardEvent): void => {
          const { key } = event;

          // keycode & which are deprecated
          if (key === 'A' || key === 'a') {
            handleFrequencyShiftChange('add');
          } else if (key === 'D' || key === 'd') {
            handleFrequencyShiftChange('sub');
          }
        };

        document.addEventListener('keydown', keyboardPress);

        return () => {
          document.removeEventListener('keydown', keyboardPress);
        };
      }, [SmartSDRfrequency, frequencyShift]);

      return (
        <div className="frequency">
          <div className="frequency__display">
            <NumberFormat
              value={SmartSDRfrequency}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
            />
          </div>
          <div className="frequency__btns">
            <button
              type="button"
              className="frequency__btn"
              onClick={() => handleFrequencyShiftChange('sub')}
            >-</button>
            <button
              type="button"
              className="frequency__btn"
              onClick={() => handleFrequencyShiftChange('add')}
            >+</button>
          </div>
        </div>
      );
    }}
  </Field>
);

interface FrequencyProps {
  name: string;
}
