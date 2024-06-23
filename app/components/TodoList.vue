<script setup lang="ts">
const newTodo = ref("");
const todos = ref([
  { id: 1, text: "Learn Vue 3", done: true },
  { id: 2, text: "Learn Nuxt 3", done: false },
  { id: 3, text: "Build something awesome", done: false },
]);

const addTodo = () => {
  todos.value.push({
    id: todos.value.length + 1,
    text: newTodo.value,
    done: false,
  });
  newTodo.value = "";
};
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" />

    <button @click="addTodo">Add Todo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" @toggle="todo.done = !todo.done" />
      </li>
    </ul>
  </div>
</template>
