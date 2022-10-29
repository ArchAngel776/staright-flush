#!/bin/bash
mongosh <<EOF
rs.initiate({
    "_id": "rsStraightFlush",
    "members": [
        {
            "_id": 0,
            "host": "s1.database.straight-flush.pl:27017",
            "priority": 2
        },
        {
            "_id": 1,
            "host": "s2.database.straight-flush.pl:27017"
        },
        {
            "_id": 2,
            "host": "sa.database.straight-flush.pl:27017",
            "arbiterOnly": true
        }
    ]
})
EOF