<template >
  <div class="editor-container">
    <div class="editor-wrapper">
      <vue-monaco-editor
          v-model:value="code"
          theme="vs-dark"
          language="json"
          :options="MONACO_EDITOR_OPTIONS"
          @mount="handleMount"
          width="40vw"

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
          height="80vh"
      />
    </div>
  </div>

  <pre>{{mappingRules}}</pre>

<button @click="getMappingRules">Format</button>
<button @click="getMappingRule">Get Mapping Rule</button>
<button @click="sendJson">Send Json</button>

</template>

<script lang="ts" setup>
import {computed, ref, shallowRef} from 'vue'
import store from '../store'
import { useToast } from 'vue-toastification'
//input edtior

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true
}

const code = ref('//Enter input JSON Here...')
const editorRef = shallowRef()
const handleMount = editor => (editorRef.value = editor)

//output editor

const Editor_Output ={
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  readOnly: true
}

const output = ref('//Output JSON Here...')





function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}

const mappingRules= computed(()=>store.state.mappingRules)

// --------------------------------------------------------------------------------
// functions

function getMappingRules(){
  store.dispatch('getMappingRules');
}

function getMappingRule(id){
  store.dispatch('getMappingRule',"6721f247f6649219e17d4ca8");

}

function sendJson() {
  try {
    const jsonData = JSON.parse(code.value);
    store.dispatch('sendJson', jsonData);
    showNotifSuccess('JSON sent successfully!');
    console.log(jsonData);
  } catch (error) {
    console.error('Invalid JSON:', error);
    showNotifError('Invalid JSON!');
  }
}





const toast = useToast()

function showNotifError(message) {
  toast.error(message, {
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





</script>


<style scoped>

.editor-container {
  display: flex;
  justify-content: space-between;

  padding: 20px;
  box-sizing: border-box;
}

.editor-wrapper {
  flex: 1;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;

}
</style>
