'use strict';
import { Schema, model } from 'mongoose';

const drugInfoSchema = new Schema({
  name: String,
  strength: String,
  quantity: Number,
  amount: Number,
});

const SaleInfoSchema = new Schema({
  saleDate: Date,
  saleTotal: Number,
  saleReceipt: String,
  drugs: [
    {
      type: drugInfoSchema,
      required: true,
    },
  ],
});
const patientSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  dateOfBirth: String,
  age: Number,
  sex: String,
  medication: [
    {
      type: SaleInfoSchema,
      required: true,
    },
  ],
});
export default model('Patient', patientSchema);
