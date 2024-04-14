export type User = {
  ID: number;
  firstName?: string;
  lastName?: string;
  email: string;
  savedProperties?: number[];
  allowsNotifications: boolean;
  pushToken?: string;
};
