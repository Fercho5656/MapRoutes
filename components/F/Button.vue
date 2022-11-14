<template>
  <button :type="type" :disabled="disabled"
    class="px-5 py-2 font-semibold text-white bg-blue-500 disabled:opacity-50 rounded-md hover:opacity-95 focus:outline-none"
    :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark'
}

const props = defineProps<Props>()

const colors = [
  {
    color: 'primary',
    bg: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
    darkBg: 'dark:bg-blue-600',
    darkHover: 'dark:hover:bg-blue-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-blue-600 dark:disabled:hover:bg-blue-600',
  },
  {
    color: 'secondary',
    bg: 'bg-gray-500 disabled:bg-gray-400',
    hover: 'hover:bg-gray-600',
    darkBg: 'dark:bg-gray-600 dark:hover:bg-gray-700',
    darkHover: 'dark:hover:bg-gray-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-gray-600 dark:disabled:hover:bg-gray-600',
  },
  {
    color: 'danger',
    bg: 'bg-red-500',
    hover: 'hover:bg-red-600',
    darkBg: 'dark:bg-red-600',
    darkHover: 'dark:hover:bg-red-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-red-600 dark:disabled:hover:bg-red-600'
  },
  {
    color: 'success',
    bg: 'bg-green-500 disabled:bg-green-400',
    hover: 'hover:bg-green-600',
    darkBg: 'dark:bg-green-600 dark:hover:bg-green-700',
    darkHover: 'dark:hover:bg-green-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-green-600 dark:disabled:hover:bg-green-600'
  },
  {
    color: 'warning',
    bg: 'bg-yellow-500 disabled:bg-yellow-400',
    hover: 'hover:bg-yellow-600',
    darkBg: 'dark:bg-yellow-600 dark:hover:bg-yellow-700',
    darkHover: 'dark:hover:bg-yellow-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-yellow-600 dark:disabled:hover:bg-yellow-600'
  },
  {
    color: 'info',
    bg: 'bg-teal-500 disabled:bg-teal-400',
    hover: 'hover:bg-teal-600',
    darkBg: 'dark:bg-teal-600 dark:hover:bg-teal-700',
    darkHover: 'dark:hover:bg-teal-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-teal-600 dark:disabled:hover:bg-teal-600'
  },
  {
    color: 'light',
    bg: 'bg-gray-200 disabled:bg-gray-100',
    hover: 'hover:bg-gray-300',
    darkBg: 'dark:bg-gray-200 dark:hover:bg-gray-300',
    darkHover: 'dark:hover:bg-gray-300',
    text: 'text-gray-700',
    disabled: 'dark:disabled:bg-gray-200 dark:disabled:hover:bg-gray-200'
  },
  {
    color: 'dark',
    bg: 'bg-gray-600 disabled:bg-gray-500',
    hover: 'hover:bg-gray-700',
    darkBg: 'dark:bg-gray-600 dark:hover:bg-gray-700',
    darkHover: 'dark:hover:bg-gray-700',
    text: 'text-gray-50',
    disabled: 'dark:disabled:bg-gray-600 dark:disabled:hover:bg-gray-600'
  },
]

const classes = computed(() => {
  const color = props.color || 'primary'
  const colorObj = colors.find(c => c.color === color)
  return `${colorObj!.bg} ${colorObj!.hover} ${colorObj!.darkBg} ${colorObj!.darkHover} ${colorObj!.text} ${colorObj!.disabled}`
})
</script>

<style scoped>

</style>