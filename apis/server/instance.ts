import ky from 'ky';
import 'server-only';

const serverAPI = ky.create({ prefixUrl: process.env.NEXT_PUBLIC_API_HOST });

export { serverAPI };
