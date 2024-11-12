export function getInitials(name?: string | undefined | null): string {
  if (name) {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  }
  return "";
}
