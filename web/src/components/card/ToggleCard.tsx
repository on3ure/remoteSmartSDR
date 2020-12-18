import React, { FC, useState, useEffect } from 'react';
import { Field, useFormikContext } from 'formik';
import { Tooltip } from 'components/tooltip/Tooltip';

export const ToggleCard: FC<ToggleFieldProps> = ({
  title,
  tooltip,
  name,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const { values: formikValues }: { values: any } = useFormikContext();

  useEffect(() => {
    const toggleName = formikValues[name];
    if (toggleName) {
      const isVisible = toggleName.toString() === 'true';
      setVisible(isVisible);
    }
  }, [formikValues[name]]);

  return (
    <div className="card toggle-card">
      {tooltip && (
        <Tooltip
          message={tooltip}
        />
      )}
      <Field name={name}>
        {({ field }) => (
          <label className="toggle-card__label">
            <input
              {...field}
              id={name}
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
  tooltip?: string;
  id: string;
  name: string;
  label: string;
}
