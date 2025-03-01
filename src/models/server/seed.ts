import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("database connected");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("database created");

      // create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("collections created successfully");
      console.log("database connected");
    } catch (error) {
      console.error("database connection error", error);
    }
    console.error("database connection error", error);
  }
  return databases;
}
