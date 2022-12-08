import WithMongoClient from "../data/interfaces/WithMongoClient"
import MethodModel from "../foundations/MethodModel"

export default class CloseClient extends MethodModel<WithMongoClient, Promise<void>>
{
    public method(): Promise<void>
    {
        return (this.original())
            .then(() => this.target.client.close())
            .catch(error => {
                this.target.client.close()
                throw error
            })
    }
}