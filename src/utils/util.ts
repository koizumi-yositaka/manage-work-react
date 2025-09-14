import { type UserAttribute } from "@/api/authApi";
import { type User } from "@/types/user";

export const userAttributesToUserInfo = (attributes: UserAttribute  ): User => {
    const id = attributes.sub;
    const username = attributes.username;
    const email = attributes.email;
    const roles = attributes.roles.split(",") ?? [];
    const permissions = attributes.permissions.split(",") ?? [];
    console.log(roles,permissions);
    return {
        id: id ?? "",
        username: username ?? email ?? "",
        email: email ?? "",
        roles: roles ?? [],
        permissions: permissions ?? [],
    };
};