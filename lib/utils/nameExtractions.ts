export function extractFirstName(session: any) {
  const firstName = session?.user?.name?.split(" ")[0];
  return { firstName };
}

export function extractInitials(session: any) {
  const name = session?.user?.name;
  if (!name) return "";

  const parts = name.split(" ");
  const firstInitial = parts[0].slice(0, 1);
  const lastInitial = parts[1].slice(0, 1);
  const initials = firstInitial + lastInitial;
  return initials;
}
