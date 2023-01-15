<template>
  <div id="main-box">
    <a_LargeText id="title" label="GENERATE YOUR REDIRECTION URL!" class="grid-col-span-5" />
    <a_TextInput id="url" ref="originalUrlRef" placeholder="Enter your URL here" class="grid-col-span-5 input" />
    <a_TextInput id="shortUrl" ref="generatedUrlRef" placeholder="Your shortened URL will appear here"
      :value="shortenedUrl" locked class="grid-col-span-5 input" />
    <m_Button label="Generate" class="grid-col-span-5" @click="generate()" />
  </div>
</template>

<script setup>
/* eslint-disable */
import a_LargeText from '../atoms/a_LargeText.vue';
import a_TextInput from '../atoms/a_TextInput.vue';
import m_Button from '../molecules/m_Button.vue';

import { ref, defineProps, onMounted } from 'vue';
import axios from "axios";

let originalUrlRef = document.getElementById("url");
let generatedUrlRef = document.getElementById("shortUrl");

defineProps({
  shortenedUrl: {
    type: String,
    required: false
  }
})

onMounted(() => {
  originalUrlRef = document.getElementById("url");
  generatedUrlRef = document.getElementById("shortUrl");
});

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w'];

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const fetchRandomWords = async () => {
  let randomLetter = letters[rand(0, letters.length)];
  let randomLength = "%3F".repeat(rand(3, 8)); // between 3 and 7 letters
  let maxWords = 30;
  let randomWord = await axios.get(`https://api.datamuse.com/words?sp=${randomLetter}${randomLength}&max=${maxWords}`);
  return randomWord;
}

const checkIfWordIsAvailable = async (word) => {
  if (/\s/g.test(word)) return false; // Check if word contains white spaces.
  try {
    let res = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/check/${word}`);
    if (res.status !== 200 && res.status !== 409) throw new Error("Unknown error");
    return res.status === 200
  } catch {
    return false;
  }

}

const disableGenerateBtn = () => {
  let generateBtn = document.getElementById("btn-container");
  generateBtn.setAttribute("disabled", true);
  generateBtn.style.opacity = "50%";
  generateBtn.style.cursor = "wait";
};

const enableGenerateBtn = () => {
  let generateBtn = document.getElementById("btn-container");
  generateBtn.setAttribute("disabled", false);
  generateBtn.style.opacity = "100%";
  generateBtn.style.cursor = "pointer";
};

const generate = async () => {
  let generateBtn = document.getElementById("btn-container");
  if (!generateBtn.getAttribute("disabled") || generateBtn.getAttribute("disabled") == "false") {
    let chosenWord = undefined;

    if (
      originalUrlRef.value.trim() === "" || 
      (!originalUrlRef.value.startsWith("http://") && !originalUrlRef.value.startsWith("https://")) ||
      originalUrlRef.value.length > 1000
    ) {
      enableGenerateBtn();
      return;
    }

    disableGenerateBtn();

    const noTries = 1; // Kill switch
    let noTry = 1;
    try {
      do {
        let words = await fetchRandomWords();
        words = words.data;
        for (let i = 0; i < words.length; i++) {
          let word = words[i].word;
          let isWordAvailable = await checkIfWordIsAvailable(word)
          if (isWordAvailable) {
            chosenWord = word
            break;
          }
        }
        noTry++;
      } while (!chosenWord && noTry <= noTries);

      if (chosenWord && originalUrlRef.value) {
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/${chosenWord}`, {
          url: originalUrlRef.value,
          exp: 60
        }).then(res => {
          if (res.status === 201) generatedUrlRef.value = res.data;
        });
      }
    } catch (ex) {
      console.log(ex);
      return;
    } finally {
      enableGenerateBtn();
    }
  }
}
</script>

<style lang="scss" scoped>
#main-box {
  width: 500px;
  height: auto;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(5, 1fr);
  background-color: white;
  padding: 1rem;

  * {
    min-height: 30px;
  }

  #svg-box {
    text-align: center;
    background-color: black;
  }

  .input {
    padding-inline: 5px;
  }
}

.grid-col-span-5 {
  grid-column: span 5;
}

.grid-col-span-4 {
  grid-column: span 4;
}

.grid-col-span-3 {
  grid-column: span 3;
}

.grid-col-span-2 {
  grid-column: span 2;
}
</style>
