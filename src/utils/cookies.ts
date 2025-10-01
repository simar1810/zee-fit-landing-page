// Simple cookie utilities
export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const isAuthenticated = (): boolean => {
  return !!getCookie('accessToken');
};

export const getCurrentUser = (): any => {
  const userCookie = getCookie('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

export const clearAllAuthData = (): void => {
  // Clear all authentication cookies
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('user');
  
  // Clear any other potential cookies with direct cookie manipulation
  document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  
  // Clear localStorage if needed
  localStorage.removeItem('registrationData');
  
  // Clear any other localStorage items that might contain auth data
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('auth') || key.includes('token') || key.includes('user'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
};