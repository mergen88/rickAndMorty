import LocationEntity from "./LocationEntity"

export default class PersonEntity {
    id: number
    status: string
    name: string
    species: string
    type: string
    gender: string
    image: string
    episode: [string]
    created: string
    origin?: LocationEntity | any
    location?: LocationEntity | any

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
            this.id = id,
            this.status = status
            this.name = name
            this.species = species
            this.type = type
            this.gender = gender
            this.image = image
            this.episode = episode
            this.created = created
            this.origin = origin
            this.location = location
        }
}
