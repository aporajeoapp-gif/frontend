import axiosClient from "./axiosClient"

export const createEmergencyServices=async(data)=>{
    const res=await axiosClient.post("/emergency/create-emergency-service",data)
    return res.data
}

export const getAllEmergencyServices=async()=>{
    const res=await axiosClient.get("/emergency/get-all-emergency-services")
    return res.data
}

export const updateEmergencyService=async(id,data)=>{
  const res=await axiosClient.put(`/emergency/update-emergency-service/${id}`,data)
  return res.data
}
export const deleteEmergencyService=async(id)=>{
  const res=await axiosClient.delete(`/emergency/delete-emergency-service/${id}`)
  return res.data
}
