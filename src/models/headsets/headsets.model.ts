import { model } from 'mongoose';
import { IHeadset } from './headsets.types';
import HeadsetSchema from './headsets.schema';

const Headset = model<IHeadset>('headset', HeadsetSchema);
export default Headset;
