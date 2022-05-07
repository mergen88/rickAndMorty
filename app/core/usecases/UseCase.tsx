import { Failure } from '../error/Failure'

export abstract class UseCase<T, Params> {
    abstract call(params: Params): T | Failure
}