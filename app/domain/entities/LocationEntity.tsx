export default class LocationEntity {
    name?: string
    url?: string

    constructor(
        name?: string,
        url?: string
    ) {
        this.name = name
        this.url = url
    }
}
