import React, { FC, useEffect } from 'react';
import { Field } from 'formik';

export const PushToTalk: FC<PushToTalkProps> = ({ name }) => (
  <Field>
    {({ form }) => {
      const pttValue = form.values[name];

      const handlePttChange = (): void => {
        form.setFieldValue(name, pttValue === 'true' ? 'false' : 'true');
      };

      useEffect(() => {
        const onKeyDown = (event: KeyboardEvent): void => {
          const { key } = event;

          if (key === 't' || key === 'T') {
            form.setFieldValue(name, pttValue === 'true' ? 'false' : 'true');
          }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
          document.removeEventListener('keydown', onKeyDown);
        };
      }, [pttValue]);

      return (
        <div
          className={`push-to-talk${pttValue === 'true' ? ' is-active' : ''}`}
          onClick={() => handlePttChange()}
        />
      );
    }}
  </Field>
);

interface PushToTalkProps {
  name: string;
}
