import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"

type Schema = typeof schema

let _db: NeonHttpDatabase<Schema> | undefined

export const getDb = (): NeonHttpDatabase<Schema> => {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
          "Create a .env.local file with DATABASE_URL. " +
          "See .env.local.example for details.",
      )
    }
    const sql = neon(process.env.DATABASE_URL)
    _db = drizzle(sql, { schema })
  }
  return _db
}

// Proxy so existing `db.query.*` usage still works
export const db = new Proxy({} as NeonHttpDatabase<Schema>, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getDb(), prop)
  },
})
