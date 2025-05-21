
import { Person } from "../../../domain/entities/Person";
import { PersonRepository } from "../../../domain/repositories/PersonRepository";
import { PersonCreateInputDTO } from "../../dto/person/Create/PersonCreateInputDTO";
import { PersonCreateOutputDTO } from "../../dto/person/Create/PersonCreateOutputDTO";
import { UseCase } from "../UseCase";

export class CreatePerson implements UseCase<PersonCreateInputDTO, PersonCreateOutputDTO> {
    constructor(private readonly personRepo: PersonRepository) {}

    public async execute(input: PersonCreateInputDTO): Promise<PersonCreateOutputDTO> {
        try {
            const person = Person.build(input.name, input.cpf, input.birthDay, input.phoneNumber, input. userId)
            await this.personRepo.save(person)
            return person.getProps()
        } catch (err) {
            throw err;
        }
    }
}
