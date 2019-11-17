/**
 * @file 設定ページを表すコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import GroupBox from "../component/groupbox/groupbox.jsx";

import Utils from "../../models/utils.js";

/**
 * 設定コンポーネントの外枠を表すスタイルコンポーネント
 */
const StyledFrame = styled.div`
  font-size: 9pt;

  > * {
    margin: 0.5em;
  }
`;

/**
 * 警告表示ラベル用のスタイルコンポーネント
 */
const StyledStrong = styled.strong`
  color: red;
  font-weight: bold;
`;

/**
 * チェックボックスを表すスタイルコンポーネント
 */
const StyledCheckBoxFrame = styled.div`
  > * {
    vertical-align: middle;
  }
`;

/**
 * グループボックスの中身の枠となるスタイルコンポーネント
 */
const StyledInnerFrame = styled.div`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
  margin-right: 1em;
`;

/**
 * チェックボックスとラベルをまとめるスタイルコンポーネント
 */
const StyledPrefixGroup = styled.div`
  > *:nth-child(1) {
    vertical-align: middle;
    padding-right: 0.5em;
  }

  > *:nth-child(2) {
    vertical-align: middle;
    width: 10em;
    margin-right: 0.5em;
  }

  > *:nth-child(3) {
    vertical-align: middle;
  }

  > input::-ms-clear {
    visibility: hidden;
  }
`;

/**
 * チェック系の設定項目の表示位置をグリッドでまとめるスタイルコンポーネント
 */
const StyledCheckGroup = styled.div`
  display: grid;
  display: -ms-grid;

  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto auto;

  -ms-grid-columns: auto auto auto;
  -ms-grid-rows: auto auto auto auto;

  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1em;
  margin-right: 1em;

  > *:nth-child(1) {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
  }

  > *:nth-child(2) {
    -ms-grid-row: 1;
    -ms-grid-column: 2;
  }

  > *:nth-child(3) {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
  }

  > *:nth-child(4) {
    -ms-grid-row: 2;
    -ms-grid-column: 2;
  }

  > *:nth-child(5) {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
  }

  > *:nth-child(6) {
    -ms-grid-row: 3;
    -ms-grid-column: 2;
  }

  > *:nth-child(7) {
    -ms-grid-row: 4;
    -ms-grid-column: 1;
  }
`;

/**
 * 設定ページを表すコンポーネントです。
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
export default function Setting(props) {
  /**
   * 画面を開いた時に、ホーム画面の合計スコア集計をするかの値を持つ Hook です。
   */
  const [isAutoCalcAllScore, setIsAutoCalcAllScore] = useState(props.whiteBrowser.getProfile("isAutoCalcAllScore", "0") !== "0");
  const [isAutoCalcMonthScore, setIsAutoCalcMonthScore] = useState(props.whiteBrowser.getProfile("isAutoCalcMonthScore", "0") !== "0");
  const [isAutoCalcYearScore, setIsAutoCalcYearScore] = useState(props.whiteBrowser.getProfile("isAutoCalcYearScore", "0") !== "0");
  const [isAutoCalcMonthChart, setIsAutoCalcMonthChart] = useState(props.whiteBrowser.getProfile("isAutoCalcMonthChart", "0") !== "0");
  const [isAutoCalcDistributionChart, setIsAutoCalcDistributionChart] = useState(props.whiteBrowser.getProfile("isAutoCalcDistributionChart", "0") !== "0");
  const [isAutoCalcZeroOneChart, setIsAutoCalcZeroOneChart] = useState(props.whiteBrowser.getProfile("isAutoCalcZeroOneChart", "0") !== "0");
  const [isAutoCalcScoreRank, setAutoCalcScoreRank] = useState(props.whiteBrowser.getProfile("isAutoCalcScoreRank", "0") !== "0");
  const [isScoreAlert, setIsScoreAlert] = useState(props.whiteBrowser.getProfile("isScoreAlert", "1") !== "0");
  const [scoreFilePrefix, setScoreFilePrefix] = useState(props.whiteBrowser.getProfile("scoreFilePrefix", Utils.getScoreFilePrefix(props.whiteBrowser)));

  /**
   * チェック系の設定項目を WhiteBrowser の管理ファイルに保存します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser のインスタンスを渡します。
   * @param {string} p_key
   *   書きたい項目のキー値
   * @param {boolean} p_check
   *   チェックしたことを書きたいならtrue、外れていることを書きたいならfalse
   * @param {function} p_state_update_func
   *   このステートを更新したことを通知する Hook の関数を渡します。
   */
  const writeCheckProfile = (p_white_browser, p_key, p_check, p_state_update_func) => {
    p_white_browser.writeProfile(p_key, p_check ? "1" : "0");
    p_state_update_func(p_check);
  };

  /**
   * スコアプレフィックスの設定を WhiteBrowser の管理ファイルに保存します。
   *
   * @param {WhiteBrowser} p_white_browser
   *   WhiteBrowser のインスタンスを渡します。
   * @param {string} p_save_value
   *   新たなスコアプレフィックス値
   */
  const doScoreFilePrefixSave = (p_white_browser, p_save_value) => {
    p_white_browser.writeProfile("scoreFilePrefix", p_save_value);
    alert(`「${p_save_value}」にスコアファイル名を変えました。\r\n`
          + "エクステンションを開き直すと有効になります。\r\n\r\n"
          + "既存のスコアファイルについてはリネームしてください。");
  };

  return (
    <StyledFrame>
      <p>以下の設定は全て管理ファイル単位で保存されます</p>
      <GroupBox caption="画面を開いた時にボタンを押さなくても自動展開する機能（設定すると起動が重くなります）">
        <StyledCheckGroup>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcAllScore" checked={isAutoCalcAllScore} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcAllScore", e.target.checked, setIsAutoCalcAllScore)} />
            <label htmlFor="isAutoCalcAllScore">合計スコアの算出</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcMonthScore" checked={isAutoCalcMonthScore} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcMonthScore", e.target.checked, setIsAutoCalcMonthScore)} />
            <label htmlFor="isAutoCalcMonthScore">月間スコアの算出</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcYearScore" checked={isAutoCalcYearScore} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcYearScore", e.target.checked, setIsAutoCalcYearScore)} />
            <label htmlFor="isAutoCalcYearScore">年間スコアの算出</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcMonthChart" checked={isAutoCalcMonthChart} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcMonthChart", e.target.checked, setIsAutoCalcMonthChart)} />
            <label htmlFor="isAutoCalcMonthChart">月間チャート</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcDistributionChart" checked={isAutoCalcDistributionChart} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcDistributionChart", e.target.checked, setIsAutoCalcDistributionChart)} />
            <label htmlFor="isAutoCalcDistributionChart">分布チャート</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcZeroOneChart" checked={isAutoCalcZeroOneChart} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcZeroOneChart", e.target.checked, setIsAutoCalcZeroOneChart)} />
            <label htmlFor="isAutoCalcZeroOneChart">スコアゼロと１チャート</label>
          </StyledCheckBoxFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isAutoCalcScoreRank" checked={isAutoCalcScoreRank} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isAutoCalcScoreRank", e.target.checked, setAutoCalcScoreRank)} />
            <label htmlFor="isAutoCalcScoreRank">年間スコア増加ランキング</label>
          </StyledCheckBoxFrame>
        </StyledCheckGroup>
      </GroupBox>
      <GroupBox caption="付加機能">
        <StyledInnerFrame>
          <StyledCheckBoxFrame>
            <input type="checkbox" id="isScoreAlert" checked={isScoreAlert} onChange={(e) => writeCheckProfile(props.whiteBrowser, "isScoreAlert", e.target.checked, setIsScoreAlert)} />
            <label htmlFor="isScoreAlert">スコアが増減するたびにアラートで通知する</label>
          </StyledCheckBoxFrame>
        </StyledInnerFrame>
      </GroupBox>
      <GroupBox caption="スコファイル名のプレフィックス">
        <StyledInnerFrame>
          <StyledStrong>注：これを変な値にすると、どう動くかわかりません。</StyledStrong>
          <p>この設定で変更できるのは、デフォルトで「wbScoreTools_(管理ファイル名の拡張子抜き＆半角スペースアンダーバー化)_yyyy_mm_dd.tsv」となっているスコアファイル名のタイムスタンプより前のところです。</p>
          <p>たとえば「hogehoge」にすると、この管理ファイルで扱うスコアファイルの名前は「hogehoge_yyyy_mm_dd.tsv」になります。</p>
          <p>これを使うと、複数の管理ファイルで同じスコアファイルを使ったり、デフォルト名だと都合が悪い場合の対応ができます。</p>
          <StyledPrefixGroup>
            <label htmlFor="scoreFilePrefix">プレフィックス：</label>
            <input type="text" id="scoreFilePrefix" value={scoreFilePrefix} onChange={(e) => setScoreFilePrefix(e.target.value)} />
            <button type="button" onClick={(e) => doScoreFilePrefixSave(props.whiteBrowser, scoreFilePrefix)} disabled={(scoreFilePrefix === "")}>保存する</button>
          </StyledPrefixGroup>
        </StyledInnerFrame>
      </GroupBox>
    </StyledFrame>
  );
}

Setting.propTypes = {
  whiteBrowser: PropTypes.object.isRequired
};
