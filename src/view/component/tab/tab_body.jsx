/**
 * @file タブの本体コンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * タブの中身をスクロールされるためのフレーム
 */
const StyledTabScrollArea = styled.div`
  height: 90vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

/**
 * タブの本体部を表すコンポーネントです。
 * TabPage コンポーネントの子要素になります。
 *
 * @reactProps {*} children
 *   タブシートに入れたいコンポーネント
 * @reactProps {number} pageIndex
 *   このタブが何番目のタブかを表すインデックス値
 * @reactProps {bool} visible
 *   このタブを表示するかどうか。trueで表示、falseで非表示
 */
export default function TabBody(props) {
  return (
    props.visible
      ? (
        <StyledTabScrollArea data-pageindex={props.pageIndex}>
          {props.children}
        </StyledTabScrollArea>
      )
      : (
        ""
      )
  );
}

TabBody.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
