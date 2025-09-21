import z from 'zod';

const safeLinkSchema = z.object({
  url: z.url({
    protocol: /^https$/,
    hostname: z.regexes.domain,
  }),
});

export { safeLinkSchema };
