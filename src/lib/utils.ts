import { API_URL, DEFAULT_TOKEN } from "@/constants/api";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const queryClient = new QueryClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API = axios.create({
  baseURL: API_URL,
});

API.defaults.headers.common["Accept"] = `application/json`;
API.defaults.headers.common["Authorization"] = `Bearer ${DEFAULT_TOKEN}`;
