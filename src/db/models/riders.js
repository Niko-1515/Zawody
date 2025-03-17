// ❗❗❗ файл із визначенням схеми та моделі для колекції контактів у MongoDB ❗❗❗

// Імпортуємо функцію model та клас Schema з бібліотеки mongoose
// Schema визначає структуру документів, model створює модель для роботи з колекцією
import { model, Schema } from 'mongoose';

// Створюємо СXЕМУ для колекції "".
// Схема містить наступні поля:
// ✅ "name" - обов'язкове текстове поле,
// ✅ "phoneNumber" - обов'язкове текстове поле,
// ✅ "email" - необов'язкове текстове поле, (може бути null)
// ✅ "isFavourite" - необов'язкове булеве поле, значення за замовчуванням false,
// ✅ "contactType" - обов'язкове текстове поле, варіанти значень: work, home, personal, значення за замовчуванням "personal".
const ridersSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true  },
    dateOfBirth: {type: String, required: true },
    adres: { type: String,},
    startNumber: { type: Number, unique: true, required: true },
    modelMoto: {type: String},
    engineSize: {type: Number, required: true},
    riderType: {
      type: String,
      enum: ['open', 'kobiety', 'junior'],
      required: true,
      default: 'open',
    },
    shirt: {
      type: String,
      enum: ['nie', 's', 'm', 'l', 'xl', 'xxl'],
      required: true,
      default: 'nie',
    },
  },
  {
    timestamps: true, // Автоматично додає поля createdAt та updatedAt до кожного документа
    versionKey: false, // Вимикає поле __v для версійності документа
  },
);

// Експортуємо модель ContactsCollection для роботи з колекцією "contacts"
// Модель пов'язує схему з колекцією в базі даних і дозволяє виконувати запити
export const RidersCollection = model('riders', ridersSchema);

