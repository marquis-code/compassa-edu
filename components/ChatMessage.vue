<template>
  <!-- <div id="chat-container" class="flex flex-col space-y-4 p-4 overflow-y-auto h-full object-cover rounded-xl bg-[url('@/assets/img/theme.jpg')]">
    <div v-for="(group, index) in groupedMessages" :key="index">
      <div class="text-center text-sm text-gray-500 my-2">
        {{ group.date }}
      </div>

      <div
        v-for="message in group.messages"
        :key="message._id"
        :class="[
          'flex w-full',
          isCurrentUser(message.sender._id) ? 'justify-end' : 'justify-start',
        ]"
      >
        <div
          :class="[
            'max-w-[70%] rounded-lg p-3',
            isCurrentUser(message.sender._id)
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none reverseorder',
          ]"
        >
          <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
          <div v-if="message.attachments?.length" class="mt-4 space-y-4">
            <div
              v-for="(attachment, index) in message.attachments"
              :key="index"
              class="flex items-center space-x-4 p-3 bg-gray-50 shadow-sm rounded-lg"
            >
              <div
                class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
              >
                <div v-if="isImageFile(attachment)" class="w-full h-full">
                  <img
                    :src="attachment"
                    class="w-full h-full object-cover"
                    alt="Attachment"
                    @error="handleImageError"
                  />
                </div>
                <div
                  v-else-if="isDocumentFile(attachment)"
                  class="text-4xl text-gray-500"
                >
                  <img
                    src="@/assets/icons/pdf.svg"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div v-else class="text-4xl text-gray-500">
                  <img
                    src="@/assets/icons/music.svg"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div class="flex-1">
                <a
                  :href="attachment"
                  target="_blank"
                  class="text-base font-medium text-indigo-600 truncate block"
                >
                  <p class="text-sm text-gray-500">
                    Click to preview or download
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between text-xs mt-1"
            :class="[
              isCurrentUser(message.sender._id)
                ? 'text-white text-opacity-70'
                : 'text-gray-500',
            ]"
          >
            <span>{{ formatDate(message.createdAt) }}</span>
            <span v-if="isCurrentUser(message.sender._id)">
              <svg
                v-if="message.status === 'sending'"
                class="w-4 h-4 text-gray-400 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
              </svg>
              <svg
                v-else-if="message.status === 'sent'"
                class="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <svg
                v-else-if="message.status === 'delivered'"
                class="w-4 h-4 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div
    id="chat-container"
    style="background-color: #DAD3CC"
    class="flex flex-col space-y-4 p-4 overflow-y-auto h-full object-cover rounded-xl"
  >
    <div class="flex justify-center mb-4">
      <div class="rounded py-2 px-4" style="background-color: #fcf4cb">
        <p class="text-xs">
          Messages to this chat and calls are now secured with end-to-end
          encryption. Tap for more info.
        </p>
      </div>
    </div>
    <!-- Loop through grouped messages -->
    <div v-for="(group, index) in groupedMessages" :key="index">
      <div
        class="text-center text-sm text-gray-500 my-2 flex items-center justify-center"
      >
        <!-- {{ group.date }} -->
        <div class="flex justify-center mb-2">
          <div class="rounded py-2 px-4" style="background-color: #ddecf2">
            <p class="text-sm font-semibold uppercase">
              {{ group.date }}
            </p>
          </div>
        </div>
        <svg
          v-if="group.isCurrentUser"
          class="w-4 h-4 text-green-500 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Loop through messages in the group -->
      <!-- style="background-color: #F2F2F2" -->
      <div
        v-for="(message, messageIndex) in group.messages"
        :key="message._id"
        :class="[
          'flex w-full',
          isCurrentUser(message.sender._id) ? 'justify-end' : 'justify-start',
          messageIndex === 0 ? 'mt-2' : 'mt-2', // Ensure consecutive messages are visually linked
        ]"
      >
        <div
          :class="[
            'max-w-[70%] rounded-lg p-3',
            isCurrentUser(message.sender._id)
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-[#F2F2F2] text-gray-800 rounded-bl-none',
            messageIndex > 0 ? 'rounded-tl-none' : '', // Remove rounded corners for consecutive messages
          ]"
        >
        <!-- {{message}} -->
          <!-- <p class="text-sm text-grey-darkest" v-if="!isCurrentUser(message.sender._id)">Marquis</p> -->
          <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>

          <!-- Attachments -->
          <div v-if="message.attachments?.length" class="mt-4 space-y-4">
            <div
              v-for="(attachment, index) in message.attachments"
              :key="index"
              class="flex items-center space-x-4 p-3 bg-gray-50 shadow-sm rounded-lg"
            >
              <div
                class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  v-if="isImageFile(attachment)"
                  :src="attachment"
                  class="w-full h-full object-cover"
                  alt="Attachment"
                />
                <img
                  v-else-if="isDocumentFile(attachment)"
                  src="@/assets/icons/pdf.svg"
                  class="w-full h-full object-cover"
                />
                <img
                  v-else
                  src="@/assets/icons/music.svg"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1">
                <a
                  :href="attachment"
                  target="_blank"
                  class="text-base font-medium text-indigo-600 truncate block"
                >
                  <p class="text-sm text-gray-500">
                    Click to preview or download
                  </p>
                </a>
              </div>
            </div>
          </div>

          <!-- Timestamp and Status Icon -->
          <div
            class="flex items-center justify-between text-xs mt-1"
            :class="[
              isCurrentUser(message.sender._id)
                ? 'text-white text-opacity-70'
                : 'text-gray-500',
            ]"
          >
          <!-- {{message}} -->
            <span>{{ formatDate(message.createdAt) }}</span>
            <span v-if="isCurrentUser(message.sender._id)">
              <svg v-if="message.status === 'sending'"  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <svg  v-else-if="message.status === 'sent'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <svg
                v-else-if="message.status === 'delivered'"
                class="w-4 h-4 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  messages: Message[];
  allMessages: Message[];
  uploadingFile: {
    type: Boolean;
    default: false;
  };
  creating: {
    type: Boolean;
    default: false;
  };
}>();

const currentUserId = useState("currentUserId", () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")._id
    : null;
});

// Function to format date labels
const getDateLabel = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
};

const groupedMessages = computed(() => {
  const grouped: Record<string, Message[]> = {};

  // Group messages by their date (using the actual date from the message)
  props.allMessages.forEach((message) => {
    const dateLabel = new Date(message.createdAt).toISOString().split("T")[0];

    if (!grouped[dateLabel]) grouped[dateLabel] = [];
    grouped[dateLabel].push(message);
  });

  // Sort groups by date in ascending order (oldest first, newest last)
  return Object.entries(grouped)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()) // Ensure groups (dates) are in ascending order
    .map(([date, messages]) => ({
      date,
      messages: messages.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Sort messages in ascending order
      ),
    }));
});

const isCurrentUser = (senderId: string): boolean => {
  return senderId === currentUserId.value;
};

// Format time from timestamp (e.g., "2:15 PM")
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Check if URL is an image file
const isImageFile = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

// Check if URL is a document file
const isDocumentFile = (url: string): boolean => {
  return /\.(pdf|doc|docx|xls|xlsx)$/i.test(url);
};

watch(
  () => props.allMessages.length, // Watch for new messages
  () => {
    nextTick(() => {
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
      }
    });
  },
  { deep: true }
);
</script>

<style scoped>
.loader {
  border-color: transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}

.reverseorder {
  display: flex;
  flex-direction: column-reverse;
}
</style>
