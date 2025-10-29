export const addCommaIfMore = (index: number, array: Array<unknown>) =>
  array.length > 1 && index !== array.length - 1 ? ', ' : '';
