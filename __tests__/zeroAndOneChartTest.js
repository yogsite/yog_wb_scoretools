import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';

import ZeroAndOneChart, { calcChartData } from '../src/view/analysis/zeroAndOneChart.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

test("指定のデータ通りのチャートデータが生成されること", () => {
  // スコアゼロが2つ、それ以外が5個
  const calcData = calcChartData([
    new Record(1, "", "", "スコア１", "", 1),
    new Record(2, "", "", "スコアゼロ１", "", 0),
    new Record(3, "", "", "スコア２", "", 2),
    new Record(4, "", "", "スコアゼロ２", "", 0),
    new Record(5, "", "", "スコア３", "", 3),
    new Record(6, "", "", "スコア４", "", 4),
    new Record(7, "", "", "スコア５", "", 5)
  ]);

  expect(calcData.length).toEqual(2);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア１以上の動画")].count).toEqual(5);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア０の動画")].count).toEqual(2);
});

test('レンダリングモード時はチャートが描画されること', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "1" };
  dummyWhiteBrowser.getInfos = () => {
    return [
      new Record(1, "", "", "スコア１", "", 1),
      new Record(2, "", "", "スコアゼロ１", "", 0),
      new Record(3, "", "", "スコア２", "", 2),
      new Record(4, "", "", "スコアゼロ２", "", 0),
      new Record(5, "", "", "スコア３", "", 3),
      new Record(6, "", "", "スコア４", "", 4),
      new Record(7, "", "", "スコア５", "", 5)
    ];
  };

  // レンダリング
  const wrapper = mount(<ZeroAndOneChart whiteBrowser={dummyWhiteBrowser} />);

  // 具体的に何がチャートにレンダリングされているかを確かめる方法はなさそう
  expect(wrapper.find(CalcStartButton).exists()).toEqual(false);
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<ZeroAndOneChart whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
