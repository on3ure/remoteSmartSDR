import React, { FC, useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';

export const ToggleCard: FC<ToggleFieldProps> = ({
  title,
  id,
  name,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const { values: formikValues }: { values: any } = useFormikContext();

  useEffect(() => {
    const toggleName = formikValues[name];
    const isVisible = toggleName.toString() === 'true';
    setVisible(isVisible);
  }, [formikValues[name]]);

  return (
    <div className="card toggle-card">
      <Field
        id={id}
        name={name}
      >
        {({ field }) => (
          <label className="toggle-card__label">
            <input
              {...field}
              id={id}
              type="checkbox"
              className="toggle-card__checkbox"
              checked={visible}
            />
            {title}
          </label>
        )}
      </Field>
      {visible && (
        <div className="toggle-card__content">
          {children}
        </div>
      )}
    </div>
  );
};

interface ToggleFieldProps {
  title: string;
  id: string;
  name: string;
  label: string;
}
