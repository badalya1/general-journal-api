// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Mongoose, ConnectionBase } from "mongoose";
import { child } from "winston";

export default function (app: Application) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");

  const PreferenceSchema = new mongooseClient.Schema(
  {
    dateFormat: {type: String},
    decimalSeperator: {type: String, default: "."},
    thousandSeperator: {type: String, default: ","},
    weekStart: {type: Number, default: 1}
  });

  const schema = new mongooseClient.Schema(
    {
      username: {type: String, unique: true, required: true },
      email: { type: String, unique: true, lowercase: true , required: true},
      password: { type: String },
      name: {type: String, required: true},
      preferences: {type: PreferenceSchema, required: true},
      googleId: { type: String },
      facebookId: { type: String },
      twitterId: { type: String },
      githubId: { type: String },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
