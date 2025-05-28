import { getSession } from './api/session';

export async function isAuthenticated() {
  const now = Date.now();
  const session = await getSession();
  return session.isLoggedIn && session.expiresAt > now;
}

export function parseJWT(token: string): { exp: number } {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(jsonPayload);
}
