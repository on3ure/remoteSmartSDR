import React, { FC } from 'react';

const Card: FC<CardProps> = ({ title, children }) => (
  <div className="card">
    {title && (
      <h2 className="card__title">{title}</h2>
    )}
    {children}
  </div>
);

interface CardProps {
  title: string;
}

export default Card;
