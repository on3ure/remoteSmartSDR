import React, {useEffect, useState} from 'react';

const Slider = ({
  label,
  id,
  name,
  min,
  max,
  step,
  steps,
}) => {
  const [inputNumber, setInputNumber] = useState(0);
  const [outputNumber, setOutputNumber] = useState(0);

  useEffect(() => {
    setInputNumber(step);
    setOutputNumber(steps[step]);
  }, []);

  const onRangeChange = (event) => {
    const { value: newRange } = event.target;

    setInputNumber(newRange)
    setOutputNumber(steps[newRange]);
  }

  return (
    <div className="slider">
      <div className="slider__value">
        {outputNumber}ms
      </div>
      <label htmlFor={name} className="slider__label">
        {label}
      </label>
      <input id={id} name={name} type="range" min={min} max={max} value={inputNumber} onChange={onRangeChange} className="slider__range" />
    </div>
  );
};

export default Slider;