/**
 * @file タブコンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TabKnob from "./tab_knob.jsx";
import TabBody from "./tab_body.jsx";

/**
 * タブページ自体の外枠となるスタイルコンポーネント
 */
const StyledTabPage = styled.div`
  overflow: hidden;

  margin-left: auto;
  margin-right: auto;
  width: 99%;
  display: grid;
  display: -ms-grid;
  border: 1px solid black;

  grid-template-columns: 200px auto;
  grid-template-rows: auto;

  -ms-grid-columns: 200px minmax(0px, 100%);
  -ms-grid-rows: auto;
  
  > *:nth-child(1) {
    -ms-grid-column: 1;
  }

  > *:nth-child(2) {
    -ms-grid-column: 2;
  }
`;

/**
 * タブのつまみの外枠となるスタイルコンポーネント
 */
const StyledKnobArea = styled.div`
  border: 1px solid black;
  height: 90vh;

  /* 配下の全 TabKnob。 */
  /* React.Children.map で回した奴は普通にやっても適用されないのでCSSでがんばることにした。 */
  > * {
    font-size: 12pt;
    padding-left: 16px;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    height: 2em;
    line-height: 2em;
  }

  /* TabKnob の中の文字列 */
  > * > p {
    margin: 0;
    padding: 0;
  }

  /* 選択されてる TabKnob */
  > *[data-iscurrent="true"] {
    border-left: 6px solid #23466E;
    padding-left: 10px;
  }
`;

/**
 * タブシートの外枠となるスタイルコンポーネント
 */
const StyledSheetArea = styled.div`
  border: 1px solid black;

  /* 配下の全 TabBody が対象となる */
  ${TabBody} {
  }
`;

/**
 * タブのつまみの画像となるスタイルコンポーネント
 */
const TabImage = styled.img`
  vertical-align: middle;
  margin-right: 1ex;
`;

/**
 * タブページを表すコンポーネントです。
 *
 * このコンポーネントは直下の子要素を自動的に TabKnob と TabPage のペアでラップします。
 * それらの位置表示や状態を管理することでタブを表現します。
 *
 * @reactProps {*} children
 *   タブにしたいコンポーネント。直下の1要素ごとに1タブに置き換わります。
 * @reactProps {number} initPageIndex
 *   起動時に開くタブのインデックス値。先頭は「0」
 */
export default function TabPage(props) {
  const [activePageIndex, setActivePageIndex] = useState(props.initPageIndex);

  return (
    <StyledTabPage>
      <StyledKnobArea>
        {
          React.Children.map(
            props.children,
            (tabPage, pageIndex) => (
              <TabKnob pageIndex={pageIndex} isCurrent={activePageIndex === pageIndex} changeActivePageIndex={setActivePageIndex}>
                <TabImage src={tabPage.props.image} />
                {tabPage.props.caption}
              </TabKnob>
            )
          )
        }
      </StyledKnobArea>
      <StyledSheetArea>
        {
          React.Children.map(
            props.children,
            (tabPage, pageIndex) => (
              <TabBody pageIndex={pageIndex} visible={activePageIndex === pageIndex}>
                {tabPage}
              </TabBody>
            )
          )
        }
      </StyledSheetArea>
    </StyledTabPage>
  );
}

TabPage.propTypes = {
  initPageIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};
