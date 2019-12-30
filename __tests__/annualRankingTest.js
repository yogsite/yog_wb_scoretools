import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';

import AnnualRanking from '../src/view/analysis/annualRanking.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

const LAST_YEAR_DATA = [
  new Record(1, "", "", "スコアが１増える", "", 10),
  new Record(2, "", "", "スコアが増えない", "", 20),
  new Record(3, "", "", "スコアが３増える", "", 30),
  new Record(4, "", "", "スコアが４０増える", "", 40),
  new Record(5, "", "", "スコアが５増える", "", 50),
  new Record(6, "", "", "去年のみの動画", "", 50),
];

const THIS_YEAR_DATA = [
  new Record(1, "", "", "スコアが１増える", "", 11),
  new Record(2, "", "", "スコアが増えない", "", 20),
  new Record(3, "", "", "スコアが３増える", "", 33),
  new Record(4, "", "", "スコアが４０増える", "", 80),
  new Record(5, "", "", "スコアが５増える", "", 55),
  new Record(7, "", "", "今年のみの動画", "", 50)
];

// モックの実体となる関数
function MockFileReader() {
  return ({
    getRecords: () => {
      return LAST_YEAR_DATA;
    }
  });
}

// RecordFileReader のモック。外側に定義しないと置き換えられないので注意
jest.mock("../src/models/recordFileReader.js", () => {
  return MockFileReader;
});

test('現在値と去年のスコアデータがあるときに、今年の増加値が出ること', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "1" };
  dummyWhiteBrowser.getInfos = () => { return THIS_YEAR_DATA; };
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.getFileList = () => { return [
    {name: `wbScoreTools_${(new Date()).getFullYear()}_12_31.tsv`, isDir: false}
  ]};

  // レンダリング
  const wrapper = mount(<AnnualRanking whiteBrowser={dummyWhiteBrowser} />);

  // ヘッダ, 50, 40, 5, 3, 1 の 5行出るはず
  expect(wrapper.find("tr")).toHaveLength(6);

  // ランク
  expect(wrapper.find("tr").at(1).find("td").at(0).text()).toEqual("1");
  expect(wrapper.find("tr").at(2).find("td").at(0).text()).toEqual("2");
  expect(wrapper.find("tr").at(3).find("td").at(0).text()).toEqual("3");
  expect(wrapper.find("tr").at(4).find("td").at(0).text()).toEqual("4");
  expect(wrapper.find("tr").at(5).find("td").at(0).text()).toEqual("5");

  // ファイル名
  expect(wrapper.find("tr").at(1).find("td").at(1).text()).toEqual("今年のみの動画");
  expect(wrapper.find("tr").at(2).find("td").at(1).text()).toEqual("スコアが４０増える");
  expect(wrapper.find("tr").at(3).find("td").at(1).text()).toEqual("スコアが５増える");
  expect(wrapper.find("tr").at(4).find("td").at(1).text()).toEqual("スコアが３増える");
  expect(wrapper.find("tr").at(5).find("td").at(1).text()).toEqual("スコアが１増える");

  // 増えたスコア数
  expect(wrapper.find("tr").at(1).find("td").at(2).text()).toEqual("50");
  expect(wrapper.find("tr").at(2).find("td").at(2).text()).toEqual("40");
  expect(wrapper.find("tr").at(3).find("td").at(2).text()).toEqual("5");
  expect(wrapper.find("tr").at(4).find("td").at(2).text()).toEqual("3");
  expect(wrapper.find("tr").at(5).find("td").at(2).text()).toEqual("1");
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<AnnualRanking whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
