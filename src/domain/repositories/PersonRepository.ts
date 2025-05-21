import { Person } from "../entities/Person";


export interface PersonRepository {
    findById(id: string): Promise<Person>;
    findAll(): Promise<Person[]>
    save(person: Person): Promise<void>;
    update(person: Person): Promise<Person | null>;
    delete(id: string): Promise<void>;
}

