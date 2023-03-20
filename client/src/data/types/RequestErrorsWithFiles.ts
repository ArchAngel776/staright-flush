import { UploadedFile } from "express-fileupload"
import { RequestErrors } from "./RequestErrors"

export type RequestErrorsWithFiles<RequestBody, RequestFiles> = RequestErrors<RequestBody> & {
    [File in keyof RequestFiles]?: RequestFiles[File] extends Array<UploadedFile> ? Array<Array<string>> : Array<string>
}