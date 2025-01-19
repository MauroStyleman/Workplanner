import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {createWorkplan, fetchWorkplan, fetchWorkplans} from '../service/WorkplanService';
import {WorkplanData} from "../model/Workplan.ts";

export function useWorkplans() {
    const queryClient = useQueryClient();

    const { isLoading, isError, data: workplans } = useQuery({
        queryKey: ['workplans'],
        queryFn: fetchWorkplans,
    });

    const {
        mutate: addWorkplan,
        isPending: isAddingWorkplan,
        isError: isErrorWorkplan,
        isSuccess: isSuccessWorkplan,
        status,
        failureCount,
        reset,
    } = useMutation({
        mutationFn: (newWorkplan: WorkplanData) => {
            console.log('Adding workplan:', newWorkplan)
            return createWorkplan(newWorkplan)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workplans']});
            console.log('Workplan added successfully');
        },
        onError: (error) => {
            console.error('Error adding workplan:', error);
        },
        onSettled: () => {
            console.log('Mutation settled');
        },
    });

    return {
        isLoading,
        isError,
        workplans,
        addWorkplan,
        isAddingWorkplan,
        isErrorWorkplan,
        isSuccessWorkplan,
        status,
        failureCount,
        reset,
    };
}

export  function  useWorkplan(workplanId: string) {
    const { isLoading, isError, data: workplan } = useQuery({
        queryKey: ['workplan', workplanId],
        queryFn: () => fetchWorkplan(workplanId),
    });

    return {
        isLoading,
        isError,
        workplan,
    };
}
