/**
 * @file Record クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

/**
 * 動画1ファイルごとの情報を扱うクラスです。
 */
export default class Record {
  /**
   * コンストラクタ
   *
   * このクラスは基本的に immutable に使う想定なので
   * 一度設定した後は変更できません。
   *
   * @param {string} p_id
   *   動画の一意なIDです。
   * @param {string} p_drive
   *   動画の置かれたドライブレター。後ろの「\」は付きません。
   * @param {string} p_dir
   *   「\」から始まる動画のおかれたフォルダのパス
   * @param {string} p_title
   *    動画のファイル名の拡張子抜きです。
   * @param {string} p_ext
   *    動画の「.」から始まる拡張子です。
   * @param {number} p_score
   *    この動画のスコアです。
   */
  constructor(p_id, p_drive, p_dir, p_title, p_ext, p_score) {
    this._FId = p_id;
    this._FDrive = p_drive;
    this._FDir = p_dir;
    this._FTitle = p_title;
    this._FExt = p_ext;
    this._FScore = p_score;
  }

  /**
   * 動画IDを取得します。
   *
   * @return {string}
   *   動画のID
   */
  get id() {
    return this._FId;
  }

  /**
   * 動画の置かれたドライブレターを取得します。
   *
   * @return {string}
   *   「D:」みたいなドライブレター
   */
  get drive() {
    return this._FDrive;
  }

  /**
   * 動画の置かれたフォルダのパスを取得します。
   *
   * @return {string}
   *   「\Hoge\Fuga」みたいなフォルダのパス
   */
  get dir() {
    return this._FDir;
  }

  /**
   * 動画のファイル名を取得します。
   *
   * @return {string}
   *   拡張子を含まない動画のファイル名
   */
  get title() {
    return this._FTitle;
  }

  /**
   * 動画の拡張子を得ます。
   *
   * @return {string}
   *   「.avi」みたいな拡張子
   */
  get ext() {
    return this._FExt;
  }

  /**
   * この動画のスコアを得ます
   *
   * @return {number}
   *   数値型の動画スコア
   */
  get score() {
    return this._FScore;
  }
}
