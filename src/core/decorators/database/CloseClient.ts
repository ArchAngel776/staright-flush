import WithMongoClient from "@data/interfaces/WithMongoClient"

import MethodModel from "@foundations/MethodModel"


export default class CloseClient extends MethodModel<WithMongoClient, Promise<void>>
{
    public async method(this: WithMongoClient, { original }: CloseClient): Promise<void>
    {
        try {
            await original()
            return this.client.close()
        } catch (error) {
            await this.client.close()
            throw error
        }
    }
}