import { IUser } from '../../models/User.model';
import { ITenant } from '../../models/Tenant.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      tenant?: ITenant;
    }
  }
}

export {};