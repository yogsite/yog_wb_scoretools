/**
 * @file RecordFileWriter クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

/**
 * Record の配列を RecordFileReader で読み出せるような
 * スコアTSVファイルに書き出します。
 */
export default class RecordFileWriter {
  /**
   * コンストラクタ
   *
   * ファイルの書き出しはこれを呼び出した時点で完了します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {string} p_file_name
   *   ここで指定したファイル名で「%WhiteBrowser%\\temp」フォルダにスコアファイルが書き出されます。
   * @param {[Record]} p_records
   *   書き込みたい Record の配列
   */
  constructor(p_white_browser, p_file_name, p_records) {
    // まずヘッダ
    p_white_browser.writeFile(
      p_file_name,
      "ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE",
      false
    );

    // 次に中身
    p_records.forEach((p_record) => {
      p_white_browser.writeFile(
        p_file_name,
        `${p_record.id}\t${p_record.drive}\t${p_record.dir}\t${p_record.title}\t${p_record.ext}\t${p_record.score}`,
        true
      );
    });
  }
}
