import { PersonUpdateInputDTO } from '../../dto/person/Update/PersonUpdateDTOInput';
import { Person } from "../../../domain/entities/Person";
import { PersonRepository } from "../../../domain/repositories/PersonRepository";
import { PersonUpdateOutputDTO } from "../../dto/person/Update/PersonUpdateDTOOutput";
import { UseCase } from "../UseCase";

export class UpdatePerson implements UseCase<PersonUpdateInputDTO, PersonUpdateOutputDTO>{
    constructor(private readonly personRepo: PersonRepository) {}

    async execute(input: PersonUpdateInputDTO): Promise<PersonUpdateOutputDTO> {
        try{
            const { id, name, cpf, birthDay, phoneNumber, userId } = input
            const person = Person.assemble({id, name, cpf, birthDay, phoneNumber, userId})
            await this.personRepo.update(person)
            return person.getProps()
        }catch(error){
            throw error
        }
    }

}