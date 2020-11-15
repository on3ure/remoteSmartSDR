import React, { FC, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Field } from 'formik';

export const Frequency: FC<FrequencyProps> = ({
  name,
}) => (
  <Field
    render={({ form }) => {
      const { frequency, frequencyShift } = form.values;

      const handleFrequencyShiftChange = (action: string): void => {
        switch (action) {
          case 'add':
            form.setFieldValue(name, parseInt(frequency) + parseInt(frequencyShift));
            break;
          case 'sub':
            form.setFieldValue(name, parseInt(frequency) - parseInt(frequencyShift));
            break;
          default:
        }
      };
    
      useEffect(() => {
        const keyboardPress = (event: KeyboardEvent): void => {
          const { key } = event;
    
          if(key === '65') {
            handleFrequencyShiftChange('add');
          } else if (key === '68') {
            handleFrequencyShiftChange('sub');
          }
        };
    
        document.addEventListener('keydown', keyboardPress, false);
    
        return () => {
          document.removeEventListener('keydown', keyboardPress, false);
        };
      }, []);
      
      return (
        <div className="frequency">
          <div className="frequency__display">
            <NumberFormat
              value={frequency}
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
  />
);

interface FrequencyProps {
  name: string;
}
