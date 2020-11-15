import React, { FC } from 'react';

import { HomepageForm } from 'components/form/forms/HomepageForm';

export const Home:FC = () => (
  <div className="home">
    <h1>
      remoteSmartSDR
    </h1>

    <HomepageForm />
  </div>
);
