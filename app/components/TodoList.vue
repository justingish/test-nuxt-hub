<script setup lang="ts">
const newTodo = ref("");
const { data: todos, refresh } = useFetch<TodoItem[]>("api/todos");

const addTodo = () => {
  if (!newTodo.value.trim()) return;
  $fetch("api/todos", {
    method: "POST",
    body: {
      text: newTodo.value,
    },
  });

  newTodo.value = "";
  refresh();
};

const toggleTodo = (todo: TodoItem) => {
  $fetch(`api/todos/${todo.id}`, {
    method: "PUT",
    body: {
      done: !todo.done,
    },
  });
  refresh();
};

const deleteTodo = (todo: TodoItem) => {
  $fetch(`api/todos/${todo.id}`, {
    method: "DELETE",
  });
  refresh();
};

onMounted(() => {
  // Why do I have to do this?
  refresh();
});
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" />

    <button @click="addTodo">Add Todo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem
          :todo="todo"
          @toggle="toggleTodo(todo)"
          @delete="deleteTodo(todo)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 16px;
}
</style>
