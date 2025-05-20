import { randomUUID } from "crypto"

export type cargoProps = {
    id: string,
    description: string,
    weight: number,
    origin: string,
    destination: string,
    pickupDate: Date,
    deliveryDate: Date,
    companyId: string,
    driverId: string | null
}


export class Cargo {
    constructor(private readonly props: cargoProps) {}

    public static build(
        description: string,
        weight: number,
        origin: string,
        destination: string,
        pickupDate: Date,
        deliveryDate: Date,
        companyId: string
    )
    {
        const id = randomUUID()

        const driverId = null

        return new Cargo({id, description, weight, origin, destination, pickupDate, deliveryDate, companyId, driverId})
    }

    public static assemble(props: cargoProps){
        return new Cargo(props)
    }

    public acceptDriver(driverId: string){
        this.props.driverId = driverId;

        return this;
    }

}