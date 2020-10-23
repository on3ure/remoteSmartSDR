import React, {useEffect, useState} from 'react';

const Slider = ({
  label,
  description,
  name,
  min,
  max,
  steps,
}) => {

  const [inputNumber, setInputNumber] = useState(0);
  const [outputNumber, setOutputNumber] = useState(0);

  useEffect(() => {
    setOutputNumber(steps[0]);
  }, []);

  const onRangeChange = (e) => {
    setInputNumber(e.target.value)
    setOutputNumber(steps[e.target.value]);
  }

  return (
    <div className="slider">
      <label>
        { label }
      </label>
      <div className="slider__value">
        { outputNumber }ms
      </div>
      <div className="slider__description">
        { description }
      </div>
      <input type="range" min={ min } max={ max } value={ inputNumber } onChange={ onRangeChange } name={ name } id={ name } className="slider__range" />
    </div>
  );
};

export default Slider;