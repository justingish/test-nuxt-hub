<script lang="ts" setup>
async function signup(e: Event) {
  await $fetch("/api/signup", {
    method: "POST",
    body: new FormData(e.target as HTMLFormElement),
  });
  await navigateTo("/");
}
</script>

<template>
  <section>
    <h1>Create an account</h1>
    <form method="post" action="/api/signup" @submit.prevent="signup">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" />
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" />
      <br />
      <button>Continue</button>
    </form>
  </section>
</template>
