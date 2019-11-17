/**
 * @file 月間スコア集計ラベルコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import CalcStartButton from "../component/calcStartButton.jsx";
import ScoreLabel from "../component/scoreLabel.jsx";

import RecordFileReader from "../../models/recordFileReader.js";
import Utils from "../../models/utils.js";

/**
 * 月間スコア数を計算して表示するラベルコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function MonthScore(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcMonthScore", "0") !== "0");

  if (isCalculated) {
    if (props.whiteBrowser.checkFile(Utils.getScoreSaveFolder(props.whiteBrowser, Utils.getPrevEndOfLastScoreFileName(props.whiteBrowser)))) {
      const vEndOfLastRecords = (new RecordFileReader(props.whiteBrowser, Utils.getPrevEndOfLastScoreFileName(props.whiteBrowser))).getRecords();
      if (vEndOfLastRecords.length === 0) {
        alert("先月のスコアファイルの読み出しに失敗しました。");
        return <ScoreLabel>NaN</ScoreLabel>;
      }
      else {
        const vMoviesTotalCount = props.whiteBrowser.getInfos("", "").reduce(
          (p_sum, p_entry) => p_entry.score + p_sum, 0
        );

        return (
          <ScoreLabel>{vMoviesTotalCount - vEndOfLastRecords.reduce((p_sum, p_entry) => p_entry.score + p_sum, 0)}</ScoreLabel>
        );
      }
    }
    else {
      alert("先月のスコアファイルがありません。");
      return <ScoreLabel>NaN</ScoreLabel>;
    }
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>月間スコアを表示</CalcStartButton>
    );
  }
}

MonthScore.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
