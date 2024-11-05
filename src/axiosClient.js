import axios from 'axios';

const consumer = axios.create({
    baseURL: 'http://localhost:8081',
});

const producer = axios.create({
    baseURL: 'http://localhost:8082',
});

const consumerApi = {
    getMappingRules: () => {
        return consumer.get('/mapping-rule');
    },
    getMappingRule: (id) => {
        return consumer.get(`/mapping-rule/${id}`);
    },

}

    const producerApi = {
        sendJson: (data) => {
            return producer.post('/send-json', data);
    }

}
export  {consumerApi, producerApi};