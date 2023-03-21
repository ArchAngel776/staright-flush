db.createCollection("migrations", {
    validator: {
        $jsonSchema: {
            title: "Database migrations validator",
            bsonType: "object",
            required: ["_id", "migration_name", "created_at"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "'_id' must be valid ObjectID object"
                },
                migration_name: {
                    bsonType: "string",
                    description: "name of migration must be valid string type"
                },
                created_at: {
                    bsonType: "date",
                    description: "'created_at' param must be valid date"
                }
            },
            additionalProperties: false
        }
    }
})

db.migrations.createIndex({ migration_name: 1 }, { 
    name: "migration",
    unique: true 
})