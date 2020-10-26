import React, { FC } from 'react';

export const Toast: FC<ToastProps> = ({
  message,
}) => (
  <div className="toast">
    {message}
  </div>
);

interface ToastProps {
  message: string;
}
