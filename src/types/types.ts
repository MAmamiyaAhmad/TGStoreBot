export interface User {
    userId: number;
    language: string;
    role?: "admin" | "super_admin" | "user"; // Jika ada role
}
