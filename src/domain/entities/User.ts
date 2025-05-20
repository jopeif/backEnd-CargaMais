import { randomUUID } from 'crypto';

export type UserProps = {
    id: string;
    email: string;
    password: string;
    role: 'common' | 'admin';
    isActive: boolean;
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
        isActive: true,
        createdAt,
        lastLogin: null,
        isBlocked
        });
    }

    public static assemble(props: UserProps): User {
        return new User(props);
    }

  // Optional: expose a getter if needed
    public getProps(): UserProps {
        return this.props;
    }
}
