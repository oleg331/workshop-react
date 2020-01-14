import Response from 'core/response';
import UserService from './service';

import { statusCodes } from '@app/constants/status';

class UserController {
  getUsers = async (request, response) => {
    try {
      const { email, id } = request.query;

      if (email) {
        const user = await UserService.getUserInstanceByEmail(email);
        Response.success(response, { user });
        return
      }

      if (id) {
        const user = await UserService.getUserInstanceById(id);
        Response.success(response, { user });
        return
      }

      const users = await UserService.getUsers();

      Response.success(response, { users });
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.NOT_FOUND)
    }
  };

  getAuthenticatedUser = async (request, response) => {
    try {
      if (!request.user) {
        throw new Error('User not found');
      }
      Response.success(response, { user: request.user });
    } catch (error) {
      const { message } = error;

      console.warn(error);
      Response.error(response, message, statusCodes.UNAUTHORIZED);
    }
  };
}

export default UserController;
