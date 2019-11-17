/**
 * @file ヘルプページを表すコンポーネントが定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import styled from "styled-components";

import GroupBox from "../component/groupbox/groupbox.jsx";

/**
 * ヘルプページの外枠となるスタイルコンポーネント
 */
const StyledFrame = styled.div`
  > * {
    margin: 0.5em;
  }
`;

/**
 * グループボックスの中身となるスタイルコンポーネント
 */
const StyledHelpBox = styled.div`
  font-size: 9pt;
  margin: 0.5em;
`;

/**
 * ヘルプページを表すコンポーネントです。
 *
 * タブコンポーネントはここのプロパティを参照してタブを作るので、そちら用のプロパティを設定しておく必要もあります。
 *
 * @reactProps {string} caption
 *   タブのキャプションになる文字列です
 * @reactProps {string} image
 *   タブの画像になるデータを渡します。
 */
export default function Help(props) {
  return (
    <StyledFrame>
      <GroupBox caption="YogWbScoreTools について">
        <StyledHelpBox>
          <p>WhiteBrowserのスコアを使っていろんな分析をするためのエクステンションです。スコアデータを貯めておくことで以下のような分析ができます。</p>
          <ol>
            <li>毎月初めに、スコアのスナップショットをTSVファイルとして自動保存</li>
            <li>先月のスコアファイルを元に、今月どれぐらいスコアが増えたか</li>
            <li>1年分のスコアファイルを元に、年間でどれぐらいスコアが増えたか</li>
            <li>1年分のスコアファイルを元に、今年にスコアが増加したファイルはなにかをリストアップ</li>
            <li>スコアが0のファイルと、それ以外のファイルの比率がどんなものか</li>
            <li>全ファイルの合計スコアの算出</li>
            <li>スコア増減時にアラートでどのファイルを操作したか通知</li>
          </ol>
        </StyledHelpBox>
      </GroupBox>
      <GroupBox caption="使い方">
        <StyledHelpBox>
          <ol>
            <li>まずこのエクステンションを開くと、現在のスコアデータを「%WhiteBrowser%\temp」に保存します。これは毎月一回行われ、既にファイルがある場合は行われません</li>
            <li>これを毎月やっていると、どんどんデータがたまっていき、意味がある値を出せるようになってきます</li>
            <li>後は Home や Analiysis タブにあるツールでスコアを眺めます</li>
          </ol>
        </StyledHelpBox>
      </GroupBox>
      <GroupBox caption="このエクステンションを使う上での運用">
        <StyledHelpBox>
          <p>このエクステンションは蓄積されたスコアデータがないとあまり意味があることができないので、このエクステンションを使う上では以下のような使い方が推奨されます。</p>
          <ol>
            <li>管理ファイルは同じものを使いまわしてください。</li>
            <li>スコアは基本的に後からは減らさないでください。</li>
            <li>スコアを増加させる時にはこのエクステンションを開いてください。月の最初に起動することで自動でスコアデータを保存します。</li>
            <li>このエクステンションは毎月一回は立ち上げてください。先のスコアデータ保存のためです。</li>
          </ol>
        </StyledHelpBox>
      </GroupBox>
      <GroupBox caption="ライセンス">
        <StyledHelpBox>
          <p>GPLv3のフリーソフトウェアとして、利用、修正、再配布は自由に行なえます。</p>
          <p>修正したい場合のWebpackされていないソースコードは<a href="https://github.com/yogsite/yog_wb_scoretools" target="_blank">作者のGithubリポジトリ</a>にあるので、そちらから取得してきてください。</p>
        </StyledHelpBox>
      </GroupBox>
    </StyledFrame>
  );
}
