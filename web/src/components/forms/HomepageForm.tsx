import React, { FC } from 'react';

import { SmartSDRFormService } from './services/SmartSDRFormService';

import { FormWrapper } from 'components/forms/FormWrapper';
import { HomepageValidateValues } from 'components/forms/interfaces/Interfaces';

import { Card } from 'components/card/Card';
import { Frequency } from 'components/frequency/Frequency';
import { Slider } from './fields/Slider';
import { InputField } from './fields/InputField';

import { PTTReleaseDelay, offset } from 'constants/KeybowValues';

import { validateIPAddress, validatePort } from 'helpers/validations';

export const HomepageForm: FC = () => {
  const getInitialValues = async () => {
    return await SmartSDRFormService.getSettings();
  };

  const onValidate = (values) => {
    let errors:HomepageValidateValues = {};

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
  };

  const onSubmit = async (values) => {
    return await SmartSDRFormService.postData(values);
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
          tooltip="Lorem ipsum"
        >
            <Frequency 
              hertz="200145785"
            />
        </Card>
        <Card title="SmartSDR IP address">
          <InputField
            id="smartSDRip"
            name="smartSDRip"
            label="IP address"
            placeholder="xxx.xxx.x.x"
            maxLength={15}
          />
        </Card>
        <Card title="SmartSDR TCP port">
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
        <Card title="Frequency shift">
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
    </FormWrapper>
  );
};
