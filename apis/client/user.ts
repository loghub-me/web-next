import { clientAPI } from '@/apis/client/instance';

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.post('users/image/upload', { body: formData }).json<DataResponseBody<string>>();
};
