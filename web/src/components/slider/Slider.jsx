import React, {useEffect, useState} from 'react';

const Slider = ({
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

  const onRangeChange = (event) => {
    const { value: newRange } = event.target;

    setInputNumber(newRange)
    setOutputNumber(steps[newRange]);
  }

  return (
    <div className="slider">
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