import React, {useState} from 'react';

const Slider = ({
  name
}) => {

  const [number, setNumber] = useState(20);

  const onRangeChange = (e) => {
    setNumber(e.target.value);
  }

  return (
    <div>
      <label>
        { number }
      </label>
      <input type="range" min="0" max="100" value={ number } onChange={ onRangeChange } name={ name } id={ name } className="slider" />
    </div>
  );
};

export default Slider;