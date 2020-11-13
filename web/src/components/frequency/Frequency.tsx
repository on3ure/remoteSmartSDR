import React, { FC, useContext } from 'react';

import NumberFormat from 'react-number-format';

import FrequencyContext from 'context/FrequencyContext';

export const Frequency: FC<FrequencyProps> = () => {
  const { hertz, hertzShift } = useContext(FrequencyContext);
  const [hertzValue, setHertzValue] = hertz;
  const [hertzShiftValue, setHertzShiftValue] = hertzShift;

  const handleChange = (action) => {
    console.log(action);
    console.log(hertz);
    setHertzValue(action == 'add' ? parseInt(hertz) + parseInt(hertzShift): parseInt(hertz) - parseInt(hertzShift));
  };

  return (
    <div className="frequency">
      <div className="frequency__display">
        <NumberFormat
          value={hertzValue}
          displayType={'text'}
          thousandSeparator="."
          decimalSeparator=","
        />
      </div>
      <button className="btn" onClick={() => handleChange('sub')}>-</button>
      <button className="btn" onClick={() => handleChange('add')}>+</button>
    </div>
  );
};

interface FrequencyProps {

}
