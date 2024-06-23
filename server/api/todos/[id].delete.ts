export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};

  const db = hubDatabase();

  const response = await db
    .prepare("DELETE FROM todos WHERE id = ?1")
    .bind(id)
    .run();

  return response;
});
