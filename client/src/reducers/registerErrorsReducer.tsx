import { RequestErrorsWithFiles } from "../data/types/RequestErrorsWithFiles"
import { RegisterRequestData } from "../../../@types/request/RegisterRequestData"
import { RegisterRequestFiles } from "../../../@types/request/files/RegisterRequestFiles"
import RegisterErrorActionException from "../exception/RegisterErrorActionException"

export enum RegisterErrorsActionType
{
    SET = "set",
    CLEAR = "clear",
    RESET = "reset"
}

export type RegisterErrorsActionSet = {
    type: RegisterErrorsActionType.SET
    errors: RequestErrorsWithFiles<RegisterRequestData, RegisterRequestFiles>
}

export type RegisterErrorsActionClear = {
    type: RegisterErrorsActionType.CLEAR,
    property: keyof RegisterRequestData | keyof RegisterRequestFiles
}

export type RegisterErrorsActionReset = {
    type: RegisterErrorsActionType.RESET
}

export type RegisterErrorsAction = RegisterErrorsActionSet | RegisterErrorsActionClear | RegisterErrorsActionReset

export default function registerErrorsReducer(errors: RequestErrorsWithFiles<RegisterRequestData, RegisterRequestFiles>, action: RegisterErrorsAction): RequestErrorsWithFiles<RegisterRequestData, RegisterRequestFiles>
{
    switch (action.type) {
        case RegisterErrorsActionType.SET:
            return action.errors
        case RegisterErrorsActionType.CLEAR:
            const result = { ...errors }
            delete result[action.property]
            return result
        case RegisterErrorsActionType.RESET:
            return {}
        default:
            throw new RegisterErrorActionException
    }
}