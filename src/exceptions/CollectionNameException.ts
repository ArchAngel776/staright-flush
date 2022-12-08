/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except"
import Exception from "../core/Exception"

@Except
export default class CollectionNameException extends Exception
{
    public getName(): string
    {
        return "Collection Name Exception"
    }

    public getMessage(): string
    {
        throw "Unique validator requires collection name"
    }
}