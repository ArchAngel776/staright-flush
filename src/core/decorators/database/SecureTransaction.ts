import DatabaseSessionOperation from "@data/callbacks/DatabaseSessionOperation"

import MethodModel from "@foundations/MethodModel"
import Transaction from "@components/database/Transaction"


export default class SecureTransaction<Type> extends MethodModel<Transaction, Promise<Type>, [operation: DatabaseSessionOperation<Type>]>
{
    public async method(this: Transaction, { original }: SecureTransaction<Type>, operation: DatabaseSessionOperation<Type>): Promise<Type>
    {
        try {
            return await original(operation)
        }
        catch (error) {
            await this.rollback()
            throw error
        }
    }
}