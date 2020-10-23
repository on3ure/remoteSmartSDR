import React from 'react';
import { Formik } from 'formik';

import Card from 'components/card/Card';
import Slider from 'components/slider/Slider';

import SmartSDRFormService from './services/SmartSDRFormService';
import InputField from './fields/InputField';

const Form = () => {
  return (
    <Formik
      initialValues={{
        ip: '',
        port: '',
        delay: 500,
        offset: 250,
      }}
      validate={values => {
        const errors = {};

        /* if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }*/

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('posting values:', values);
        SmartSDRFormService.postData(values);
        setSubmitting(false);
      }}
     >
       {({
         values,
         errors,
         handleSubmit,
         isSubmitting,
       }) => (
        <div className="form">
          <div className="form__grid">
            <Card title="IP address">
              <InputField
                id="ip"
                name="ip"
                label="IP address"
                placeholder="xxx.xxx.x.x"
                maxLength="15"
              />
            </Card>
            <Card title="TCP port">
              <InputField
                id="port"
                name="port"
                label="TCP port"
                placeholder="xxxx"
                maxLength="5"
              />
            </Card>
            <Card title="PTT release delay">
              <Slider
                id="delay"
                name="delay"
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
