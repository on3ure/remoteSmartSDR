class SmartSDRFormService {
  static getSettings = async (data) => {

    const response = await fetch('/api/get/', {
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

  static postData = async (data) => {
    const response = await fetch('/api/post/', {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      return response.json();
    }

    return false;
  };
}

export default SmartSDRFormService;
