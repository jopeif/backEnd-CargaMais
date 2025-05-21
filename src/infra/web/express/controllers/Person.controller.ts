import { Request, Response } from "express";

import { CreatePerson } from "../../../../application/usecase/person/CreatePerson";
import { DeletePerson } from "../../../../application/usecase/person/DeletePerson";
import { UpdatePerson } from "../../../../application/usecase/person/UpdatePerson";

export class PersonController {
    constructor( 
        private createUseCase: CreatePerson, 
        private deleteUseCase: DeletePerson,
        private updateUseCase: UpdatePerson) {}

    public async createPerson(req: Request, res: Response){
        try{
            const { name, cpf, birthDay, phoneNumber, userId} = req.body
            const result = await this.createUseCase.execute( { name, cpf, birthDay, phoneNumber, userId } )
            res.status(200).json(result).send;
        }catch(error){
            console.log(error)
            res.status(401).json({ error });
        }
        
    }

    public async deletePerson(req: Request, res: Response){
        try{
            const { id } = req.params
            const result = await this.deleteUseCase.execute({id})
            res.status(200).json(result)
        }catch(error){
            console.log(error)
            res.status(401).json({ error });
        }
    }

    public async updatePerson(req: Request, res: Response){
        try{
            const { id } = req.params
            const { name, cpf, birthDay, phoneNumber, userId } = req.body

            const result = await this.updateUseCase.execute({id, name, cpf, birthDay, phoneNumber, userId})

            res.status(200).json(result)
        }catch(error){
            res.status(401).json({error})
        }
    }

}