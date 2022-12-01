<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import TodoListVue from './components/TodoList.vue';
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <TodoListVue />
  <div class="run">运行成功</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  .run::before{
    content: "";
    display: inline-block;
    box-sizing: content-box;
    background-color: #7863FB;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-clip: padding-box;
    border: 3px solid rgba(104, 99, 251, 0.2);
    margin-right:8px
  }
</style>
