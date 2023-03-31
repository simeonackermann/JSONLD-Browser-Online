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
  <div class="header">
        <a href="">
            <img src="/favicon.png" alt="Logo" />
            JSON-LD Browser Online
          </a>

        <!-- <ul class="pure-menu-list">
            <li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">Home</a></li>
            <li class="pure-menu-item"><a href="#" class="pure-menu-link">Tour</a></li>
            <li class="pure-menu-item"><a href="#" class="pure-menu-link">Sign Up</a></li>
        </ul> -->
  </div>

  <!-- <div class="splash-container">
    <div class="splash">
        <h1 class="splash-head">Big Bold Text</h1>
        <p class="splash-subhead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <p>
            <a href="http://purecss.io" class="pure-button pure-button-primary">Get Started</a>
        </p>
    </div>
  </div> -->

  <div class="content-wrapper">


    <div id="toolbox">
      <div class="upload-form">
        <label class="button" for="file">Upload JSON-LD</label>
        <input type="file" accept=".json" @change="handleFileUpload" class="file" id="file">
      </div>

      <!-- <div class="file-input">
        <input type="file" id="file" class="file">
        <label for="file">Choose a</label>
        <p class="file-name"></p>
      </div> -->
    </div>

    <main id="jsonld-browser" >
    <JSONLDBrowser
      v-if="state.renderBrowser"
      :data="state.data"
      :data-file="state.data === null ? state.dataFile : ''"
    />
  </main>

  </div>

</template>

<style scoped>

.header {
  /* background: hsla(160, 100%, 37%, 1); */
  background: rgb(23,254,162);
background: linear-gradient(27deg, rgba(23,254,162,1) 0%, rgba(0,189,126,1) 51%, rgba(0,69,46,1) 100%);
  height: 60px;
  border-bottom: 2px solid gray;

}

.header img {
  height: 50px;
  margin: 5px;
}

.header a {
  color: var(--vt-c-black-soft);
  font-weight: 400;
  line-height: 1.25;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.home-menu {
  /* background: #65beff; */
}

.pure-menu-heading {
  color: #fffbf3
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  /* margin-top: 65px; */
}

#toolbox {
  padding: 1rem;
}

main#jsonld-browser {
  height: calc(100vh - 8rem);
  min-height: 200px;
  margin: 0 auto;
}

.upload-form label {
  margin-right: .5rem;
}

input[type=file] {
  line-height: 1.5rem;
  font-size: 15px;
}

/* .file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-input label {
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(40deg, #ff6ec4, #7873f5);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: transform .2s ease-out;
}

input:hover + label,
input:focus + label {
  transform: scale(1.02);
}

.file-name {
  position: absolute;
  bottom: -35px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
} */

@media (min-width: 1280px) {
  .header {
    padding: 0 1%;
  }
}

</style>
