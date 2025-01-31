<!-- AddGroupModal Component -->
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 class="text-lg font-bold mb-4">Create a New Group</h2>
      <div class="space-y-3">
        <input v-model="groupName" type="text" placeholder="Group Name" class="w-full text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg mb-2" />
        <textarea v-model="groupDescription" cols="10" rowa="10" type="text" placeholder="Group Description" class="w-full resize-none text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg mb-2" />
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="isPrivate" class="mr-2" />
          <label class="text-sm">Private Group</label>
        </div>
      </div>
        <div class="flex justify-end gap-6 pt-10">
          <button @click="$emit('close')" class="px-4 py-2.5  w-full bg-gray-300 rounded-lg text-sm">Cancel</button>
          <button :disabled="processing || (!groupName && !groupDescriptio) " @click="submitGroup" class="px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-25  w-full bg-blue-500 text-white rounded-lg text-sm">{{processing ? 'processing..' : 'Create'}}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        groupName: '',
        groupDescription: '',
        isPrivate: false,
      };
    },
    props: {
    processing: {
      type: Boolean, // "Boolean" should be capitalized
      required: false, // Add required or default if needed
      default: false,
    },
  },
    methods: {
      submitGroup() {
        this.$emit('submit', {
          name: this.groupName,
          description: this.groupDescription,
          private: this.isPrivate,
        });
        this.groupName = '';
        this.groupDescription = '';
        this.isPrivate = false;
      },
    },
  };
  </script>
  