const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export function apiUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // If no base URL, return path as-is (same-origin)
  if (!API_BASE_URL) {
    return normalizedPath;
  }
  
  // Remove trailing slash from base URL if present
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  
  return `${base}${normalizedPath}`;
}
