import { FileArray, UploadedFile } from "express-fileupload"

import { Multi } from "@data/types/Multi"

import Validator from "@core/Validator"

import multi from "@hooks/multi"


export default abstract class FileValidator<Value> extends Validator<FileArray, Value, Multi<UploadedFile>>
{
    public get getFiles(): Array<UploadedFile>
    {
        return multi(this.getProperty())
    }
}