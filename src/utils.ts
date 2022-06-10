export const getTextFormat = (name: string | undefined): string => name ? `${name[0].toUpperCase()}${name.slice(1)}` : ' '; 

export const dataValidation = <T extends Record<string, unknown>>(
  data: T[] | undefined,
  limit: number,
): T[] | undefined[] => {
  if (!data || data.length === 0) return new Array(limit).fill(undefined);
  return data;
};
