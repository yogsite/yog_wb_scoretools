/**
 * @file 年間スコア集計ラベルコンポーネントが定義されたファイルです。
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
 * 年間スコア数を計算して表示するラベルコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function YearScore(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcYearScore", "0") !== "0");

  if (isCalculated) {
    const vFirstScoreFileName = Utils.getFirstEndOfLastScoreFileName(props.whiteBrowser, (new Date()).getFullYear());
    if (vFirstScoreFileName !== "") {
      const vFirstScoreRecord = (new RecordFileReader(props.whiteBrowser, vFirstScoreFileName)).getRecords();

      if (vFirstScoreRecord.length === 0) {
        alert("今年最初のスコアファイルの読み出しに失敗しました。");
        return <ScoreLabel>NaN</ScoreLabel>;
      }
      else {
        const vMoviesTotalCount = props.whiteBrowser.getInfos("", "").reduce(
          (p_sum, p_entry) => p_entry.score + p_sum, 0
        );

        return (
          <ScoreLabel>{vMoviesTotalCount - vFirstScoreRecord.reduce((p_sum, p_entry) => p_entry.score + p_sum, 0)}</ScoreLabel>
        );
      }
    }
    else {
      alert("今年最初のスコアファイルがありません。");
      return <ScoreLabel>NaN</ScoreLabel>;
    }
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>年間スコアを表示</CalcStartButton>
    );
  }
}

YearScore.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
