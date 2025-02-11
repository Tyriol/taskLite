import { todoDocuments } from '../database/lokidb';

const getStartOfDay = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
};

const getEndOfDay = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  ).getTime();
};

export const todosCompleteToday = () => {
  const startOfDay = getStartOfDay(new Date());
  const endOfDay = getEndOfDay(new Date());
  return todoDocuments.find({
    completedAt: { $gte: startOfDay, $lte: endOfDay },
  });
};
