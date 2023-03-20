import { Db } from "mongodb"


export default interface DatabaseOperation<Type>
{
    (database: Db): Promise<Type>
}