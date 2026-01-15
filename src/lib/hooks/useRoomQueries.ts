import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { httpService } from "../services/HttpService"
import { roomService } from "../services/room"
import { queryOptions } from "../utilities/queryOptions"

export const useRoomsQuery = (filters: any) => {
    return useQuery(
        queryOptions(
            ["rooms", JSON.stringify(filters)],
            () => roomService.getRooms(filters),
        )
    )
}

export const useRoomQuery= (id:number)=>{

    return useQuery(
        queryOptions(
            ["room", id.toString()],
            ()=>roomService.getRoomById(id)
        )
    )
}

export const useRoomUpdateQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // Pass variables to mutationFn so they are dynamic
        mutationFn: ({ id, body }: { id: number; body: any }) => 
            roomService.updateRoom(id, body),
        
        onSuccess: (data, variables) => {
            // Refetch the list and the specific room
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["room", variables.id] });
        }
    });
}

export const useRoomCreateQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // Receive the body here
        mutationFn: (body: any) => roomService.createRoom(body),
        
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
           
        },
       
    });
}