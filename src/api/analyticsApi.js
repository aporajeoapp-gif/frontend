import axiosClient from "./axiosClient";

export const getAnalytics = async () => {
    const res = await axiosClient.get("/analytics/stats");
    return res.data;
};
