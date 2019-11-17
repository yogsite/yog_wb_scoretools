import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';

import TotalScore from '../src/view/home/totalScore.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

test('スコアの総数がレンダリングされること', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "1" };
  dummyWhiteBrowser.getInfos = () => {
    return [
      new Record(1, "", "", "スコア１", "", 1),
      new Record(2, "", "", "スコアゼロ", "", 0),
      new Record(3, "", "", "スコア２", "", 2),
      new Record(4, "", "", "スコア３", "", 3),
      new Record(5, "", "", "スコア４", "", 4),
    ];
  };

  // レンダリング
  const wrapper = mount(<TotalScore whiteBrowser={dummyWhiteBrowser} />);

  // カウントを見る
  expect(wrapper.text()).toEqual("10");
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<TotalScore whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
