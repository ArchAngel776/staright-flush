// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<Type = any, Params = any> = new (...args: Array<Params>) => Type 