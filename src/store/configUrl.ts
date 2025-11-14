export const configUrl = (data: { body?: object; method: string; endpoint: string }) => {
  const { body, method, endpoint } = data;

  // Get token from localStorage
  const token = localStorage.getItem('Authorization');

  const config: {
    method: string;
    url: string;
    formData: boolean;
    prepareHeaders: (headers: Headers) => Headers;
    body?: object;
    headers: Record<string, string>;
  } = {
    method,
    url: endpoint,
    formData: true,
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'multipart/form-data');
      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    headers: {},
  };

  if (body) {
    config.body = body;
  }

  // Set headers manually for other consumers (optional if you always use prepareHeaders)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
