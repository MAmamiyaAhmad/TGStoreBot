import Database from "better-sqlite3";
import { User } from "../types/types";
// Initialize the database (or open if exists)
const db = new Database("users.db", { verbose: console.log });

// Create the users table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        role TEXT,
        language TEXT
    )
`).run();

// Function to get a user by ID
// Contoh penyimpanan user di database
const users: Map<number, User> = new Map();

export function getUser(userId: number): User | undefined {
    return users.get(userId);
}

export function saveUser(userId: number, user: Partial<User>) {
    let existingUser = users.get(userId);

    if (existingUser) {
        // Update existing user
        existingUser = { ...existingUser, ...user };
    } else {
        // Ensure `existingUser` is fully typed
        existingUser = {
            userId,
            role: user.role || "user", // Default role jika tidak ada
            language: user.language || "english", // Default language jika tidak ada
        };
    }

    users.set(userId, existingUser);
}

// Function to set or update the user's language
export function setUserLanguage(userId: number, language: string) {
    const stmt = db.prepare("INSERT OR REPLACE INTO users (user_id, language) VALUES (?, ?)");
    stmt.run(userId, language);
}

// Function to set the user role
export function setUserRole(userId: number, role: string) {
    const stmt = db.prepare("INSERT OR REPLACE INTO users (user_id, role) VALUES (?, ?)");
    stmt.run(userId, role);
}

export default db;
