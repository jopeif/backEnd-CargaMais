export type RegisterUserInputDTO = {
    email: string;
    password: string;
    role: 'common' | 'admin';
};
