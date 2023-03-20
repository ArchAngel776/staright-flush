import express from "express"
import cors from "cors"
import { json, urlencoded } from "body-parser"
import fileUpload from "express-fileupload"

import { FormDataOptions } from "@config/FormData"
import { FilesUploadOptions } from "@config/FilesUpload"


const app = express()
    .use(cors())
    .use(json())
    .use(urlencoded(FormDataOptions))
    .use(fileUpload(FilesUploadOptions))

export default app