import { randomUUID } from 'crypto';

export type UserProps = {
    id: string;
    email: string;
    password: string;
    role: 'common' | 'admin';
    createdAt: Date;
    lastLogin: Date | null;
    isBlocked: boolean
};

export class User {
    constructor(private readonly props: UserProps) {}

    public static build(email: string, password: string, role: 'common' | 'admin'): User {
        const id = randomUUID();
        const createdAt = new Date();
        const isBlocked = false

    return new User({
        id,
        email,
        password,
        role,
        createdAt,
        lastLogin: null,
        isBlocked
        });
    }

    public static assemble(props: UserProps): User {
        try{
            return new User(props);}catch(err){
                throw err
            }
    }

  // Optional: expose a getter if needed
    public getProps(): UserProps {
        return this.props;
    }

    public get id() { return this.props.id; }
    public get email() { return this.props.email; }
    public get password() { return this.props.password; }
    public get role() { return this.props.role; }
    public get isBlocked() { return this.props.isBlocked; }
    public get lastLogin() { return this.props.lastLogin; }

}
