class AppSecretRequiredError extends Error {
  constructor() {
    const msg = 'APP_SECRET required';
    super(msg);
    Error.captureStackTrace(this, AppSecretRequiredError);
  }
}
