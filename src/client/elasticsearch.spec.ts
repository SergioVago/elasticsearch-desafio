import { Client } from '@elastic/elasticsearch'
import { describe, expect, it } from 'vitest'
import { getClient } from './elasticsearch'

describe('Elasticsearch Client', () => {
  it('should be able to get elasticsearch node url', () => {
    const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE

    expect(ELASTICSEARCH_NODE).toBe('http://localhost:9200')
  })

  it('should be able to get elasticsearch client', () => {
    const client = getClient()

    expect(client).toBeInstanceOf(Client)
  })
})
