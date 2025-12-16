// /**
//  * Memeriksa apakah user memiliki izin spesifik dalam konteks perusahaan tertentu.
//  *
//  * @param userId ID Pengguna yang sedang login.
//  * @param companyId ID Perusahaan yang sedang diakses atau dimodifikasi.
//  * @param requiredPermission Nama izin yang dibutuhkan (misalnya 'user:assign_role').
//  * @returns boolean: true jika user memiliki izin, false jika tidak.
//  */

import { db } from "@/db";
import { permissions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// import { db } from "@/db";
// import { permissions, userCompanyAssignments, users } from "@/db/schema";
// import { and, eq, InferSelectModel } from "drizzle-orm";

// type UserAssignmentWithPermissions = InferSelectModel<
//   typeof userCompanyAssignments
// > & {
//   role: {
//     rolePermissions: {
//       permission: InferSelectModel<typeof permissions>;
//     }[];
//   };
// };

// export async function checkPermission(
//   userId: string,
//   companyId: string,
//   requiredPermission: string
// ): Promise<boolean> {
//   // 1. Check SuperAdmin, bypass all RBAC standard
//   try {
//     const user = await db.query.users.findFirst({
//       where: eq(users.id, userId),
//       columns: { isSuperAdmin: true },
//     });

//     if (users?.isSuperAdmin) return true;
//   } catch (error) {
//     console.error("Error checking SuperAdmin status:", error);
//   }

//   // 2. Cari Assignment User
//   try {
//     const userAssignment = (await db.query.userCompanyAssignments.findFirst({
//       where: (assignments) =>
//         and(
//           eq(assignments.userId, userId),
//           eq(assignments.companyId, companyId)
//         ),
//       with: {
//         role: {
//           with: {
//             rolePermissions: {
//               with: {
//                 permission: {
//                   columns: { name: true },
//                 },
//               },
//             },
//           },
//         },
//       },
//     })) as UserAssignmentWithPermissions | undefined;

//     if (!userAssignment) return false;

//     // 3. Check Permission
//     const hasPermission = userAssignment.role.rolePermissions.some(
//       (rp) => rp.permission.name === requiredPermission
//     );

//     return hasPermission;
//   } catch (error) {
//     console.error("Error checking permission through assignments:", error);
//     return false;
//   }
// }

// // Catatan: Fungsi ini harus dipanggil dari Server Component atau API Route
// // di Next.js karena melakukan akses database.

// lib/authz-utils.ts (Contoh fungsi server)

/**
 * Mengambil semua nama izin (permission names) untuk User di Company tertentu.
 * @param userId
 * @param companyId
 * @returns Array of strings (e.g., ['sale:manage_quotation', 'dashboard:view_analytics'])
 */
export async function getUserPermissions(
  userId: string,
  companyId: string
): Promise<string[]> {
  // 1. Cek Superadmin
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (user?.isSuperAdmin) {
    // Jika Superadmin, ambil SEMUA permission dari tabel permissions
    const allPerms = await db
      .select({ name: permissions.name })
      .from(permissions);
    return allPerms.map((p) => p.name);
  }

  // 2. Fetch izin berdasarkan assignment
  // Lakukan query yang kompleks (seperti di authz.ts) untuk mendapatkan:
  // User -> Assignment -> Role -> RolePermissions -> Permission Name
  // ... (query untuk mendapatkan array of permission names) ...

  // Contoh dummy result:
  return [
    "sale:manage_quotation",
    "data:read_own_records",
    "dashboard:view_ecommerce",
  ];
}
