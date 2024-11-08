import {consumerApi, producerApi} from "@/axiosClient.js";

// consumer
export function getMappingRules({commit}, collectionName) {
    consumerApi.getMappingRules(collectionName)
        .then(({data}) => {
           debugger;
            commit('setMappingRules', data)
        })
}

export function getMappingRule({commit}, id) {
    consumerApi.getMappingRule(id)
        .then(({data}) => {
            commit('setMappingRule', data)
        })
}

export function getMappingRuleCollections({commit}) {
    consumerApi.getMappingRuleCollections()
        .then(({data}) => {
            commit('setMappingRuleCollections', data)
        })
}

// producer
export function sendJson({commit},data) {
    producerApi.sendJson(data.content,data.collection).then(({data}) => {
        debugger;
        commit('setOutputJson', data);
        })

       
}

export function clearOutputJson({commit}) {
    commit('clearOutputJson');
}