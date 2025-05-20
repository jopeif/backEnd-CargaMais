import { randomUUID } from "crypto";

export type companyProps = {
    id: string;
    personId: string;
    legalName: string;
    tradeName: string;
    cnpj: string;
    commercialPhone: string;
    commercialEmail:string;
    commercialAdress: string;
}


export class Company {
    constructor(private readonly props: companyProps) {}

    public static build(personId: string, legalName: string, tradeName: string, cnpj: string, commercialPhone: string, commercialEmail: string, commercialAdress: string) {
        
        const id = randomUUID()

        return new Company(
            {
                id,
                personId,
                legalName,
                tradeName,
                cnpj,
                commercialPhone,
                commercialEmail,
                commercialAdress
            }
        )

    }

    public static assemble(props:companyProps){
        return new Company(props)
    }
}