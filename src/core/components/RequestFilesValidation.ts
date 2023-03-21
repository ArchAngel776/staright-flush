import { FileArray } from "express-fileupload"

import FilesValidation from "@data/interfaces/FilesValidation"

import BaseModel from "@foundations/BaseModel"


export default class RequestFilesValidation extends BaseModel<FileArray>
{
    public constructor(files: FileArray)
    {
        super(files)
    }

    public with(scenarios: FilesValidation): this
    {
        for (const attribute in scenarios) {
            this.validationScenarios.addScenario(attribute, scenarios[attribute])
        }
        return this
    }
}