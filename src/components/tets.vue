<template>
  <div>
    <p>Output JSON: {{ outputJson }}</p>
    <button @click="fetchMappingRules">Fetch Mapping Rules</button>
  </div>
</template>

<script setup>
import { useMappingStore } from '../store/mappingStore.js'
import { onMounted } from 'vue'

const store = useMappingStore()

function fetchMappingRules() {
  store.getMappingRules('mapping_rules')
}

const { outputJson } = store

onMounted(() => {
  store.getMappingRuleCollections()
})
</script>
