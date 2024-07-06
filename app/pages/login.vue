<script lang="ts" setup>
async function login(e: Event) {
  await $fetch("/api/login", {
    method: "POST",
    body: new FormData(e.target as HTMLFormElement),
  });
  await navigateTo("/");
}
</script>

<template>
  <section>
    <h1>Sign in</h1>
    <form method="post" action="/api/login" @submit.prevent="login">
      <label htmlFor="username">Username</label>
      <input name="username" id="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <br />
      <button>Continue</button>
    </form>
  </section>
</template>
