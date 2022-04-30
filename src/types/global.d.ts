declare namespace NodeJS {
  interface ProcessEnv {
    KEYSETS_DIR_PATH: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
  }
}

declare namespace Express {
  export interface Request {
    logger: typeof console;
  }
}
