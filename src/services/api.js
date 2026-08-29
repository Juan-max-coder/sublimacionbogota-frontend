export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  // Armamos los encabezados con el token
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, { ...options, headers });

    // Si el servidor responde con error (403, 404, 500, etc.)
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Token inválido o expirado. Inicia sesión nuevamente.");
      } else if (res.status === 403) {
        throw new Error("Acceso denegado. Verifica tu rol o permisos.");
      } else {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
    }

    // Evita el error de JSON vacío
    const text = await res.text();
    const data = text ? JSON.parse(text) : [];

    return data;
  } catch (error) {
    console.error("Error en fetchWithToken:", error);
    throw error;
  }
};