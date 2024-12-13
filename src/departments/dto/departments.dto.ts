import { z } from 'zod';

export const createDepartmentSchema = z
  .object({
    name: z.string(),
  })
  .required();

export type createDepartmentDto = z.infer<typeof createDepartmentSchema>;
export type updateDataDto = z.infer<typeof createDepartmentSchema>;

