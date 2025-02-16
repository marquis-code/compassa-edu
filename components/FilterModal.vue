 <template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex items-center justify-start">
      <div class="bg-white w-80 h-full shadow-lg p-4 z-50">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">All Groups</h2>
          
          <button @click="$emit('close')" class="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
<section class="overflow-y-auto h-[500px]" v-if="!loading && groups?.length">
    <div v-for="group in groups" :key="group._id" class="p-2 border-b flex justify-between relative items-center">
          <div class="space-y-2 w-full">
            <div class="flex justify-between items-center w-full">
              <p class="font-semibold text-sm">{{ group.name }} <span class="font-bold text-gray-900">({{ group?.members?.length }})</span></p>
           <div>
            <button
                @click="handleGroupAction(group)"
                class="px-3 py-1 text-sm text-white rounded-md"
                :class="isUserInGroup(group) ? 'bg-red-500' : 'bg-green-500'"
              >
                {{ isUserInGroup(group) ? 'Leave' : 'Join' }}
              </button>
              <div class="flex justify-end mt-2 items-end absolute right-3">
              <svg v-if="group.status === 'private'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </div>
           </div>
            </div>
            <p class="text-sm max-w-xs text-gray-500">{{ group.description }}</p>
          </div>
        </div>
</section>
<section v-else-if="loading && !groups?.length">
          <div class="animate-pulse h-72 w-full bg-gray-50 rounded flex space-x-4"></div>
        </section>
<div class="flex justify-center items-center flex-col"  v-else>
    <img src="@/assets/icons/illustration.svg" />
    <p class="text-sm font-semibold">No Groups Available</p>
</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUser } from '@/composables/auth/user'
  import { useGetAllGroups } from "@/composables/modules/group/useGetAllGroups";
  import { useGetUserGroups } from "@/composables/modules/group/useGetUserGroups";
  import { ref } from "vue";
  
  // Assume we get the logged-in user ID from authentication
//   const loggedInUserId = ref(user.value._id); // Replace with actual user ID from auth
  const { user } = useUser()
  
  const emit = defineEmits(["close", "joinGroup", "leaveGroup"]);
  const { groups, loading } = useGetAllGroups();
  const { userGroupsList } = useGetUserGroups();
  
  // Function to check if user is in a group
  const isUserInGroup = (group: any) => {
    return group.members.includes(user.value._id);
  };
  
  const handleGroupAction = (group: any) => {
    if (isUserInGroup(group)) {
    //   if (confirm("Are you sure you want to leave this group?")) {
        emit("leaveGroup", group._id);
    //   }
    } else {
    //   if (confirm("Do you want to join this group?")) {
        emit("joinGroup", group._id);
    //   }
    }
  };
  </script>
  