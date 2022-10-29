import { ClientSession, Db } from "mongodb";
export default interface DatabaseSessionOperation<Type> {
    (database: Db, session: ClientSession): Promise<Type>;
}
