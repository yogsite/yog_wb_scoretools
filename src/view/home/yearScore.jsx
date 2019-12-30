/**
 * @file 年間スコア集計ラベルコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CalcStartButton from "../component/calcStartButton.jsx";
import ScoreLabel from "../component/scoreLabel.jsx";

import RecordFileReader from "../../models/recordFileReader.js";
import Utils from "../../models/utils.js";

const StyledYearCombo = styled.select`
  box-sizing: border-box;
  width: calc(100% - 2em);
  margin-top: 0.5em;
  margin-left: 1em;
`;

/**
 * 年間スコア数を計算して表示するラベルコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function YearScore(props) {
  const ALL_YEARS = Utils.getAllYear(props.whiteBrowser, Utils.getScoreFiles(props.whiteBrowser));

  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcYearScore", "0") !== "0");
  const [vTargetYear, setTargetYear] = useState(ALL_YEARS.length === 0 ? "" : ALL_YEARS[0]);

  /**
   * 指定年最後のスコア情報を得ます
   *
   * @param {number} p_year
   *   指定年
   * @return
   *   空配列か Record の配列
   */
  const funcLastInfos = (p_year) => {
    const vLastEndOfLastFileName = Utils.getLastEndOfLastScoreFileName(props.whiteBrowser, p_year);
    if (props.whiteBrowser.checkFile(Utils.getScoreSaveFolder(props.whiteBrowser, vLastEndOfLastFileName))) {
      return (new RecordFileReader(props.whiteBrowser, vLastEndOfLastFileName)).getRecords();
    }
    else {
      return [];
    }
  };

  if (isCalculated) {
    const vFirstScoreFileName = Utils.getFirstEndOfLastScoreFileName(props.whiteBrowser, parseInt(vTargetYear, 10));
    if (vFirstScoreFileName !== "") {
      const vFirstScoreRecord = (new RecordFileReader(props.whiteBrowser, vFirstScoreFileName)).getRecords();

      if (vFirstScoreRecord.length === 0) {
        alert(`${vTargetYear}年最初のスコアファイルの読み出しに失敗しました。`);
        return <ScoreLabel>NaN</ScoreLabel>;
      }
      else {
        // 今のスコアは選択年と実行年が同じなら画面のを、違えば指定年の最後のを使う
        const vLastScore = (vTargetYear === (new Date()).getFullYear().toString())
          ? props.whiteBrowser.getInfos("", "")
          : funcLastInfos(parseInt(vTargetYear, 10));
        const vMoviesTotalCount = vLastScore.reduce((p_sum, p_entry) => p_entry.score + p_sum, 0);

        return (
          <ScoreLabel>{vMoviesTotalCount - vFirstScoreRecord.reduce((p_sum, p_entry) => p_entry.score + p_sum, 0)}</ScoreLabel>
        );
      }
    }
    else {
      alert(`${vTargetYear}年最初のスコアファイルがありません。`);
      return <ScoreLabel>NaN</ScoreLabel>;
    }
  }
  else {
    return (
      <>
        <StyledYearCombo value={vTargetYear} onChange={(e) => setTargetYear(e.target.value)}>
          {
            ALL_YEARS.map((p_year) => <option value={p_year}>{p_year}</option>)
          }
        </StyledYearCombo>
        <CalcStartButton onClick={(e) => setCalculated(true)}>年間スコアを表示</CalcStartButton>
      </>
    );
  }
}

YearScore.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
