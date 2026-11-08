import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterUserRequest } from '../types/user.types';

const authService = new AuthService();

export class AuthController {
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user  = await authService.register(req.body as RegisterUserRequest);
          res.status(201).json(user );
        } catch (error) {
          next(error);
        }
      };

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await authService.login(req.body);
          res.status(200).json(user);
        } catch (error) {
          next(error);
        }
      };
      
      logout = (req: Request, res: Response): void => {
        res.clearCookie('authToken', {
          path: '/'
        });
      
        res.status(200).json({
          message: 'User logged out successfully'
        });
      };
}