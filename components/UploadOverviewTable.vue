<script setup lang="ts">
import { ref } from 'vue';

type Material = {
  _id: string;
  name: string;
  description: string;
  fileUrl: string;
  status: string;
  user: string;
  academicLevel: string;
  semester: string;
  materialType: string;
  createdAt?: string;
};

const materials: Material[] = [
  {
    _id: '1',
    name: 'Anatomy Past Questions',
    description: 'Comprehensive Anatomy questions from 2020-2022',
    fileUrl: 'https://example.com/anatomy.pdf',
    status: 'approved',
    user: 'user1',
    academicLevel: '600',
    semester: 'first',
    materialType: 'PastQuestion',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Physiology Cheat Sheet',
    description: 'Quick revision guide for Physiology',
    fileUrl: 'https://example.com/physiology.pdf',
    status: 'pending',
    user: 'user2',
    academicLevel: '500',
    semester: 'second',
    materialType: 'CheatSheet',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    _id: '3',
    name: 'Biochemistry Notes',
    description: 'In-depth Biochemistry study material',
    fileUrl: 'https://example.com/biochemistry.pdf',
    status: 'approved',
    user: 'user3',
    academicLevel: '400',
    semester: 'second',
    materialType: 'Notes',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), // Two days ago
  },
];

const groupByDate = (materials: Material[]) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return materials.reduce((grouped: Record<string, Material[]>, material) => {
    const createdAt = material.createdAt ? new Date(material.createdAt) : new Date();

    const dateKey = (() => {
      if (createdAt.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (createdAt.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return createdAt.toDateString();
      }
    })();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(material);
    return grouped;
  }, {});
};

const groupedMaterials = ref(groupByDate(materials));
</script>

<template>
  <div class="mx-auto max-w-7xl bg-white rounded-lg border-[0.5px] border-gray-100">
    <h2 class="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 pt-3 pl-6 lg:max-w-none">Recent Activity</h2>
    <div class="mt-6 overflow-hidden border-t border-gray-100">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <table class="w-full text-left">
            <thead class="sr-only">
              <tr>
                <th>Material</th>
                <th class="hidden sm:table-cell">Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(materials, dateKey) in groupedMaterials" :key="dateKey">
                <tr class="text-sm/6 text-gray-900">
                  <th scope="colgroup" colspan="3" class="relative isolate py-2 font-semibold">
                    <time>{{ dateKey }}</time>
                    <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50"></div>
                    <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50"></div>
                  </th>
                </tr>
                <tr v-for="material in materials" :key="material._id">
                  <td class="relative py-5 pr-6">
                    <div class="flex gap-x-6">
                      <div class="flex-auto">
                        <div class="flex items-start gap-x-3">
                          <div class="text-sm/6 font-medium text-gray-900">{{ material.name }}</div>
                          <div
                            :class="`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${material.status === 'approved' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`"
                          >
                            {{ material.status.charAt(0).toUpperCase() + material.status.slice(1) }}
                          </div>
                        </div>
                        <div class="mt-1 text-xs/5 text-gray-500">{{ material.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="hidden py-5 pr-6 sm:table-cell">
                    <div class="text-sm/6 text-gray-900">Level: {{ material.academicLevel }}</div>
                    <div class="mt-1 text-xs/5 text-gray-500">Semester: {{ material.semester }}</div>
                  </td>
                  <td class="py-5 text-right">
                    <div class="flex justify-end">
                      <a :href="material.fileUrl" target="_blank" class="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">View<span class="hidden sm:inline"> material</span></a>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Tailwind CSS is already included via Nuxt config */
</style>
