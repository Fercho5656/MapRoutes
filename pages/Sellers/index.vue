<template>
  <div>
    <f-modal :show="showSellerModal" @close="showSellerModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Nuevo Vendedor</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre del vendedor</label>
          <input @keyup.enter="onAddSeller" type="text" v-model="sellerName" />
        </div>
        <f-button @click.once="onAddSeller">Añadir Vendedor</f-button>
      </div>
    </f-modal>
    <f-modal :show="showEditSellerModal" @close="showEditSellerModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Editar Vendedor</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre del vendedor</label>
          <input @keyup.enter="onUpdateSeller" type="text" v-model="sellerName" />
        </div>
        <f-button @click.once="onUpdateSeller">Editar Vendedor</f-button>
      </div>
    </f-modal>
    <header class="w-full relative flex gap-x-5 justify-center items-start">
      <nuxt-link to="/" class="absolute left-0">
        <arrow-left-icon class="w-10 h-w-10 dark:text-white" />
      </nuxt-link>
      <h1 class="text-3xl dark:text-gray-200 font-semibold text-center mb-5">Vendedores</h1>
      <f-button @click="showSellerModal = true">Añadir Vendedor</f-button>
      <f-button @click="onDeleteSelected" :disabled="selectedSellers.length <= 0" color="danger">Eliminar
        Vendedores</f-button>
    </header>
    <f-table>
      <f-thead>
        <tr>
          <th scope="col" class="p-4 text-center">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Nombre
          </th>
          <th scope="col" class="py-3 px-6 text-center">
            Acción
          </th>
        </tr>
      </f-thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="seller in sellers" :key="seller.id">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input @click="onAddSelected(seller.id!)" id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ seller.name }}</p>
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="flex items-center justify-around">
              <button @click="onBeforeUpdateSeller(seller.id!)" class="h-7 w-7 text-yellow-500">
                <!-- Modal toggle -->
                <PencilIcon />
              </button>
              <button @click="onDeleteSeller(seller.id!)" class="h-7 w-7 text-red-500">
                <TrashIcon />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </f-table>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import ISeller from '~~/interfaces/ISeller';
import { getSellers, addSeller, deleteSeller, updateSeller } from '~~/services/sellers'
useHead({
  title: 'Vendedores'
})

const sellers = ref<ISeller[]>()
const selectedSellers = ref<number[]>([])
const sellerToEdit = ref<number>()
const showSellerModal = ref<boolean>(false)
const showEditSellerModal = ref<boolean>(false)
const sellerName = ref('')

const onAddSelected = (sellerId: number) => {
  if (selectedSellers.value.includes(sellerId)) {
    selectedSellers.value = selectedSellers.value.filter((id) => id !== sellerId)
  } else {
    selectedSellers.value.push(sellerId)
  }
}

const onDeleteSelected = async () => {
  if (!confirm('¿Estás seguro de eliminar los vendedores seleccionados?')) return
  await Promise.all(selectedSellers.value.map((id) => deleteSeller(id)))
  sellers.value = sellers.value?.filter((seller) => !selectedSellers.value.includes(seller.id!))
  selectedSellers.value = []
}

const onAddSeller = async () => {
  const newSeller = await addSeller({ name: sellerName.value })
  if (newSeller.message) alert(`Error ${newSeller.message}`)
  alert(`Vendedor añadido ${newSeller.name}`)
  sellers.value?.push(newSeller)
  showSellerModal.value = false
  sellerName.value = ''
}

const onBeforeUpdateSeller = (sellerId: number) => {
  sellerName.value = sellers.value?.find((seller) => seller.id === sellerId)?.name || ''
  sellerToEdit.value = sellerId
  showEditSellerModal.value = true
}

const onUpdateSeller = async () => {
  const updatedSeller = await updateSeller(sellerToEdit.value!, { name: sellerName.value })
  if (updatedSeller.message) alert(`Error ${updatedSeller.message}`)
  alert(`Vendedor actualizado ${updatedSeller.name}`)
  sellers.value = sellers.value?.map((seller) => seller.id === sellerToEdit.value ? updatedSeller : seller)
  showEditSellerModal.value = false
  sellerName.value = ''
  sellerToEdit.value = 0
}

const onDeleteSeller = async (sellerId: number) => {
  if (!confirm('¿Estás seguro de eliminar este vendedor?')) return
  const deletedSeller = await deleteSeller(sellerId)
  if (deletedSeller.message) alert(`Error ${deletedSeller.message}`)
  alert(`Vendedor eliminado ${deletedSeller.name}`)
  sellers.value = sellers.value?.filter(seller => seller.id !== sellerId)
}

onMounted(async () => {
  sellers.value = await getSellers()
})
</script>

<style scoped>

</style>