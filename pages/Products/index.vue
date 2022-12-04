<template>
  <div>
    <f-modal :show="showProductModal" @close="showProductModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Nuevo Producto</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre del producto</label>
          <input @keyup.enter="onAddProduct" type="text" v-model="productName" />
        </div>
        <f-button @click="onAddProduct">Añadir Producto</f-button>
      </div>
    </f-modal>
    <f-modal :show="showEditProductModal" @close="showEditProductModal = false">
      <div class="flex flex-col gap-y-5">
        <p class="text-center text-2xl dark:text-gray-200">Editar Producto</p>
        <div class="flex gap-x-3">
          <label class="dark:text-gray-200 text-lg">Nombre del producto</label>
          <input @keyup.enter="onUpdateProduct" type="text" v-model="productName" />
        </div>
        <f-button @click="onUpdateProduct">Editar Producto</f-button>
      </div>
    </f-modal>
    <header class="w-full relative flex gap-x-5 justify-center items-start">
      <nuxt-link to="/" class="absolute left-0">
        <arrow-left-icon class="w-10 h-w-10 dark:text-white" />
      </nuxt-link>
      <h1 class="text-3xl dark:text-gray-200 font-semibold text-center mb-5">Productos</h1>
      <f-button @click="showProductModal = true">Añadir Producto</f-button>
      <f-button @click="onDeleteSelected" :disabled="selectedProducts.length <= 0" color="danger">Eliminar
        Productos</f-button>
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
          v-for="product in products" :key="product.id">
          <td class="p-4 w-4">
            <div class="flex items-center">
              <input @click="onAddSelected(product.id!)" id="checkbox-table-search-1" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
            </div>
          </td>
          <td scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
            <div class="pl-3 w-full">
              <p class="text-center text-base font-semibold">{{ product.name }}</p>
            </div>
          </td>
          <td class="py-4 px-6">
            <div class="flex items-center justify-around">
              <button @click="onBeforeUpdateProduct(product.id!)" class="h-7 w-7 text-yellow-500">
                <!-- Modal toggle -->
                <PencilIcon />
              </button>
              <button @click="onDeleteProduct(product.id!)" class="h-7 w-7 text-red-500">
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
import IProduct from '~~/interfaces/IProduct';
import { getProducts, addProduct, deleteProduct, updateProduct } from '~~/services/products'
useHead({
  title: 'Productos'
})

const products = ref<IProduct[]>()
const selectedProducts = ref<number[]>([])
const productToEdit = ref<number>()
const showProductModal = ref<boolean>(false)
const showEditProductModal = ref<boolean>(false)
const productName = ref('')

const onAddSelected = (productId: number) => {
  if (selectedProducts.value.includes(productId)) {
    selectedProducts.value = selectedProducts.value.filter((id) => id !== productId)
  } else {
    selectedProducts.value.push(productId)
  }
}

const onDeleteSelected = async () => {
  if (!confirm('¿Estás seguro de eliminar lps productos seleccionados?')) return
  await Promise.all(selectedProducts.value.map((id) => deleteProduct(id)))
  useToast({
    title: 'Productos eliminados',
    text: 'Los productos seleccionados han sido eliminados',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  products.value = products.value?.filter((product) => !selectedProducts.value.includes(product.id!))
  selectedProducts.value = []
}

const onAddProduct = async () => {
  const newProduct = await addProduct({ name: productName.value })
  if (newProduct.error) {
    return useToast({
      title: 'Error',
      text: newProduct.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }

  useToast({
    title: 'Producto añadido',
    text: 'El producto ha sido añadido correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  products.value?.push(newProduct.data as IProduct)
  showProductModal.value = false
  productName.value = ''
}

const onBeforeUpdateProduct = (productId: number) => {
  productName.value = products.value?.find((product) => product.id === productId)?.name || ''
  productToEdit.value = productId
  showEditProductModal.value = true
}

const onUpdateProduct = async () => {
  const updatedProduct = await updateProduct(productToEdit.value!, { name: productName.value })
  if (updatedProduct.error) {
    return useToast({
      title: 'Error',
      text: updatedProduct.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Producto actualizado',
    text: 'El producto ha sido actualizado correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  products.value = products.value?.map((product: IProduct) => product.id === productToEdit.value ? updatedProduct.data as IProduct : product)
  showEditProductModal.value = false
  productName.value = ''
  productToEdit.value = 0
}

const onDeleteProduct = async (productId: number) => {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return
  const deletedProduct = await deleteProduct(productId)
  if (deletedProduct.error) {
    return useToast({
      title: 'Error',
      text: deletedProduct.error.message,
      status: 'error',
      autotimeout: 5000,
      autoclose: true,
    })
  }
  useToast({
    title: 'Producto eliminado',
    text: 'El producto ha sido eliminado correctamente',
    status: 'success',
    autotimeout: 5000,
    autoclose: true,
  })
  products.value = products.value?.filter(product => product.id !== productId)
}

onMounted(async () => {
  products.value = await getProducts().then((res) => res.data as IProduct[])
})
</script>

<style scoped>

</style>