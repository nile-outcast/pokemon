const MAX_LENGTH = 9 as const;

// TODO: Удалить хелпер
export const getTextFormat = (text?: string, isName?: boolean): string => {
  if (!text) return ' ';

  const isLong = text.length > MAX_LENGTH;
  const maxLength = isLong ? MAX_LENGTH : text?.length;

  return isName
    ? `${text[0].toUpperCase()}${text.slice(1, maxLength)}${isLong ? '...' : ''}`
    : `${text[0].toUpperCase()}${text.slice(1)}`;
};

export const dataValidation = <T extends Record<string, unknown>>(
  data: Array<T> = [],
  limit: number,
): Array<T> | Array<undefined> => {
  if (!data || data.length === 0) return new Array(limit).fill(undefined);
  return data;
};
