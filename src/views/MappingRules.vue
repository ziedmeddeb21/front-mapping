<script lang="ts" setup>
import {useMappingStore} from '@/store/mappingStore.js'
import {computed, onMounted, ref, watch} from 'vue'
import {useToast} from 'vue-toastification'
import { useQuasar } from 'quasar'
const toast = useToast()
const store = useMappingStore()
const selectedOption = ref('new-collection')
const selectedUpdateOption = ref("new-collection")
const selectedRule = ref(null)
const rules = ref([])
const $q= useQuasar()
function getMappingRuleCollections() {
  store.getMappingRuleCollections()
}
getMappingRuleCollections()
const mappingRulesCollection = computed(() => store.$state.mappingRuleCollections)

const formData = ref({
  source_field: "",
  target_field: "",
  isArray: null,
  belongsToArray: null,
  isKeyVal: null,
  script: null,
  defaultValue: null
})

const updateFormData = ref({
  source_field: "",
  target_field: "",
  isArray: null,
  belongsToArray: null,
  isKeyVal: null,
  script: null,
  defaultValue: null
})


const targetFieldRef = ref(null)
const scriptRef = ref(null)
const defaultValueRef = ref(null)

const onSubmit = () => {

  targetFieldRef.value.validate()

  if ( targetFieldRef.value.hasError) {
    // form has error
  }
  else if(formData.value.isArray === null || formData.value.belongsToArray === null || formData.value.isKeyVal === null){
    showNotifError('Please select all the radio buttons')
  }
  else {
    if (formData.value.script === "") {
      console.log("script is empty")
      formData.value.script = null
    }
    if (formData.value.defaultValue === "") {
      formData.value.defaultValue = null
    }
    store.createMappingRule(selectedOption.value, formData.value)
    showNotifSuccess('Mapping Rule Created Successfully!')
  }
}

const onReset = () => {

  targetFieldRef.value.resetValidation();
  scriptRef.value.resetValidation();
  defaultValueRef.value.resetValidation();
  formData.value = {
    source_field: "",
    target_field: "",
    isArray: null,
    belongsToArray: null,
    isKeyVal: null,
    script: null,
    defaultValue: null
  };
};

const onResetUpdate = () => {


  targetFieldRef.value.resetValidation()
  scriptRef.value.resetValidation()
  defaultValueRef.value.resetValidation()
  const { source_field, target_field, isArray, belongsToArray, isKeyVal, script, defaultValue } = selectedRule.value;
  updateFormData.value = { source_field, target_field, isArray, belongsToArray, isKeyVal, script, defaultValue };
}



const targetFieldRules = [
  val => (val && val.length > 0) || 'Target field is required'
]

function showNotifSuccess(message) {
  toast.success(message, {
    position: 'top-center',
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
}

function showNotifError(message) {
  toast.error(message, {
    position: 'top-center',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  })
}

async function fetchRules() {
  if (selectedUpdateOption.value) {
    try {
      console.log("Fetching rules for:", selectedUpdateOption.value)
      await store.getMappingRules(selectedUpdateOption.value);
      rules.value = store.$state.mappingRules || []
      console.log("Updated rules:", rules.value)
    } catch (error) {
      showNotifError('Error fetching rules: ' + error.message)
    }
  }
}

function selectRule(rule) {
  console.log("Selected Rule:", rule)

   selectedRule.value = rule
  const { source_field, target_field, isArray, belongsToArray, isKeyVal, script, defaultValue } = rule;
  updateFormData.value = { source_field, target_field, isArray, belongsToArray, isKeyVal, script, defaultValue };

}

async function onUpdate() {
  if (selectedRule.value) {

    targetFieldRef.value.validate()

    if ( targetFieldRef.value.hasError) {
      // form has error
    }
    else if(updateFormData.value.isArray === null || updateFormData.value.belongsToArray === null || updateFormData.value.isKeyVal === null){
      showNotifError('Please select all the radio buttons')
    }
    else {
      if (updateFormData.value.script === "") {
        console.log("script is empty")
        updateFormData.value.script = null
      }
      if (updateFormData.value.defaultValue === "") {
        updateFormData.value.defaultValue = null
      }


      await store.updateMappingRule(selectedUpdateOption.value, selectedRule.value._id, updateFormData.value)
      const ruleIndex = rules.value.findIndex(rule => rule._id === selectedRule.value._id);
      if (ruleIndex !== -1) {
        rules.value[ruleIndex] = { ...rules.value[ruleIndex], ...updateFormData.value };
      }
      showNotifSuccess('Mapping Rule Updated Successfully!')
    }
  }
}

onMounted(() => {
  fetchRules()
})


function deleteRule(id) {

    store.deleteMappingRule(selectedUpdateOption.value, id)
    rules.value = rules.value.filter(rule => rule._id !== id)
    showNotifSuccess('Mapping Rule Deleted Successfully!')

}

function confirmDelete (ruleId) {
  $q.dialog({
    title: 'Delete Rule',
    message: 'Would you like to delete this rule?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteRule(ruleId)
    // console.log('>>>> OK')
  }).onOk(() => {

  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function confirmUpdate () {
  $q.dialog({
    title: 'Update Rule',
    message: 'Would you like to update this rule?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    onUpdate()
    // console.log('>>>> OK')
  }).onOk(() => {

  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function prompt () {
  $q.dialog({
    title: 'New Collection',
    message: 'What is the name of the collection?',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    if(data){
      store.setMappingRuleCollections([...store.$state.mappingRuleCollections, data]);
      selectedOption.value = data;
      showNotifSuccess(`Collection "${data}" added successfully!`);
    }
    // console.log('>>>> OK, received', data)
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}


</script>

<template>
  <h5 class="page-title">Mapping Rules Management</h5>
  <br>

  <div class="container">
    <q-page class="q-pa-md">
      <div class="form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h6">Create Mapping Rule</div>
          </q-card-section>
          <q-card-section>
            <q-select v-model="selectedOption" :options="mappingRulesCollection" label="Type" class="q-mb-md">
              <template v-slot:append>
                <q-btn round dense flat icon="add" @click.stop.prevent="prompt" />
              </template>
            </q-select>
            <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input  v-model="formData.source_field" label="Source Field"  filled />
              <q-input ref="targetFieldRef" v-model="formData.target_field" label="Target Field" :rules="targetFieldRules" filled />
              <div class="q-mb-md">
                <label>isArray</label>
                <q-radio v-model="formData.isArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" />
                <q-radio v-model="formData.isArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" />
              </div>
              <div class="q-mb-md">
                <label>belongsToArray</label>
                <q-radio v-model="formData.belongsToArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" />
                <q-radio v-model="formData.belongsToArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" />
              </div>
              <div class="q-mb-md">
                <label>isKeyVal</label>
                <q-radio v-model="formData.isKeyVal" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" />
                <q-radio v-model="formData.isKeyVal" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" />
              </div>
              <q-input ref="scriptRef" v-model="formData.script" label="Script" filled type="textarea" />
              <q-input ref="defaultValueRef" v-model="formData.defaultValue" label="Default Value" filled />
              <div class="q-mt-md">
                <q-btn color="secondary" label="Create" type="submit" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <div class="separator"></div>

        <div class="update-and-list">
          <q-card class="form-card">
            <q-card-section>
              <div class="text-h6">Update Mapping Rule</div>
            </q-card-section>
            <q-card-section>
              <q-select v-model="selectedUpdateOption" :options="mappingRulesCollection" label="Type" class="q-mb-md" @update:model-value="fetchRules" />
              <q-form @submit.prevent="confirmUpdate" @reset="onResetUpdate" class="q-gutter-md">
                <q-input  v-model="updateFormData.source_field" label="Source Field"  filled :disable="selectedRule === null" />
                <q-input ref="targetFieldRef" v-model="updateFormData.target_field" label="Target Field" :rules="targetFieldRules" filled :disable="selectedRule === null" />
                <div class="q-mb-md">
                  <label>isArray</label>
                  <q-radio v-model="updateFormData.isArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" :disable="selectedRule === null" />
                  <q-radio v-model="updateFormData.isArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" :disable="selectedRule === null" />
                </div>
                <div class="q-mb-md">
                  <label>belongsToArray</label>
                  <q-radio v-model="updateFormData.belongsToArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" :disable="selectedRule === null" />
                  <q-radio v-model="updateFormData.belongsToArray" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" :disable="selectedRule === null" />
                </div>
                <div class="q-mb-md">
                  <label>isKeyVal</label>
                  <q-radio v-model="updateFormData.isKeyVal" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Yes" :disable="selectedRule === null" />
                  <q-radio v-model="updateFormData.isKeyVal" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="No" :disable="selectedRule === null" />
                </div>
                <q-input ref="scriptRef" v-model="updateFormData.script" label="Script" filled :disable="selectedRule === null" type="textarea" />
                <q-input ref="defaultValueRef" v-model="updateFormData.defaultValue" label="Default Value" filled :disable="selectedRule === null" />
                <div class="q-mt-md">
                  <q-btn color="secondary" label="Update" type="submit" :disable="selectedRule === null" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" :disable="selectedRule === null" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>

          <q-card class="rules-card">
            <q-card-section>
              <div class="text-h6">Mapping Rules : {{selectedUpdateOption}}  <q-icon name="sync" color="secondary" class="icons-hover" @click="fetchRules">
                <q-tooltip
                    transition-show="rotate"
                    transition-hide="rotate"
                >
                  Refresh
                </q-tooltip>
              </q-icon> </div>
            </q-card-section>
            <q-card-section>
              <q-scroll-area style="height: 70vh;">
              <div class="rules-list">

                <q-list padding separator>
                  <q-item clickable v-ripple v-for="rule in rules" :key="rule.id"   @click="selectRule(rule)" :class="{ focused: selectedRule && selectedRule._id === rule._id }" >
                    <q-item-section @click="selectRule(rule)">
                      <q-item-label> <span class="list-title">Source field : </span>{{ rule.source_field }} </q-item-label>
                      <q-item-label><span class="list-title">Target Field : </span>{{ rule.target_field }}</q-item-label>

                    </q-item-section>
                    <q-item-section avatar @click="confirmDelete(rule._id)" class="icons-hover">
                      <q-icon name="clear" color="red" />
                    </q-item-section>
                  </q-item>
                </q-list>



              </div>
              </q-scroll-area>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100% !important;
}

.form-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: nowrap;
}

.separator {
  width: 2px;
  background-color: #ccc;
  margin: 0 20px;
}

.update-and-list {
  display: flex;
  gap: 20px;
  flex: 2;
}

.form-card, .rules-card {
  flex: 1;
  min-width: 300px;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 10px;


}

.list-title{
  font-weight: bold;
}

.icons-hover:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.focused {
  background-color: #e0f7fa; /* Example highlight color */
}
.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-heading);
}
</style>