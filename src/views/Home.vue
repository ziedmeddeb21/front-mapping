<template >
  <div class="editor-button-container">

    <select v-model="selectedOption">
      <option v-for="colName in mappingRulesCollection" :value="colName">{{ colName }}</option>


    </select>

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


<!--  <pre>{{mappingRules}}</pre>-->

<!--<button @click="getMappingRules">Format</button>-->
<!--<button @click="getMappingRule">Get Mapping Rule</button>-->
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
import store from '../store'
import { useToast } from 'vue-toastification'
import { watch } from 'vue'

const selectedOption = ref('mapping_rules');
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
  readOnly: true,

}


const mappingRules= computed(()=>store.state.mappingRules)

const output = ref('//Output JSON will be displayed here...')
// --------------------------------------------------------------------------------
// functions

function getMappingRules(){
  store.dispatch('getMappingRules');
}

function getMappingRulesCollection(){
  store.dispatch('getMappingRuleCollections');
}

 getMappingRulesCollection();
const mappingRulesCollection= computed(()=>store.state.mappingRuleCollections)

function getMappingRule(id){
  store.dispatch('getMappingRule',"6721f247f6649219e17d4ca8");

}

async function sendJson() {
  try {
    await store.dispatch('clearOutputJson');
    const jsonData = JSON.parse(code.value);
    await store.dispatch('sendJson', {content:jsonData,collection:selectedOption.value});
    showNotifSuccess('JSON sent successfully!');

  } catch (error) {
    showNotifError('Invalid JSON!');

  }
}



watch(() => store.state.outputJson, (newValue) => {
  output.value = JSON.stringify(newValue, null, 2)
})





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

.editor-button-container{
  background: #1e1e1e;
}

.editor-container {
  display: flex;
  justify-content: space-between;

  padding: 20px;
  box-sizing: border-box;
  /* Background color to match vs-dark theme */
  border-radius: 8px;
}

.editor-wrapper {
  flex: 1;
  margin: 10px;
  border: 3px solid #ddd;
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
