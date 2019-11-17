/**
 * テスト用のテストに、とりあえず使えるような値を返す
 * ダミーの WhiteBrowser クラス
 * 
 * あるメソッドで固有の処理を返したい場合はインスタンスを作った後で
 * メソッドを差し替えて使います。
 */
export default class DummyWhiteBrowser {
  getFileList() { return [] }
  checkFile() { return true }
  getDBName() { return "" }
  writeFile() { return undefined }
  readFile() { return [] }
  getInfos() { return [] }
  getInfo() { return {} }
  focusThum() { return undefined }
  getProfile() { return "" }
  writeProfile() { return "" }
  getAppDir() { return "" }
}
