export class SmartSDRFormService {
  static getHomepageInitialValues = async (): Promise<any> => {
    // @TODO opdorp, provide /api/ call for initial homepage settings (frequencyShift + frequency)

    // Hard coded return
    return {
      frequency: 100500200,
      frequencyShift: 250,
    };
  };

  static getSettingsInitialValues = async (): Promise<any> => {
    const response = await fetch('/api/hello', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      return response.json();
    }

    return false;
  };

  static postHomepageData = async (data): Promise<boolean> => {
    // @TODO opdorp provide /api/ post call

    console.log('posting data', JSON.stringify(data));

    return true;
  };

  static postSettingsData = async (data): Promise<boolean> => {
    const response = await fetch('/api/hello', {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      return true;
    }

    return false;
  };
}