'use client';

import { clientAPI } from '@/apis/client/instance';

const deleteSeries = (seriesId: number) => clientAPI.delete(`series/${seriesId}`).json<MessageResponseBody>();

export { deleteSeries };
