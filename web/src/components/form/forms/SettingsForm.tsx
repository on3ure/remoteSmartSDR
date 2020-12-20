import React, { FC, useState, useEffect } from 'react';
import { Formik } from 'formik';

import { Loader } from 'components/loader/Loader';
import { Toast } from 'components/toast/Toast';
import { Card } from 'components/card/Card';
import { ToggleCard } from 'components/card/ToggleCard';
import { Slider } from 'components/form/fields/slider/Slider';
import { InputField } from 'components/form/fields/input/InputField';

import { SettingsFormValues, SettingsValidateValues } from 'components/form/interfaces/Interfaces';

import { SettingsFormService } from 'components/form/services/SettingsFormService';

import { PTTReleaseDelay } from 'constants/KeybowValues';
import { validateIPAddress, validatePort } from 'helpers/validations';

export const SettingsForm: FC = () => {
  const [initialValues, setInitialValues] = useState<SettingsFormValues | undefined>(undefined);

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      const data = await SettingsFormService.getSettingsInitialValues();

      if (data) {
        setInitialValues(data);
      }
    }

    fetchInitialData();
  }, []);

  const onValidate = (values) => {
    let errors:SettingsValidateValues = {};

    if (values.smartSDRip === '' || values.smartSDRport === '') {
      if (values.smartSDRip === '') {
        errors.smartSDRip = 'This field is required.';
      }

      if (values.smartSDRport === '') {
        errors.smartSDRport = 'This field is required.';
      }
    } else {
      if (validateIPAddress(values.smartSDRip) === false) {
        errors.smartSDRip = 'Please fill in a valid IP address.';
      }

      if (validatePort(values.smartSDRport) === false) {
        errors.smartSDRport = 'Please fill in a valid port number between 1024 and 65535.';
      }
    }

    return errors;
  };

  if (!initialValues) {
    return (
      <Loader />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={onValidate}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        const postData = async (values) => {
          const response = await SettingsFormService.postSettingsData(values);

          if (response && response === true) {
            setSubmitting(false);

            setStatus('');
            setStatus('New values were successfully stored.');
          }
        };

        postData(values);
      }}
    >
      {({ handleSubmit, isSubmitting, status }) => {
        return (
          <div className="form">
            <div className="form__grid">
              <Card title="SmartSDR IP address">
                <InputField
                  name="smartSDRip"
                  label="IP address"
                  placeholder="xxx.xxx.x.x"
                  maxLength={15}
                />
              </Card>
              <Card title="SmartSDR TCP port">
                <InputField
                  name="smartSDRport"
                  label="TCP port"
                  placeholder="xxxx"
                  maxLength={5}
                />
              </Card>
              <Card title="PTT release delay">
                <Slider
                  name="pttDelay"
                  label="Push-to-Talk release delay"
                  max={PTTReleaseDelay.actualValues.length - 1}
                  values={PTTReleaseDelay.values}
                  actualValues={PTTReleaseDelay.actualValues}
                />
              </Card>
              <ToggleCard
                title="Cloudlog API"
                name="cloudlogEnabled"
                label="Enable Cloudlog API"
              >
                <InputField
                  name="cloudlogAPIkey"
                  label="Cloudlog API key"
                  placeholder="xxxx"
                  maxLength={15}
                />
                <InputField
                  name="cloudlogURL"
                  label="Cloudlog API URL"
                  placeholder="https://xxxxxx"
                  maxLength={15}
                />
              </ToggleCard>
              <ToggleCard
                title="Remoteshack API"
                name="remoteShackEnabled"
                label="Remoteshack API"
              >
                <InputField
                  name="remoteShackAPIkey"
                  label="Remoteshack API key"
                  placeholder="xxxx"
                  maxLength={15}
                />
                <InputField
                  name="remoteShackURL"
                  label="Remoteshack API URL"
                  placeholder="https://xxxxxx"
                  maxLength={15}
                />
              </ToggleCard>
            </div>
            <button type="submit" className="btn" onClick={() => handleSubmit()} disabled={isSubmitting}>
              Submit
            </button>
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
