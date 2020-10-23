import React from 'react';
import { Formik } from 'formik';

import Card from 'components/card/Card';
import Slider from 'components/slider/Slider';

const Form = () => {
  return (
    <Formik
       initialValues={{ email: '', password: '' }}
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
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       {({
         values,
         errors,
         handleSubmit,
         isSubmitting,
       }) => (
        <div className="form">
          <div className="grid grid--gap">
            <div className="column-xs-12 column-sm-6">
              <Card>
                <div>
                  <label htmlFor="ip">IP address</label>
                  <input type="text" id="ip" name="ip" maxLength="15" />
                </div>
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <div>
                  <label htmlFor="port">TCP port</label>
                  <input type="text" id="port" name="port" maxLength="5" />
                </div>
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <Slider
                  label="PTT release delay"
                  description="Push-to-Talk release delay"
                  name="slider1"
                  min="0"
                  max="4"
                  steps={[100, 200, 300, 400 ,500]}
                />
              </Card>
            </div>
            <div className="column-xs-12 column-sm-6">
              <Card>
                <Slider
                  label="Offset"
                  description="Push-to-Talk offset"
                  name="slider2"
                  min="0"
                  max="12"
                  steps={[1, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500, 1000]}
                />
              </Card>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
       )}
    </Formik>
  );
};

export default Form;
