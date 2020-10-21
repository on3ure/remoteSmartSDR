import React, {useState} from 'react';

const Slider = ({
  label,
  description,
  name,
}) => {

  const [number, setNumber] = useState(20);

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
      <input type="range" min="0" max="100" value={ number } onChange={ onRangeChange } name={ name } id={ name } className="input-slider" />
    </div>
  );
};

export default Slider;