import { randomUUID } from "crypto"

export type driverProps = {
    id: string,
    personId: string,
    cnh: string,
    cnhCategory: string,
    antt: string
}

export class Driver {
    constructor(private readonly props: driverProps) {}

    public static build(personId:string, cnh:string, cnhCategory:string, antt:string):Driver{
        const id = randomUUID()

        return new Driver({
            id,
            personId,
            cnh,
            cnhCategory,
            antt
        })
    }

    public static assemble(props: driverProps):Driver{
        return new Driver(props)
    }
}