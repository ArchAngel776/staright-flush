const Migration = require("../build/core/Migration").default

module.exports = class Migration_02_10_2022_002307_users extends Migration
{
	/**
	 * @returns {boolean}
	 */
	async apply()
	{
		if (await this.hasCollection("users")) {
			return false
		}

		await this.createCollection("users", {
			title: "Users validation schema",
			bsonType: "object",
			required: ["_id", "user", "password", "active", "timestamps"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "Field '_id' must be valid ObjectID object"
				},
				user: {
					bsonType: "object",
					required: ["name", "email"],
					properties: {
						name: {
							bsonType: "string",
							description: "User.Name must be a valid string type"
						},
						email: {
							bsonType: "string",
							//pattern: "^[a-zA-Z0-9\\.\\!\\#\\$\\%\\&\\'\\*\\+\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~\\-]+@[a-zA-Z0-9\\-]+(?:\.[a-zA-Z0-9\\-]+)*$",
							description: "User.Email field must be valid email address"
						}
					},
					additionalProperties: false,
					description: "User data must be a valid object type"
				},
				password: {
					bsonType: "object",
					required: ["hash"],
					properties: {
						hash: {
							bsonType: "string",
							description: "Password.Hash must be valid string type"
						}
					},
					additionalProperties: false,
					description: "Password data must be a valid object type"
				},
				active: {
					bsonType: "bool",
					description: "Field 'active' hash must be valid boolean type"
				},
				consents: {
					bsonType: "object",
					required: ["terms"],
					properties: {
						terms: {
							bsonType: "string",
							description: "Terms acceptation must be represented by string"
						}
					},
					additionalProperties: false,
					description: "Consents must be a valid object type"
				},
				timestamps: {
					bsonType: "object",
					required: ["created_at", "updated_at"],
					properties: {
						created_at: {
							bsonType: "date",
							description: "Created date must be valid timestamp object"
						},
						updated_at: {
							bsonType: "date",
							description: "Updated date must be valid timestamp object"
						}
					},
					additionalProperties: false,
					description: "Timestamps data must be a valid object type"
				}
			},
			additionalProperties: false
		})

		await this.createIndex("username", "users", "user.name", true)
		await this.createIndex("email", "users", "user.email", true)

		return true
	}
	
	/**
	 * @returns {boolean}
	 */
	async revert()
	{
		if (!await this.hasCollection("users")) {
			return false
		}

		await this.dropCollection("users")

		return true
	}
}