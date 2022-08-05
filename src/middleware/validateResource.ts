/**
 * validates requests against a schema
 */
import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
import logger from '../utils/logger';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (e) {
        logger.error(e);
        return res.status(400).send("Object is not valid");
    }
};

export default validate;