import { PersonRepository } from '../../../domain/repositories/PersonRepository';
import { PersonDeleteInputDTO } from '../../dto/person/Delete/PersonDeleteInputDTO';
import { PersonDeleteOutputDTO } from '../../dto/person/Delete/PersonDeleteOutputDTO';
import { DeleteUser } from "../auth/DeleteUser"
import { UseCase } from '../UseCase';

export class DeletePerson implements UseCase<PersonDeleteInputDTO, PersonDeleteOutputDTO> {

    constructor(private readonly personRepo: PersonRepository, private readonly deleteUser:DeleteUser) {}
    
    async execute(input: PersonDeleteInputDTO): Promise<PersonDeleteOutputDTO> {
        try{
            const personExists = await this.personRepo.findById(input.id)

            if(!personExists){
                throw new Error("Person doesn't exist")
            }

            await this.deleteUser.execute({ id: personExists.getProps().userId })
            await this.personRepo.delete(input.id)

            return ({message: "Person deleted successfully"})
        }catch(error){
            throw error
        }
    }
    
}