import mongoose from "mongoose";

const studentFeesSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true
  },
  fees: {
    January: { type: Number, default: 0 },
    February: { type: Number, default: 0 },
    March: { type: Number, default: 0 },
    April: { type: Number, default: 0 },
    May: { type: Number, default: 0 },
    June: { type: Number, default: 0 },
    July: { type: Number, default: 0 },
    August: { type: Number, default: 0 },
    September: { type: Number, default: 0 },
    October: { type: Number, default: 0 },
    November: { type: Number, default: 0 },
    December: { type: Number, default: 0 },
  },
  paymentDates: {  // New field for storing payment dates
    January: { type: Date, default: null },
    February: { type: Date, default: null },
    March: { type: Date, default: null },
    April: { type: Date, default: null },
    May: { type: Date, default: null },
    June: { type: Date, default: null },
    July: { type: Date, default: null },
    August: { type: Date, default: null },
    September: { type: Date, default: null },
    October: { type: Date, default: null },
    November: { type: Date, default: null },
    December: { type: Date, default: null },
  }
}, { timestamps: true });

export default mongoose.model('students_fees', studentFeesSchema);
