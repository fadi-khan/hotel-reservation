import { httpService } from "./HttpService"
import { toast } from "react-toastify"

export const roomService = {

    createRoom : async (body:any)=>{
        try {
            const response = await httpService.post("room/create", body)
            toast.success("Room created successfully!")
            return response;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create room. Please try again later!")
            throw error;
        }
    },

    updateRoom : async (id:number, body:any)=>{
        try {
            const response = await httpService.update("room/update", id, body)
            toast.success("Room updated successfully!")
            return response;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update room. Please try again later!")
            throw error;
        }
    },

    deleteRoom : async (id:number)=>{
        try {
            const response = await httpService.delete("room", id)
            toast.success("Room deleted successfully!")
            return response;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete room. Please try again later!")
            throw error;
        }
    },

    getRooms : async (filters:any={})=>{
        const { limit=10, roomType, status , bedType, priceRangeStart , priceRangeEnd, skip=0 } = filters
        
        const params = new URLSearchParams()
        
        if (limit) params.append('limit', limit.toString())
        if (skip) params.append('skip', skip.toString())
        if (roomType) params.append('roomType', roomType)
        if (status) params.append('status', status)
        if (bedType) params.append('bedType', bedType)
        if (priceRangeStart) params.append('priceRangeStart', priceRangeStart.toString())
        if (priceRangeEnd) params.append('priceRangeEnd', priceRangeEnd.toString())
        
        const queryString = params.toString()
        const url = queryString ? `room?${queryString}` : "room"

        try {
            const response = await httpService.get(url)
            return response;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch rooms. Please try again later!")
            throw error;
        }
    },

    getRoomById : async (id:number)=>{
        try {
            const response = await httpService.get(`room/${id}`)
            return response;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch room. Please try again later!")
            throw error;
        }
    }

}