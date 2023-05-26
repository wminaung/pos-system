namespace Config {
  export interface Backend {
    jwtSecret: string;
    spaceAccessKeyId: string;
    spaceSecretAccessKey: string;
    spaceEndpoint: string;
  }
  export interface Frontend {
    apiBaseUrl: string;
    googleClientId: string;
    googleClientSecret: string;
    nextAuthSecret: string;
    nextAuthUrl: string;
  }
}

export const config: Config.Frontend & Config.Backend = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
  nextAuthUrl: process.env.NEXTAUTH_URL || "",
};
