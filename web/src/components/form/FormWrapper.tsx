import React, { FC, useState, useEffect } from 'react';
import { Formik } from 'formik';

import { Loader } from 'components/loader/Loader';
import { Toast } from 'components/toast/Toast';

import {
  HomepageFormValues,
  HomepageValidateValues,
  SettingsFormValues,
  SettingsValidateValues,
} from 'components/form/interfaces/Interfaces';

export const FormWrapper: FC<FormWrapperProps> = ({
  children,
  initialValues: fetchInitialValues,
  validateData,
  submitData,
  live
}) => {
  const [initialValues, setInitialValues] = useState<HomepageFormValues | SettingsFormValues | undefined>(undefined);

  useEffect(() => {
    const fetchInitialData = async (): Promise<void> => {
      const data = await fetchInitialValues();
      
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
      validate={validateData}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        const postData = async (values) => {
          const response = await submitData(values);

          if (response && response === true) {
            setSubmitting(false);

            setStatus('');
            setStatus('New values were successfully stored.');
          }
        };

        postData(values);
      }}
    >
      {({ setFieldValue, handleSubmit, isSubmitting, status }) => {
        useEffect(() => {
          if (!live) return;

          const ws = new WebSocket('ws://' + location.host + ':8080');
          ws.onmessage = evt => {
            const data = JSON.parse(evt.data);
            data.foreach((item) => {
              const { channel, message } = item; 
                // Channel is the field name and message is the value ex. SmartSDRfrequency: 0
                // @ridders The values need to be changed in the form.
                setFieldValue(channel, message);
            });
          }

          ws.onclose = () => {
            console.log('disconnected')
          }

          // // @ridders, this code needs to be executed on change.
          // ws.send(JSON.stringify({channel: 'SmartSDRptt', message: 200}));
        }, [live]);

        return (
          <div className="form">
            {children}
            <button type="submit" className="btn" onClick={() => handleSubmit()} disabled={isSubmitting}>
              Submit
            </button>
            {status &&
              <Toast
                message={status}
              />
            }
          </div>
        )
        }}
    </Formik>
  );
};

interface FormWrapperProps {
  initialValues(): Promise<HomepageFormValues | undefined>;
  validateData(values: HomepageFormValues[]): HomepageValidateValues | SettingsValidateValues | undefined;
  submitData(values: HomepageFormValues[]): Promise<boolean>;
  live?: boolean;
}
