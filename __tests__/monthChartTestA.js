import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';
import Utils from '../src/models/utils.js';

import MonthChart, { calcChartData } from '../src/view/analysis/monthChart.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

const DATA_1 = [
  new Record(1, "", "", "スコア1", "", 1),
  new Record(2, "", "", "スコア2", "", 2),
  new Record(3, "", "", "スコア3", "", 3),
  new Record(4, "", "", "スコア4", "", 4),
  new Record(5, "", "", "スコア5", "", 5)
];

const DATA_2 = [
  new Record(1, "", "", "スコア10", "", 10),
  new Record(2, "", "", "スコア20", "", 20),
  new Record(3, "", "", "スコア30", "", 30),
  new Record(4, "", "", "スコア40", "", 40),
  new Record(5, "", "", "スコア50", "", 50)
];

const DATA_3 = [
  new Record(1, "", "", "スコア100", "", 100),
  new Record(2, "", "", "スコア200", "", 200),
  new Record(3, "", "", "スコア300", "", 300),
  new Record(4, "", "", "スコア400", "", 400),
  new Record(5, "", "", "スコア500", "", 500)
];

// モックの呼ばれた回数をカウントする変数
let MOCK_COUNT = 0;

// モックの実体となる関数
function MockFileReader() {
  return ({
    getRecords: () => {
      // 内部的に毎回 new されるので
      // カウンタをモックの外に持っておかないと同じデータしか返せずに動かない
      ++MOCK_COUNT;

      switch (MOCK_COUNT) {
        case 1:
          return DATA_1;
        case 2:
          return DATA_2;
        case 3:
          return DATA_3;
      }
    }
  });
}

// RecordFileReader のモック。外側に定義しないと置き換えられないので注意
jest.mock("../src/models/recordFileReader.js", () => {
  return MockFileReader;
});

// Utils のモック。こちらは全部staticメソッドなので定義方法が違う
jest.mock("../src/models/utils.js");
Utils.extractScoreFileNameData = jest.fn()
  .mockReturnValueOnce(new Date(2019, 0, 31, 0, 0, 0, 0))
  .mockReturnValueOnce(new Date(2019, 0, 28, 0, 0, 0, 0))
  .mockReturnValueOnce(new Date(2019, 0, 31, 0, 0, 0, 0)).bind(Utils);
Utils.getScoreFiles = jest.fn()
  .mockReturnValue(["20190131.tsv", "20190228.tsv", "20190331.tsv"]).bind(Utils);
Utils.isEndOfMonthScoreFile = jest.fn()
  .mockReturnValue(true).bind(Utils);

test('レンダリングモード時はチャートが描画されること', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "1" };

  // レンダリング
  const wrapper = mount(<MonthChart whiteBrowser={dummyWhiteBrowser} />);

  // 具体的に何がチャートにレンダリングされているかを確かめる方法はなさそう
  expect(wrapper.find(CalcStartButton).exists()).toEqual(false);
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<MonthChart whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
