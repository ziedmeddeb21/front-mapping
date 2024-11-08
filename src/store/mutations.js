export  function setMappingRules(state, mappingRules) {
    state.mappingRules = mappingRules;
}

export function setMappingRule(state, mappingRule) {
    state.mappingRule = mappingRule;
}

export function setOutputJson(state, outputJson) {
    state.outputJson = outputJson;
}

export function setMappingRuleCollections(state, mappingRuleCollections) {
    state.mappingRuleCollections = mappingRuleCollections;
}

export function setClearOutputJson(state) {
    state.outputJson = {};
}

