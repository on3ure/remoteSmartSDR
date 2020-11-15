import React, { FC } from 'react';

import { SmartSDRFormService } from './services/SmartSDRFormService';

import { FormWrapper } from 'components/forms/FormWrapper';
import { SettingsValidateValues } from 'components/forms/interfaces/Interfaces';

import { Card } from 'components/card/Card';
import { Slider } from './fields/Slider';
import { InputField } from './fields/InputField';

import { PTTReleaseDelay } from 'constants/KeybowValues';

import { validateIPAddress, validatePort } from 'helpers/validations';

export const SettingsForm: FC = () => {
  const getInitialValues = async () => {
    return await SmartSDRFormService.getSettingsInitialValues();
  };

  const onValidate = (values) => {
    let errors:SettingsValidateValues = {};

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
    return await SmartSDRFormService.postSettingsData(values);
  };

  return (
    <FormWrapper
      initialValues={getInitialValues}
      validateData={onValidate}
      submitData={onSubmit}
    >
      <div className="form__grid">
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
      </div>
    </FormWrapper>
  );
};
