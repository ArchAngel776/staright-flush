import StringParams from "@data/interfaces/StringParams"


export default function format(target: string, params: StringParams = {})
{
    for (const param in params) {
        target = target.replace(`{${param}}`, params[param])
    }
    return target
}