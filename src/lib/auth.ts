// Authentication utility functions

export function cleanupAuthState() {
  // Clear any cached auth data
  localStorage.removeItem('supabase.auth.token');
  sessionStorage.removeItem('supabase.auth.token');
  
  // Clear admin session
  sessionStorage.removeItem('admin_authenticated');
  sessionStorage.removeItem('admin_username');
  
  // Trigger admin status change event
  window.dispatchEvent(new CustomEvent('adminStatusChange'));
}

export function isAdminAuthenticated(): boolean {
  const isAuthenticated = sessionStorage.getItem("admin_authenticated") === "true";
  const username = sessionStorage.getItem("admin_username");
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  return isAuthenticated && username === ADMIN_USERNAME;
}

export function getAdminUsername(): string | null {
  return sessionStorage.getItem("admin_username");
}