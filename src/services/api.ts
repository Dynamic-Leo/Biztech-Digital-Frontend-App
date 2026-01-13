const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

type ApiError = Error & { status?: number; data?: any };

async function safeParseJson(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');

    // If body is FormData, don't set Content-Type (browser will set boundary).
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers as Record<string, string> | undefined),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await safeParseJson(response);

    if (!response.ok) {
      const err: ApiError = new Error(
        (data && (data.message || data.error)) ||
          `Request failed (${response.status})`
      );
      err.status = response.status;
      err.data = data;
      throw err;
    }

    // Return parsed JSON if present, otherwise return null (or you can return response)
    return data;
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, body: any) {
    const isFormData = body instanceof FormData;

    return this.request(endpoint, {
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  put(endpoint: string, body?: any) {
    const hasBody = typeof body !== 'undefined';
    const isFormData = body instanceof FormData;

    return this.request(endpoint, {
      method: 'PUT',
      ...(hasBody
        ? { body: isFormData ? body : JSON.stringify(body) }
        : {}),
    });
  },

  patch(endpoint: string, body: any) {
    const isFormData = body instanceof FormData;

    return this.request(endpoint, {
      method: 'PATCH',
      body: isFormData ? body : JSON.stringify(body),
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default api;
