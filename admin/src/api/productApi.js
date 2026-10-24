import api from "./axios";

export const getProducts = (filters = {}) => {
    return api.get("/products", {
        params: filters,
    });
}

export const getProduct = (id) => {
    return api.get(`/products/${id}`);
}

export const createProduct = (data) => {
    return api.post("/products", data);
}

export const updateProduct = (id, data) => {
    data.append("_method", "PUT");
    return api.post(`/products/${id}`, data);
}

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
}