export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  // Check if running in browser environment
  if (typeof window === 'undefined') {
    // Return a dummy response or throw an error
    throw new Error('authenticatedFetch can only be used in the browser');
  }

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
    throw new Error('No token found');
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  return response;
}