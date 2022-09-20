import { Client } from '@elastic/elasticsearch'

export function getClient() {
  const client = new Client({
    node: process.env.ELASTICSEARCH_NODE,
  })

  return client
}
