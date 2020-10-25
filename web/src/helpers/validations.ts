const validateIPAddress = (ip: string): boolean => {
 return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
};

const validatePort = (port: string): boolean => {
  const portToNumber: number = parseInt(port, 10);

  return !isNaN(portToNumber) && (portToNumber >= 1024 && portToNumber <= 65535);
};

export { validateIPAddress, validatePort };
