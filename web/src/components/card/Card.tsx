import React, { FC } from 'react';
import { Tooltip } from 'components/tooltip/Tooltip';

export const Card: FC<CardProps> = ({ tooltip, title, children }) => (
  <div className="card">
    {tooltip && (
      <Tooltip
        message={tooltip}
      />
    )}
    {title && (
      <h2 className="card__title">{title}</h2>
    )}
    {children}
  </div>
);

interface CardProps {
  tooltip?: string;
  title: string;
}
