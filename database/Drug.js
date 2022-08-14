'use strict';
import { Schema, model } from 'mongoose';

// structure of drug schema
const drugBatchSchema = new Schema({
  batchNumber: String,
  quantity: Number,
  expiryDate: Date,
});
const drugSchema = new Schema({
  name: {
    required: true,
    lowercase: true,
    type: String,
  },
  strength: {
    required: true,
    lowercase: true,
    type: String,
  },
  price: Number,
  manufacturer: {
    type: String,
    minLength: 2,
  },
  drugBatch: [
    {
      type: drugBatchSchema,
      required: true,
    },
  ],
});
// models for schema
export default model('Drug', drugSchema);
