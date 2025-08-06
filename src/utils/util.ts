import { type UserAttribute } from "@/api/authApi";
import { type User } from "@/types/user";

export const userAttributesToUserInfo = (attributes: UserAttribute[]): User => {
    const id = attributes.find((attr) => attr.Name === "sub")?.Value;
    const username = attributes.find((attr) => attr.Name === "username")?.Value;
    const email = attributes.find((attr) => attr.Name === "email")?.Value;
    const roles = attributes.find((attr) => attr.Name === "custom:roles")?.Value.split(",") ?? [];
    const permissions = attributes.find((attr) => attr.Name === "custom:permissions")?.Value.split(",") ?? [];
    console.log(roles,permissions);
    return {
        id: id ?? "",
        username: username ?? email ?? "",
        email: email ?? "",
        roles: roles ?? [],
        permissions: permissions ?? [],
    };
};