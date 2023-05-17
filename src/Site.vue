<script setup>
import { ref, reactive, onMounted } from 'vue'

import JSONLDBrowser from 'json-ld-browser'

import 'bulma/css/bulma.css'

import {CodeJar} from 'codejar'

import 'highlight.js/styles/default.css';
import hljs from 'highlight.js/lib/core';
import hljsJson from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', hljsJson);
hljs.configure({ignoreUnescapedHTML: true})

const jarEl = ref(null)


const state = reactive({
  data: null,
  currentExample: null
})

const loadExample = async (id) => {
  let json = null

  try {
    const res = await fetch(`/data/${id}.json`)
    json = await res.json()
  } catch (error) {
    console.log('Error', error);
    return
  }

  state.currentExample = id
  state.data = json
  setTimeout(() => {
    updateSyntaxHighlighting()
  }, 1)
}

const handleFileUpload = e => {
  const file = e.target.files[0]

  var fr = new FileReader();
  fr.readAsText(file);
  fr.onload = function() {
    try {
      state.data = JSON.parse(fr.result)
      state.currentExample = null
      setTimeout(() => {
          updateSyntaxHighlighting()
        }, 1)
    } catch (error) {
      throw error
    }
  };
  fr.onerror = function() {
      console.log("Error reading the file");
  };
}

const updateSyntaxHighlighting = () => {
  let updateBrowserTimeout = null

  const updateBrowser = (code) => {
    try {
      state.data = JSON.parse(code)
    } catch (error) {
      console.log('Error:', error);
    }
  }

  let jar = CodeJar(jarEl.value, hljs.highlightElement)

  jar.onUpdate(code => {
    clearTimeout(updateBrowserTimeout)
    updateBrowserTimeout = setTimeout(() => {
      updateBrowser(code)
    }, 750)
  });
}

</script>

<template>
  <div class="header">
        <a href="">
            <img src="/logo.png" alt="Logo" />
            JSON-LD Browser
          </a>
  </div>

  <div class="content-wrapper">
    <div id="toolbox">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Examples</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">

            <div class="control">
              <a class="button" v-bind:class="{'is-light': state.currentExample == 'bibliothek' }" @click="loadExample('bibliothek')">Bibliothek</a>
            </div>

            <div class="control">
              <a class="button" v-bind:class="{'is-light': state.currentExample == 'jane' }" @click="loadExample('jane')">Jane Doe</a>
            </div>

            <div class="control">
              or
            </div>

            <div class="control file">
              <label class="file-label">
                <input class="file-input" type="file" name="file" accept=".json" @change="handleFileUpload">
                <span class="file-cta">
                  <span class="file-icon">
                    <span class="material-symbols-outlined">upload_file</span>
                  </span>
                  <span class="file-label">
                    Upload JSON-LD....
                  </span>
                </span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>

    <h2 class="subtitle">
      <span class="material-symbols-outlined">Code</span> JSON-LD Input
    </h2>
    <div id="jsonld-code" class="language-json" ref="jarEl">
      {{ state.data }}
    </div>

    <h2 class="subtitle">
      <span class="material-symbols-outlined">description</span> JSON-LD Visualisation
    </h2>
    <div id="jsonld-browser" >
      <JSONLDBrowser
        :data="state.data"
        :data-file="state.dataFile"
      />
    </div>

  </div>

</template>

<style scoped>

.header {

  background-image:
    linear-gradient(90deg,
          #3a91e280 50%,
          #13344780 50%
          )
    ,linear-gradient(0deg,
          #3a91e280 50%,
          #13344780 50%
          )
    ,linear-gradient(45deg,
          #3a91e280 50%,
          #13344780 50%
          );

  background-size: 60px 60px;

  height: 60px;
  display: flex;
  justify-content: center;

}

.header img {
  height: 42px;
  margin: 5px 15px;
  border-radius: 21px;
  box-shadow: 0px 0px 10px 0px #f1f1f1;
  background: white;
    padding: 1px;
}

.header a {
  color: var(--vt-c-white-soft);
  text-shadow: 0px 0px 5px #f1f1f1;
  font-weight: 600;
  line-height: 1.25;
  font-size: 2rem;
  letter-spacing: .25rem;
  display: flex;
  align-items: center;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  /* margin-top: 65px; */
}

#toolbox {
  padding: 1rem;
}

div#jsonld-code {
  max-height: 250px;
  min-height: 50px;
  box-shadow: 0 0 2px 2px #dfdfdf;
  overflow: hidden;
  overflow-y: scroll;
  margin: 0 0 20px 0;
  font-size: .875em;
}


div#jsonld-browser {
  height: calc(100vh - 10rem);
  min-height: 200px;
  margin: 0 auto 10px auto;
}

.upload-form label {
  margin-right: .5rem;
}

input[type=file] {
  line-height: 1.5rem;
  font-size: 15px;
}


@media (min-width: 1280px) {
  .header {
    padding: 0 1%;
  }
}

</style>

<style>
.code-viewer pre {
  padding: 0;
}
/* reset Bulma style for .number */
.node-value.number {
    background-color: inherit;
    font-size: inherit;
    height: inherit;
    padding: inherit;
    justify-content: inherit;


}

/* viewer-menu */
#jsonld-browser {

}

#jsonld-browser .viewer-wrapper:has(.editor-viewer) .viewer-menu {
  right: 50px;
}

#jsonld-browser .viewer-menu .button {
  font-size: 0.6rem !important;

}
#jsonld-browser .editor-menu {

  top: -24px;
}
#jsonld-browser .editor-menu .button {
  font-size: 0.6rem !important;

}

</style>