<template>
            <div>
  <h3 class="text-base font-semibold text-gray-900">{{ greeting }}, {{ user?.name }}</h3>

  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow border-[0.5px] border-gray-200 sm:px-6 sm:pt-6">
      <dt>
        <div class="absolute rounded-md">
         <img src="@/assets/icons/uploaded-materials.svg" class="h-12 w-12" />
        </div>
        <p class="ml-16 truncate text-sm font-medium text-gray-500">Total Uploaded Materials</p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p class="text-2xl font-semibold text-gray-900"> {{ materialsList?.length ?? '0' }}</p>
        <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
          <svg class="size-5 shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only"> Increased by </span>
          {{ materialsList?.length ?? '0' }}
        </p>
        <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <NuxtLink to="/dashboard/all-uploads" class="font-medium text-[#5B8469] ">View all<span class="sr-only"> Total Subscribers stats</span></NuxtLink>
          </div>
        </div>
      </dd>
    </div>
    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5  border-[0.5px] border-gray-200 sm:px-6 sm:pt-6">
      <dt>
        <div class="absolute rounded-md">
          <img src="@/assets/icons/uploaded-materials.svg" class="h-12 w-12" />
        </div>
        <p class="ml-16 truncate text-sm font-medium text-gray-500">My Materials</p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p class="text-2xl font-semibold text-gray-900">{{ materials?.length ?? '0' }}</p>
        <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
          <svg class="size-5 shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only"> Increased by </span>
          5.4%
        </p>
        <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <NuxtLink to="/dashboard/my-uploads" class="font-medium text-[#5B8469] ">View all<span class="sr-only"> Avg. Open Rate stats</span></NuxtLink>
          </div>
        </div>
      </dd>
    </div>
    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow border-[0.5px] border-gray-200 sm:px-6 sm:pt-6">
      <dt>
        <div class="absolute rounded-md">
          <img src="@/assets/icons/points.svg" class="h-12 w-12" />
        </div>
        <p class="ml-16 truncate text-sm font-medium text-gray-500">COMPSSA Points</p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p class="text-2xl font-semibold text-gray-900"> {{ user.points ?? 0 }}</p>
        <p class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
          <svg class="size-5 shrink-0 self-center text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only"> Decreased by </span>
          3.2%
        </p>
        <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div class="text-sm">
            <a href="#" class="font-medium text-[#5B8469] ">View breakdown</a>
          </div>
        </div>
      </dd>
    </div>
  </dl>
 </div>
</template>

<script setup lang="ts">
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials'
import { useUser } from '@/composables/auth/user'
import { useGreeting } from '@/composables/core/useGreeting'
import { useGetUserMaterials } from '@/composables/modules/materials/useGetUserMaterials'
const { materials: materialsList, loading: loadingAllMaterials, queryParams, getAllMaterials } = useGetAllMaterials()
const { materials, loading, } = useGetUserMaterials()
const { greeting } = useGreeting()
const { user } = useUser()
</script>