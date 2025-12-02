export type UploadInfo = {
  title: string;
  expiration: { amount: number; unit: 'minutes' | 'hours' | 'days' };
};

export type Track = {
  id: string;
  title: string;
  createdAt: number;
  expiresAt: number;
  url: string;
};
