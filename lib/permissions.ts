export enum UserRole {
  SUPERUSER = "SUPERUSER",
  ADMIN = "ADMIN",
  USER = "USER",
}

interface Permissions {
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canCreateCompanies: boolean;
  canEditCompanies: boolean;
  canDeleteCompanies: boolean;
  canCreateClaims: boolean;
  canEditClaims: boolean;
  canDeleteClaims: boolean;
  SUPERUSER: boolean;
}

export const permissions: Record<keyof typeof UserRole, Permissions> = {
  SUPERUSER: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canCreateCompanies: true,
    canEditCompanies: true,
    canDeleteCompanies: true,
    canCreateClaims: true,
    canEditClaims: true,
    canDeleteClaims: true,
    SUPERUSER: true,
  },
  ADMIN: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canCreateCompanies: true,
    canEditCompanies: false,
    canDeleteCompanies: false,
    canCreateClaims: true,
    canEditClaims: true,
    canDeleteClaims: false,
    SUPERUSER: false,
  },
  USER: {
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canCreateCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,
    canCreateClaims: false,
    canEditClaims: true,
    canDeleteClaims: false,
    SUPERUSER: false,
  },
};

export function hasPermission(
  user: { role: UserRole },
  permission: keyof Permissions
): boolean {
  return permissions[user.role][permission];
}
