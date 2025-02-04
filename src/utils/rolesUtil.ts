const userRoles = new Map<number, string>();

export function getUserRole(userId: number): string {
    return userRoles.get(userId) || "user";
}

export function setUserRole(userId: number, role: string): void {
    userRoles.set(userId, role);
}
