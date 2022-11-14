<template>
  <nuxt-link :to="route"
    class="p-3 text-gray-200 bg-gray-500 dark:bg-slate-500 rounded-md flex flex-col items-center justify-center">
    <slot name="icon" />
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
interface Props {
  route: string
}
const props = defineProps<Props>()
</script>

<style scoped>

</style>