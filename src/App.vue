<script setup lang="ts">
import { ThemeProvider } from './components/theme'
</script>

<template>
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>
