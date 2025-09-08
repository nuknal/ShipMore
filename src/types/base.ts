export type BaseModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type BaseResponse = {
  code: number;
  error?: string;
  msg?: string;
  data: any;
};
