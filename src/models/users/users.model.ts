import { model } from 'mongoose';
import { IUser } from './users.types';
import UserSchema from './users.schema';

const User = model<IUser>('user', UserSchema);
export default User;
