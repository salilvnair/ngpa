export class JsonCommonUtil {
  static removeEmptyValues(obj) {
    const result = Object.keys(obj).forEach(key => obj[key] == "" && delete obj[key]);
    return result;
  }
  static removeNullValues(obj) {
    const result = Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
    return result;
  }
  static removeNEValues(obj) {
    const result = Object.keys(obj).forEach(
      key => (obj[key] == null || obj[key] == "") && delete obj[key]
    );
    return result;
  }
}
