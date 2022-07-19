declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      GOOGLE_CALLBACK_URL: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}

export {};
