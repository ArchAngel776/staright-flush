import { MongoServerError } from "mongodb"
import ModelSchema from "../data/interfaces/ModelSchema"
import { ModelErrorsData } from "../data/types/ModelErrorsData"

export default function mongoErrors<Schema extends ModelSchema>(error: MongoServerError): ModelErrorsData<Schema>
{
    if (!error.errInfo) {
        return {}
    }
    
    const rules = error.errInfo.details.schemaRulesNotSatisfied

    if (!Array.isArray(rules)) {
        return {}
    }

    const result: ModelErrorsData<Schema> = {}

    for (const rule of rules) {
        if (!(rule.operatorName === "properties" && "propertiesNotSatisfied" in rule)) {
            continue
        }

        for (const { propertyName, description } of rule.propertiesNotSatisfied) {
            if (!propertyName || !description) {
                continue
            }
            
            if (!(propertyName in result)) {
                result[propertyName as keyof Schema] = []
            }

            result[propertyName]?.push(description)
        }
    }

    return result
}