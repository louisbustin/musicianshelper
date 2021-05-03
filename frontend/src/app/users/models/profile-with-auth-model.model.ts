import IAuthModel from './auth-model.model';
import IProfile from './profile.model';

export default interface IProfileWithAuthModel extends IProfile {
    authModel: IAuthModel;
}
