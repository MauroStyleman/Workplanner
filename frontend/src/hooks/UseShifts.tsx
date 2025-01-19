import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createShift, fetchShift, fetchShifts} from "../service/ShiftService.ts";
import {ShiftData} from "../model/Shift.ts";

export function useShifts() {
    const queryClient = useQueryClient();

    const { isLoading, isError, data: shifts } = useQuery({
        queryKey: ['shifts'],
        queryFn: fetchShifts,

    });

    const {
        mutate: addWorkplan,
        isPending: isAddingShift,
        isError: isErrorShift,
        isSuccess: isSuccessShift,
        status,
        failureCount,
        reset,
    } = useMutation({
        mutationFn: (newShift: ShiftData) => {
            console.log('Adding workplan:', newShift)
            return createShift(newShift)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shifts']});
            console.log('shift added successfully');
        },
        onError: (error) => {
            console.error('Error adding shift:', error);
        },
        onSettled: () => {
            console.log('Mutation settled');
        },
    });

    return {
        isLoading,
        isError,
        shifts,
        addShift: addWorkplan,
        isAddingShift: isAddingShift,
        isErrorShift: isErrorShift,
        isSuccessWorkplan: isSuccessShift,
        status,
        failureCount,
        reset,
    };
}

export  function  useShift(shiftId: string) {
    const { isLoading, isError, data: shift } = useQuery({
        queryKey: ['shift', shiftId],
        queryFn: () => fetchShift(shiftId),
    });

    return {
        isLoading,
        isError,
        shift,
    };
}