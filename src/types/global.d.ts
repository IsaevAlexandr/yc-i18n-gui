declare namespace NodeJS {
  interface ProcessEnv {
    KEYSETS_ROOT_DOR: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
  }
}

declare namespace Express {
  export interface Request {
    logger: typeof console;
  }
}
