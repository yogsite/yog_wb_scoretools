/**
 * @file Utils クラスの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

/**
 * 雑多なユーティリティ関数が入っています。
 */
export default class Utils {
  /**
   * 「%WhiteBrowser%\temp」 なパスを作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @return
   *   生成されたフルパス
   */
  static getFileSaveFolder(p_white_browser) {
    return `${p_white_browser.getAppDir()}\\temp`;
  }

  /**
   * スコアファイルのプレフィックス部を作って返します。
   * 生成のルールとしては
   *
   * 1. 設定で指定されたものがあれば、それをそのまま使います
   * 2. 設定されていない場合は「wbScoreTools_[管理ファル名のスペースをアンダーバーにして拡張子を取ったもの]」になります。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @return
   *   管理ファイルのプレフィックス名
   */
  static getScoreFilePrefix(p_white_browser) {
    /* eslint-disable prefer-template */
    return p_white_browser.getProfile(
      "scoreFilePrefix",
      "wbScoreTools_" + p_white_browser.getDBName()
        .substring(0, p_white_browser.getDBName().lastIndexOf("."))
        .replace(" ", "_")
    );
    /* eslint-enable */
  }

  /**
   * 「%WhiteBrowser%\temp\ファイル名」 なパスを作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {string} p_filename
   *   後ろにつけたいファイル名
   * @return
   *   生成されたフルパス
   */
  static getScoreSaveFolder(p_white_browser, p_filename) {
    return `${Utils.getFileSaveFolder(p_white_browser)}\\${p_filename}`;
  }

  /**
   * 指定年の去年末、または指定年の最初の月末スコアファイルの名前を作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {number} p_year
   *   何年のものを取ってくるかを指定します
   * @return
   *   指定年の最初の月末スコアファイルの名前
   *
   *   存在しているかはチェックしているので、なかった場合は空文字が戻ってきます。
   */
  static getFirstEndOfLastScoreFileName(p_white_browser, p_year) {
    for (let i = 0; i < 12; i += 1) {
      const vFileName = Utils.getScoreFileName(p_white_browser, new Date(p_year, i, 0));
      const vFilePath = Utils.getScoreSaveFolder(p_white_browser, vFileName);

      if (p_white_browser.checkFile(vFilePath)) {
        return vFileName;
      }
    }

    return "";
  }

  /**
   * 指定年の最後、または去年末の月末スコアファイルの名前を作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {number} p_year
   *   何年のものを取ってくるかを指定します
   * @return
   *   指定年の最後の月末スコアファイルの名前
   *
   *   存在しているかはチェックしているので、なかった場合は空文字が戻ってきます。
   */
  static getLastEndOfLastScoreFileName(p_white_browser, p_year) {
    for (let i = 12; i >= 0; i -= 1) {
      const vFileName = Utils.getScoreFileName(p_white_browser, new Date(p_year, i, 0));
      const vFilePath = Utils.getScoreSaveFolder(p_white_browser, vFileName);

      if (p_white_browser.checkFile(vFilePath)) {
        return vFileName;
      }
    }

    return "";
  }

  /**
   * 指定の Date 型からスコアファイル名を生成して返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {Date} p_date
   *   日付部を表す Date 型
   * @return
   *   p_date を元にしたファイル名
   */
  static getScoreFileName(p_white_browser, p_date) {
    /* eslint-disable prefer-template */
    return `${Utils.getScoreFilePrefix(p_white_browser)}_`
      + `${p_date.getFullYear()}_`
      + `${("00" + (p_date.getMonth() + 1)).slice(-2)}_`
      + `${("00" + p_date.getDate()).slice(-2)}.tsv`;
    /* eslint-enable */
  }

  /**
   * 渡したスコアファイル名が月末のスコアファイルかどうかを判定します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {string} p_filename
   *   スコアファイル名
   * @return
   *   月末スコアファイルなら true、違えば false
   */
  static isEndOfMonthScoreFile(p_white_browser, p_filename) {
    const vMatch = (new RegExp(
      `^${Utils.getScoreFilePrefix(p_white_browser)}`
      + "_(\\d{4})_(\\d{2})_(\\d{2})\\.tsv$", "g"
    )).exec(p_filename);

    if (!vMatch) {
      return false;
    }
    // 入力月を一ヶ月進めた奴の日付を0にして正しい月末日を求める(月は0始まりなので入力をそのまま渡せばいい)
    let vEndOfMonth = new Date(parseInt(vMatch[1], 10), parseInt(vMatch[2], 10), 1);
    vEndOfMonth = new Date(vEndOfMonth.getFullYear(), vEndOfMonth.getMonth(), 0);

    // 一致してれば入力ファイルは月末
    return (
      (vEndOfMonth.getFullYear() === parseInt(vMatch[1], 10))
      && (vEndOfMonth.getMonth() + 1 === parseInt(vMatch[2], 10))
      && (vEndOfMonth.getDate() === parseInt(vMatch[3], 10))
    );
  }

  /**
   * 渡したスコアファイル名っぽいものから日付部を抜いてきて
   * Date型にして返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {string} p_filename
   *   スコアファイル名
   * @return
   *   Date型。正しくなさそうなものを渡した場合は null になります。
   */
  static extractScoreFileNameData(p_white_browser, p_filename) {
    const vMatch = (new RegExp(
      `^${Utils.getScoreFilePrefix(p_white_browser)}`
      + "_(\\d{4})_(\\d{2})_(\\d{2})\\.tsv$", "g"
    )).exec(p_filename);

    return vMatch
      ? new Date(parseInt(vMatch[1], 10), parseInt(vMatch[2], 10) - 1, parseInt(vMatch[3], 10))
      : null;
  }

  /**
   * 先月末のスコア保存ファイルの名前を作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @return
   *   先月末のスコアファイルの名前。
   *
   *   存在するかはチェックしていないので、戻ってきたファイルがあるかは不明です。
   */
  static getPrevEndOfLastScoreFileName(p_white_browser) {
    const vNow = new Date();

    return Utils.getScoreFileName(
      p_white_browser,
      new Date(vNow.getFullYear(), vNow.getMonth(), 0)
    );
  }

  /**
   * 今日のスコア保存ファイルの名前を作って返します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @return
   *   今日のスコアファイルの名前。
   */
  static getTodayScoreFileName(p_white_browser) {
    const vNow = new Date();

    return Utils.getScoreFileName(
      p_white_browser,
      new Date(vNow.getFullYear(), vNow.getMonth(), vNow.getDate())
    );
  }

  /**
   * 現在保存されているスコアファイルっぽいもののファイル名を列挙します。
   *
   * あくまでファイル名から推測するだけなので、実際にそうかは開かないとわかりません。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @return
   *   スコアファイル名の配列
   *
   *   具体的には「%WhiteBrowser%\temp\プレフィックス_yyyy_mm_dd.tsv」なファイルの一覧。
   */
  static getScoreFiles(p_white_browser) {
    return (
      p_white_browser.getFileList(
        Utils.getFileSaveFolder(p_white_browser),
        `${Utils.getScoreFilePrefix(p_white_browser)}_????_??_??.tsv`
      )
        .filter((p_entry) => !p_entry.isDir)
        .map((p_entry) => p_entry.name)
    );
  }

  /**
   * スコアファイルのパス一覧を与えると
   * スコアファイルが存在する年の配列を作って返します。
   *
   * getScoreFiles と組み合わせて使う想定。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser クラスのインスタンス
   * @param {[String]} p_score_files
   *   getScoreFiles の結果と同じようなファイルパスの配列
   * @return
   *   年(文字列)の配列。結果は降順ソートされて戻ってきます。
   */
  static getAllYear(p_white_browser, p_score_files) {
    // 抜く作業
    let vYearArray = p_score_files
      .map((p_filepath) => Utils.extractScoreFileNameData(p_white_browser, p_filepath)) // Dateにする
      .filter((p_year) => p_year !== null) // 変換できなかったのは消す
      .map((p_file_date) => p_file_date.getFullYear()) // 年だけにする
      .reduce((p_accum, p_current) => ( // 重複を抜く
        p_accum.includes(p_current) ? p_accum : p_accum.concat(p_current)
      ), []);

    // ソートして文字列にして戻す
    return vYearArray
      .sort((a, b) => b - a)
      .map((p_year) => p_year.toString());
  }

  /**
   * 指定の日付を「YYYY/MM/DD hh:mm:ss」にフォーマットした文字列を作って返します。
   *
   * @param {Date} P_date
   *   使いたい Date型
   * @return
   *   YYYY/MM/DD hh:mm:ss 文字列
   */
  static dateToFormatString(p_date) {
    /* eslint-disable prefer-template */
    return `${p_date.getFullYear()}/`
      + `${("00" + (p_date.getMonth() + 1)).slice(-2)}/`
      + `${("00" + p_date.getDate()).slice(-2)} `
      + `${("00" + p_date.getHours()).slice(-2)}:`
      + `${("00" + p_date.getMinutes()).slice(-2)}:`
      + `${("00" + p_date.getSeconds()).slice(-2)}`;
    /* eslint-enable */
  }
}
