import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { initializeLucia } from "../../utils/auth";

export default eventHandler(async (event) => {
  const db = hubDatabase();
  await db.exec(
    "CREATE TABLE IF NOT EXISTS user (id TEXT NOT NULL PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS session (id TEXT NOT NULL PRIMARY KEY, expires_at INTEGER NOT NULL, user_id TEXT NOT NULL, FOREIGN KEY (user_id) REFERENCES user (id))"
  );

  const formData = await readFormData(event);
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400,
    });
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  await db
    .prepare(
      "INSERT INTO user (id, username, password_hash) VALUES (?1, ?2, ?3)"
    )
    .bind(userId, username, passwordHash)
    .run();

  const session = await initializeLucia().createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    initializeLucia().createSessionCookie(session.id).serialize()
  );
});
