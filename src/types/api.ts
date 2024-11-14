export interface ReplicateError {
  error: string;
  detail?: string;
}

declare module 'axios' {
  export interface AxiosResponse {
    data: any | ReplicateError;
  }
}