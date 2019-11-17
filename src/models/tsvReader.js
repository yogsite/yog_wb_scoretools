/**
 * @file TSVReader クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

/**
 * TSVを読み出すクラスです。
 * 単にファイルを読み出して配列に分解するだけで、それ以上ことはしません。
 *
 * なお書き込みはわざわざクラス化するほどのものではないので
 * 存在しません。
 */
export default class TSVReader {
  /**
   * TSV を読み出して、ヘッダとデータに分解します。
   *
   * @param {string} p_tsv
   *   読み込みたいTSVファイルのデータ
   *
   *   1行1要素の文字列配列を渡します。
   */
  constructor(p_tsv) {
    // 初期化
    this._FHeader = [];
    this._FData = [];

    // 長さチェック
    if (p_tsv.length < 2) {
      return;
    }

    // 1行目がヘッダ
    this._FHeader = p_tsv[0].split("\t");
    if (this._FHeader.length < 6) {
      return;
    }

    // 後はデータ
    for (let i = 1; i < p_tsv.length; i += 1) {
      this._FData.push(p_tsv[i].split("\t"));
    }
  }

  /**
   * 読み出しに成功しているかどうかを判定します。
   *
   * @return {boolean}
   *   true なら成功、 false なら失敗しています。
   */
  isSuccess() {
    return ((this._FHeader.length !== 0) && (this._FData.length !== 0));
  }

  /**
   * 解析したTSVのヘッダを取得します。
   *
   * @return {string}
   *   1行目のレコードをタブ区切りで分解した文字列配列です。
   */
  get header() {
    return this._FHeader;
  }

  /**
   * 解析したTSVのデータを取得します。
   *
   * @return {string}
   *   1行目以降のレコードをタブ区切りで分解した
   *   文字列の二次元配列です。
   */
  get data() {
    return this._FData;
  }
}
