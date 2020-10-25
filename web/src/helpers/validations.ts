const validateIPAddress = (ip: string): boolean => {
 return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
};

const validatePort = (port: string): boolean => {
  return /^\d{1,5}([ ]\d{1,5})*$/.test(port);
};

export { validateIPAddress, validatePort };
