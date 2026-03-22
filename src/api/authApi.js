import axiosClient from "./axiosClient"

export const createUser=async(data)=>{
    const res=await axiosClient.post("/user/createuser",data)
    return res.data
}

export const loginUser=async (data)=>{
    const res=await axiosClient.post("/auth/login",data)
    return res.data
}

export const getUser=async()=>{
    const res=await axiosClient.get("/user/me")
    return res.data
}