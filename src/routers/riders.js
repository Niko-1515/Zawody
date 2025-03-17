// Імпорт Router з express
// Express Router - об'єкт, який використовується для групування роутів
import { Router } from 'express';

import express from 'express';

// Імпорт контролерів
import {
  createNewRiderController,
  deleteRiderController,
  getAllRidersController,
  getRiderByIdController,
  patchRiderController,
  putRiderController,
} from '../controllers/riders.js';

// Імпорт ctrlWrapper - утиліта для огортання контролерів
// Для обробки помилок (try...catch) і захищення від падіння сервера (unhandled promise rejection)
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// Створення екземпляру Router
const router = Router();

// Парсер для JSON-даних, "express.json" --> парсить тіло запитів у форматі JSON і додає результат як об'єкт до "req.body"
const jsonParser = express.json({
  // Вказуємо, що ми очікуємо JSON-дані або JSON:API
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb', // обмеження на розмір тіла запиту
});

// Роути для різних видів запитів
// GET i DELETE --> не потребують jsonParser
router.get('/riders', ctrlWrapper(getAllRidersController));
router.get('/riders/:riderId', ctrlWrapper(getRiderByIdController));
router.delete('/riders/:riderId', ctrlWrapper(deleteRiderController));

// POST, PUT i PATCH --> потребують jsonParser
router.post('/riders', jsonParser, ctrlWrapper(createNewRiderController));
router.put(
  '/riders/:riderId',
  jsonParser,
  ctrlWrapper(putRiderController),
);
router.patch(
  '/riders/:riderId',
  jsonParser,
  ctrlWrapper(patchRiderController),
);

// Експорт екземпляру Router
export default router;