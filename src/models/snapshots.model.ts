// snapshots-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Schema } from 'mongoose';

var ObjectId = Schema.Types.ObjectId;

export default function (app: Application) {
  const modelName = 'snapshots';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    accountId: { type: ObjectId, required: true },
    userId: { type: ObjectId, required: true },
    amount: {type: Number, required:true},
    date: {type:Date, required: true},
    transactionCount: {type: Number, required:true}
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
