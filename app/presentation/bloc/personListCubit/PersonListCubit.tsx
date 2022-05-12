import { BlacReact, Cubit } from "blac";
import { PersonError, PersonLoaded, PersonLoading, PersonState } from "./PersonListState";
import { getAllPerson, PagePersonParams } from '../../../domain/useCases/GetAllPerson'
import PersonEntity from "../../../domain/entities/PersonEntity";
import { Failure } from "../../../core/error/Failure";

export class PersonCubit extends Cubit<PersonState> {

    page = 1

    constructor() {
        super(0);
    }
    
    loadPersons = (isNew: boolean = false): void => {
        if (isNew) this.page = 1
        if (this.state instanceof PersonLoading) return;
        const currentState = this.state
        var oldPerson: PersonEntity[] = []
        if (currentState instanceof PersonLoaded) {
            oldPerson = currentState.persons
        }

        this.emit(new PersonLoading(oldPerson, this.page == 1))

        const failureOrPerson = getAllPerson(new PagePersonParams(this.page))
        
        if (failureOrPerson instanceof Promise) {
            failureOrPerson.then((data) => {
                if (data instanceof Failure) {
                    this.emit(new PersonError('Server error'))
                } else {
                    this.page++
                    const persons = (this.state as PersonLoading).oldPersons
                    persons.push.apply(persons, data)
                    
                    this.emit(new PersonLoaded(persons))
                }
                
            })
        } else {
            this.emit(new PersonError('Internet error'))
        }
    }
}

export const blocState = new BlacReact([new PersonCubit() ])