import axiosClient from "./axiosClient"

export const getAllLogs=async()=>{
    const res=await axiosClient.get("/audit-logs/fetch-all")
    return res.data
}

export const getLogById = async (id) => {
    const res = await axiosClient.get(`/audit-logs/fetch-single/${id}`);
    return res.data;
};