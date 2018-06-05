export interface AsyncState<T> {
  readonly data: T;
  readonly loading: boolean;
  readonly error?: any;
}