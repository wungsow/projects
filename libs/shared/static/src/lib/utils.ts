export class Utils {
  public static isDefined(value): boolean {
    return value !== null && typeof value !== 'undefined' && value !== '';
  }

  public static getNewId(existingIds: (number | string)[] = []) {
    const ids = existingIds.map(id => parseInt(id + '', 10));
    return ids.length && Math.max(...ids) + 1;
  }
}