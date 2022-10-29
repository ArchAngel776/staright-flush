import MigrationCommand from "../core/foundations/MigrationCommand"
import DateHelper from "../core/helpers/DateHelper"
import Migration from "../core/Migration"
import MigrationCreateException from "../exceptions/MigrationCreateException"
import MigrationTemplate from "../templates/MigrationTemplate"

export default class MigrationCreate extends MigrationCommand
{
    /**
     * Custom statuses
     */
    public static MIGRATION_CREATE_ERROR = -2

    protected name: string

    protected date: Date

    public constructor(name: string)
    {
        super()
        this.name = name
        this.date = new Date
    }

    public execute(): number
    {
        const template = new MigrationTemplate
        this.migrationDir.save(this.migrationFileName, template
            .with(MigrationTemplate.PARAM_MIGRATION, this.migrationName)
            .with(MigrationTemplate.PARAM_BASE, Migration.name)
            .make()
        )

        if (!this.migrationDir.has(this.migrationFileName)) {
            return MigrationCreate.MIGRATION_CREATE_ERROR
        }

        return MigrationCreate.SUCCESS
    }

    public except(status: number): void 
    {
        switch (status) {
            case MigrationCreate.MIGRATION_CREATE_ERROR:
                throw new MigrationCreateException
            default:
                return super.except(status)
        }
    }

    protected get migrationName(): string
    {
        return `${MigrationCreate.MIGRATION_PREFIX}_${DateHelper.format("d_m_Y_His", this.date)}_${this.name}`
    }

    protected get migrationFileName(): string
    {
        return `${this.migrationName}.js`
    }
}