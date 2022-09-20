import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { zodDateSchema } from './zod-date-schema'

const Schema = z.object({
  date: zodDateSchema,
})

describe('test zod date schema validation', () => {
  it('should validate a valid ISOString date', () => {
    const ISOStringDate = '2022-10-08T03:00:00.000Z'

    const validSchema = Schema.safeParse({
      date: ISOStringDate,
    })

    expect(validSchema.success).toBe(true)
  })

  it('should validate a valid Date object', () => {
    const date = new Date('2022-10-08T03:00:00.000Z')

    const validSchema = Schema.safeParse({
      date,
    })

    expect(validSchema.success).toBe(true)
  })

  it('should not validate a invalid ISOString date', () => {
    const ISOStringDate = '2022-15-08T03:00:00.000Z'

    const invalidSchema = Schema.safeParse({
      date: ISOStringDate,
    })

    expect(invalidSchema.success).toBe(false)
  })
})
