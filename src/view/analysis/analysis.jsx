/**
 * @file 解析画面コンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import GroupBox from "../component/groupbox/groupbox.jsx";

import MonthChart from "./monthChart.jsx";
import ZeroAndOneChart from "./zeroAndOneChart.jsx";
import DistributionChart from "./distributionChart.jsx";
import AnnualRanking from "./annualRanking.jsx";

/**
 * 内部のグリッドレイアウトをするスタイルコンポーネント
 */
const StyledGrid = styled.div`
  display: grid;
  display: -ms-grid;

  grid-template-columns: auto auto;
  grid-template-rows: auto;

  -ms-grid-columns: 50% 50%;
  -ms-grid-rows: auto auto auto;

  > *:nth-child(1) {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;

    margin: 0.5em;
  }

  > *:nth-child(2) {
    -ms-grid-row: 2;
    -ms-grid-column: 1;

    margin: 0.5em;
  }

  > *:nth-child(3) {
    -ms-grid-row: 2;
    -ms-grid-column: 2;

    margin: 0.5em;
  }

  > *:nth-child(4) {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;

    margin: 0.5em;
  }
`;

/**
 * 解析ページです。
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
export default function Analysis(props) {
  return (
    <StyledGrid>
      <GroupBox caption="月間チャート">
        <MonthChart whiteBrowser={props.whiteBrowser} />
      </GroupBox>
      <GroupBox caption="スコア数分布">
        <DistributionChart whiteBrowser={props.whiteBrowser} />
      </GroupBox>
      <GroupBox caption="スコア1以上分布">
        <ZeroAndOneChart whiteBrowser={props.whiteBrowser} />
      </GroupBox>
      <GroupBox caption="今年スコアが増加した動画ランキング">
        <AnnualRanking whiteBrowser={props.whiteBrowser} />
      </GroupBox>
    </StyledGrid>
  );
}

Analysis.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
