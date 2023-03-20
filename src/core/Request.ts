import { MimeType } from "@data/enums/MimeType"
import ResponseHeaders from "@data/interfaces/ResponseHeaders"
import ResponseInterface from "@data/interfaces/ResponseInterface"
import { ModelErrorsData } from "@data/types/ModelErrorsData"
import { Nullable } from "@data/types/Nullable"

import BaseModel from "@foundations/BaseModel"


export default class Request<RequestData> extends BaseModel<RequestData>
{
    public async validateRequest(response: ResponseInterface<ModelErrorsData<RequestData>>): Promise<Nullable<ResponseInterface<ModelErrorsData<RequestData>>>>
    {
        if (await this.validate()) {
            response.headers(this.validationSuccessHeaders)
            return null
        }

        return response
            .badRequest()
            .headers(this.validationErrorHeaders)
            .with(this.errors.getErrors())
    }

    public get validationSuccessHeaders(): ResponseHeaders
    {
        return {
            "sf-validation": "success"
        }
    }

    public get validationErrorHeaders(): ResponseHeaders
    {
        return {
            "content-type": MimeType.JSON,
            "sf-validation": "error"
        }
    }
}