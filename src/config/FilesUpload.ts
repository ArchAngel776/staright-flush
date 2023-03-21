import { resolve } from "path"
import { Options } from "express-fileupload"

import { Unit } from "@data/enums/Unit"

import root from "@hooks/root"
import unit from "@hooks/unit"
import action from "@hooks/action"

import FileLimitAction from "@actions/FileLimitAction"


export const FilesUploadOptions: Options = {
    limits: {
        fileSize: unit(50, Unit.MB)
    },
    limitHandler: action(FileLimitAction),
    useTempFiles: true,
    tempFileDir: resolve(root(), "tmp")
}