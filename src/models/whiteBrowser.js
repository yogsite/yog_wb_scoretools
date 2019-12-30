/**
 * @file WhiteBrowser クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

/* eslint-disable no-undef */
/**
 * WhiteBrowserが持つ各種機能を触るブリッジクラスです。
 *
 * WhiteBrowserのAPIに関する機能のうち使うものは全てラップしているので
 * これを差し替えれば他の機能は WhiteBrowser に依存することなく動きます。
 *
 * 基本的には API を生で触るだけに留めており、これらを用いた各種ロジックは
 * Utils クラスのほうに実装しています。
 *
 * イベントハンドラについてはラップする意味が薄いのでここにはありません。
 * 直接呼ぶ必要があります。
 *
 */
export default class WhiteBrowser {
  /**
   * ファイルシステムの指定フォルダ下にあるファイルを取得します。
   *
   * @param {string} p_dir
   *   検索対象のディレクトリフルパス
   * @param {string} p_filter
   *   検索時に使うファイルマスクです。例えば「*.tsv」
   * @return {object}
   *   オブジェクトの配列。中身には以下のキーが入っています。
   *
   *    - name {string}
   *      - ファイル名
   *    - isDir {boolean}
   *      - ディレクトリなら true 、ファイルなら false
   */
  getFileList(p_dir, p_filter) {
    return wb.getFileList(p_dir, p_filter).map(
      (p_entry) => ({
        name: p_entry.name,
        isDir: (p_entry.isDir !== "0")
      })
    );
  }

  /**
   * 指定のファイルがあるかを調べます。
   *
   * @param {string} p_fullpath
   *   存在確認したいファイルのフルパス
   * @return {boolean}
   *   あれば true, なければ false
   */
  checkFile(p_fullpath) {
    return (wb.checkFile(p_fullpath) === "1");
  }

  /**
   * 管理ファイル名を返します。
   *
   * @return {string}
   *   管理ファイル名（拡張子付き)
   */
  getDBName() {
    return wb.getDBName();
  }

  /**
   * ファイルを1行書き込みます。場所は「%WhiteBrowser%\temp」固定。
   *
   * @param {string} p_filename
   *   書き込むファイルの名前。
   * @param {string} p_text
   *   書き込む文字列1行
   * @param {boolean} p_is_append
   *   true にすると追記、 false にすると上書きです。
   * @return {string}
   *   成功するとファイルのフルパスが、失敗すると空文字が戻ってきます。
   */
  writeFile(p_filename, p_text, p_is_append) {
    return wb.writeFile(p_filename, p_text, p_is_append ? 0 : 1);
  }

  /**
   * ファイルを読み込みます。場所は「%WhiteBrowser%\temp」固定。
   *
   * @param {string} p_filename
   *   読み込むファイルの名前。
   * @return {string}
   *   ファイルを行単位で分割した文字列配列
   */
  readFile(p_filename) {
    return wb.readFile(p_filename);
  }

  /**
   * 指定条件に該当するすべてのファイルの情報を取得します。
   *
   * このとき現在WhiteBrowser上で指定されている条件は使いません。
   *
   * @param {string} p_where
   *   絞り込み条件をSQLのWhere句で書く。不要なら空文字にします。
   * @param {string} p_order_by
   *   並び替えをSQLのORDER BY句で書く。不要なら空文字にします。
   * @return {object}
   *   指定した条件に該当する全ムービーの情報を含むオブジェクト配列
   *   入っているオブジェクトキー値は以下です。
   *
   *   - id {string}
   *   - drive {string}
   *   - dir {string}
   *   - title {string}
   *   - ext {string}
   *   - score {number}
   */
  getInfos(p_where, p_order_by) {
    return wb.getInfos(0, -1, p_where, p_order_by, 1).map(
      (p_info) => ({
        id: p_info.id,
        drive: p_info.drive,
        dir: p_info.dir,
        title: p_info.title,
        ext: p_info.ext,
        score: parseInt(p_info.score, 10)
      })
    );
  }

  /**
   * 特定のファイルの情報を取得します。
   *
   * @param {string} p_movie_id
   *   ムービーのID
   * @return {object}
   *   オブジェクト。以下のキーと値が入っています。
   *
   *   - id {string}
   *   - drive {string}
   *   - dir {string}
   *   - title {string}
   *   - ext {string}
   *   - score {number}
   *
   *   動画が存在しなかった場合は「null」が戻されます。
   */
  getInfo(p_movie_id) {
    const vInfo = wb.getInfo(p_movie_id);

    return (!vInfo) ? null : {
      id: vInfo.id,
      drive: vInfo.drive,
      dir: vInfo.dir,
      title: vInfo.title,
      ext: vInfo.ext,
      score: parseInt(vInfo.score, 10)
    };
  }

  /**
   * 指定の動画に WhiteBrowser 上のカーソルを移動します。
   *
   * @param {string} p_movie_id
   *   画面上に表示したい動画のID
   */
  focusThum(p_movie_id) {
    wb.focusThum(p_movie_id);
    wb.scrollTo(p_movie_id);
  }

  /**
   * エクステンションの設定情報をDBから読み出します。
   *
   * @param {string} p_key
   *   キー値となる文字列
   *
   *   グローバルなところに書くようなので、他のエクステンションのダブらないように「YogWbScoreTools」という
   *   プレフィックスを自動でつけます。
   * @param {string} p_default
   *   項目がなかったときに戻ってくるデフォルト値となる文字列
   * @return {string}
   *   実際の値か p_default のどっちか。
   */
  getProfile(p_key, p_default) {
    return wb.getProfile(`YogWbScoreTools_${p_key}`, p_default);
  }

  /**
   * エクステンションの設定情報をDBに書き込んで永続化します。
   *
   * @param {string} p_key
   *   キー値となる文字列
   *
   *   グローバルなところに書くようなので、他のエクステンションのダブらないように「YogWbScoreTools」という
   *   プレフィックスを自動でつけます。
   * @param {string} p_value
   *   書き込む値となる文字列
   */
  writeProfile(p_key, p_value) {
    wb.writeProfile(`YogWbScoreTools_${p_key}`, p_value);
  }

  /**
   * WhiteBrowser の置いてあるフォルダのフルパスを取得します。
   *
   * @return {string}
   *   WhiteBrowser の置き場所
   */
  getAppDir() {
    return wb.getAppDir();
  }
}
/* eslint-enable */
