export class SmartSDRFormService {
  static getSettings = async (): Promise<any> => {
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

  static postData = async (data): Promise<boolean> => {
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