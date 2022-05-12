import { BlacReact, Cubit } from "blac";
import { PersonSearchError, PersonSearchLoaded, PersonSearchLoading, PersonSearchState } from "./PersonSearchState";
import { searchPerson, SearchPersonParams } from '../../../domain/useCases/SearchPerson'
import PersonEntity from "../../../domain/entities/PersonEntity";
import { Failure } from "../../../core/error/Failure";

export class PersonSearchCubit extends Cubit<PersonSearchState> {

    page = 1

    constructor() {
        super(0);
    }

    loadPersons = (isNew: boolean = false, query: string): void => {
        if (isNew) {
            this.page = 1
        }
        
        if (this.state instanceof PersonSearchLoading) return;
        const currentState = this.state
        var oldPerson: PersonEntity[] = []
        if (currentState instanceof PersonSearchLoaded) {
            oldPerson = currentState.persons
        }

        this.emit(new PersonSearchLoading(this.page == 1 ? [] : oldPerson, this.page == 1))

        const failureOrPerson = searchPerson(new SearchPersonParams(query, this.page))
        
        if (failureOrPerson instanceof Promise) {
            failureOrPerson.then((data) => {
                if (data instanceof Failure) {
                    this.emit(new PersonSearchError('Server error'))
                } else {
                    this.page++
                    const persons = (this.state as PersonSearchLoading).oldPersons
                    persons.push.apply(persons, data)
                    
                    this.emit(new PersonSearchLoaded(persons))
                }
                
            })
        } else {
            this.emit(new PersonSearchError('Internet error'))
        }
    }
}


export const blocStateSearch = new BlacReact([new PersonSearchCubit() ])