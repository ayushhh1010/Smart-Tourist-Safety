import mongoose, { Schema, Document } from 'mongoose';


export interface ITrip extends Document {
user: mongoose.Types.ObjectId;
title: string;
startDate: Date;
endDate: Date;
notes?: string;
}


const TripSchema: Schema = new Schema({
user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
startDate: { type: Date, required: true },
endDate: { type: Date, required: true },
notes: { type: String },
}, { timestamps: true });


export const Trip = mongoose.model<ITrip>('Trip', TripSchema);