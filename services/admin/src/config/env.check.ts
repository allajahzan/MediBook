import { EnvChecker } from "@mb-medibook/common"

export const envChecker = () : void => {
    EnvChecker(process.env.PORT as string, 'PORT')
    EnvChecker(process.env.MONGO_URL as string, 'MONGO_URL')
    console.log('All env varaibles are defined');   
}