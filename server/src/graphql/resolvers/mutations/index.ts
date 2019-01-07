import { auth } from './auth';
import { createMsicApplication, submitMsicApplication } from './msicApplication';

export default {
  ...auth,
  createMsicApplication,
  submitMsicApplication
};
