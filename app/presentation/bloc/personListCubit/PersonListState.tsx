import PersonEntity from "../../../domain/entities/PersonEntity";

abstract class PersonState {}

class PersonEmpty extends PersonState {}
class PersonLoading extends PersonState {
    oldPersons: PersonEntity[]
    isFirstFetch: boolean

    constructor(oldPersons: PersonEntity[], isFirstFetch: boolean = false) {
        super();
        this.oldPersons = oldPersons
        this.isFirstFetch = isFirstFetch
    }
}
class PersonLoaded extends PersonState {
    persons: PersonEntity[]

    constructor(persons: PersonEntity[]) {
        super()
        this.persons = persons
    }
}

class PersonError extends PersonState {
    message: String

    constructor(message: String) {
        super()
        this.message = message
    }
}

export { PersonState, PersonEmpty, PersonLoading, PersonLoaded, PersonError }