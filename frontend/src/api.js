import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getCampaigns = () => API.get("/campaigns/performance");
export const getPerformance = () => API.get("/campaigns/daily");
