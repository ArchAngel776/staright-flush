import { TransactionOptions, ReadConcernLevel, ReadPreferenceMode } from "mongodb"


export const TransactionsConfig: TransactionOptions = {
    readConcern: {
        level: ReadConcernLevel.local
    },
    writeConcern: {
        w: 2
    },
    readPreference: ReadPreferenceMode.primary
}