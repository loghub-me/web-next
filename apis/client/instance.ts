import ky, { Options } from 'ky';

let clientAPI = ky.create({ prefixUrl: process.env.NEXT_PUBLIC_API_HOST, credentials: 'include' });

function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
}

export { clientAPI, extendClientAPIConfig };
