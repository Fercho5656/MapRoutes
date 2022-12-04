<template>
  <div class="h-1/2 p-5 grid grid-cols-2 sm:grid-cols-3 gap-5">
    <!-- <button @click="toggleDark()"> 
      Change
    </button> -->
    <card route="/clients">
      <UserGroupIcon v:slot="icon" />
      <p class="font-semibold text-xl">Clientes</p>
    </card>
    <card route="/sellers">
      <UserIcon v:slot="icon" />
      <p class="dark:text-gray-200 font-semibold text-xl">Vendedores</p>
    </card>
    <card route="/routes">
      <MapIcon v:slot="icon" />
      <p class="dark:text-gray-200 font-semibold text-xl">Rutas</p>
    </card>
    <card route="/zones">
      <MapPinIcon v:slot="icon" />
      <p class="dark:text-gray-200 font-semibold text-xl">Zonas</p>
    </card>
    <card route="/products">
      <ArchiveBoxIcon v:slot="icon" />
      <p class="dark:text-gray-200 font-semibold text-xl">Productos</p>
    </card>
  </div>
</template>

<script setup lang="ts">
import { MapIcon, MapPinIcon, UserGroupIcon, UserIcon, ArchiveBoxIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'index',
})
</script>

<style scoped>

</style>