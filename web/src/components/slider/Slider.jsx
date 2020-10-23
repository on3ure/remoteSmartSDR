import React, {useState} from 'react';

const Slider = ({
  label,
  description,
  name,
  min,
  max,
}) => {

  const [number, setNumber] = useState(100);

  const onRangeChange = (e) => {
    setNumber(e.target.value);
  }

  return (
    <div className="slider">
      <label>
        { label }
      </label>
      <div className="slider__value">
        { number }ms
      </div>
      <div className="slider__description">
        { description }
      </div>
      <input type="range" min={ min } max={ max } value={ number } onChange={ onRangeChange } name={ name } id={ name } className="slider__range" />
    </div>
  );
};

export default Slider;