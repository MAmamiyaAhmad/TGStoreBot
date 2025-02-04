import Database from "better-sqlite3";
import { User } from "../types/types";
import path from "path";

// Build the path for the database file
const dbPath = path.join(__dirname, "../database/users.db");

// Initialize the database (or open if exists) with the new path
const db = new Database(dbPath, { verbose: console.log });

// Create the users table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        role TEXT,
        language TEXT
    )
`).run();

// Function to get a user by ID
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
            role: user.role || "user", // Default role if not provided
            language: user.language || "english", // Default language if not provided
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
