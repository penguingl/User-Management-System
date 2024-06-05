import { Kafka } from 'kafkajs';
import History from './models/history';

const kafka = new Kafka({
    clientId: 'history-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'history-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'user-actions', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const action = JSON.parse(message.value!.toString());
            await History.create(action);
        },
    });
};

run().catch(console.error);