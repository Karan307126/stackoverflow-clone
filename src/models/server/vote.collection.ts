import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
  // create vote collection
  await databases.createCollection(db, voteCollection, voteCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.create("users"),
    Permission.delete("users"),
  ]);
  console.log("vote collection created");

  // create vote attributes
  await Promise.all([
    databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
    databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "type",
      ["answer", "question"],
      true
    ),
    databases.createEnumAttribute(
      db,
      voteCollection,
      "voteStatus",
      ["upVoted", "downVoted"],
      true
    ),
  ]);
  console.log("vote attributes created");
}
