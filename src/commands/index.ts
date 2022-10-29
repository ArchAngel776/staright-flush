import Commands from "../core/data/interfaces/Commands"
import MigrationCreate from "./MigrationCreate"
import MigrationDown from "./MigrationDown"
import MigrationUp from "./MigrationUp"
import TestCommand from "./TestCommand"

const commands: Commands = {
    "test-command":         TestCommand,
    "migration/create":     MigrationCreate,
    "migration/up":         MigrationUp,
    "migration/down":       MigrationDown
}

export default commands