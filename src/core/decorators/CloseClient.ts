import WithMongoClient from "../data/interfaces/WithMongoClient"
import MethodModel from "../foundations/MethodModel"

export default class CloseClient extends MethodModel<WithMongoClient, Promise<void>>
{
    public method(this: WithMongoClient, { original }: CloseClient): Promise<void>
    {
        return original()
            .then(() => this.client.close())
            .catch(error => {
                this.client.close()
                throw error
            })
    }
}