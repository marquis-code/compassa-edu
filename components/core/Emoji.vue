<template>
    <div style="display: flex; justify-content: center; align-items: center">
      <h4>Selected emoji is: {{ selectedEmoji }}</h4>
    </div>
    <NuxtEmojiPicker
      :hide-search="false"
      :native="true"
      theme="light"
      @select="onSelectEmoji"
    />
  </template>
  
  <script setup>
  const selectedEmoji = ref();
  
  const onSelectEmoji = (emoji) => {
    selectedEmoji.value = emoji.i;
  };
  </script>
  