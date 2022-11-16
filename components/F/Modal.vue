<template>
  <teleport to="body">
    <transition name="fade">
      <div class="fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center" v-show="show">
        <div ref="modal" class="relative rounded-md bg-gray-500 dark:bg-slate-500 p-12">
          <button @click="emits('close')" class="absolute top-3 right-3">
            <x-mark-icon class="w-5 h-5" />
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';
interface Props {
  show: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["close"]);

const modal = ref<HTMLElement>()

onClickOutside(modal, () => {
  emits("close");
})
</script>

<style>
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9998;
  overflow-y: auto;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-content {
  display: inherit;
  z-index: 9999;
  width: auto;
  height: auto;
  background-color: var(--primary-color);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(30, 32, 35, 0.50);
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>