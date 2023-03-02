import ModelSchema from "../../../data/interfaces/ModelSchema"
import { ProjectionMatchData, ProjectionMatchDataValue } from "../../../data/types/ProjectionData"
import QueryArrayProjectionExpression from "../../../foundations/query/QueryArrayProjectionExpression"

export default class QueryArrayProjectionMatchValue<Schema extends ModelSchema> extends QueryArrayProjectionExpression<Schema, ProjectionMatchDataValue<Schema>>
{
    public getValue(): ProjectionMatchData<Schema>
    {
        return { $elemMatch: this.value }
    }
}