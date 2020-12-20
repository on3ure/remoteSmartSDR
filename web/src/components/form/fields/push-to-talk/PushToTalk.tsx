import React, { FC, useState, useEffect } from 'react';
import { Field } from 'formik';

export const PushToTalk: FC<PushToTalkProps> = ({ name }) => {
  const [fired, setFired] = useState(false);

  return (
    <Field>
      {({ form }) => {
        const pttValue = form.values[name];

        useEffect(() => {
          const onKeyDown = (event: KeyboardEvent): void => {
            const { key } = event;

            if ((key === 't' || key === 'T') && !fired) {
              form.setFieldValue(name, 'true');
              setFired(true);
            }
          };

          const onKeyUp = (event: KeyboardEvent): void => {
            const { key } = event;

            if (key === 't' || key === 'T') {
              form.setFieldValue(name, 'false');
            }

            setFired(false);
          };

          document.addEventListener('keydown', onKeyDown);
          document.addEventListener('keyup', onKeyUp);

          return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
          };
        }, [fired]);

        return (
          <div className={`push-to-talk${pttValue === 'true' ? ' is-active' : ''}`}>

          </div>
        );
      }}
    </Field>
  );
};

interface PushToTalkProps {
  name: string;
}
