import { z } from 'zod'

export const zodDateSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg)
}, z.date())
