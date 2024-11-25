<template >
  <div class="editor-button-container">
    <q-select rounded filled v-model="selectedOption" :options="mappingRulesCollection" label="Collections" />

    <q-file color="white" bg-color="secondary" label-color="white" outlined v-model="file" label="Load File" accept=".json" clearable
            @update:model-value="handleFileChange"  >
      <template v-slot:prepend>
        <q-icon name="attachment" color="white" />
      </template>
    </q-file>

    <q-spinner v-if="isLoading" color="primary" size="50px" />
  <div class="editor-container">
    <div class="editor-wrapper">
      <vue-monaco-editor
          v-model:value="code"
          theme="vs-dark"
          language="json"
          :options="MONACO_EDITOR_OPTIONS"
          @mount="handleMount"
          width="40vw"
          height="70vh"


      />
    </div>
    <div class="editor-wrapper">
      <vue-monaco-editor

          v-model:value="output"
          theme="vs-dark"
          language="json"
          :options="Editor_Output"
          @mount="handleMount"
          width="40vw"
          height="70vh"
      />
    </div>
  </div>

  <div style="text-align: center;"> <button class="pushable" @click="sendJson">
    <span class="shadow"></span>
    <span class="edge"></span>
    <span class="front"> Convert </span>
  </button>
  </div>
  </div>

</template>

<script lang="ts" setup>
import {computed, ref, shallowRef} from 'vue'
import { useToast } from 'vue-toastification'
import { watch } from 'vue'
import { useMappingStore } from '@/store/mappingStore'


const selectedOption = ref('mapping_rules');
const store = useMappingStore()

// --------------------------------------------------------------------------------
//input edtior

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true
}

const code = ref('//Enter input JSON Here...')
const editorRef = shallowRef()
const handleMount = editor => (editorRef.value = editor)

// --------------------------------------------------------------------------------
//output editor

const output = ref('//Output JSON will be displayed here...')
const Editor_Output ={
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  readOnly: true,

}


// --------------------------------------------------------------------------------
// functions

function getMappingRulesCollection(){
  store.getMappingRuleCollections()
}
getMappingRulesCollection();

const mappingRulesCollection= computed(()=>store.$state.mappingRuleCollections)


const isLoading = ref(false)

async function sendJson() {
  if (isLoading.value) return
  isLoading.value = true
  try {
    store.clearOutputJson()
    const jsonData = JSON.parse(code.value)
    await store.sendJson(jsonData, selectedOption.value)
    showNotifSuccess('JSON Converted Successfully!')
  } catch (error) {
    store.clearOutputJson()
    showNotifError('An Error Occurred! ' + error.message)
  } finally {
    isLoading.value = false
  }
}



watch(() => store.$state.outputJson, (newValue) => {
  output.value = JSON.stringify(newValue, null, 2)
})




// --------------------------------------------------------------------------------
// notif

const toast = useToast()

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


const file= ref(null)
function handleFileChange() {
  console.log("file changing",file.value)
  if (file.value && file.value.type === 'application/json') {
    const reader = new FileReader()
    reader.onload = (e) => {
      code.value = e.target.result
    }
    reader.readAsText(file.value)
  } else {

    file.value = null
    code.value=''
  }
}

</script>


<style scoped>

.editor-button-container{
  //background: #1e1e1e;
}

.editor-container {
  display: flex;
  justify-content: space-evenly;

  margin: 20px;
  box-sizing: border-box;
  /* Background color to match vs-dark theme */
  border-radius: 8px;
  border:1px solid black;
  background-color: #222222;
}

.editor-wrapper {

  margin: 10px;

  border-radius: 8px;

}

.pushable {
  position: relative;
  background: transparent;
  padding: 0px;
  border: none;
  cursor: pointer;
  outline-offset: 4px;
  outline-color: #0097a7;
  transition: filter 250ms;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #0097a7;
  border-radius: 8px;
  filter: blur(0.5px);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.edge {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(
      to right,
      #007a8a 0%,
      #0097a7 8%,
      #007a8a 92%,
      #006b7a 100%
  );
}

.front {
  display: block;
  position: relative;
  border-radius: 8px;
  background: #0097a7;
  padding: 16px 32px;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1rem;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.pushable:hover {
  filter: brightness(110%);
}

.pushable:hover .front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.pushable:hover .shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.pushable:active .shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.pushable:focus:not(:focus-visible) {
  outline: none;
}




</style>
