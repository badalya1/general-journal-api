// accounts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Schema } from 'mongoose';

var ObjectId = Schema.Types.ObjectId;

export default function (app: Application) {
  const modelName = 'accounts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    userId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    icon: { type: String},
    comment: { type: String},
    isHidden: {type: Boolean},
    groupId: { type: ObjectId}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
