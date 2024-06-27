import { Router } from 'express';
import { cacheMiddleware } from '../middlewares/cache';
import { rateLimiter } from '../middlewares/rate-limiting';
import { fetchCountries, fetchSingleCountry, updateCountry } from "../controllers/countries.controller";

const router = Router();

router.route('/countries').get(cacheMiddleware, rateLimiter, fetchCountries);

router.route('/countries/:name')
    .get(fetchSingleCountry)
    .put(updateCountry);

export default router;
