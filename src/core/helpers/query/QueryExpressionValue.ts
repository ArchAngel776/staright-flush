import { Filter } from "mongodb"
import ModelSchema from "../../data/interfaces/ModelSchema"
import { MongoFunctionExpression } from "../../data/types/MongoFunctionExpression"

export default class QueryExpressionValue<Schema extends ModelSchema>
{
    protected expression: MongoFunctionExpression<Schema>

    public constructor(expression: MongoFunctionExpression<Schema>)
    {
        this.expression = expression
    }

    public getValue(): Filter<Schema>
    {
        return { $where: this.expression }
    }
}