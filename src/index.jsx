/**
 * @file このアプリケーションのエントリポイントです
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import ReactDOM from "react-dom";

import TabPage from "./view/component/tab/tab_page.jsx";

import HomeImage from "./image/application_home.png";
import AnalysisImage from "./image/chart_pie.png";
import SettingImage from "./image/cog.png";
import HelpImage from "./image/help.png";

import WhiteBrowser from "./models/whiteBrowser.js";
import RecordFileWriter from "./models/recordFileWriter.js";
import Utils from "./models/utils.js";

import Home from "./view/home/home.jsx";
import Analysis from "./view/analysis/analysis.jsx";
import Setting from "./view/setting/setting.jsx";
import Help from "./view/help/help.jsx";

/**
 * 唯一の WhiteBrowser インスタンス
 */
const whiteBrowser = new WhiteBrowser();

if (!whiteBrowser.checkFile(Utils.getScoreSaveFolder(whiteBrowser, Utils.getPrevEndOfLastScoreFileName(whiteBrowser)))) {
  alert("先月末のスコアファイルがないので、現在のスコアを先月末として保存します。\r\nこの処理にはしばらく時間がかかります。");

  new RecordFileWriter(
    whiteBrowser,
    Utils.getPrevEndOfLastScoreFileName(whiteBrowser),
    whiteBrowser.getInfos("", "")
  );

  alert("保存しました。");
}

/* eslint-disable no-undef */
/**
 * スコアを変える操作が行われると呼ばれるイベント
 *
 * @param {string} p_movie_id
 *   変わった動画のID
 * @param {string} p_new_score
 *   新たなスコア。なお、これが飛んできた段階で更新は確定され反映されている。
 */
wb.onModifyScore = (p_movie_id, p_new_score) => {
  if (whiteBrowser.getProfile("isScoreAlert", "1") !== "0") {
    const vMovieInfo = whiteBrowser.getInfo(p_movie_id);

    alert(`「${vMovieInfo.title}」のスコアが\r\n${p_new_score}になりました。`);
  }
};
/* eslint-enable */

ReactDOM.render(
  <TabPage initPageIndex={0}>
    <Home caption="Home" image={HomeImage} whiteBrowser={whiteBrowser} />
    <Analysis caption="Analysis" image={AnalysisImage} whiteBrowser={whiteBrowser} />
    <Setting caption="Setting" image={SettingImage} whiteBrowser={whiteBrowser} />
    <Help caption="Help" image={HelpImage} whiteBrowser={whiteBrowser} />
  </TabPage>,
  document.getElementById("application")
);
