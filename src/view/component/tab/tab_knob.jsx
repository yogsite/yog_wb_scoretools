/**
 * @file タブのつまみコンポーネントの定義されたファイルです。
 *
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 * @author Yog
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * タブのつまみを表すコンポーネントです。
 * TabPage コンポーネントの子要素になります。
 *
 * @reactProps {*} children
 *   タブのタイトルとして入れたいコンポーネント
 * @reactProps {number} pageIndex
 *   このタブが何番目のタブかを表すインデックス値
 * @reactProps {function} changeActivePageIndex
 *   TabPage のほうから渡す、 アクティブタブページ変更用の関数
 * @reactProps {bool} isCurrent
 *   このタブをカレントタブとしてマークするか。trueでマーク、falseでマークしない。
 */
export default function TabKnob(props) {
  const handleClick = () => {
    props.changeActivePageIndex(props.pageIndex);
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  // キーボードの上下はWhiteBrowserが取ってしまって飛んでこない感じがすう
  return (
    <div tabIndex={props.pageIndex} data-pageindex={props.pageIndex} data-iscurrent={props.isCurrent} onClick={() => handleClick()}>
      <p>{props.children}</p>
    </div>
  );
  /* eslint-enable */
}

TabKnob.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  changeActivePageIndex: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
