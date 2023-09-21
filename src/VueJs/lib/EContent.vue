<template>
  <span class="EContent">
    <custom-tag :tag="tag">
      <span v-html="value"></span>
      <button v-if="isAdmin && !editable" @click="editable = !editable">Edit</button>
      <button v-if="isAdmin && editable" @click="updateContent">Save</button>
      <div v-if="editable && isAdmin" class="EContent--input">
        <textarea v-model="value"/>
      </div>
    </custom-tag>
  </span>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getContent, addContent} from "./api.ts";
import {customTag} from "u_custom_tag";

const props = defineProps({
  tag: {type: String, required: true},
  isAdmin: {type: Boolean},
  url: {type: String, required: true},
  keyId: {type: String, required: true},
})

const value = ref('')
const editable = ref(false)
onMounted(() => {
  getContent(props.url, props.keyId).then(res => {
    // @ts-ignore
    value.value = res?.data?.result?.data
  })
})

function updateContent() {
  console.log(value.value)
  editable.value = !editable
  addContent(props.url, props.keyId, value.value)
}
</script>
