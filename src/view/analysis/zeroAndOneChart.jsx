/**
 * @file 0 OR 1チャート描画コンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, PieChart, Tooltip, Pie, Cell } from "recharts";

import CalcStartButton from "../component/calcStartButton.jsx";

/**
 * スコアデータをチャートデータにマップします
 *
 * @param {*} p_infos
 *   WhiteBrowser#getInfos の戻り値
 * @return
 *   そのまま rechart に渡せる構造のデータ
 */
export function calcChartData(p_infos) {
  return [
    { name: "スコア１以上の動画", count: p_infos.filter((p_entry) => p_entry.score !== 0).length },
    { name: "スコア０の動画", count: p_infos.filter((p_entry) => p_entry.score === 0).length }
  ];
}

/**
 * スコア０の動画と、それ以外の動画の数を集計してグラフとして描画するコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function ZeroAndOneChart(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcZeroOneChart", "0") !== "0");

  if (isCalculated) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart margin={{ top: 15, right: 0, left: 0, bottom: 15 }}>
          <Pie data={calcChartData(props.whiteBrowser.getInfos("", ""))} nameKey="name" dataKey="count" cx="50%" cy="50%" label>
            <Cell fill="#FF0000" />
            <Cell fill="#23466E" />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>スコアゼロとそれ以外の分布を描画する</CalcStartButton>
    );
  }
}

ZeroAndOneChart.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
