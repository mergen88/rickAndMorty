import axios, { Axios } from 'axios';
import ServerError from '../../core/error/Exception';
import PersonModel from '../models/PersonModel';

class PersonDataSource {

    getAllPerson(page: number) {
        return this.getPersonFromUrl(`https://rickandmortyapi.com/api/character?page=${page}`)
    }

    searchPerson(query: string, page: number) {
        return this.getPersonFromUrl(`https://rickandmortyapi.com/api/character?name=${query}&page=${page}`)
    }

    private getPersonFromUrl = async (url: string) => {
        axios.defaults.headers.get['Content-Type'] = 'application/json'
        const response = await axios.get(url)
        if (response.status == 200) { 
            try {
                const persons = (response.data['results'] as [any])?.map(json => PersonModel.fromJson(json))      
                return persons
            } catch (error) {
                return []
            }
        } else {
            throw new ServerError();
        }
    }
}

export const personDataSource = () => {
    return new PersonDataSource()
}