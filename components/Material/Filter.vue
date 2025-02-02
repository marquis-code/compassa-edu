<template>
  <div class="p-6 bg-white rounded-xl shadow-md space-y-4">
    <!-- Academic Level Filter -->
    <div class="border-[0.5px] border-gray-200 rounded-lg bg-white">

      <fieldset>
        <legend class="text-sm/6 font-semibold text-gray-900">
          Select academic level
        </legend>
        <div
          class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
        <div
  v-for="(item, idx) in academicLevelArray"
  :key="idx"
  class="relative flex items-start py-4"
>
  <div class="min-w-0 flex-1 text-sm/6">
    <label
      :for="`academic-level-${idx}`"
      class="select-none font-medium text-gray-900"
    >
      {{ item.label ?? "Nil" }}
    </label>
  </div>
  <div class="ml-3 flex h-6 items-center">
    <input
      v-model="queryParams.academicLevel"
      :id="`academic-level-${idx}`"
      :name="`academic-level`"
      type="radio"
      :value="item.key"
      class="relative h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
    />
  </div>
</div>

        </div>
      </fieldset>
    </div>

    <!-- Semester Filter -->
    <div class="border-[0.5px] border-gray-200 rounded-lg bg-white">
      <fieldset>
        <legend class="text-sm/6 font-semibold text-gray-900">
          Select semseter
        </legend>
        <div
          class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
        <div
  v-for="(item, idx) in semesterArray"
  :key="idx"
  class="relative flex items-start py-4"
>
  <div class="min-w-0 flex-1 text-sm/6">
    <label
      :for="`semester-${idx}`"
      class="select-none font-medium text-gray-900"
    >
      {{ item?.label ?? "Nil" }}
    </label>
  </div>
  <div class="ml-3 flex h-6 items-center">
    <input
      v-model="queryParams.semester"
      :id="`semester-${idx}`"
      name="semester"
      type="radio"
      :value="item.key"
      class="relative h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
    />
  </div>
</div>

        </div>
      </fieldset>
    </div>

    <!-- Material Type Filter -->
    <div class="border-[0.5px] border-gray-200 rounded-lg bg-white">
      <fieldset>
        <legend class="text-sm/6 font-semibold text-gray-900">
          Select Material Type
        </legend>
        <div
          class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
        <div
  v-for="(item, idx) in materialTypeArray"
  :key="idx"
  class="relative flex items-start py-4"
>
  <div class="min-w-0 flex-1 text-sm/6">
    <label
      :for="`material-type-${idx}`"
      class="select-none font-medium text-gray-900"
    >
      {{ item.label ?? "Nil" }}
    </label>
  </div>
  <div class="ml-3 flex h-6 items-center">
    <input
      v-model="queryParams.materialType"
      :id="`material-type-${idx}`"
      name="materialType"
      type="radio"
      :value="item.key"
      class="relative h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
    />
  </div>
</div>

        </div>
      </fieldset>
    </div>

    <!-- Status Filter -->
    <div class="border-[0.5px] border-gray-200 rounded-lg bg-white">
      <fieldset>
        <legend class="text-sm/6 font-semibold text-gray-900">
          Select a sttaus
        </legend>
        <div
          class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
        <div
  v-for="(item, idx) in statusArray"
  :key="idx"
  class="relative flex items-start py-4"
>
  <div class="min-w-0 flex-1 text-sm/6">
    <label
      :for="`status-${idx}`"
      class="select-none font-medium text-gray-900"
    >
      {{ item.label ?? "Nil" }}
    </label>
  </div>
  <div class="ml-3 flex h-6 items-center">
    <input
      v-model="queryParams.status"
      :id="`status-${idx}`"
      name="status"
      type="radio"
      :value="item.key"
      class="relative h-4 w-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
    />
  </div>
</div>

        </div>
      </fieldset>
    </div>

    <!-- Submit Button -->
    <button
      @click="submitFilter"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700"
    >
      Submit Filter
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useGetAllMaterials } from '@/composables/modules/materials/useGetAllMaterials'
const { materials, loading, queryParams,  getAllMaterials } = useGetAllMaterials()
import { ref } from "vue";

//                                                
const academicLevelArray = ref([
  { label: "100 Level", key: "100" },
  { label: "200 Level", key: "200" },
  { label: "300 Level", key: "300" },
  { label: "400 Level", key: "400" },
  { label: "500 Level", key: "500" },
  { label: "600 Level", key: "600" },
]);

const semesterArray = ref([
  { label: "First Semester", key: "first" },
  { label: "Second Semester", key: "second" },
]);

const materialTypeArray = ref([
  { label: "Lecture Notes", key: "notes" },
  { label: "Past Questions", key: "questions" },
  { label: "Assignments", key: "assignments" },
  { label: "Personal notes", key: "personal_note" },
  { label: "Drawings and diagrams", key: "drawings_and_diagrams" },
]);

const statusArray = ref([
  { label: "Approved", key: "approved" },
  { label: "Pending", key: "pending" },
  { label: "Rejected", key: "rejected" },
]);

const submitFilter = () => {
  console.log("Submitted Filter Options:", queryParams.value);
  // Submit `queryParams.value` to your backend API.
};
</script>
