/* eslint-disable @typescript-eslint/no-unused-vars */
import Except from "../core/decorators/Except";
import Exception from "../core/Exception"

@Except
export default class ModelImplementationException extends Exception
{
    public getName(): string
    {
        return "Model Implementation Exception"
    }

    public getMessage(): string
    {
        return "Each model class requires implement model signature"
    }
}