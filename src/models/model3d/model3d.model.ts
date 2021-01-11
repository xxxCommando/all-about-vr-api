import { model } from 'mongoose';
import { IModel3d } from './model3d.types';
import Model3dSchema from './model3d.schema';

const Model3d = model<IModel3d>('model3d', Model3dSchema);
export default Model3d;
