import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  apiKey: get('apiKey').required().asString(),
  authDomain: get('authDomain').required().asString(),
  projectId: get('projectId').required().asString(),
  storageBucket: get('storageBucket').required().asString(),
  messagingSenderId: get('messagingSenderId').required().asString(),
  appId: get('appId').required().asString(),
};
