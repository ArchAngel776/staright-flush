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
			required: ["_id", "username", "email", "password_hash", "active", "created_at", "updated_at"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "Field '_id' must be valid ObjectID object"
				},
				username: {
					bsonType: "string",
					description: "Username must be valid string type"
				},
				email: {
					bsonType: "string",
					//pattern: "^[a-zA-Z0-9\\.\\!\\#\\$\\%\\&\\'\\*\\+\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~\\-]+@[a-zA-Z0-9\\-]+(?:\.[a-zA-Z0-9\\-]+)*$",
					description: "Email field must be valid email address"
				},
				password_hash: {
					bsonType: "string",
					description: "Password hash must be valid string type"
				},
				active: {
					bsonType: "bool",
					description: "Field 'active' hash must be valid boolean type"
				},
				created_at: {
					bsonType: "date",
					description: "Created date must be valid timestamp object"
				},
				updated_at: {
					bsonType: "date",
					description: "Updated date must be valid timestamp object"
				}
			},
			additionalProperties: false
		})

		await this.createIndex("username", "users", ["username"], true)
		await this.createIndex("email", "users", ["email"], true)

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