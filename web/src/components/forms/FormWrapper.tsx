import React, { FC, useState, useEffect } from 'react';
import { Formik } from 'formik';

import { Loader } from 'components/loader/Loader';
import { Toast } from 'components/toast/Toast';

import { HomepageFormValues, HomepageValidateValues } from 'components/forms/interfaces/Interfaces';

export const FormWrapper: FC<FormWrapperProps> = ({
  children,
  initialValues: fetchInitialValues,
  validateData,
  submitData,
}) => {
  const [initialValues, setInitialValues] = useState<HomepageFormValues | undefined>(undefined);

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
       {({ handleSubmit, isSubmitting, status }) => (
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
       )}
    </Formik>
  );
};

interface FormWrapperProps {
  initialValues(): Promise<HomepageFormValues | undefined>;
  validateData(values: HomepageFormValues[]): HomepageValidateValues | undefined;
  submitData(values: HomepageFormValues[]): Promise<boolean>;
}
