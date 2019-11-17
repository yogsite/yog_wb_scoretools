/**
 * @file RecordFileReader クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import Record from "./record.js";
import TSVReader from "./tsvReader.js";

/**
 * RecordFileWriter を使って、 TSVに保存したスコアファイルを
 * Record の配列として読み出します。
 */
export default class RecordFileReader {
  /**
   * コンストラクタ
   *
   * ファイルの読み出しはこの中で実行されます。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {string} p_file_name
   *   読み出したいファイル名です。
   *   ここで指定したファイル名のファイルを「%WhiteBrowser%\\temp」フォルダから読み出します。
   * @see #getRecords
   */
  constructor(p_white_browser, p_file_name) {
    // 初期化
    this._FRecords = [];

    // TSV読む
    const vTSV = new TSVReader(p_white_browser.readFile(p_file_name));
    if (!vTSV.isSuccess()) {
      return;
    }

    // ヘッダから各アイテムの列番号を得る。1個でも取れなかったら失敗
    const vIndexes = {
      ID: vTSV.header.findIndex((p_entry) => p_entry === "ID"),
      Drive: vTSV.header.findIndex((p_entry) => p_entry === "DRIVE"),
      Dir: vTSV.header.findIndex((p_entry) => p_entry === "DIR"),
      Title: vTSV.header.findIndex((p_entry) => p_entry === "TITLE"),
      Ext: vTSV.header.findIndex((p_entry) => p_entry === "EXT"),
      Score: vTSV.header.findIndex((p_entry) => p_entry === "SCORE")
    };
    if (Object.values(vIndexes).includes(-1)) {
      return;
    }

    // 各レコードをオブジェクトに分解して入れる
    this._FRecords = vTSV.data.map(
      (p_data_line) => new Record(
        p_data_line[vIndexes.ID],
        p_data_line[vIndexes.Drive],
        p_data_line[vIndexes.Dir],
        p_data_line[vIndexes.Title],
        p_data_line[vIndexes.Ext],
        parseInt(p_data_line[vIndexes.Score], 10)
      )
    );
  }

  /**
   * コンストラクタで読みだした結果を取得します。
   *
   * 読み出しに失敗した場合でも空配列が入っています。
   *
   * @return {[Record]}
   *   スコアTSVを Record の配列にしたもの。
   */
  getRecords() {
    return this._FRecords;
  }
}
