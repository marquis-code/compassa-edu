<template>
  <div class="flex h-screen antialiased text-gray-800">
    <div class="flex flex-row h-full w-full overflow-x-hidden">
      <!-- Sidebar -->
      <div
        class="fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0"
        :class="{ '-translate-x-full': !sidebarOpen }">
        <div class="flex flex-row items-center justify-between h-12 w-full">
          <div class="flex items-center">
            <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <img src="@/assets/img/logo.jpeg" class="rounded-full" />
            </div>
            <div class="ml-2 font-bold text-lg">Group Study</div>
          </div>
          <button @click="toggleSidebar" class="lg:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mt-4 flex justify-center gap-x-3 items-center">
          <input v-model="searchQuery" type="text" placeholder="Search groups..."
            class="w-full px-4 py-3 border-[0.5px] font-bold rounded-md bg-gray-50 text-sm focus:outline-none focus:border-indigo-500" />

          <button @click="toggleAllFilterModal"
            class="text-gray-600 hidden lg:block border-[0.5px] py-2 rounded-lg px-2 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </button>
        </div>

        <div class="flex flex-col mt-5">
          <div class="flex flex-row items-center justify-between text-xs">
            <div class="flex items-center gap-x-3">
              <span class="font-semibold text-base">Active Groups</span>
              <button type="button" @click="handleAddGroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
                  stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </button>
            </div>
            <span class="flex items-center justify-center font-semibold bg-gray-300 h-6 w-6 rounded-full">{{
              userGroupsList.length }}</span>
          </div>
          <div class="flex flex-col space-y-3 mt-4 -mx-2 overflow-y-auto">
            <button v-for="(item, idx) in filteredGroups" :key="idx"
              :class="{ 'bg-[#DDECF2]': item._id === route.query.group }"
              class="flex flex-row items-center py-3 rounded-md pl-3 mr-3 hover:bg-gray-100"
              @click="handleSelectGroup(item)">
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {{ item?.name?.charAt(0)?.toUpperCase() ?? 'N' }}
              </div>
              <div class="ml-2 text-sm text-start font-semibold">
                {{ item?.name ?? 'Nil' }}
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div style="background-color: #449388" class="flex flex-col flex-auto h-full lg:p-6 w-full lg:w-auto">
        <div class="flex flex-col flex-auto flex-shrink-0 lg:rounded-2xl bg-[#DAD3CC] h-full p-4">
          <div class="flex items-center justify-between mb-4 lg:hidden p-2 bg-white rounded-xl">
            <button @click="toggleSidebar" class="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none"
                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <span class="font-medium text-base lg:text-lg pr-3">{{ selectedGroup?.name ?? 'Select a Group' }}</span>
          </div>
          <div class="flex flex-col h-full overflow-x-auto">
            <div v-if="sendingMessage" class="text-gray-500">Sending...</div>
            <ChatMessage :allMessages="allMessages" v-if="messagesList" :creating="creating"
              :uploadingFile="uploadingFile" :messages="messagesList" />
          </div>
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div class="relative w-full">
              <input type="text" v-model="messageContent" @keyup.enter="handleSendMessage"
                placeholder="Type your message..."
                class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" />
              <button @click="toggleEmojiPicker"
                class="absolute flex items-center justify-center h-full w-12 right-10 top-0 text-gray-400 hover:text-gray-600">
                <span class="text-2xl">🤭</span>
                <!-- <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.477 10-10c0-5.524-4.477-10-10-10zM7 13.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S7 14.328 7 13.5zm8 0c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5zm-.772 4.326A5.98 5.98 0 0112 18a5.98 5.98 0 01-2.228-.174.75.75 0 11.456-1.428A4.48 4.48 0 0012 16.5a4.48 4.48 0 001.772-.102.75.75 0 11.456 1.428z" />
                </svg> -->
              </button>
              <button @click="handleUploadClick"
                class="absolute flex items-center z-50 justify-center h-full w-12 right-20 top-0 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button @click="handleSendMessage"
                class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
              <Teleport to="body">
                <Transition name="fade">
                  <div v-if="showEmojiPicker" class="fixed inset-0 bg-black bg-opacity-50 z-50"
                    @click="closeEmojiPicker">
                    <div class="absolute bottom-20 right-4 md:right-8 bg-white rounded-lg shadow-xl" @click.stop>
                      <div class="p-2">
                        <NuxtEmojiPicker :hide-search="false" :native="true" theme="light" @select="onSelectEmoji"
                          class="h-[400px] w-[320px]" />
                      </div>
                    </div>
                  </div>
                </Transition>
              </Teleport>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CoreFullScreenLoader :visible="fetchingGroupMessages" class="z-50"
    text="Please wait while we fetch group messages" />
  <AddGroupModal v-if="addGroupModalOpen" :processing="processing" @close="toggleAddGroupModal"
    @submit="handleAddGroup" />
  <FilterModal v-if="allFilterModalOpen" :groups="allGroups" @close="toggleAllFilterModal" @joinGroup="joinGroup"
    @leaveGroup="leaveGroup" />

  <ConfirmationModal :visible="showJoinGroupConfirmationModal" title="Join Group"
    description="Are you sure you want to join this group? This action cannot be undone." @confirm="handleJoinConfirm"
    @cancel="showJoinGroupConfirmationModal = false">
    <template #icon>
      <svg class="w-12 h-12" width="800px" height="800px" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17 6.5C17 9.53757 14.7614 12 12 12C9.23858 12 7 9.53757 7 6.5C7 3.46243 9.23858 1 12 1C14.7614 1 17 3.46243 17 6.5ZM9 6.5C9 8.32254 10.3431 9.8 12 9.8C13.6569 9.8 15 8.32254 15 6.5C15 4.67746 13.6569 3.2 12 3.2C10.3431 3.2 9 4.67746 9 6.5Z"
          fill="#0F0F0F" />
        <path
          d="M11.6759 14.9952C10.7868 14.9679 10.1945 14.8277 9.72609 14.6447C9.26355 14.464 8.89822 14.237 8.41685 13.9378C8.32296 13.8795 8.22448 13.8183 8.12019 13.7543C7.07587 13.1132 5.73464 13.2622 4.86415 14.1419C4.48443 14.5256 4.04036 15.0219 3.6849 15.5626C3.34603 16.0781 3 16.7638 3 17.5V20.0003C3 21.6574 4.34334 23 6 23H13.101C12.5151 22.4259 12.0297 21.7496 11.6736 21H6C5.44752 21 5 20.5524 5 20.0003V17.5C5 17.3549 5.08549 17.073 5.35613 16.6613C5.61017 16.2748 5.95358 15.8844 6.28579 15.5487C6.49412 15.3381 6.81106 15.2974 7.07389 15.4588C7.15661 15.5095 7.24087 15.5621 7.32694 15.6159C7.80938 15.9171 8.34918 16.254 8.99836 16.5076C9.58761 16.7378 10.2519 16.8974 11.0761 16.9645C11.1791 16.2695 11.3843 15.6078 11.6759 14.9952Z"
          fill="#0F0F0F" />
        <path
          d="M15.2929 17.7071C15.6834 17.3166 16.3166 17.3166 16.7071 17.7071L17.3483 18.3483L19.2473 16.4492C19.6379 16.0586 20.271 16.0586 20.6616 16.4492C21.0521 16.8397 21.0521 17.4729 20.6616 17.8634L18.1213 20.4036C18.0349 20.4901 17.9365 20.5574 17.8316 20.6056C17.4486 20.8294 16.9487 20.7771 16.6203 20.4487L15.2929 19.1213C14.9024 18.7308 14.9024 18.0976 15.2929 17.7071Z"
          fill="#0F0F0F" />
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18ZM13.9819 18C13.9819 20.2191 15.7809 22.0181 18 22.0181C20.2191 22.0181 22.0181 20.2191 22.0181 18C22.0181 15.7809 20.2191 13.9819 18 13.9819C15.7809 13.9819 13.9819 15.7809 13.9819 18Z"
          fill="#0F0F0F" />
      </svg>
    </template>
  </ConfirmationModal>

   <CoreModal
      :visible="showConsentModal"
      @close="showConsentModal = false"
   >
    <CoreConsentModal 
      @proceed="handleConsentAccepted"
    />
   </CoreModal>

  <CoreModal
      :visible="showUploadModal"
      @close="handleCloseUpload"
  >
    <CoreFileUploadModal
      :selected-file="selectedFile"
      @upload="handleFileUpload"
    />
  </CoreModal>

    <!-- Add this hidden input for file selection -->
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFileSelected"
      accept="image/*,.pdf,.doc,.docx"
    />

  <ConfirmationModal :visible="showLeaveGroupConfirmationModal" title="Leave Group"
    description="Are you sure you want to leave this group? This action cannot be undone." @confirm="handleLeaveConfirm"
    @cancel="showLeaveGroupConfirmationModal = false">
    <template #icon>
      <svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </template>
  </ConfirmationModal>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUploadMaterial } from '@/composables/modules/materials/useUploadMaterial'
import { useUser } from "@/composables/auth/user";
import { useCreateMessage } from "@/composables/modules/messages/useCreateMessage";
import { useGetUserGroups } from '@/composables/modules/group/useGetUserGroups';
import { useGetAllGroups } from "@/composables/modules/group/useGetAllGroups";
import { useGetGroupMessages } from "@/composables/modules/messages/useGetGroupMessages";
import { useWebSocket } from "@/composables/modules/messages/socket";
import { useUploadFile } from '@/composables/core/useFileUpload'
import { useCreateGroup } from '@/composables/modules/group/useCreateGroup'
import { useJoinGroupByUserId } from '@/composables/modules/group/useJoinGroupByUserId'
import { useLeaveGroup } from '@/composables/modules/group/useLeaveGroup'
// import { useGetGroupMessages } from "@/composables/modules/messages/useGetGroupMessages";
import { io, Socket } from "socket.io-client";
const { user } = useUser()
const { loading: processing, setPayloadObj, createGroup } = useCreateGroup()
const { joinGroupByUserId, loading: joining } = useJoinGroupByUserId()
const { leaveGroupByUserId, loading: leaving } = useLeaveGroup()
const { uploadMaterial, uploading, setPayload:setCreateMaterialPayload } = useUploadMaterial()

const {
  sendMessage,
  allMessages,
  // messages
} = useWebSocket();
const { userGroupsList, loading: fetchingUserGroups } = useGetUserGroups();
const { uploadFile, loading: uploadingFile, uploadResponse } = useUploadFile()
const { groups, loading } = useGetAllGroups();
const router = useRouter();
const route = useRoute();
const { messages: messagesList, loading: fetchingGroupMessages, fetchGroupMessages } =
  useGetGroupMessages();
const { payload, loading: creating, setPayload, createMessage } = useCreateMessage();
const searchQuery = ref("");
const filterModalOpen = ref(false);
const allFilterModalOpen = ref(false);
const addGroupModalOpen = ref(false)

const selectedGroup = ref({});
const messageContent = ref(""); // Reactive property for message content
const sendingMessage = ref(false); // Track sending status
const selectedFile = ref<File | null>(null);
const socket = ref<Socket | null>(null) as any;
const selectedFiles = ref([]);
const showEmojiPicker = ref(false)

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

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const closeEmojiPicker = () => {
  showEmojiPicker.value = false
}

const onSelectEmoji = (emoji: Emoji) => {
  messageContent.value += emoji.i
  closeEmojiPicker()
}

const showJoinGroupConfirmationModal = ref(false);
const showLeaveGroupConfirmationModal = ref(false);



const toggleFilterModal = () => {
  filterModalOpen.value = !filterModalOpen.value;
};

const toggleAllFilterModal = () => {
  allFilterModalOpen.value = !allFilterModalOpen.value;
};

definePageMeta({
  middleware: 'auth'
});

const toggleAddGroupModal = () => {
  addGroupModalOpen.value = !addGroupModalOpen.value;
}

const handleAddGroup = async (groupData: any) => {
  // API call to add group
  const payloadObjData = {
    name: groupData.name,
    description: groupData.description,
    status: groupData.isPrivate ? 'private' : 'public',
  }
  setPayloadObj(payloadObjData)
  await createGroup()
  console.log("Adding group", groupData);
  toggleAddGroupModal();
}


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
    sendMessage(messageContent.value, groupId)
    await createMessage();

    // Update message status to 'sent'
    const messageIndex = messagesList.value.findIndex((msg) => msg._id === tempMessage._id);
    if (messageIndex !== -1) messagesList.value[messageIndex].status = "sent";
    // Fetch updated messages
    await fetchGroupMessages(groupId);
    messageContent.value = ""
    closeEmojiPicker()
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};


onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showEmojiPicker.value) {
      closeEmojiPicker()
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showEmojiPicker.value) {
      closeEmojiPicker()
    }
  })
})





const updateUrlWithGroupId = (groupId: string) => {
  console.log(`[updateUrlWithGroupId] Updating URL with group ID: ${groupId}`);
  router.replace({ query: { ...route.query, group: groupId } });
};

const initializeGroupAndMessages = () => {
  console.log('[initializeGroupAndMessages] Initializing group and messages');

  // Check if there's already a group in the URL
  const existingGroupId = route.query.group as string;

  if (existingGroupId) {
    console.log(`[initializeGroupAndMessages] Found existing group ID in URL: ${existingGroupId}`);
    // Verify if this group exists in userGroups
    if (userGroupsList.value?.some(group => group._id === existingGroupId)) {
      console.log(`[initializeGroupAndMessages] Existing group ID is valid, fetching messages`);
      fetchGroupMessages(existingGroupId);
    } else {
      console.warn(`[initializeGroupAndMessages] Existing group ID not found in userGroups, falling back to first group`);
      fallbackToFirstGroup();
    }
  } else {
    console.log('[initializeGroupAndMessages] No group ID in URL, falling back to first group');
    fallbackToFirstGroup();
  }
};

const fallbackToFirstGroup = () => {
  if (userGroupsList.value?.length > 0) {
    const firstGroup = userGroupsList.value[0]._id;
    console.log(`[fallbackToFirstGroup] Using first group ID: ${firstGroup}`);
    updateUrlWithGroupId(firstGroup);
    fetchGroupMessages(firstGroup);
  } else {
    console.warn('[fallbackToFirstGroup] No groups available in userGroupsList');
  }
};

onMounted(() => {
  console.log('[onMounted] Component mounted.');

  if (user.value._id) {
    console.log(`[onMounted] User ID found: ${user.value._id}`);
  } else {
    console.warn('[onMounted] No user ID found.');
  }

  if (userGroupsList.value?.length > 0) {
    initializeGroupAndMessages();
  } else {
    console.warn('[onMounted] No groups found in userGroupsList.');
  }
});

watch(
  () => userGroupsList.value,
  (newGroups) => {
    console.log('[watch:userGroupsList] userGroupsList changed.');

    if (newGroups?.length > 0) {
      initializeGroupAndMessages();
    } else {
      console.warn('[watch:userGroupsList] userGroupsList is empty.');
    }
  },
  { immediate: true }
);



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

watch([route.query.group], // Watch only page and perPage
  () => {
    fetchGroupMessages(route.query.group)
    // window.location.reload()
  }, { immediate: true }
);

const filteredGroups = computed(() => {
  return userGroupsList.value.filter(group => group.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const selectedGroupId = ref('')

const joinGroup = (groupId: string) => {
  selectedGroupId.value = groupId
  showJoinGroupConfirmationModal.value = true
};

const handleJoinConfirm = async () => {
  console.log("Confirmed action!");
  await joinGroupByUserId(selectedGroupId.value, user.value._id)
  showJoinGroupConfirmationModal.value = false;
};

const leaveGroup = (groupId: string) => {
  selectedGroupId.value = groupId
  showLeaveGroupConfirmationModal.value = true;
};


const handleLeaveConfirm = async () => {
  console.log("Confirmed action!");
  await leaveGroupByUserId(selectedGroupId.value, user.value._id)
  showLeaveGroupConfirmationModal.value = false;
};

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
}


const handleSelectGroup = (item: any) => {
  handleFetchGroupMessages(item);
  sidebarOpen.value = false; // Close sidebar on mobile
}


// Add these refs
const showConsentModal = ref(false);
const showUploadModal = ref(false);
// const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Add these methods
const handleUploadClick = () => {
  console.log('Uou clicked')
  showConsentModal.value = true;
};

const handleConsentAccepted = () => {
  showConsentModal.value = false;
  fileInput.value?.click();
};

const handleFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    showUploadModal.value = true;
  }
};

const handleCloseUpload = () => {
  showUploadModal.value = false;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleFileUpload = async (uploadData: {
  response: any;
  academicLevel: string;
  semester: string;
  session: string;
  materialType: string;
  category: string
}) => {
  try {
    // Upload the file
    const filePayload = {
        name: "Attachment",
        description: "Chat Material Attachment",
        fileUrls: uploadData.response.url,
        academicLevel: uploadData.academicLevel,
        semester: uploadData.semester,
        materialType: uploadData.materialType,
        session: uploadData.session,
        category: uploadData.category,
}

const messageData = {
      groupId: route.query.group,
      content: `Shared a ${uploadData.materialType}`,
      type: 'document',
      attachments: [uploadData.response.url],
    };

    // const fileUrl = await uploadFile(uploadData.file);
    setCreateMaterialPayload(filePayload)
    uploadMaterial().then(async () => {
      setPayload(messageData);
      await createMessage();
      window.location.reload()
      // await fetchGroupMessages(route.query.group);
    })

    // // Create message with file metadata
    // const messageData = {
    //   groupId: route.query.group,
    //   content: `Shared a ${uploadData.materialType}`,
    //   type: 'File',
    //   attachments: [fileUrl.url],
    //   metadata: {
    //     academicSession: uploadData.academicSession,
    //     semester: uploadData.semester,
    //     materialType: uploadData.materialType
    //   }
    // };

    // setPayload(messageData);
    // await createMessage();

    // Close the upload modal
    handleCloseUpload();

    // Fetch updated messages
    await fetchGroupMessages(route.query.group);
  } catch (error) {
    console.error('Failed to upload file:', error);
    // Handle error (show error message to user)
  }
};


</script>


<style scoped>
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
