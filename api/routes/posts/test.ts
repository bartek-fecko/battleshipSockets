import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   res.send({ a: true })
})

export {router}