<template>
    <main>
      <div class="flex min-h-screen h-full">
        <OnboardingSignup />
        <div class="relative hidden w-0 flex-1 lg:block">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src="@/assets/img/group-study.jpg"
            alt=""
          />
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: "auth",
  });
  </script>
  