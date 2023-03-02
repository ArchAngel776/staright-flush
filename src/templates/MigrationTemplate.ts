import { relative, resolve } from "path"
import { String } from "../core/data/enums/String"
import { CodePart } from "../core/data/types/CodePart"
import { Import } from "../core/data/types/Import"
import Comment from "../core/helpers/Comment"
import root from "../core/hooks/root"
import Migration from "../core/Migration"
import Template from "../core/Template"

export default class MigrationTemplate extends Template
{
    public static PARAM_BASE = "base"
    public static PARAM_MIGRATION = "migration"

    public import(): Array<Import>
    {
        const migrationsPath = resolve(root(), "migrations")
        const buildPath = resolve(root(), "build", "core", "Migration")

        return [
            [ relative(migrationsPath, buildPath), Migration.name ]
        ]
    }

    public content(): Array<CodePart>
    {
        return [
            "module.exports = class @migration extends @base",
            [
                Comment.block("@returns {boolean}"),
                "async apply()", 
                [
                    "return true"
                ],
                String.EMPTY,
                Comment.block("@returns {boolean}"),
                "async revert()", 
                [
                    "return true"
                ]
            ]
        ]
    }
}