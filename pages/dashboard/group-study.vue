<template>
  <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div class="flex flex-row items-center justify-center h-12 w-full">
          <div
            class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div class="ml-2 font-bold text-2xl">Group Study</div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Active Groups</span>
            <span
              class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >{{userGroupsList.length}}</span
            >
          </div>
          <div v-if="fetchingUserGroups" class="animate-pulse flex space-x-4 rounded-md p-4 w-full mx-auto">
            <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            <button 
                v-for="(item, idx) in userGroupsList" 
                :key="idx"
                class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                @click="handleFetchGroupMessages(item)"
              >
                <div
                  class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                >
                  {{ item?.name?.charAt(0)?.toUpperCase() ?? 'N' }}
                </div>
                <div class="ml-2 text-sm text-start font-semibold">
                  {{ item?.name ?? 'Nil' }}
                </div>
              </button>
            <!-- <button 
              v-for="(item, idx) in userGroupsList" :key="idx"
              class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              @click="handleFetchGroupMessages(item)"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div class="ml-2 text-sm text-start font-semibold">{{item?.name ?? 'Nil'}}</div>
            </button> -->
          </div>
        </div>
      </div>

      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div v-if="sendingMessage" class="text-gray-500">Sending...</div>
            <ChatMessage v-if="messagesList" :creating="creating" :uploadingFile="uploadingFile" :messages="messagesList" />
            <!-- <CoreFullScreenLoader class="z-50" :text="`Fetching ${selectedGroup.name} messages`" :visible="fetchingGroupMessages" /> -->
          </div>
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div class="relative w-full">
              <input
                type="text"
                v-model="messageContent"
                placeholder="Type your message..."
                class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              />
              <button
                @click="handleSendMessage"
                class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </div>

            <input
              type="file"
              ref="fileInput"
              accept="image/*, video/*, audio/*, .pdf, .doc"
              class="hidden"
              @change="handleFileInput"
            />
            <button
              @click="triggerFileInput"
              class="ml-4 flex items-center justify-center h-full w-12 text-gray-400 hover:text-gray-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
            </button>

          </div>
        </div> 
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUser } from "@/composables/auth/user";
import { useCreateMessage } from "@/composables/modules/messages/useCreateMessage";
import { useGetUserGroups } from '@/composables/modules/group/useGetUserGroups';
import { useGetAllGroups } from "@/composables/modules/group/useGetAllGroups";
import { useGetGroupMessages } from "@/composables/modules/messages/useGetGroupMessages";
import { useWebSocket } from "@/composables/modules/messages/socket";
import { useUploadFile } from '@/composables/core/useFileUpload'
import { io, Socket } from "socket.io-client";
const { user }  = useUser()
import { Picker } from "emoji-mart";

const {
  messages,
  isConnected,
  getGroupMessages,
  sendMessage,
  joinGroup,
  markMessagesAsRead,
} = useWebSocket();
const { userGroupsList, loading: fetchingUserGroups } = useGetUserGroups();
const { uploadFile, loading: uploadingFile, uploadResponse } = useUploadFile()
const { groups, loading } = useGetAllGroups();
const router = useRouter();
const route = useRoute();
const { messages: messagesList, loading: fetchingGroupMessages, fetchGroupMessages } =
  useGetGroupMessages();
const { payload, loading: creating, setPayload, createMessage } = useCreateMessage();

const selectedGroup = ref({});
const messageContent = ref(""); // Reactive property for message content
const sendingMessage = ref(false); // Track sending status
const selectedFile = ref<File | null>(null);
const socket = ref<Socket | null>(null) as any;

const handleFetchGroupMessages = (item: any) => {
  selectedGroup.value = item;
  router.push({
    path: route.path,
    query: { ...route.query, group: item._id },
  });

  // Fetch group messages
  // socket.value.emit("joinGroup", item._id);
  fetchGroupMessages(item._id);
};

definePageMeta({
  middleware: 'auth'
});


// Function to handle sending messages
// const handleSendMessage = async () => {
//   if (!messageContent.value.trim()) return; // Do nothing if message is empty

//   const groupId = route.query.group;
//   if (!groupId) {
//     console.error("No group selected to send a message");
//     return;
//   }

//   try {
//     sendingMessage.value = true; // Set sending status

//     setPayload({
//       groupId,
//       content: messageContent.value,
//     });

//     await createMessage();

//     // Clear the input field after sending
//     messageContent.value = "";

//     // Fetch updated messages
//     await fetchGroupMessages(groupId);
//   } catch (error) {
//     console.error("Failed to send message:", error);
//   } finally {
//     sendingMessage.value = false; // Reset sending status
//   }
// };

const handleSendMessage = async () => {
  if (!messageContent.value.trim()) return;

  const groupId = route.query.group;
  if (!groupId) {
    console.error("No group selected to send a message");
    return;
  }

  const tempMessage = {
    _id: Date.now().toString(), // Temporary ID
    content: messageContent.value,
    createdAt: new Date().toISOString(),
    sender: { _id: user.value._id },
    status: "sending",
  };
  messagesList.value.push(tempMessage); // Display message immediately

  try {
    setPayload({ groupId, content: messageContent.value });
    await createMessage();

    // Update message status to 'sent'
    const messageIndex = messagesList.value.findIndex((msg) => msg._id === tempMessage._id);
    if (messageIndex !== -1) messagesList.value[messageIndex].status = "sent";
    // Fetch updated messages
    await fetchGroupMessages(groupId);
        messageContent.value = ""
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};


const showEmojiPicker = ref(false);


  const updateUrlWithGroupId = (groupId: string) => {
      console.log(`[updateUrlWithGroupId] Updating URL with group ID: ${groupId}`);
      router.replace({ query: { ...route.query, group: groupId } });
    };

    onMounted(() => {
      console.log('[onMounted] Component mounted.');

      if (user.value._id) {
        console.log(`[onMounted] User ID found: ${user.value._id}`);
      } else {
        console.warn('[onMounted] No user ID found.');
      }

      if (userGroupsList.value?.length > 0) {
        const firstGroup = userGroupsList.value[0]._id;
        console.log(`[onMounted] Found first group ID: ${firstGroup}`);
        updateUrlWithGroupId(firstGroup);
        fetchGroupMessages(firstGroup);
      } else {
        console.warn('[onMounted] No groups found in userGroupsList.');
      }
    });

    watch(
      () => userGroupsList.value,
      (newGroups) => {
        console.log('[watch:userGroupsList] userGroupsList changed.');

        if (newGroups?.length > 0) {
          const firstGroup = newGroups[0]._id;
          console.log(`[watch:userGroupsList] Found first group ID: ${firstGroup}`);
          updateUrlWithGroupId(firstGroup);
          fetchGroupMessages(firstGroup);
        } else {
          console.warn('[watch:userGroupsList] userGroupsList is empty.');
        }
      },
      { immediate: true }
    );


//     const handleSendFile = async () => {
//   if (!selectedFile.value) return;

//   const groupId = route.query.group;
//   if (!groupId) {
//     console.error("No group selected to send a file");
//     return;
//   }

//   try {
//     const formData = new FormData();
//     formData.append("file", selectedFile.value);
//     formData.append("groupId", groupId as string);

//     setPayload({ groupId, content: 'File', attachments: [selectedFile.value] });
//     await createMessage();
//     // Add custom logic to send formData to the backend (e.g., Axios or Fetch API)
//     // await createMessage(); // Mocked function

//     selectedFile.value = null;
//   } catch (error) {
//     console.error("Failed to send file:", error);
//   }
// };


//     const triggerFileInput = () => {
//   const fileInput = document.querySelector("input[type='file']") as HTMLInputElement;
//   fileInput?.click();
// };

// const handleFileInput = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files && target.files.length > 0) {
//     // selectedFile.value = target.files[0];
//     const res = await uploadFile(target.files[0])
//     selectedFile.value = res.url
//     await handleSendFile();
//   }
// };

const handleSendFile = async () => {
  if (!selectedFiles.value.length) return;

  const groupId = route.query.group;
  if (!groupId) {
    console.error("No group selected to send a file");
    return;
  }

  try {
    // Extract file URLs and determine the type
    const fileUrls = selectedFiles.value.map((file) => file.url);
    const fileType = selectedFiles.value[0]?.type;

    // Ensure all selected files have the same type
    const isValidType = selectedFiles.value.every((file) => file.type === fileType);
    if (!isValidType) {
      console.error("All selected files must have the same type.");
      return;
    }

    // Create the payload
    setPayload({
      groupId,
      content: 'File', // Or a more specific content message
      attachments: fileUrls,
      type: fileType,
    });

    await createMessage();

    // Clear selected files after successful upload
    selectedFiles.value = [];
  } catch (error) {
    console.error("Failed to send file:", error);
  }
};

const triggerFileInput = () => {
  const fileInput = document.querySelector("input[type='file']") as HTMLInputElement;
  fileInput?.click();
};

const handleFileInput = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const filesArray = Array.from(target.files);

    selectedFiles.value = await Promise.all(
      filesArray.map(async (file) => {
        const res = await uploadFile(file);
        return {
          url: res.url,
          type: detectFileType(file),
        };
      })
    );

    await handleSendFile();
  }
};

const detectFileType = (file: File) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg'].includes(extension)) return 'image';
  if (['docx', 'pdf', 'pptx'].includes(extension)) return 'document';
  if (extension === 'mp3') return 'audio';
  if (extension === 'mp4') return 'video';
  return 'text'; // Default type if no extension matches
};

// Reactive state
const selectedFiles = ref([]);

</script>
