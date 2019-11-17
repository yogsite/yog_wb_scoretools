/**
 * @file ホームページを表すコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CalcStartButton from "../component/calcStartButton.jsx";
import GroupBox from "../component/groupbox/groupbox.jsx";

import RecordFileWriter from "../../models/recordFileWriter.js";
import Utils from "../../models/utils.js";

import MonthScore from "./monthScore.jsx";
import TotalScore from "./totalScore.jsx";
import YearScore from "./yearScore.jsx";

/**
 * ホームページの外枠となるスタイルコンポーネント
 */
const StyledGrid = styled.div`
  display: grid;
  display: -ms-grid;

  grid-template-columns: auto auto auto;
  grid-template-rows: auto;

  -ms-grid-columns: 33% 33% 33%;
  -ms-grid-rows: auto auto auto;

  > *:nth-child(1) {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    margin: 0.5em;
  }

  > *:nth-child(2) {
    -ms-grid-row: 1;
    -ms-grid-column: 2;
    margin: 0.5em;
  }

  > *:nth-child(3) {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    margin: 0.5em;
  }

  > *:nth-child(4) {
    -ms-grid-row: 2;
    -ms-grid-column-span: 3;
    -ms-grid-column: 1;

    margin: 0.5em;
  }

  > *:nth-child(5) {
    -ms-grid-row: 3;
    -ms-grid-column-span: 3;
    -ms-grid-column: 1;

    margin: 0.5em;
  }
`;

/**
 * 月初のスコア保存処理を実行します。
 *
 * @param {*} p_event
 *   OnClick イベントのイベントオブジェクト
 * @param {WhiteBrowser} p_whitebrowser
 *   WhiteBrowser のインスタンス。
 * @param {string} p_filename
 *   月初スコアとして使いたいファイル名
 */
function doSaveScore(p_event, p_whitebrowser, p_filename) {
  if (p_whitebrowser.checkFile(Utils.getScoreSaveFolder(p_whitebrowser, p_filename))) {
    if (!window.confirm(`「${p_filename}」は既に存在します。\r上書きしてよろしいですか？`)) {
      return;
    }
  }

  new RecordFileWriter(
    p_whitebrowser,
    p_filename,
    p_whitebrowser.getInfos("", "")
  );

  alert(`「${p_filename}」\nとして保存しました。`);
}

/**
 * ホームページとなるコンポーネントです。
 *
 * タブコンポーネントはここのプロパティを参照してタブを作るので、そちら用のプロパティを設定しておく必要もあります。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 * @reactProps {string} caption
 *   タブのキャプションになる文字列です
 * @reactProps {string} image
 *   タブの画像になるデータを渡します。
 */
export default function Home(props) {
  return (
    <StyledGrid>
      <GroupBox caption="合計スコア"><TotalScore whiteBrowser={props.whiteBrowser} /></GroupBox>
      <GroupBox caption="月間スコア"><MonthScore whiteBrowser={props.whiteBrowser} /></GroupBox>
      <GroupBox caption="年間スコア"><YearScore whiteBrowser={props.whiteBrowser} /></GroupBox>
      <GroupBox caption="スコア保存">
        <CalcStartButton onClick={(e) => doSaveScore(e, props.whiteBrowser, Utils.getTodayScoreFileName(props.whiteBrowser))}>今日の日付でスコアを保存</CalcStartButton>
        <CalcStartButton onClick={(e) => doSaveScore(e, props.whiteBrowser, Utils.getPrevEndOfLastScoreFileName(props.whiteBrowser))}>先月末データとしてスコアを保存</CalcStartButton>
      </GroupBox>
    </StyledGrid>
  );
}

Home.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
