import React, { FC } from 'react';

import { SmartSDRFormService } from './services/SmartSDRFormService';

import { FormWrapper } from 'components/forms/FormWrapper';
import { HomepageValidateValues } from 'components/forms/interfaces/Interfaces';
import { Frequency } from 'components/forms/fields/frequency/Frequency';
import { Slider } from 'components/forms/fields/slider/Slider';

import { Card } from 'components/card/Card';

import { frequencyShift } from 'constants/KeybowValues';

export const HomepageForm: FC = () => {
  const getInitialValues = async () => {
    return await SmartSDRFormService.getHomepageInitialValues();
  };

  const onValidate = (values) => {
    let errors:HomepageValidateValues = {};

    console.log('values', values);

    return errors;
  };

  const onSubmit = async (values) => {
    return await SmartSDRFormService.postHomepageData(values);
  };

  return (
    <FormWrapper
      initialValues={getInitialValues}
      validateData={onValidate}
      submitData={onSubmit}
    >
      <div className="form__grid">
        <Card
          title="SmartSDR frequency"
          tooltip="Use A to add, D to subtract."
        >
            <Frequency />
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
      </div>
    </FormWrapper>
  );
};
