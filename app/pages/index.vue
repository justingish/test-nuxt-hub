<script lang="ts" setup>
const { data: user } = useFetch<TodoItem[]>("api/user");
async function logout() {
  await $fetch("/api/logout", {
    method: "POST",
  });
  await navigateTo("/login");
}
</script>

<template>
  <main>
    <div v-if="user">
      <form @submit.prevent="logout">
        <button>Sign out</button>
      </form>
    </div>
    <div v-if="!user">
      <RouterLink to="/signup">Sign up</RouterLink><br />
      <RouterLink to="/login">Log in</RouterLink>
    </div>
    <TodoList />
  </main>
</template>
