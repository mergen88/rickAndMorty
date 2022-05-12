import PersonEntity from "../../../domain/entities/PersonEntity";

abstract class PersonSearchState {}

class PersonSearchEmpty extends PersonSearchState {}

class PersonSearchLoading extends PersonSearchState {
    oldPersons: PersonEntity[]
    isFirstFetch: boolean

    constructor(oldPersons: PersonEntity[], isFirstFetch: boolean = false) {
        super();
        this.oldPersons = oldPersons
        this.isFirstFetch = isFirstFetch
    }
}
class PersonSearchLoaded extends PersonSearchState {
    persons: PersonEntity[]

    constructor(persons: PersonEntity[]) {
        super()
        this.persons = persons
    }
}

class PersonSearchError extends PersonSearchState {
    message: String

    constructor(message: String) {
        super()
        this.message = message
    }
}

export { PersonSearchState, PersonSearchEmpty, PersonSearchLoading, PersonSearchLoaded, PersonSearchError }