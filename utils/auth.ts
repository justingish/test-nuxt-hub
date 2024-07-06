import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export interface DatabaseUserAttributes {
  username: string;
}

export function initializeLucia() {
  const db = hubDatabase();
  const adapter = new D1Adapter(db, {
    user: "user",
    session: "session",
  });
  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev,
      },
    },
    getUserAttributes: async (attributes) => {
      return { username: attributes.username };
    },
  });
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
