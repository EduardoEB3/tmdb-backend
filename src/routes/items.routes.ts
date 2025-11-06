import { Router } from 'express';
import { ItemController } from '../controllers/items.controller';
import { validateItemId, validateItemsQuery } from '../middlewares/validateItemsQuery';
import { TMDBService } from '../services/tmdb.service';

const router = Router();

const tmdbService = new TMDBService(process.env.TMDB_BEARER_TOKEN!);
const controller = new ItemController(tmdbService);

router.get('/', validateItemsQuery, controller.getItems);
router.get('/:id', validateItemId, controller.getItemById);

export default router;
