/**
 * @file 年間ランキングテーブルコンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CalcStartButton from "../component/calcStartButton.jsx";

import RecordFileReader from "../../models/recordFileReader.js";
import Record from "../../models/record.js";
import Utils from "../../models/utils.js";

/**
 * 動画ファイル名のリンクを表すコンポーネント
 */
const StyledLinkSpan = styled.span`
  cursor: pointer;
  color: #0000FF;
`;

/**
 * テーブルを表すコンポーネント
 */
const StyledTable = styled.table`
  border: 1px black solid;
  margin-left: auto;
  margin-right: auto;

  th {
    border: 1px black solid;
    background-color: #23466E;
    color: white;
    font-size: 9pt;
  }

  td {
    border: 1px black solid;
    font-size: 9pt;
  }
`;

/**
 * 解析ページの今年スコアが増えたランキングを計算して表示するコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function AnnualRanking(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcScoreRank", "0") !== "0");

  if (isCalculated) {
    // 今のスコアは画面のを使う
    let vEndOfLastRecords = props.whiteBrowser.getInfos("", "");

    // 去年最後のスコア
    let vFirstEndOfLastRecords = [];
    const vFirstEndOfLastFileName = Utils.getFirstEndOfLastScoreFileName(props.whiteBrowser);
    if (props.whiteBrowser.checkFile(Utils.getScoreSaveFolder(props.whiteBrowser, vFirstEndOfLastFileName))) {
      vFirstEndOfLastRecords = (
        new RecordFileReader(props.whiteBrowser, vFirstEndOfLastFileName)).getRecords();
    }

    // 新しいほうから古いほうのスコアを引いたのを作って
    let vTableRecords = vEndOfLastRecords.map((p_new_entry) => {
      const vOldMovieIdx = vFirstEndOfLastRecords
        .findIndex((p_old_entry) => p_new_entry.id === p_old_entry.id);
      if (vOldMovieIdx === -1) {
        return p_new_entry;
      }
      else {
        return new Record(
          p_new_entry.id,
          p_new_entry.drive,
          p_new_entry.dir,
          p_new_entry.title,
          p_new_entry.ext,
          p_new_entry.score - vFirstEndOfLastRecords[vOldMovieIdx].score
        );
      }
    });

    // スコア差が0でないのを抽出し、スコア順にソートして
    vTableRecords = vTableRecords.filter((p_entry) => p_entry.score > 0);
    vTableRecords.sort((a, b) => b.score - a.score);

    // ランクふって
    let vRank = 0;
    let vRankOldScore;
    vTableRecords = vTableRecords.map((p_entry) => {
      if (vRankOldScore !== p_entry.score) {
        vRankOldScore = p_entry.score;
        vRank += 1;
        return [vRank, p_entry];
      }
      else {
        return [vRank, p_entry];
      }
    });

    // 0じゃないのを描画
    return (
      <StyledTable>
        <thead>
          <tr>
            <th>ランク</th>
            <th>ファイル名</th>
            <th>今年増えたスコア数</th>
          </tr>
        </thead>
        <tbody>
          {
            vTableRecords.map((p_entry) => (
              <tr key={p_entry[1].id}>
                <td>{p_entry[0]}</td>
                <td><StyledLinkSpan onClick={(e) => props.whiteBrowser.focusThum(p_entry[1].id)}>{p_entry[1].title + p_entry[1].ext}</StyledLinkSpan></td>
                <td>{p_entry[1].score}</td>
              </tr>
            ))
          }
        </tbody>
      </StyledTable>
    );
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>年間スコア増加ランキングを描画する</CalcStartButton>
    );
  }
}

AnnualRanking.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
