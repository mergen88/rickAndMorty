import { Failure } from '../../core/error/Failure';
import { UseCase } from '../../core/usecases/UseCase';
import { personRepository } from '../../data/repositories/PersonRepository';
import PersonRepository from '../repositories/PersonRepository';
import PersonEntity from '../entities/PersonEntity';

class SearchPerson extends UseCase<PersonEntity[], SearchPersonParams> {
    
    personRepository: PersonRepository = personRepository()

    call(params: SearchPersonParams): PersonEntity[] | Failure {
        return this.personRepository.searchPerson(params.query, params.page)
    }
   
}

export class SearchPersonParams {
    query: string
    page: number

    constructor(query: string, page: number) {
        this.query = query,
        this.page = page
    }
}

export const searchPerson = (params: SearchPersonParams) => {
    return new SearchPerson().call(params)
}