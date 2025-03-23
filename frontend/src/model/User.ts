
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

};
export type userData = Omit<User, 'id'>;
