/**
 * @file スコア数ごとグラフコンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, XAxis, BarChart, Bar, YAxis, Tooltip, CartesianGrid } from "recharts";

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
  // 現在のスコアデータを持ってきて集計
  let vDistCount = new Map();
  p_infos.forEach((p_entry) => {
    if (vDistCount.has(p_entry.score)) {
      vDistCount.set(p_entry.score, vDistCount.get(p_entry.score) + 1);
    }
    else {
      vDistCount.set(p_entry.score, 1);
    }
  });

  // チャートデータ化
  let vChartData = [];
  vDistCount.forEach((key, value) => (
    vChartData.push({
      name: `スコア${value}`,
      count: key
    })
  ));
  vChartData.sort((a, b) => b.count - a.count);

  // 戻す
  return vChartData;
}

/**
 * 特定数のスコアが何個ぐらい出てくるかのチャートを描画するコンポーネントです。
 *
 * @reactProps {WhiteBrowser} whiteBrowser
 *   WhiteBrowser のインスタンスを渡します。
 */
export default function DistributionChart(props) {
  const [isCalculated, setCalculated] = useState(props.whiteBrowser.getProfile("isAutoCalcDistributionChart", "0") !== "0");

  if (isCalculated) {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={calcChartData(props.whiteBrowser.getInfos("", ""))} margin={{ top: 15, right: 50, left: 50, bottom: 15 }}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, "dataMax"]} />
          <CartesianGrid strokeDasharray="5 3" />
          <Tooltip />
          <Bar dataKey="count" fill="#23466E" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  else {
    return (
      <CalcStartButton onClick={(e) => setCalculated(true)}>スコア数分布チャートを描画する</CalcStartButton>
    );
  }
}

DistributionChart.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
