import {consumerApi, producerApi} from "@/axiosClient.js";

// consumer
export function getMappingRules({commit}) {
    consumerApi.getMappingRules()
        .then(({data}) => {
            debugger;
            commit('setMappingRules', data)
        })
}

export function getMappingRule({commit}, id) {
    consumerApi.getMappingRule(id)
        .then(({data}) => {
            debugger;
            commit('setMappingRule', data)
        })
}

// producer
export function sendJson({commit},data) {
    producerApi.sendJson(data)
        .then(({data}) => {
            debugger;
        })
}