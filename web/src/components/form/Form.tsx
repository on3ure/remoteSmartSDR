import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

import { SmartSDRFormService } from './services/SmartSDRFormService';

import { Card } from 'components/card/Card';
import { Slider } from 'components/slider/Slider';
import { Loader } from 'components/loader/Loader';
import { InputField } from './fields/InputField';

import { PTTReleaseDelay, offset } from 'constants/KeybowValues';

import { validateIPAddress, validatePort } from 'helpers/validations';

export const Form = () => {
  const [initialValues, setInitialValues] = useState<FormValues | undefined>(undefined);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await SmartSDRFormService.getSettings();
      
      if (data) {
        setInitialValues(data);
      }
    }

    fetchInitialData();
  }, []);

  if (!initialValues) {
    return (
      <Loader />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        let errors:FormValidateValues = {};

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
      }}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        const postData = async (values) => {
          const response = await SmartSDRFormService.postData(values);

          if (response && response === true) {
            setSubmitting(false);
            setStatus('New values were successfully stored.');
            setTimeout(() => {
              setStatus('');
            }, 2500);   
          }
        };

        postData(values);
      }}
     >
       {({ handleSubmit, isSubmitting, status }) => (
        <div className="form">
          <div className="form__grid">
            <Card title="IP address">
              <InputField
                id="smartSDRip"
                name="smartSDRip"
                label="IP address"
                placeholder="xxx.xxx.x.x"
                maxLength={15}
              />
            </Card>
            <Card title="TCP port">
              <InputField
                id="smartSDRport"
                name="smartSDRport"
                label="TCP port"
                placeholder="xxxx"
                maxLength={5}
              />
            </Card>
            <Card title="PTT release delay">
              <Slider
                id="pttDelay"
                name="pttDelay"
                label="Push-to-Talk release delay"
                max={PTTReleaseDelay.actualValues.length - 1}
                values={PTTReleaseDelay.values}
                actualValues={PTTReleaseDelay.actualValues}
              />
            </Card>
            <Card title="Offset">
              <Slider
                id="offset"
                name="offset"
                label="Push-to-Talk offset"
                max={offset.actualValues.length - 1}
                values={offset.values}
                actualValues={offset.actualValues}
              />
            </Card>
          </div>
          <button type="submit" onClick={() => handleSubmit()} disabled={isSubmitting}>
            Submit
          </button>
          {status &&
            <div className="form__status">
              <p>{status}</p>
            </div>
          }
        </div>
       )}
    </Formik>
  );
};

interface FormValues {
  smartSDRip: string,
  smartSDRport: string,
  pttDelay: number|undefined,
  offset: number|undefined,
}

interface FormValidateValues {
  smartSDRip?: string,
  smartSDRport?: string,
}
