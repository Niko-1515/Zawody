// Імпорт сервісних функцій з файлу /src/services.js
import {
    createNewRider,
    deleteRider,
    getAllRiders,
    getRiderById,
    patchUpdateRider,
    putUpdateRider,
  } from '../services/riders.js';
  
  // Імпорт пакету http-errors для обробки помилок
  import createHttpError from 'http-errors';
  
  // Контролер для отримання всіх контактів
  export const getAllRidersController = async (_req, res) => {
    const riders = await getAllRiders(); // Використовуємо сервісну функцію getAllContacts
  
    // Перевірка на відсутність контактів
    // Якщо контактів немає (масив контактів порожній) - викликаємо помилку
    if (riders.length === 0) {
      throw createHttpError(404, 'No riders found');
    }
  
    // Відправляємо відповідь з даними контактів
    res.status(200).json({
      status: 200,
      message: `Successfully found riders in the amount of ${riders.length} pcs!`,
      data: riders, // Відправляємо масив контактів
    });
  };
  
  // Контролер для отримання контакту за id
  export const getRiderByIdController = async (req, res, _next) => {
    const { riderId } = req.params; // Отримуємо id контакту з параметрів запиту
    const rider = await getRiderById(riderId); // Використовуємо сервісну функцію getContactById, повертає об'єкт контакту
  
    // Перевірка на відсутність контакту
    // Якщо контакт не знайдено (null), викликаємо помилку
    if (!rider) {
      throw createHttpError(404, 'Rider not found');
    }
  
    // Відправляємо відповідь з даними контакту
    res.status(200).json({
      status: 200,
      message: `Successfully found rider with id: ${riderId}!`,
      data: rider, // Відправляємо об'єкт контакту
    });
  };
  
  // Старий варіант перевірки на відсутність контакту
  // Код змінили на throw createHttpError(404, 'Contact not found');
  // if (!contact) {
  // next(new Error('Contact not found'));
  // return;
  // }
  
  // Старий варіант коду обробки помилок
  // Код змінили на next(new Error('Contact not found'));
  //   if (!contact) {
  //     res.status(404).json({
  //       message: 'Contact not found',
  //     });
  //     return;
  //   }
  
  export const createNewRiderController = async (req, res) => {
    // Контролер для створення нового контакту
    // Перевірка на відсутність обов'язкових полів
    if (!req.body.name || !req.body.phoneNumber || !req.body.riderType) {
      const missingFields = []; // Масив для зберігання назв полів
  
      // Якщо поле не знайдено, додаємо його до масиву "missingFields"
      if (!req.body.name) {
        missingFields.push('name');
      }
      if (!req.body.phoneNumber) {
        missingFields.push('phoneNumber');
      }
      if (!req.body.contactType) {
        missingFields.push('riderType');
      }
  
      // Повертаємо помилку з відповідними обов'язковими полями
      throw createHttpError(
        400,
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }
  
    // res.status(400).json({
    //   status: 400,
    //   message: `Missing required fields: ${missingFields.join(', ')}`,
    // });
    // return;
  
    const newRider = await createNewRider(req.body); // Використовуємо сервісну функцію createNewContact
    // Передаємо в неї тіло запиту (req.body)
  
    // Відправляємо відповідь з даними нового контакту
    res.status(201).json({
      status: 201,
      message: 'Successfully created a new rider!',
      data: newRider, // Відправляємо об'єкт нового контакту
    });
  };
  
  // Контролер для видалення контакту
  export const deleteRiderController = async (req, res, _next) => {
    const { riderId } = req.params; // Отримуємо id контакту з параметрів запиту
    const deletedRider = await deleteRider(riderId); // Використовуємо сервісну функцію deleteContact
    // Передаємо в неї id контакту
  
    // Перевірка на відсутність контакту
    // Якщо контакт не знайдено (null), викликаємо помилку
    if (!deletedRider) {
      throw createHttpError(404, 'Rider not found');
    }
  
    // ✅ Альтернативний варіант обробки помилки
    // if (!deletedContact) {
    //   next(createHttpError(404, 'Contact not found'));
    //   return;
    // }
  
    res.status(204).send(); // Відправляємо відповідь з статусом 204 без тіла (пуста відповідь)
  };
  
  // Контролер для оновлення контакту PATCH
  export const patchRiderController = async (req, res, _next) => {
    const { riderId } = req.params; // Отримуємо id контакту з параметрів запиту
    // Використовуємо сервісну функцію patchUpdateContact, передаємо id контакту і тіло запиту
    const result = await patchUpdateRider(riderId, req.body);
  
    // Перевірка на відсутність контакту
    // Якщо контакт не знайдено (null), викликаємо помилку
    if (!result) {
      throw createHttpError(404, 'Rider not found');
    }
  
    // Відправляємо відповідь з даними контакту
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a rider!',
      data: result, // Відправляємо об'єкт контакту
    });
  };
  
  // Контролер для оновлення контакту PUT
  export const putRiderController = async (req, res, _next) => {
    const { riderId } = req.params; // Отримуємо id контакту з параметрів запиту
  
    // Отримуємо об'єкт контакту за id
    const existingRider = await getRiderById(riderId);
  
    // Перевірка на відсутність контакту (якщо контакт не знайдено - він буде створений за допомогою putUpdateContact)
    if (!existingRider) {
      // При створенні контакту перевіряємо на наявність всіх обов'язкових полів в тілі запиту (req.body)
      if (!req.body.name || !req.body.phoneNumber || !req.body.RiderType) {
        const missingFields = []; // Масив для зберігання незаповнених полів
  
        // Перевірка на наявність обов'язкових полів - якщо поле не заповнено, додаємо його до масиву
        if (!req.body.name) missingFields.push('name');
        if (!req.body.phoneNumber) missingFields.push('phoneNumber');
        if (!req.body.riderType) missingFields.push('contactType');
  
        // Викликаємо помилку з повідомленням про незаповнені поля
        throw createHttpError(
          400,
          `Missing required fields for upsert: ${missingFields.join(', ')}`,
        );
      }
    }
    // Використовуємо сервісну функцію putUpdateContact, передаємо id контакту і тіло запиту
    // { upsert: true } для створення контакту, якщо такого немає
    const result = await putUpdateRider(riderId, req.body, { upsert: true });
  
    // Якщо виникла помилка при створенні контакту (null), викликаємо помилку
    if (!result) {
      throw createHttpError(404, 'Rider not found');
    }
    // Перевіряємо - контакт був створений чи відредагований
    // isNew - true, якщо контакт був створений, false - якщо контакт був відредагований
    const statusCode = result.isNew ? 201 : 200;
  
    // Відправляємо відповідь з даними контакту
    res.status(statusCode).json({
      status: statusCode,
      message: 'Successfully upserted a rider!',
      data: result.rider,
    });
  };