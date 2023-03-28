<script setup>
import { reactive } from 'vue'

import testData from './assets/test-data.json'

import { JSONLDBrowser } from 'json-ld-browser'

const state = reactive({
  data: testData,
  renderBrowser: true
  // dataFile: "../public/test-data.json"
})

const handleFileUpload = e => {
  const file = e.target.files[0]

  var fr = new FileReader();
  fr.readAsText(file);
  fr.onload = function() {
      try {
        const json = JSON.parse(fr.result)
        state.renderBrowser = false
        // Hack to re-reander component
        setTimeout(() => {
          state.data = json
          state.renderBrowser = true
        }, 1);
      } catch (error) {
        throw error
      }
  };
  fr.onerror = function() {
      console.log("Error reading the file");
  };
}

</script>

<template>
  <header>

    <h1 class="">
      JSON-LD Browser
    </h1>
  </header>

  <div id="toolbox" class="">
    <form>
      <input type="file" accept=".json" @change="handleFileUpload" class="input">
    </form>
  </div>

  <main id="jsonld-browser" >
    <JSONLDBrowser
      v-if="state.renderBrowser"
      :data="state.data"
      :data-file="state.data === null ? state.dataFile : ''"
    />
  </main>
</template>

<style scoped>

main#jsonld-browser {
  height: calc(100vh - 8rem);
  min-height: 200px;
  margin-bottom: 0px;
}



header {
  line-height: 1.5;
}

</style>
