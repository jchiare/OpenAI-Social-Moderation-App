import type { Request, Response } from 'express';
import path from 'path';

export async function home(req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '../../../public/index.html'));
}
