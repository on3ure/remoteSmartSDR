import React, { FC } from 'react';

import { Card } from 'components/card/Card';

import { FormWrapper } from 'components/form/FormWrapper';
import { HomepageFormValues, HomepageValidateValues } from 'components/form/interfaces/Interfaces';
import { Frequency } from 'components/form/fields/frequency/Frequency';
import { Slider } from 'components/form/fields/slider/Slider';

import { frequencyShift } from 'constants/KeybowValues';

export const HomepageForm: FC = () => (
  <FormWrapper live>
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
