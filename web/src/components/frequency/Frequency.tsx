import React, { FC } from 'react';

import NumberFormat from 'react-number-format';

export const Frequency: FC<FrequencyProps> = ({ hertz }) => {
  const handleChange = (values) => {
    console.log('change');
  };
  
  return (
    <div className="frequency">
      <div className="frequency__display">
        <NumberFormat
          value={hertz}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
        />
      </div>
      <button className="btn" onClick={() => handleChange('up')}>-</button>
      <button className="btn" onClick={() => handleChange('down')}>+</button>
    </div>
  );
};

interface FrequencyProps {
  hertz: string;
}
