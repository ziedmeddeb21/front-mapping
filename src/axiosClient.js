import axios from 'axios';

const consumer = axios.create({
    baseURL: 'http://localhost:8081',
});

const producer = axios.create({
    baseURL: 'http://localhost:8082',
});

const consumerApi = {
    getMappingRules: (collectionName) => {
        return consumer.get(`/mapping-rule/${collectionName}`);
    },
    getMappingRule: (id) => {
        return consumer.get(`/mapping-rule/byId/${id}`);
    },
    getMappingRuleCollections: () => {
        return consumer.get(`/mapping-rule/collection-names`);
    }

}

    const producerApi = {
        sendJson: (data, collectionName) => {
            return producer.post(`/send-json/${collectionName}`, data);
    }

}
export  {consumerApi, producerApi};