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

import { useHomepageWebSocket } from 'components/form/hooks/useWebSocket';

export const FormWrapper: FC<FormWrapperProps> = ({
  children,
  initialValues: fetchInitialValues,
  validateData,
  submitData,
  live
}) => {
  const [initialValues, setInitialValues] = useState<HomepageFormValues | SettingsFormValues | undefined>(undefined);

  const [homepageWsValues, submitHomepageWsValues] = useHomepageWebSocket();

  useEffect(() => {
    if (fetchInitialValues) {
      const fetchInitialData = async (): Promise<void> => {
        const data = await fetchInitialValues();

        if (data) {
          setInitialValues(data);
        }
      }

      fetchInitialData();
    }
  }, [fetchInitialValues]);

  const onBlur = (values) => {
    console.log('values on lbur', values);
  };

  if (!initialValues) {
    return (
      <Loader />
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validateData}
      handleBlur={onBlur}
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
          if (!live || homepageWsValues.length === 0) return;

          homepageWsValues.forEach((item) => {
            const { channel, message } = item;
            setFieldValue(channel, message);
          });

        }, [live, homepageWsValues]);

        return (
          <div className="form">
            {children}
            {!live &&
              <button type="submit" className="btn" onClick={() => handleSubmit()} disabled={isSubmitting}>
                Submit
              </button>
            }
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
  initialValues?(): Promise<HomepageFormValues | undefined>;
  validateData?(values: HomepageFormValues[]): HomepageValidateValues | SettingsValidateValues | undefined;
  submitData?(values: HomepageFormValues[]): Promise<boolean>;
  live?: boolean;
}
