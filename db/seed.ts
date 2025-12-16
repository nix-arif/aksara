import { InferInsertModel } from "drizzle-orm";
import { db } from ".";
import {
  departments,
  permissions,
  positions,
  rolePermissions,
  roles,
} from "./schema";

type NewRolePermission = InferInsertModel<typeof rolePermissions>;

const initialRoles = [
  { name: "superadmin", description: "full global access" },
  { name: "admin", description: "management access" },
  { name: "staff", description: "standard access" },
  { name: "notassign", description: "no access" },
];

const initialPermissions = [
  // Global Permission (superadmin)
  { name: "global:manage_companies", description: "create & delete companies" },
  // Management Permission (superadmin & admin)
  {
    name: "user:assign_role",
    description: "assign role, department, position for staff",
  },
  {
    name: "user:read_all_in_company",
    description: "read access for all users in companies",
  },
  // Dashboard & UI Permissions
  {
    name: "dashboard:view_analytics",
    description: "view metric and analytics",
  },
  { name: "ui:view_admin_menu", description: "View adminstrative menu" },
  {
    name: "data:read_own_records",
    description: "View personal records",
  },
];

const initialDefaults = [{ name: "notassign" }];

async function seedDatabase() {
  console.warn("--------Seeding process started--------------");
  // 1. Cleanup database
  await db.delete(rolePermissions);
  await db.delete(permissions);
  await db.delete(roles);
  await db.delete(departments);
  await db.delete(positions);

  // 2. Insert Roles (& get the roleId)
  const insertedRoles = await db.insert(roles).values(initialRoles).returning();
  const saRole = insertedRoles.find((r) => r.name === "superadmin");
  const naRole = insertedRoles.find((r) => r.name === "notassign");

  if (!saRole || !naRole) {
    throw new Error("Fail to get superadmin or notassign roleId");
  }

  console.log("Roles seeding done");

  // 3. Insert Departments & Position (including notAssign)
  await db.insert(departments).values(initialDefaults);
  await db.insert(positions).values(initialDefaults);
  console.log("Departments & Position seeding done");

  // 4. Insert Permission (& get the permissionId)
  const insertedPermissions = await db
    .insert(permissions)
    .values(initialPermissions)
    .returning();
  console.log("Permissions seeding done");

  // 5. Creating relationship RolePermissions
  const rolePermissionsData: NewRolePermission[] = [];

  // 5A. Create relationship superadmin to all permissions
  for (const perm of insertedPermissions) {
    rolePermissionsData.push({
      roleId: saRole.id,
      permissionId: perm.id,
    });
  }

  // 5B. Create relationship admin to permissions (eg: user:assign_role, user:read_all_in_company)
  const adminRole = insertedRoles.find((r) => r.name === "admin");
  const assignRolePerm = insertedPermissions.find(
    (p) => p.name === "user:assign_role"
  );
  const readAllPerm = insertedPermissions.find(
    (p) => p.name === "user:read_all_in_company"
  );

  if (adminRole && assignRolePerm) {
    rolePermissionsData.push({
      roleId: adminRole.id,
      permissionId: assignRolePerm.id,
    });
  }

  if (adminRole && readAllPerm) {
    rolePermissionsData.push({
      roleId: adminRole.id,
      permissionId: readAllPerm.id,
    });
  }

  // 5C. Create relationship staff & notassign (minimal access)
  const employeeRole = insertedRoles.find((r) => r.name === "staff");
  const readOwnPerm = insertedPermissions.find(
    (p) => p.name === "data:read_own_records"
  );

  if (employeeRole && readOwnPerm) {
    rolePermissionsData.push({
      roleId: employeeRole.id,
      permissionId: readOwnPerm.id,
    });
  }

  // 6. Insert Role Permissions
  await db.insert(rolePermissions).values(rolePermissionsData);
  console.warn("--------Seeding process done & aborted--------------");
}

seedDatabase().catch((e) => {
  console.error(e);
  process.exit(1);
});
