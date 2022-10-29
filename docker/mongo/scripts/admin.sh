#!/bin/bash
mongosh <<EOF
use admin;
db.createUser({
    "user": "$MONGO_ADMIN_NAME",
    "pwd": "$MONGO_ADMIN_PASS",
    "roles": [
        {
            "role": "userAdminAnyDatabase", 
            "db": "admin" 
        },
        {
            "role": "clusterAdmin", 
            "db": "admin" 
        }
    ]
})
EOF