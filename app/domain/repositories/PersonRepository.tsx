import { Failure } from "../../core/error/Failure";
import PersonModel from "../../data/models/PersonModel";

export default interface PersonRepository {
    getAllPersons(page: number): Promise<PersonModel[]> | Failure
    searchPerson(query: string, page: number): Promise<PersonModel[]> | Failure
}