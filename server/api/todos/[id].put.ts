export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  const { done } = await readBody(event).catch(() => {});

  const db = hubDatabase();

  const response = await db
    .prepare("UPDATE todos SET done = ?1, completed_at = ?2 WHERE id = ?3")
    .bind(done, done ? Date.now() : null, id)
    .run();

  return response;
});
