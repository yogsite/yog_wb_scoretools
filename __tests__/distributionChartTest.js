import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';

import DistributionChart, { calcChartData } from '../src/view/analysis/distributionChart.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

test("指定のデータ通りのチャートデータが生成されること", () => {
  // 0が3個、1が1個、2が2個、3が1個、4が3個、5が1個
  const calcData = calcChartData([
    new Record(1, "", "", "スコア１", "", 1),
    new Record(2, "", "", "スコアゼロ１", "", 0),
    new Record(3, "", "", "スコア２", "", 2),
    new Record(4, "", "", "スコア２の２", "", 2),
    new Record(5, "", "", "スコアゼロ２", "", 0),
    new Record(6, "", "", "スコアゼロ３", "", 0),
    new Record(7, "", "", "スコア３", "", 3),
    new Record(8, "", "", "スコア４", "", 4),
    new Record(9, "", "", "スコア４の２", "", 4),
    new Record(10, "", "", "スコア４の３", "", 4),
    new Record(11, "", "", "スコア５", "", 5)
  ]);

  expect(calcData.length).toEqual(6);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア0")].count).toEqual(3);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア1")].count).toEqual(1);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア2")].count).toEqual(2);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア3")].count).toEqual(1);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア4")].count).toEqual(3);
  expect(calcData[calcData.findIndex((r) => r.name === "スコア5")].count).toEqual(1);
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
      new Record(4, "", "", "スコア２の２", "", 2),
      new Record(5, "", "", "スコアゼロ２", "", 0),
      new Record(6, "", "", "スコアゼロ３", "", 0),
      new Record(7, "", "", "スコア３", "", 3),
      new Record(8, "", "", "スコア４", "", 4),
      new Record(9, "", "", "スコア４の２", "", 4),
      new Record(10, "", "", "スコア４の３", "", 4),
      new Record(11, "", "", "スコア５", "", 5)
    ];
  };

  // レンダリング
  const wrapper = mount(<DistributionChart whiteBrowser={dummyWhiteBrowser} />);

  // 具体的に何がチャートにレンダリングされているかを確かめる方法はなさそう
  expect(wrapper.find(CalcStartButton).exists()).toEqual(false);
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<DistributionChart whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
