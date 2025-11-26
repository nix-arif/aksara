export type SessionPayload =
  | {
      userId: string;
      username: string;
      role: string;
      expiresAt: Date;
    }
  | undefined;
