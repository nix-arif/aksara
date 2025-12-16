import { ROLE_PERMISSIONS } from "./rolePermissions";

type User = {
  roles: string[]; // e.g. ["finance", "hr"]
  position?: string;
  department?: string;
};

export function getUserPermissions(user: User) {
  const permissionsSet = new Set<string>();

  user.roles.forEach((role) => {
    const rolePerms = ROLE_PERMISSIONS[role];
    if (rolePerms) {
      rolePerms.forEach((p) => permissionsSet.add(p));
    }
  });

  return Array.from(permissionsSet);
}
