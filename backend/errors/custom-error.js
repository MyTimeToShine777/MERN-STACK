class CustomAPIError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const createCustomAPIError = (message, statuscode) => {
  return new CustomAPIError(message, statuscode);
};

export { CustomAPIError, createCustomAPIError };
