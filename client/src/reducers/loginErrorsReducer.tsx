import { LoginRequestData } from "../../../@types/request/LoginRequestData"

import { RequestErrors } from "../data/types/RequestErrors"
import LoginErrorActionException from "../exception/LoginErrorActionException"


export enum LoginErrorsActionType
{
    SET = "set",
    CLEAR = "clear",
    RESET = "reset"
}

export type LoginErrorsActionSet = {
    type: LoginErrorsActionType.SET
    errors: RequestErrors<LoginRequestData>
}

export type LoginErrorsActionClear = {
    type: LoginErrorsActionType.CLEAR,
    property: keyof LoginRequestData
}

export type LoginErrorsActionReset = {
    type: LoginErrorsActionType.RESET
}

export type LoginErrorsAction = LoginErrorsActionSet | LoginErrorsActionClear | LoginErrorsActionReset

export default function loginErrorsReducer(errors: RequestErrors<LoginRequestData>, action: LoginErrorsAction): RequestErrors<LoginRequestData>
{
    switch (action.type) {
        case LoginErrorsActionType.SET:
            return action.errors
        case LoginErrorsActionType.CLEAR:
            const result = { ...errors }
            delete result[action.property]
            return result
        case LoginErrorsActionType.RESET:
            return {}
        default:
            throw new LoginErrorActionException()
    }
}