import { CustomError } from "./error.cutsom"

export class NotFoundError extends CustomError {
    StatusCode: number = 404;

    constructor(message: string) {
        super(message)
    }

    serializeError(): { message: string; }[] {
        return [{ message: "Not found" }]
    }
}