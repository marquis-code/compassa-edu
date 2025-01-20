<template>
  <div class="space-y-6">
    <div class="mx-auto max-w-7xl">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold text-gray-900">Users</h1>
          <p class="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email, and role.
          </p>
        </div>
      </div>
    </div>

    <!-- Table to display users -->
    <div v-if="!loading && users?.users?.length" class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl border-[0.5px] rounded-lg border-gray-100">
        <table class="w-full text-left">
          <thead class="bg-white">
            <tr class="border-b-[0.5px]">
              <th scope="col" class="relative px-6 isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Matric</th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Email</th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Points</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" class="relative px-6 py-3.5 pl-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="even:bg-gray-50" v-for="user in users.users" :key="user.id">
              <td class="relative py-4 px-6 text-sm font-medium text-gray-900">{{ user.name ?? 'Nil' }}</td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ user.matric ?? 'Nil' }}</td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{{ user.email ?? 'Nil' }}</td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{{ user.points ?? 'Nil' }}</td>
              <td class="px-3 py-4 text-sm text-gray-500">{{ user.role ?? 'Nil' }}</td>
              <td class="relative py-4 px-6 text-right text-sm font-medium">
                <NuxtLink :to="`/admin/dashboard/users/${user._id}`" class="text-indigo-600 hover:text-indigo-900">View</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading state -->
    <section v-else-if="loading && !users?.users?.length">
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>

    <!-- No users state -->
    <div v-else class="text-center py-10 flex justify-center items-center flex-col border rounded-md border-gray-100">
      <svg width="153" height="124" viewBox="0 0 153 124" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="76.5" cy="58" r="52" fill="#EAEAEA" />
        <circle cx="21.5" cy="25" r="5" fill="#BDBDBD" />
        <circle cx="18.5" cy="109" r="7" fill="#BDBDBD" />
        <circle cx="145.5" cy="41" r="7" fill="#BDBDBD" />
        <circle cx="134.5" cy="14" r="4" fill="#BDBDBD" />
        <g filter="url(#filter0_b_5289_82141)">
          <rect x="52.5" y="34" width="48" height="48" rx="24" fill="#9D9D9D" />
          <path
            d="M77.0294 48C81.0225 48 83.019 48 84.2595 49.1716C85.5 50.3432 85.5 52.2288 85.5 56V60C85.5 63.7712 85.5 65.6569 84.2595 66.8284C83.019 68 81.0225 68 77.0294 68H75.9706C71.9775 68 69.981 68 68.7405 66.8284C67.5 65.6569 67.5 63.7712 67.5 60V56C67.5 52.2288 67.5 50.3432 68.7405 49.1716C69.981 48 71.9775 48 75.9706 48H77.0294Z"
            stroke="white" stroke-width="2" stroke-linecap="round" />
          <path d="M72.5 53H80.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
          <path d="M72.5 58H80.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
          <path d="M72.5 63H76.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
        </g>
        <defs>
          <filter id="filter0_b_5289_82141" x="44.5" y="26" width="64" height="64" filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5289_82141" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_5289_82141" result="shape" />
          </filter>
        </defs>
      </svg>
      <p class="text-gray-500">No Users Available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetAllMaterialsByUserId } from '@/composables/modules/materials/useGetMaterialsByUserId'
import { useGetUsers } from '@/composables/modules/users/useGetUsers'
const { materials, loading: loadingMaterials } =  useGetAllMaterialsByUserId()

const { users, loading } = useGetUsers()

definePageMeta({
  layout: 'admin',
})
</script>
