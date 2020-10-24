import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

import Card from 'components/card/Card';
import Slider from 'components/slider/Slider';

import SmartSDRFormService from './services/SmartSDRFormService';
import InputField from './fields/InputField';

const Form = () => {

  const [initialValues, setInitialValues] = useState<FormValues | undefined>(undefined);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await SmartSDRFormService.getSettings()
      if (data) {
        setInitialValues(data);
      }
    }

    fetchInitialData();
  }, []);

  if (!initialValues) {
    return false;
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        let errors:FormValidateValues = {};

        if (values.smartSDRip === '') {
          errors.smartSDRip = 'This field is required';
        } else if (values.smartSDRport === '') {
          errors.smartSDRport = 'This field is required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const postData = async (values) => {
          const response = await SmartSDRFormService.postData(values);

          if (response && response === true) {
            setSubmitting(false);
          }
        };

        postData(values);
      }}
     >
       {({ handleSubmit, isSubmitting }) => (
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
                min={0}
                max={4}
                steps={[100, 200, 300, 400 ,500]}
              />
            </Card>
            <Card title="Offset">
              <Slider
                id="offset"
                name="offset"
                label="Push-to-Talk offset"
                min={0}
                max={12}
                steps={[1, 5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500, 1000]}
              />
            </Card>
          </div>
          <button type="submit" onClick={() => handleSubmit()} disabled={isSubmitting}>
            Submit
          </button>
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

export default Form;
