import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { User } from "../types/types";

// Pastikan folder database ada
const dbFolder = path.join(__dirname, "database");
const dbPath = path.join(dbFolder, "users.db");

// Jika folder tidak ada, buat foldernya
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// Inisialisasi database (gunakan path yang benar)
const db = new Database(dbPath, { verbose: console.log });

// Buat tabel users jika belum ada
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        role TEXT DEFAULT 'user',
        language TEXT DEFAULT 'english'
    )
`).run();

console.log("✅ Database loaded from:", dbPath);

// Fungsi mendapatkan user dari database
export function getUser(userId: number): User | undefined {
    const stmt = db.prepare("SELECT * FROM users WHERE user_id = ?");
    return stmt.get(userId) as User | undefined;
}

// Fungsi menyimpan atau memperbarui user
export function saveUser(userId: number, user: Partial<User>) {
    const stmt = db.prepare(`
        INSERT INTO users (user_id, role, language)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
        role = excluded.role,
        language = excluded.language
    `);
    stmt.run(userId, user.role || "user", user.language || "english");
}

// Fungsi mengubah bahasa user
export function setUserLanguage(userId: number, language: string) {
    const stmt = db.prepare("UPDATE users SET language = ? WHERE user_id = ?");
    stmt.run(language, userId);
}

// Fungsi mengubah role user
export function setUserRole(userId: number, role: string) {
    const stmt = db.prepare("UPDATE users SET role = ? WHERE user_id = ?");
    stmt.run(role, userId);
}

export default db;
