import React, { FC, useEffect } from 'react';

import { Card } from 'components/card/Card';

import { FormWrapper } from 'components/form/FormWrapper';
import { HomepageValidateValues } from 'components/form/interfaces/Interfaces';
import { Frequency } from 'components/form/fields/frequency/Frequency';
import { Slider } from 'components/form/fields/slider/Slider';

import { SmartSDRFormService } from 'components/form/services/SmartSDRFormService';
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
      live
    >
      <div className="form__grid">
        <Card
          title="SmartSDR frequency"
          tooltip="Use A to add, D to subtract."
        >
          <Frequency name="frequency" />
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
