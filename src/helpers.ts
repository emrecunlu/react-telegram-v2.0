export const sliceString = (value: string, max: number = 25) => {
  if (value.length > max) {
    return value.slice(0, max) + "...";
  }

  return value;
};
