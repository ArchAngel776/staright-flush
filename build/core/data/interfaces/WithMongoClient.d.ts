import { MongoClient } from "mongodb";
export default interface WithMongoClient {
    client: MongoClient;
}
