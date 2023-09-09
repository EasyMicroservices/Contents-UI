<template>
  <div class="EContent">
    <custom-tag :tag="tag">
      {{ value }}
      <button v-if="isAdmin" @click="editable = !editable">{{ editable ? 'بستن' : 'ویرایش'}}</button>
      <div v-if="editable && isAdmin" class="EContent--input">
        <input v-model="value" @input="updateContent">
      </div>
    </custom-tag>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getContent, addContent} from "./api.ts";
import {customTag} from "u_custom_tag";

const props = defineProps({
  tag: {type: String, required: true},
  isAdmin: {type: Boolean},
  url: {type: String, required: true},
  key: {type: String, required: true},
})

const value = ref('')
const editable = ref(false)
onMounted(() => {
  getContent(props.url, props.key).then(res => {
    // @ts-ignore
    value.value = res?.data?.result?.data
  })
})

function updateContent(value: any) {
  addContent(props.url, props.key, value.target.value)
}
</script>
<style>
.EContent {
  position: relative;

  button {
    font-size: 10px;
    position: absolute;
    left: -20px;
    bottom: -20px;
    z-index: 9999;
  }
}
.EContent--input{
  position: absolute;
  left: -20px;
  bottom: -50px;
  z-index: 9998;

}
</style>
