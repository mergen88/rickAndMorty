import ServerError from '../../core/error/Exception';
import { Failure, ServerFailure } from '../../core/error/Failure';
import { networkInfo } from '../../core/platform/NetworkInfo';
import PersonRepository from '../../domain/repositories/PersonRepository';

import { personDataSource } from '../datasources/PersonDataSource';
import PersonModel from '../models/PersonModel';


export class PersonRepositoryImpl implements PersonRepository {
    
    personDataSource = personDataSource()
    
    async getPersons(getPersons: () => Promise<PersonModel[]> | Failure) {
        if (await networkInfo().isConnected()) {
            try {
               const persons = await getPersons()
               
               return persons
            } catch (error) {
                return new ServerFailure()
            }
             
        } else {
            
            return new ServerFailure()
        }
    } 

    getAllPersons(page: number): Promise<PersonModel[]> | Failure  {
        return this.getPersons( () => this.personDataSource.getAllPerson(page))
    }
    
    searchPerson(query: string, page: number): Promise<PersonModel[]> | Failure {
        return this.getPersons(() => this.personDataSource.searchPerson(query, page))
    }

    
     
}

export const personRepository = () => {
    return new PersonRepositoryImpl()
}