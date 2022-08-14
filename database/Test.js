import { Schema, model } from 'mongoose';

// schema for medication
const medicationSchema = new Schema({
  name: String,
  quantity: Number,
  Amount: Number,
});
// schema for test
const testSchema = new Schema({
  saleDate: Date,
  medication: [
    {
      type: medicationSchema,
      required: true,
    },
  ],
});
// module for schema
export default model('Test', testSchema);
