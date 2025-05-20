import { randomUUID } from "crypto"

export type cargoPostProps = {
    id: string,
    cargoId: string,
    available: boolean,
    postedIn: Date,
    expirationDate: Date
}

export class CargoPost {
    constructor(private readonly props:cargoPostProps) {}

    public static build(
        cargoId: string,
        available: boolean,
        postedIn: Date,
        expirationDate: Date){
            const id = randomUUID();

            return new CargoPost({id, cargoId, available, postedIn, expirationDate})

        }

    public static assemble( props: cargoPostProps ){
        return new CargoPost(props)
    }
    
}