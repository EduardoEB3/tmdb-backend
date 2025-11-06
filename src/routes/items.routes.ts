/**
 * @openapi
 * /items:
 *   get:
 *     summary: Retrieve a paginated list of movies or search results from TMDB
 *     description: Returns a paginated list of popular movies or movies matching the search query.
 *     tags:
 *       - Items
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Text to search for a specific movie title.
 *         required: false
 *         schema:
 *           type: string
 *           example: Inception
 *       - name: page
 *         in: query
 *         description: Page number to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: pageSize
 *         in: query
 *         description: Number of items per page.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of movies retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "page must be a number"
 *       500:
 *         description: Error fetching data from TMDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching data"
 *
 * /items/{id}:
 *   get:
 *     summary: Retrieve detailed information about a movie by its TMDB ID
 *     description: Returns detailed metadata for a single movie from TMDB.
 *     tags:
 *       - Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The TMDB movie ID.
 *         schema:
 *           type: integer
 *           example: 603
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not found"
 *       500:
 *         description: Error fetching data from TMDB.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching data"
 */

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
