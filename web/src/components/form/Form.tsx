import React from 'react';
import { Formik } from 'formik';

import Card from 'components/card/Card';
import Slider from 'components/slider/Slider';

import SmartSDRFormService from './services/SmartSDRFormService';
import InputField from './fields/InputField';

interface FormValues {
  smartSDRip: string,
  smartSDRport: string,
  pttDelay: number,
  offset: number,
}

const Form = () => {
  const initialValues: FormValues = {
    smartSDRip: '',
    smartSDRport: '',
    pttDelay: 500,
    offset: 250,
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {};

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const postData = async (values) => {
          const response = await SmartSDRFormService.postData(values);

          if (response) {
            setSubmitting(false);
          }
        };

        postData(values);
      }}
     >
       {({
         errors,
         handleSubmit,
         isSubmitting,
       }) => (
        <div className="form">
          <div className="form__grid">
            <Card title="IP address">
              <InputField
                id="smartSDRip"
                name="smartSDRip"
                label="IP address"
                placeholder="xxx.xxx.x.x"
                maxLength="15"
              />
            </Card>
            <Card title="TCP port">
              <InputField
                id="smartSDRport"
                name="smartSDRport"
                label="TCP port"
                placeholder="xxxx"
                maxLength="5"
              />
            </Card>
            <Card title="PTT release delay">
              <Slider
                id="pttDelay"
                name="pttDelay"
                label="Push-to-Talk release delay"
                min="0"
                max="4"
                steps={[100, 200, 300, 400 ,500]}
              />
            </Card>
            <Card title="Offset">
              <Slider
                id="offset"
                name="offset"
                label="Push-to-Talk offset"
                min="0"
                max="12"
                steps={[1, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500, 1000]}
              />
            </Card>
          </div>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </button>
        </div>
       )}
    </Formik>
  );
};

export default Form;
