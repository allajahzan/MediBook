import { CustomError } from "./error.cutsom"

export class NotFoundError extends CustomError {
    StatusCode: number = 404;

    constructor() {
        super('Not found')
    }

    serializeError(): { message: string; }[] {
        return [{ message: "Not found" }]
    }
}