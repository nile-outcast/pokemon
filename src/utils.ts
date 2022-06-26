export const getTextFormat = (text: string | undefined, isName?: boolean): string => {
  if (!text) return ' ';

  const isLong = text.length > 9;
  const maxLength = isLong ? 9 : text?.length;

  return isName
    ? `${text[0].toUpperCase()}${text.slice(1, maxLength)}${isLong ? '...' : ''}`
    : `${text[0].toUpperCase()}${text.slice(1)}`;
};

export const dataValidation = <T extends Record<string, unknown>>(
  data: T[] | undefined,
  limit: number,
): T[] | undefined[] => {
  if (!data || data.length === 0) return new Array(limit).fill(undefined);
  return data;
};
