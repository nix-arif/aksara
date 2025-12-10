type UserSession = {
  role: string;
  position: string;
  department: string;
};

type Rule = {
  roles?: string[];
  positions: string[];
  departments: string[];
};

export function allow(user: UserSession, rule: Rule) {
  // Check role
  if (rule.roles && !rule.roles.includes(user.role)) {
    return false;
  }

  // Check position
  if (rule.positions && !rule.positions.includes(user.position)) {
    return false;
  }

  // Check department
  if (rule.departments && !rule.departments.includes(user.department)) {
    return false;
  }
}
