import LocationEntity from "../../domain/entities/LocationEntity"
import PersonEntity from "../../domain/entities/PersonEntity"
import LocationModel from "./LocationModel"

export default class PersonModel extends PersonEntity {
    
    constructor(
        id: number,
        status: string,
        name: string,
        species: string,
        type: string,
        gender: string,
        image: string,
        episode: [string],
        created: string,
        origin?: LocationEntity | any,
        location?: LocationEntity | any) {
            super(id, status, name, species, type, gender, image, episode, created, origin, location)
        }

    static fromJson(json: any) {
        return new PersonModel(
            json.id,
            json.status,
            json.name,
            json.species,
            json.type,
            json.gender,
            json.image,
            json.episode,
            json.created,
            LocationModel.fromJson(json.origin),
            LocationModel.fromJson(json.location)
        )
    }
}