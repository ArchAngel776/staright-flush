import Commands from "@data/interfaces/Commands"

import MigrationCreate from "@commands/MigrationCreate"
import MigrationDown from "@commands/MigrationDown"
import MigrationUp from "@commands/MigrationUp"
import TestCommand from "@commands/TestCommand"


const commands: Commands = {
    "test-command":         TestCommand,
    "migration/create":     MigrationCreate,
    "migration/up":         MigrationUp,
    "migration/down":       MigrationDown
}

export default commands