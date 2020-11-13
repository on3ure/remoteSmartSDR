import React, { FC, useContext, useEffect, useCallback } from 'react';

import NumberFormat from 'react-number-format';

import FrequencyContext from 'context/FrequencyContext';

export const Frequency: FC<FrequencyProps> = () => {
  const { hertz, hertzShift } = useContext(FrequencyContext);
  const [hertzValue, setHertzValue] = hertz;
  const [hertzShiftValue, setHertzShiftValue] = hertzShift;

  const handleFrequencyShiftChange = (action) => {
    setHertzValue(action == 'add' ? parseInt(hertzValue) + parseInt(hertzShiftValue): parseInt(hertzValue) - parseInt(hertzShiftValue));
    console.log(hertzValue + ' ' + hertzShiftValue)
  };

  const keyboardPress = useCallback((event) => {
    if(event.keyCode === 65) {
      handleFrequencyShiftChange('add');
    } else if (event.keyCode === 68) {
      handleFrequencyShiftChange('sub');
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyboardPress, false);

    return () => {
      document.removeEventListener("keyup", keyboardPress, false);
    };
  }, []);

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
      <button className="btn" onClick={() => handleFrequencyShiftChange('sub')}>-</button>
      <button className="btn" onClick={() => handleFrequencyShiftChange('add')}>+</button>
    </div>
  );
};

interface FrequencyProps {

}
