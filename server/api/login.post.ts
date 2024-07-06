import { verify } from "@node-rs/argon2";
import { initializeLucia } from "../../utils/auth";

export default eventHandler(async (event) => {
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

  const existingUser: Record<string, string> | null = await hubDatabase()
    .prepare("SELECT * FROM user WHERE username = ?")
    .bind(username)
    .first();

  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is non-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const session = await initializeLucia().createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    initializeLucia().createSessionCookie(session.id).serialize()
  );
});
