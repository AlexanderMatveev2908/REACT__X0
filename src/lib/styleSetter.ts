export const setStyle = (...arr: { [kye: string]: string }[]) => ({
  style: arr.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
});
