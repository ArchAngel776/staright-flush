import MethodModel from "@foundations/MethodModel"
import Transaction from "@components/database/Transaction"

export default class SecureCommit extends MethodModel<Transaction, Promise<void>>
{
    public async method(this: Transaction, { original }: SecureCommit): Promise<void>
    {
        try {
            await original()
        }
        catch (error) {
            await this.rollback()
            throw error
        }
    }
}