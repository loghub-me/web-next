import { clientAPI } from '@/apis/client/instance';
import { settingPrivacyUpdateSchema, settingProfileUpdateSchema, settingUsernameUpdateSchema } from '@/schemas/setting';
import z from 'zod';

const getActivitySummaries = (userId: number) =>
  clientAPI.get(`users/${userId}/activities`).json<UserActivitySummary[]>();
const getActivities = (userId: number, date: string) =>
  clientAPI.get(`users/${userId}/activities/${date}`).json<UserActivity[]>();

const getSelfProfile = async () => clientAPI.get('users/self/profile').json<UserProfile>();
const getSelfPrivacy = async () => clientAPI.get('users/self/privacy').json<UserPrivacy>();

const updateSelfUsername = (json: z.infer<typeof settingUsernameUpdateSchema>) =>
  clientAPI.put(`users/self/username`, { json }).json<MessageResponseBody>();
const updateSelfProfile = (json: z.infer<typeof settingProfileUpdateSchema>) =>
  clientAPI.put('users/self/profile', { json }).json<MessageResponseBody>();
const updateSelfPrivacy = (json: z.infer<typeof settingPrivacyUpdateSchema>) =>
  clientAPI.put('users/self/privacy', { json }).json<MessageResponseBody>();
const updateSelfAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.put('users/self/avatar', { body: formData }).json<DataResponseBody<string>>();
};

const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return clientAPI.post('users/image/upload', { body: formData }).json<DataResponseBody<string>>();
};

export { getSelfProfile, getSelfPrivacy, updateSelfUsername, updateSelfProfile, updateSelfPrivacy, updateSelfAvatar };
export { getActivitySummaries, getActivities };
export { uploadImage };
