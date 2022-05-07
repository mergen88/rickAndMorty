import { Failure } from '../../core/error/Failure';
import { UseCase } from '../../core/usecases/UseCase';
import { personRepository } from '../../data/repositories/PersonRepository';
import PersonEntity from '../entities/PersonEntity';

class GetAllPerson extends UseCase<PersonEntity[], PagePersonParams> {
    
    personRepository = personRepository()

    call(params: PagePersonParams): PersonEntity[] | Failure {
        return this.personRepository.getAllPersons(params.page)
    }
}

export class PagePersonParams {
    page: number

    constructor(page: number) {
        this.page = page
    }
}

export const getAllPerson = (params: PagePersonParams) => new GetAllPerson().call(params)