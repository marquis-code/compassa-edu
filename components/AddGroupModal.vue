<!-- <template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 class="text-lg font-bold mb-4">Create A New Group</h2>
  
        <div class="space-y-3">
          <input v-model="payload.name" type="text" placeholder="Group Name" 
                 class="w-full text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg mb-2" />
  
          <textarea v-model="payload.description" cols="10" rows="3" placeholder="Group Description" 
                    class="w-full resize-none text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg mb-2"></textarea>
  
          <div class="flex items-center mb-4">
            <input type="checkbox" v-model="payload.status" true-value="private" false-value="public" class="mr-2" />
            <label class="text-sm">Private Group</label>
          </div>
  

          <div v-if="payload.status === 'private'" class="flex items-center mb-4">
            <input type="checkbox" v-model="payload.generateInvite" class="mr-2" />
            <label class="text-sm">Generate Invite Link</label>
          </div>
        </div>
  
        <div class="flex justify-end gap-6 pt-10">
          <button @click="$emit('close')" class="px-4 py-2.5 w-full bg-gray-300 rounded-lg text-sm">Cancel</button>
          <button :disabled="loading || !payload.name" @click="createGroup" 
                  class="px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-25 w-full bg-blue-500 text-white rounded-lg text-sm">
            {{ loading ? 'Processing..' : 'Create' }}
          </button>
        </div>
  

        <div v-if="inviteLink" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p>Invite Link:</p>
          <input type="text" v-model="inviteLink" readonly class="w-full border px-2 py-1 rounded-lg text-sm" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCreateGroup } from "@/composables/modules/group/useCreateGroup";
  
  const { payload, loading, inviteLink, createGroup } = useCreateGroup();
  </script>
   -->

   <template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div class="bg-white p-6 rounded-lg w-96 max-w-full shadow-lg">
        <h2 class="text-lg font-bold mb-4">Create A New Group</h2>
  
        <div class="space-y-3">
          <input v-model="payload.name" type="text" placeholder="Group Name" 
                 class="w-full text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg" />
  
          <textarea v-model="payload.description" cols="10" rows="3" placeholder="Group Description" 
                    class="w-full resize-none text-sm px-4 py-3 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg"></textarea>
  
          <div class="flex items-center justify-between mb-4">
            <label class="text-sm">Private Group</label>
            <input type="checkbox" v-model="isPrivate" class="toggle-checkbox" />
          </div>
  
          <!-- Show invite option if the group is private -->
          <div v-if="isPrivate" class="flex items-center justify-between mb-4">
            <label class="text-sm">Generate Invite Link</label>
            <input type="checkbox" v-model="useInviteLink" class="toggle-checkbox" />
          </div>
  
          <!-- Show manual addition input if not using invite link -->
          <div v-if="isPrivate && !useInviteLink" class="mb-4">
            <label class="text-sm block mb-2">Add Members (Matric Numbers)</label>
            <input type="text" v-model="matricInput" @keyup.enter="addMatricNumber" 
                   placeholder="Enter Matric Number & Press Enter" 
                   class="w-full text-sm px-4 py-2 outline-none border-[0.5px] focus:border-green-500 bg-gray-25 border rounded-lg" />
            <div class="mt-2 space-y-1">
              <span v-for="(matric, index) in payload.matricNumbers" :key="index" 
                    class="text-sm bg-gray-200 px-2 py-1 rounded-full inline-block mr-2">
                {{ matric }} <button @click="removeMatricNumber(index)" class="text-red-500 ml-1">&times;</button>
              </span>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end gap-6 pt-6">
          <button @click="$emit('close')" class="px-4 py-2.5 w-full bg-gray-300 rounded-lg text-sm">Cancel</button>
          <button :disabled="loading || !payload.name" @click="createGroupHandler" 
                  class="px-4 py-2.5 disabled:cursor-not-allowed disabled:opacity-25 w-full bg-blue-500 text-white rounded-lg text-sm">
            {{ loading ? 'Processing..' : 'Create' }}
          </button>
        </div>
  
        <!-- Show invite link modal if generated -->
        <div v-if="inviteLink" class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p>Invite Link:</p>
          <input type="text" v-model="inviteLink" readonly class="w-full border px-2 py-1 rounded-lg text-sm" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useCreateGroup } from "@/composables/modules/group/useCreateGroup";
  import { useCreateGroupWithMembers } from "@/composables/modules/group/useCreateGroupWithMembers";
  
  const isPrivate = ref(false);
  const useInviteLink = ref(false);
  const matricInput = ref("");
  
  const { payload, setSingleCreatePayload, loading, inviteLink, createGroup } = useCreateGroup();
  const { setPayloadObj, createGroupWithMembers } = useCreateGroupWithMembers();
  
  // Adjust payload dynamically based on selections
  payload.value = {
    name: "",
    description: "",
    status: computed(() => (isPrivate.value ? "private" : "public")),
    matricNumbers: [],
  };
  
  const addMatricNumber = () => {
    if (matricInput.value.trim()) {
      payload.value.matricNumbers.push(matricInput.value.trim());
      matricInput.value = "";
    }
  };
  
  const removeMatricNumber = (index) => {
    payload.value.matricNumbers.splice(index, 1);
  };

  const emit = defineEmits(['close'])
  
  const createGroupHandler = async () => {
    if (isPrivate.value && !useInviteLink.value) {
      const payloadObj = {
        name: payload.value.name,
        description: payload.value.description,
        status: payload.value.status,
        matricNumbers: payload.value.matricNumbers
      }
      setPayloadObj(payloadObj)
      await createGroupWithMembers();
      emit('close')
    } else {
      const payloadObj = {
        name: payload.value.name,
        description: payload.value.description,
        status: payload.value.status,
      }
      setSingleCreatePayload(payloadObj)
      await createGroup();
      emit('close')
    }
  };
  </script>
  
  <style scoped>
  .toggle-checkbox {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
  </style>
  