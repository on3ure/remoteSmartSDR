import React, { FC, useEffect } from 'react';
import { Field } from 'formik';

export const PushToTalk: FC<PushToTalkProps> = ({
  name,
}) => (
  <Field>
    {({ form }) => {
      const { SmartSDRptt } = form.values;

      const handlePTTChange = (action: string): void => {
        switch (action) {
          case 'talk':
            // Should toggle, not only set
            form.setFieldValue(name, true);
            break;
          default:
        }
      };

      useEffect(() => {
        const keyboardPress = (event: KeyboardEvent): void => {
          const { key } = event;

          // keycode & which are deprecated
          if (key === 'T' || key === 'T') {
            handlePTTChange('talk');
          }
        };

        document.addEventListener('keydown', keyboardPress);

        return () => {
          document.removeEventListener('keydown', keyboardPress);
        };
      }, [SmartSDRptt]);

      return (
        <div className="push-to-talk">
         
        </div>
      );
    }}
  </Field>
);

interface PushToTalkProps {
  name: string;
}
