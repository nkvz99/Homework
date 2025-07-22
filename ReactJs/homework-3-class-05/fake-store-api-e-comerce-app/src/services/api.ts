import axios from "axios";
import type { ApiError } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com";



const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, 
});


const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {

    return {
      message: error.response?.data?.message || error.message || "API request failed",
      status: error.response?.status,
      data: error.response?.data,
    };
  } else if (error instanceof Error) {
    
    return { message: error.message };
  } else {
   
    return { message: "Unknown error occurred" };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw handleApiError(error); 
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get<string[]>("/products/categories");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};