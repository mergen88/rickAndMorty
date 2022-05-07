import LocationEntity from "../../domain/entities/LocationEntity"

export default class LocationModel extends LocationEntity {

    constructor(
        name?: string,
        url?: string
    ) {
        super(name, url)
    }

    static fromJson(json?: any) {
        if (json == null) return null
        return new LocationModel(
            json.name,
            json.url
        )
    }
}