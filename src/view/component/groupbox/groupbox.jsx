/**
 * @file グループボックスコンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * 外枠のスタイルコンポーネント
 */
const StyledGroupBoxFrame = styled.div`
  border: 1px black solid;
`;

/**
 * タイトルのスタイルコンポーネント
 */
const StyledGroupBoxTitle = styled.div`
  border: 1px black solid;
  font-size: 9pt;
  color: white;
  background-color: #23466E;
`;

/**
 * 汎用グループボックスコンポーネント
 *
 * @reactProps {string} caption 
 *   ヘッダのキャプション
 * @reactProps {*} children
 *   グループボックスの本体部に入れたいコンポーネント
 */
export default function GroupBox(props) {
  return (
    <StyledGroupBoxFrame>
      <StyledGroupBoxTitle>{props.caption}</StyledGroupBoxTitle>
      <div>{props.children}</div>
    </StyledGroupBoxFrame>
  );
}

GroupBox.propTypes = {
  caption: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
