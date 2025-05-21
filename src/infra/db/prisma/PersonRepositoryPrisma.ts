import { PrismaClient } from "@prisma/client";
import { Person } from "../../../domain/entities/Person";
import { PersonRepository } from "../../../domain/repositories/PersonRepository";

const prisma = new PrismaClient(); // Evite exportar isso de forma global diretamente, prefira injetar ou encapsular

export class PersonRepositoryPrisma implements PersonRepository {
    
    async save(person: Person): Promise<void> {
        const props = person.getProps();

        try {
            await prisma.person.create({
            data: {
                id: props.id,
                name: props.name,
                cpf: props.cpf,
                birthDay: props.birthDay,
                phoneNumber: props.phoneNumber,
                user: {
                connect: {
                    id: props.userId,
                    },
                },
            },
            });


        } catch (error) {
            // Aqui é possível melhorar o tratamento de erro
            throw new Error(`Erro ao salvar pessoa: ${(error as Error).message}`);
        }
        
    }

    async update(person: Person): Promise<Person | null> {
        const props = person.getProps();

        return await prisma.person.update({
            where: { id: props.id },
            data: {
                name: props.name,
                cpf: props.cpf,
                birthDay: props.birthDay,
                phoneNumber: props.phoneNumber,
                user: {
                    connect: {
                        id: props.userId,
                    },
                },
            },
        })
        .then(updatedPerson => {
            return new Person({
                id: updatedPerson.id,
                name: updatedPerson.name,
                cpf: updatedPerson.cpf,
                birthDay: updatedPerson.birthDay,
                phoneNumber: updatedPerson.phoneNumber,
                userId: updatedPerson.userId,
            });
        })
        .catch(error => {
            throw new Error(`Erro ao atualizar pessoa: ${(error as Error).message}`);
        });
    }
    async delete(id: string): Promise<void> {
        try{
            await prisma.person.delete(
            {where: {id}}
        )}catch(error){
            throw error
        }
    }
    async findById(id: string): Promise<Person> {
        if (!id) {
            throw new Error("ID inválido fornecido para busca.");
        }

        const person = await prisma.person.findUnique({
            where: { id },
        });

        if (!person) {
            throw new Error("Person not found");
        }

        return new Person({
            id: person.id,
            name: person.name,
            cpf: person.cpf,
            birthDay: person.birthDay,
            phoneNumber: person.phoneNumber,
            userId: person.userId,
        });
}

    
    async findAll(): Promise<Person[]> {
        return await prisma.person.findMany().then(persons =>
            persons.map(person =>
                new Person({
                    id: person.id,
                    name: person.name,
                    cpf: person.cpf,
                    birthDay: person.birthDay,
                    phoneNumber: person.phoneNumber,
                    userId: person.userId,
                })
            )
        );
    }
}
