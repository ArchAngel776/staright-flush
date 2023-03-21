import { UploadedFile } from "express-fileupload"

export interface RegisterRequestFiles
{
    avatar: UploadedFile
}