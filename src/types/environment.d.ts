/// <reference types="styled-jsx" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PGPASSWORD: string;
      PGPORT: number;
      PGUSER: string;
      PGHOST: string;
      PGDATABASE: string;
      ACCESS_TOKEN_SECRET: string;
      RESET_TOKEN: string;
      GOOGLE_CALLBACK_URL: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      FACEBOOK_CALLBACK_URL: string;
      GITHUB_CALLBACK_URL: string;
      GITHUB_CLIENT_SECRET: string;
      GITHUB_CLIENT_ID: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}

export {};
