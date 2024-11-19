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
    },
    createMappingRule(collectionName, data) {
        return consumer.post(`/mapping-rule/${collectionName}`, data);
    },
    updateMappingRule(collectionName,id, data) {
        return consumer.put(`/mapping-rule/update/${collectionName}/${id}`, data);
    },
    deleteMappingRule(collectionName,id) {
        return consumer.delete(`/mapping-rule/delete/${collectionName}/${id}`);
    }

}

    const producerApi = {
        sendJson: (data, collectionName) => {
            return producer.post(`/send-json/${collectionName}`, data);
    }

}
export  {consumerApi, producerApi};