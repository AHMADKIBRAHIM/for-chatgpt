import { z } from "zod"; export const createSchema=z.object({body:z.object({}).passthrough()}); export const updateSchema=z.object({body:z.object({}).passthrough()});
