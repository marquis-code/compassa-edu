<template>
    <div class="border-[0.5px] border-gray-100 rounded-lg">
      <div>
        <h2 class="mx-auto max-w-2xl text-base font-semibold text-gray-900 pt-4 lg:mx-0 lg:max-w-none pl-6">Recent Activity</h2>
      </div>
      <div class="mt-6 overflow-hidden border-t-[0.5px] border-gray-100">
        <div>
          <table class="w-full text-left">
            <tbody>
              <tr v-for="(group, index) in groupedActivities" :key="index" class="text-sm text-gray-900">
                <th scope="colgroup" colspan="4" class="relative isolate py-2 font-semibold bg-gray-50 pl-3">
                  <time :datetime="group.date">{{ group.date }}</time>
                  <div class="absolute inset-y-0 right-full w-screen border-b-[0.5px] border-gray-200"></div>
                  <div class="absolute inset-y-0 left-0 w-screen border-b-[0.5px] border-gray-200"></div>
                </th>
                <section class="w-full border-[0.5px] border-gray-100" v-for="activity in group.activities" :key="activity.id">
                  <tr class="text-sm text-gray-900 w-full">
                    <td class="relative py-5 pr-6 w-1/2">
                      <div class="flex gap-x-6">
                        <svg class="hidden h-6 w-5 flex-none text-gray-400 sm:block" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" />
                        </svg>
                        <div class="flex-auto">
                          <div class="flex items-start gap-x-3">
                            <div class="text-sm font-medium text-gray-900">{{ activity.action }}</div>
                            <div
                              :class="[
                                'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                activity.status === 'Success' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/10',
                              ]"
                            >
                              {{ activity.status }}
                            </div>
                          </div>
                          <div class="mt-1 text-xs text-gray-500">{{ activity.details }}</div>
                        </div>
                      </div>

                    </td>
                    <td class="py-5 pr-6 w-1/2">
                      <div class="flex flex-col justify-center">
                        <div class="text-sm font-medium text-gray-900">{{ activity.user }}</div>
                        <div class="mt-1 text-xs text-gray-500">{{ activity.role }}</div>
                      </div>
                    </td>
                    <td class="py-5 text-right pr-10 w-1/2">
                      <a href="#" class="text-s block font-medium text-indigo-600 hover:text-indigo-500">View<span class="hidden sm:inline"> details</span></a>
                    </td>
                  </tr>
                </section>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  
  interface Activity {
    id: number;
    date: string;
    action: string;
    status: string;
    user: string;
    role: string;
    details: string;
  }
  
  const activities = ref<Activity[]>([
    { id: 1, date: '2025-01-18', action: 'Login', status: 'Success', user: 'John Doe', role: 'Admin', details: 'Logged in to the system' },
    { id: 2, date: '2025-01-18', action: 'Upload Material', status: 'Success', user: 'Jane Smith', role: 'Student', details: 'Uploaded lecture notes for CS315' },
    { id: 3, date: '2025-01-17', action: 'Login', status: 'Success', user: 'Jane Smith', role: 'Student', details: 'Logged in to the system' },
    { id: 4, date: '2025-01-17', action: 'Update Profile', status: 'Failed', user: 'John Doe', role: 'Admin', details: 'Failed to update profile information' },
  ]);
  
  const groupedActivities = computed(() => {
    const groups: Record<string, { date: string; activities: Activity[] }> = {};
    activities.value.forEach((activity) => {
      if (!groups[activity.date]) {
        groups[activity.date] = { date: activity.date, activities: [] };
      }
      groups[activity.date].activities.push(activity);
    });
    return Object.values(groups);
  });
  </script>
  
  <style scoped>
  /* Additional styling can be added as needed */
  </style>
  