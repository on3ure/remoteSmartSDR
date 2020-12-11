import React, { FC } from 'react';
import { Formik } from 'formik';

import { Toast } from 'components/toast/Toast';
import { Card } from 'components/card/Card';

import { Frequency } from 'components/form/fields/frequency/Frequency';
import { Slider } from 'components/form/fields/slider/Slider';

import { useHomepageWebSocket } from 'components/form/hooks/useWebSocket';

import { frequencyShift } from 'constants/KeybowValues';

export const HomepageForm: FC = () => {
  const [homepageWsValues, submitHomepageWsValues] = useHomepageWebSocket();

  return (
    <Formik
      initialValues={homepageWsValues}
      onSubmit={(values, { setStatus }) => {
        submitHomepageWsValues(values);
        setStatus('New values were successfully stored.');
      }}
    >
      {({ status }) => (
        <div className="form">
          <div className="form__grid">
            <Card
              title="SmartSDR frequency"
              tooltip="Use A to add, D to subtract."
            >
              <Frequency name="frequency" />
            </Card>
            <Card title="Frequency shift">
              <Slider
                id="frequencyShift"
                name="frequencyShift"
                label="Push-to-Talk frequency shift"
                max={frequencyShift.actualValues.length - 1}
                values={frequencyShift.values}
                actualValues={frequencyShift.actualValues}
              />
            </Card>
          </div>
          {status &&
            <Toast
              message={status}
            />
          }
        </div>
      )}
    </Formik>
  );
};
