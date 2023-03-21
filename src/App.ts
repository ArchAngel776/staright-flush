import express from "express"
import session from "express-session"
import cors from "cors"
import { json, urlencoded } from "body-parser"
import fileUpload from "express-fileupload"

import publicPath from "@hooks/public"

import { FormDataOptions } from "@config/FormData"
import { FilesUploadOptions } from "@config/FilesUpload"
import { SessionConfig } from "@config/Session"


const app = express()
    .use(session(SessionConfig))
    .use(cors())
    .use(json())
    .use(urlencoded(FormDataOptions))
    .use(fileUpload(FilesUploadOptions))
    .use(express.static(publicPath()))

export default app