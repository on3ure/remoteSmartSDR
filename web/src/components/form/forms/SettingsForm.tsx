import React, { FC } from 'react';

import { FormWrapper } from 'components/form/FormWrapper';
import { Card } from 'components/card/Card';
import { ToggleCard } from 'components/card/ToggleCard';

import { Slider } from 'components/form/fields/slider/Slider';
import { InputField } from 'components/form/fields/input/InputField';

import { SettingsValidateValues } from 'components/form/interfaces/Interfaces';

import { SettingsFormService } from 'components/form/services/SettingsFormService';

import { PTTReleaseDelay } from 'constants/KeybowValues';
import { validateIPAddress, validatePort } from 'helpers/validations';

export const SettingsForm: FC = () => {
  const getInitialValues = async () => {
    return await SettingsFormService.getSettingsInitialValues();
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
    return await SettingsFormService.postSettingsData(values);
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
        <ToggleCard
          title="Cloudlog API"
          id="cloudlogEnabled"
          name="cloudlogEnabled"
          label="Enable Cloudlog API"
        >
          <InputField
            id="cloudlogAPIkey"
            name="cloudlogAPIkey"
            label="Cloudlog API key"
            placeholder="xxxx"
            maxLength={15}
          />
          <InputField
            id="cloudlogURL"
            name="cloudlogURL"
            label="Cloudlog API URL"
            placeholder="https://xxxxxx"
            maxLength={15}
          />
        </ToggleCard>
        <ToggleCard
          title="Remoteshack API"
          id="remoteShackEnabled"
          name="remoteShackEnabled"
          label="Remoteshack API"
        >
          <InputField
            id="remoteShackAPIkey"
            name="remoteShackAPIkey"
            label="Remoteshack API key"
            placeholder="xxxx"
            maxLength={15}
          />
          <InputField
            id="remoteShackURL"
            name="remoteShackURL"
            label="Remoteshack API URL"
            placeholder="https://xxxxxx"
            maxLength={15}
          />
        </ToggleCard>
      </div>
    </FormWrapper>
  );
};
