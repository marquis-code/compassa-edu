<template>
  <main class="space-y-6">
    <dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border rounded-lg">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
        <dt class="text-sm/6 font-medium text-gray-500">Total Users</dt>
        <dd v-if="!loading" class="text-xs font-medium text-gray-700"></dd>
        <dd v-else class="text-xs font-medium text-gray-700">Loading...</dd>
        <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
          {{ users?.users?.length ?? '0' }}
        </dd>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
        <dt class="text-sm/6 font-medium text-gray-500">Total Uploads</dt>
        <dd class="text-xs font-medium text-rose-600"></dd>
        <dd v-if="!loadingMaterials" class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
          {{ materials?.length ?? '0' }}
        </dd>
        <dd v-else class="text-xs font-medium text-gray-700">Loading...</dd>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
        <dt class="text-sm/6 font-medium text-gray-500">Total Points</dt>
        <dd class="text-xs font-medium text-gray-700"></dd>
        <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">0</dd>
      </div>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
        <dt class="text-sm/6 font-medium text-gray-500">Pending Materials</dt>
        <dd v-if="!laodingPendingMaterials" class="text-xs font-medium text-rose-600"></dd>
        <dd v-else class="text-xs font-medium text-gray-700">Loading...</dd>
        <dd class="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
          {{ pendingMaterialsList?.length ?? '0' }}
        </dd>
      </div>
    </dl>

    <AuditTrail  />
  </main>
</template>

<script setup lang="ts">
import { useGetUsers } from '@/composables/modules/users/useGetUsers'
import { useGetPendingMaterials } from '@/composables/modules/materials/useGetPandingMaterials'
import { useGetAllMaterials } from "@/composables/modules/materials/useGetAllMaterials";
// import { useGetAudits } from '@/composables/modules/audit/useGetAudits'

const { users, loading } = useGetUsers()
const { materials: pendingMaterialsList, loading: laodingPendingMaterials } = useGetPendingMaterials()
// const { auditsList, loading: fetchingAudits } = useGetAudits()
const {
  materials,
  loading: loadingMaterials,
  queryParams,
  getAllMaterials,
} = useGetAllMaterials();

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>
