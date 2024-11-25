// src/stores/mappingStore.js
import { defineStore } from 'pinia'
import { consumerApi, producerApi } from "@/axiosClient.js"

export const useMappingStore = defineStore('mapping', {
    state: () => ({
        mappingRules: [],
        mappingRule: {},
        outputJson: {},
        mappingRuleCollections: [],
        user: {},
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

        setUser(user) {
            this.user = user
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

        async sendJson(data,collectionName) {
            try {
                const { data: responseData } = await producerApi.sendJson(data, collectionName)
                console.log(responseData)
                this.setOutputJson(responseData)
            } catch (error) {
                console.error('Error sending JSON:', error)
            }
        },

        async createMappingRule(collectionName, data) {
            try {
                await consumerApi.createMappingRule(collectionName, data)
            } catch (error) {
                console.error('Error creating mapping rule:', error)
            }
        },

        async updateMappingRule(collectionName, id, data) {
            try {
                await consumerApi.updateMappingRule(collectionName, id, data)
            } catch (error) {
                console.error('Error updating mapping rule:', error)
            }
        },
        async deleteMappingRule(collectionName, id) {
            try {
                await consumerApi.deleteMappingRule(collectionName, id)
            } catch (error) {
                console.error('Error deleting mapping rule:', error)
            }
        }
    }


})
