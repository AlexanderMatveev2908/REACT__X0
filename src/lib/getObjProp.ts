/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjOk = (obj: any) =>
  !!Object.keys(obj ?? {}).length && Object.values(obj).some((k) => !!k);
