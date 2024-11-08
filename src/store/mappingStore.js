// src/stores/mappingStore.js
import { defineStore } from 'pinia'
import { consumerApi, producerApi } from "@/axiosClient.js"

export const useMappingStore = defineStore('mapping', {
    state: () => ({
        mappingRules: [],
        mappingRule: {},
        outputJson: {},
        mappingRuleCollections: []
    }),

    actions: {
        //mutations
        setMappingRules(mappingRules) {
            this.mappingRules = mappingRules
        },

        setMappingRule(mappingRule) {
            this.mappingRule = mappingRule
        },

        setOutputJson(outputJson) {
            this.outputJson = outputJson
        },

        setMappingRuleCollections(mappingRuleCollections) {
            this.mappingRuleCollections = mappingRuleCollections
        },

        clearOutputJson() {
            this.outputJson = {}
        },

        // Actions for API calls
        async getMappingRules(collectionName) {
            try {
                const { data } = await consumerApi.getMappingRules(collectionName)
                this.setMappingRules(data)
            } catch (error) {
                console.error('Error fetching mapping rules:', error)
            }
        },

        async getMappingRule(id) {
            try {
                const { data } = await consumerApi.getMappingRule(id)
                this.setMappingRule(data)
            } catch (error) {
                console.error('Error fetching mapping rule:', error)
            }
        },

        async getMappingRuleCollections() {
            try {
                const { data } = await consumerApi.getMappingRuleCollections()
                this.setMappingRuleCollections(data)
            } catch (error) {
                console.error('Error fetching mapping rule collections:', error)
            }
        },

        async sendJson(data) {
            try {
                const { data: responseData } = await producerApi.sendJson(data.content, data.collection)
                this.setOutputJson(responseData)
            } catch (error) {
                console.error('Error sending JSON:', error)
            }
        }
    }
})
