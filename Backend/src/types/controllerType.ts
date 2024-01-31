import { Request, Response, NextFunction } from 'express';

export interface ControllersType {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}
