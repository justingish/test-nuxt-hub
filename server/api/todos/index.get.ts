export default defineEventHandler(async () => {
  const db = hubDatabase();

  // TODO: move it to a Server Task
  await db.exec(
    "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT, done INTEGER, created_at INTEGER, completed_at INTEGER)"
  );

  const { results } = await db
    .prepare("SELECT * FROM todos ORDER BY done ASC, created_at DESC")
    .all();

  return results;
});
