import { Nullable } from "@data/types/Nullable"

import Repository from "@foundations/Repository"

import User, { UserSchema } from "@models/User"


export default class UserRepository extends Repository<UserSchema, User>
{
    public getModel(): typeof User
    {
        return User
    }

    public findByUsername(username: string): Promise<Nullable<User>>
    {
        return this.query(query => query.where("user.name", username).and.where("active", true))
    }
}