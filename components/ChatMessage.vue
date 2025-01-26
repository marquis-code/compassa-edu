<!-- <template>
  <div class="flex flex-col space-y-4 p-4">
    <template v-for="message in sortedMessages" :key="message._id">
      <div :class="[
        'flex w-full',
        isCurrentUser(message.sender._id) ? 'justify-end' : 'justify-start'
      ]">
        <div :class="[
          'max-w-[70%] rounded-lg p-3',
          isCurrentUser(message.sender._id) 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        ]">

          <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
          <div v-if="message.attachments?.length" class="mt-4 space-y-4">
  <div
    v-for="(attachment, index) in message.attachments"
    :key="index"
    class="flex items-center space-x-4 p-3 bg-gray-50 shadow-sm rounded-lg"
  >

          <div class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            <div v-if="isImageFile(attachment)" class="w-full h-full">
              <img
                :src="attachment"
                class="w-full h-full object-cover"
                alt="Attachment"
                @error="handleImageError"
              />
            </div>
            <div v-else-if="isDocumentFile(attachment)" class="text-4xl text-gray-500">
              <img src="@/assets/icons/pdf.svg"  class="w-full h-full object-cover" />
            </div>
            <div v-else class="text-4xl text-gray-500">
              <img src="@/assets/icons/music.svg"  class="w-full h-full object-cover" />
            </div>
          </div>


            <div class="flex-1">
              <a
                :href="attachment"
                target="_blank"
                class="text-base font-medium text-indigo-600  truncate block"
              >
              <p class="text-sm text-gray-500">Click to preview or download</p>

              </a>
            </div>
          </div>
        </div>


          <div class="flex items-center justify-between text-xs mt-1" :class="[
            isCurrentUser(message.sender._id) 
              ? 'text-white text-opacity-70' 
              : 'text-gray-500'
          ]">
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg
                v-else-if="message.status === 'delivered'"
                class="w-4 h-4 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  messages: Message[],
  uploadingFile: {
    type: Boolean,
    default: false
  },
  creating: {
    type: Boolean,
    default: false
  }
}>();

const currentUserId = useState('currentUserId', () => {
  return localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}')._id 
    : null;
});

const sortedMessages = computed(() => {
  return [...props.messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
});

const isCurrentUser = (senderId: string): boolean => {
  return senderId === currentUserId.value;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

const isImageFile = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const isDocumentFile = (url: string): boolean => {
  return /\.(pdf|doc|docx|xls|xlsx)$/i.test(url);
};

const getFileName = (url: string): string => {
  return url.split('/').pop() || 'file';
};
</script>

<style scoped>
.loader {
  border-color: transparent;
  border-top-color: currentColor;
  border-radius: 50%;
}
</style> -->

<template>
  <div class="flex flex-col space-y-4 p-4">
    <template v-for="(group, index) in groupedMessages" :key="index">
      <div class="text-center text-sm text-gray-500 my-2">
        {{ group.date }}
      </div>
      <template v-for="message in group.messages" :key="message._id">
        <div :class="[
          'flex w-full',
          isCurrentUser(message.sender._id) ? 'justify-end' : 'justify-start'
        ]">
          <div :class="[
            'max-w-[70%] rounded-lg p-3',
            isCurrentUser(message.sender._id) 
              ? 'bg-blue-500 text-white rounded-br-none' 
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          ]">
            <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
            <div v-if="message.attachments?.length" class="mt-4 space-y-4">
              <div
                v-for="(attachment, index) in message.attachments"
                :key="index"
                class="flex items-center space-x-4 p-3 bg-gray-50 shadow-sm rounded-lg"
              >
                <div class="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  <div v-if="isImageFile(attachment)" class="w-full h-full">
                    <img
                      :src="attachment"
                      class="w-full h-full object-cover"
                      alt="Attachment"
                      @error="handleImageError"
                    />
                  </div>
                  <div v-else-if="isDocumentFile(attachment)" class="text-4xl text-gray-500">
                    <img src="@/assets/icons/pdf.svg" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="text-4xl text-gray-500">
                    <img src="@/assets/icons/music.svg" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="flex-1">
                  <a
                    :href="attachment"
                    target="_blank"
                    class="text-base font-medium text-indigo-600 truncate block"
                  >
                    <p class="text-sm text-gray-500">Click to preview or download</p>
                  </a>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs mt-1" :class="[
              isCurrentUser(message.sender._id) 
                ? 'text-white text-opacity-70' 
                : 'text-gray-500'
            ]">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg
                  v-else-if="message.status === 'delivered'"
                  class="w-4 h-4 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg
                  v-else-if="message.status === 'read'"
                  class="w-4 h-4 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </template>
    </template>
    <div v-if="uploadingFile" class="flex justify-center mt-4">
      <div class="loader w-8 h-8 border-4 border-blue-500"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const props = defineProps<{
  messages: Message[],
  uploadingFile: {
    type: Boolean,
    default: false
  },
  creating: {
    type: Boolean,
    default: false
  }}>();

const currentUserId = useState('currentUserId', () => {
  return localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}')._id 
    : null;
});

const groupedMessages = computed(() => {
  const grouped: Record<string, Message[]> = {};
  props.messages.forEach((message) => {
    const date = moment(message.createdAt).format("LL");
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(message);
  });
  return Object.entries(grouped).map(([date, messages]) => ({
    date,
    messages: messages.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ),
  }));
});

const isCurrentUser = (senderId: string): boolean => {
  return senderId === currentUserId.value;
};

const formatDate = (dateString: string): string => {
  return moment(dateString).format("h:mm A");
};

const isImageFile = (url: string): boolean => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const isDocumentFile = (url: string): boolean => {
  return /\.(pdf|doc|docx|xls|xlsx)$/i.test(url);
};
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
</style>
