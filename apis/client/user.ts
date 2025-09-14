import { clientAPI } from '@/apis/client/instance';

const getActivitySummaries = (userId: number) =>
  clientAPI.get(`users/${userId}/activities`).json<UserActivitySummary[]>();
const getActivities = (userId: number, date: string) =>
  clientAPI.get(`users/${userId}/activities/${date}`).json<UserActivity[]>();

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.post('users/image/upload', { body: formData }).json<DataResponseBody<string>>();
};

export { uploadImage, getActivitySummaries, getActivities };
