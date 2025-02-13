<template>
    <main>
      <OnboardingAdminLogin />
    </main>
      
      </template>
      
      
      <script setup lang="ts">
      definePageMeta({
          layout: 'auth',
          middleware: 'admin'
      })
      </script>