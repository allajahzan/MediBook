export abstract class CustomError extends Error {

    abstract StatusCode: number

    constructor(message: string) {
        super(message)
    }

    abstract serializeError(): { message: string }[]
}