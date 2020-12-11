import { SettingsFormValues } from 'components/form/interfaces/Interfaces';

export class SettingsFormService {
  static getSettingsInitialValues = async (): Promise<SettingsFormValues> => {
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

    return null;
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
