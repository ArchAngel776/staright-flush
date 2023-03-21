import { FileArray } from "express-fileupload"

import ResponseInterface from "@data/interfaces/ResponseInterface"
import FilesValidation from "@data/interfaces/FilesValidation"
import { ModelErrorsData } from "@data/types/ModelErrorsData"
import { Nullable } from "@data/types/Nullable"

import RequestFilesValidation from "@components/RequestFilesValidation"

import Request from "@core/Request"


export default abstract class RequestWithFiles<RequestData> extends Request<RequestData>
{
    protected filesValidation: RequestFilesValidation

    public constructor(body: RequestData, files: FileArray)
    {
        super(body)
        this.filesValidation = new RequestFilesValidation(files)
    }

    public abstract files(): FilesValidation

    public async validateRequest(response: ResponseInterface<ModelErrorsData<RequestData>>): Promise<Nullable<ResponseInterface<ModelErrorsData<RequestData>>>>
    {
        if (await super.validateRequest(response)) {
            return response
        }

        const files = this.files()

        if (await this.filesValidation.with(files).validate()) {
            return null
        }

        return response
            .badRequest()
            .headers(this.validationErrorHeaders)
            .with(this.filesValidation.errors.getErrors())
    }
}