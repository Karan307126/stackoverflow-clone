import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("storage connected");
  } catch (error) {
    try {
      await storage.createBucket(
        questionAttachmentBucket,
        questionAttachmentBucket,
        [
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.create("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        [".jpg", ".png", "jpeg", "gif", "webp", "heic"]
      );
      console.log("storage created");
      console.log("storage connected");
    } catch (error) {
      console.error("storage creation error", error);
    }
    console.error("storage connection error", error);
  }
}
