import { CustomError } from "./error.cutsom";

export class ForbidonError extends CustomError {
    StatusCode: number = 403

    constructor() {
        super('Unauthorized access')
    }

    serializeError(): { message: string; }[] {
        return [{ message: 'Unauthorized access' }]
    }
}