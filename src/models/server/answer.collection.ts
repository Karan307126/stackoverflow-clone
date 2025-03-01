import { Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // create answer collection

  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.create("users"),
    Permission.delete("users"),
  ]);
  console.log("answer collection created");

  // create answer attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
  ]);
  console.log("answer attributes created");
}
