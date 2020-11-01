import React, { FC, useState, useEffect } from 'react';

export const Toast: FC<ToastProps> = ({
  message,
}) => {
  const [hide, selfDestruct] = useState(false);

  useEffect(() => {
    setTimeout(() => selfDestruct(true), 5000);
  }, []);

  if (hide) {
    return null;
  }

  return (
    <div className="toast">
      {message}
    </div>
  );
};

interface ToastProps {
  message: string;
}
