import React, { FC } from 'react';
import { Formik } from 'formik';

import { Card } from 'components/card/Card';
import { Toast } from 'components/toast/Toast';
import { Loader } from 'components/loader/Loader';

import { Frequency } from 'components/form/fields/frequency/Frequency';
import { Slider } from 'components/form/fields/slider/Slider';

import { useHomepageWebSocket } from 'components/form/hooks/useWebSocket';

import { frequencyShift } from 'constants/KeybowValues';
import { ToggleCard } from 'components/card/ToggleCard';

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
      {({ status }) => {
        if (!homepageWsValues || homepageWsValues.length === 0) {
          return (
            <Loader />
          );
        }

        return (
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
              <ToggleCard
                title="SmartSDR PTT"
                id="SmartSDRptt"
                name="SmartSDRptt"
                label="Enable SmartSDR PTT"
                tooltip="Push to talk tooltip"
              >
                <div className="push-to-talk"></div>
              </ToggleCard>
            </div>
            {status &&
              <Toast
                message={status}
              />
            }
          </div>
        );
      }}
    </Formik>
  );
};
