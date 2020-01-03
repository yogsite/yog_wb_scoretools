/**
 * @file 月間スコア一覧描画コンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, Line, XAxis, YAxis, Tooltip, CartesianGrid, LineChart } from "recharts";

import CalcStartButton from "../component/calcStartButton.jsx";

import RecordFileReader from "../../models/recordFileReader.js";
import Utils from "../../models/utils.js";

/**
 * このチャートの描画用のデータを生成します。
 *
 * @param {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 * @return
 *   そのまま rechart に渡せる構造のデータ
 */
export function calcChartData(p_white_browser) {
  return Utils.getScoreFiles(p_white_browser) // スコアファイルっぽいものを列挙して
    .filter((p_filename) => Utils.isEndOfMonthScoreFile(p_white_browser, p_filename)) // その中の月末ファイルだけを抽出し
    .map((p_filename) => [p_filename, (new RecordFileReader(p_white_browser, p_filename)).getRecords()]) // 読み出して
    .filter((p_records) => p_records[1].length !== 0) // 何も読めなかったのは除外して
    .map((p_records) => { // 集計したChart用データを作る
      const vFileNameData = Utils.extractScoreFileNameData(p_white_browser, p_records[0]); // ファイル名は最初にチェックしてるので抜けないことはないはず

      /* eslint-disable prefer-template */
      return {
        month: `${vFileNameData.getFullYear()}/` + ("00" + (vFileNameData.getMonth() + 1)).slice(-2),
        score: p_records[1].reduce((p_sum, p_record) => p_record.score + p_sum, 0)
      };
      /* eslint-enable */
    })
    .concat({
      /* eslint-disable prefer-template */
      month: `${(new Date()).getFullYear()}/` + ("00" + ((new Date()).getMonth() + 1)).slice(-2),
      /* eslint-enable */
      score: p_white_browser.getInfos("", "").reduce((p_sum, p_record) => p_record.score + p_sum, 0)
    }); // 最後に今月分のスコアデータを突っ込む
}

/**
 * 毎月のスコア数を描画するコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function MonthChart(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcMonthChart", "0") !== "0");

  if (isCalculated) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={calcChartData(props.whiteBrowser)} margin={{ top: 5, right: 50, left: 50, bottom: 25 }}>
          <XAxis dataKey="month" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <CartesianGrid stroke="#23466E" strokeDasharray="5 3" />
          <Tooltip />
          <Line name="この月のスコア" dataKey="score" stroke="salmon" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>月間チャートを描画する</CalcStartButton>
    );
  }
}

MonthChart.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
