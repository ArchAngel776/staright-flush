import ModelSchema from "../../data/interfaces/ModelSchema"
import { ProjectionDataValue, ProjectionDataValues } from "../../data/types/ProjectionData"

export default abstract class QueryArrayProjectionExpression<Schema extends ModelSchema, Type extends ProjectionDataValues<Schema> = ProjectionDataValues<Schema>>
{
    protected value: Type

    public constructor(value: ProjectionDataValues<Schema>)
    {
        this.value = <Type> value
    }

    public abstract getValue(): ProjectionDataValue<Schema>
}