import { Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
  // create comment collection
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.create("users"),
    Permission.delete("users"),
  ]);
  console.log("comment collection created");

  // create comment attributes
  await Promise.all([
    databases.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["answer", "question"],
      true
    ),
    databases.createStringAttribute(
      db,
      commentCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
    databases.createStringAttribute(
      db,
      commentCollection,
      "authorId",
      50,
      true
    ),
  ]);
  console.log("comment attributes created");
}
