<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['onClick'])

let filterText = ref('')


const onClick = (e: MouseEvent) => {
  emit('onClick', filterText.value)
  filterText.value = ''
}

const onChange = (e: Event) => {
  //这里没有使用vue的双向绑定,而是想react中一样,自己做input事件的监听
  filterText.value = (e.target as HTMLInputElement).value
  // console.log(e.target!.value)
}
</script>

<template>
   <div class='flex gap-4 my-3 justify-between'>
      <input type='text' :value='filterText' @input='onChange' class="px-3 grow border-solid border-gray-400/50 rounded-12px h-42px outline-none focus:border-orange-500/30 text-18px text-gray-300"/>
      <button @click='onClick' class="btn px-8 rounded-20px">增加</button>
    </div>
</template>

<style scoped>

</style>
