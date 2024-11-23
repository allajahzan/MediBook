import { CustomError } from "./error.cutsom";

export class ForbidonError extends CustomError {
    StatusCode: number = 403

    constructor(message: string) {
        super(message)
    }

    serializeError(): { message: string; }[] {
        return [{ message: 'Unauthorized access' }]
    }
}