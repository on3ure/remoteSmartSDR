import React, {useState} from 'react';

const Card = ({
  description,
  children,
}) => {

  return (
    <div className="card">
      { children }
    </div>
  );
};

export default Card;