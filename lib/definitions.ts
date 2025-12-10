export type SessionPayload =
  | {
      userId: string;
      username: string;
      role: string;
      positionId: string | null;
      departmentId: string | null;
      expiresAt: Date;
    }
  | undefined;
