export const BASE_URL = "https://6a40bc2d1ff1d27becc0ed62.mockapi.io/api/v1";

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

export const productsApi = makeCrud("/products");
export const ordersApi = makeCrud("/orders");