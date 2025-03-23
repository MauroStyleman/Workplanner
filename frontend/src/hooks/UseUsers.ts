import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createUser, fetchUsers} from "../service/UserService.ts";
import {userData} from "../model/User.ts";


export function useUsers() {
    const queryClient = useQueryClient();

    const { isLoading, isError, data: shifts } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const {
        mutate: addUser,
        isPending: isAddingUser,
        isError: isErrorUser,
        isSuccess: isSuccessUser,
        status,
        failureCount,
        reset,
    } = useMutation({
        mutationFn: (newUser: userData) => {
            console.log('Adding user:', newUser)
            return createUser(newUser)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']});
            console.log('user added successfully');
        },
        onError: (error) => {
            console.error('Error adding user:', error);
        },
        onSettled: () => {
            console.log('Mutation settled');
        },
    });

    return {
        isLoading,
        isError,
        shifts,
        addUser: addUser,
        isAddingUser: isAddingUser,
        isErrorUser: isErrorUser,
        isSuccessUser: isSuccessUser,
        status,
        failureCount,
        reset,
    };
}