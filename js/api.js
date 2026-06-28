export const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
}

export function makeCrud(endpoint) {
    return {
        getAll: () => request(endpoint),
        create: (data) => request(endpoint, { method: "POST", body: JSON.stringify(data) })
    };
}

export const productsApi = makeCrud("/products"); // Aapka entity endpoint [cite: 91, 140]