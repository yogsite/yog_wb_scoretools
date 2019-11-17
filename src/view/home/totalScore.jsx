/**
 * @file 合計スコア集計ラベルコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import CalcStartButton from "../component/calcStartButton.jsx";
import ScoreLabel from "../component/scoreLabel.jsx";

/**
 * スコア総合計を計算して表示するラベルコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function TotalScore(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcAllScore", "0") !== "0");

  if (isCalculated) {
    const vMoviesTotalCount = props.whiteBrowser.getInfos("", "").reduce(
      (p_sum, p_entry) => p_entry.score + p_sum, 0
    );

    return (
      <ScoreLabel>{vMoviesTotalCount}</ScoreLabel>
    );
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>合計スコアを表示</CalcStartButton>
    );
  }
}

TotalScore.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
