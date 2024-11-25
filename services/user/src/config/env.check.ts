import { EnvChecker } from "@mb-medibook/common";

export const envChecker = (): void => {
    EnvChecker(process.env.PORT as string, "PORT");
    EnvChecker(process.env.MONGO_URL as string, "MONGO_URL");
    EnvChecker(process.env.ACCESS_TOKEN_SECRET as string, "ACCESS_TOKEN_SECRET");
    EnvChecker(process.env.REFRESH_TOKEN_SECRET as string, "REFRESH_TOKEN_SECRET");
    console.log("All env varaibles are defined");
};
