import fs from 'fs'
import { Kafka, Producer, ProducerBatch } from 'kafkajs'

interface CustomMessageFormat { a: string }

export default class ProducerFactory {
  private producer: Producer

  constructor() {
    this.producer = this.createProducer()
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: any = messages.map((message) => {
      return {
        value: JSON.stringify(message)
      }
    })

    const topicMessages: any = {
      topic: 'producer-topic',
      messages: kafkaMessages
    }

    const batch: ProducerBatch = {
      topicMessages: [topicMessages]
    }

    await this.producer.sendBatch(batch)
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: 'producer-client',
      brokers: ['localhost:9092'],
      ssl: {
        rejectUnauthorized: true,
        ca: [fs.readFileSync('../certs/truststore/root_ca.pem', 'utf-8')],
        key: process.env.KAFKA_CONFIG_PRIVATEKEY,
        cert: fs.readFileSync('../certs/keystore/triton-event-api.lmig.com.pem', 'utf-8')
      }
    })

    return kafka.producer()
  }
}
