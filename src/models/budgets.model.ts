// budgets-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Schema } from 'mongoose';

var ObjectId = Schema.Types.ObjectId;

export default function (app: Application) {
  const modelName = 'budgets';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const filterSchema = new Schema({
    transfers: {type: Boolean, required: true},
    unclearedTransactions: {type: Boolean, required: true},
    accounts: [ObjectId],
    categories: [ObjectId],
    tags: [ObjectId],

  })

  const schema = new Schema({
    userId: { type: ObjectId, required: true },
    period: {type: String, required:true },
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    name: {type:String, required:true},
    comment: {type:String},
    includeFilters: {type: filterSchema, required: true},
    excludeFilters: {type: filterSchema, required: true}
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
