// TODO: Why isn't this being called

export default defineNuxtRouteMiddleware(async () => {
  console.log("auth.global.ts");
  const user = useUser();
  const data = await useRequestFetch()("/api/user");
  if (data) {
    user.value = data;
  }
});
