import { randomUUID } from 'crypto';
export type personProps = {
    id: string,
    name: string,
    cpf: string,
    birthDay: Date,
    phoneNumber: string,
    userId: string
}

export class Person {
    constructor(private readonly props: personProps) {}

    public static build(name: string, cpf: string, birthDay: Date, phoneNumber: string, userId: string){

        const id = randomUUID();

        return new Person(
            {
                id,
                name,
                cpf,
                birthDay,
                phoneNumber,
                userId
            }
        )
    }

    public static assemble(props: personProps){
        return new Person(props)
    }

    
}

