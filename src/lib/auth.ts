export const cleanupAuthState = () => {
  try {
    // Remove known Supabase auth keys in localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
        try { localStorage.removeItem(key); } catch {}
      }
    });
    // Remove from sessionStorage if used
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
        try { sessionStorage.removeItem(key); } catch {}
      }
    });
    // Legacy key cleanup
    try { localStorage.removeItem("supabase.auth.token"); } catch {}
  } catch {
    // ignore
  }
};
