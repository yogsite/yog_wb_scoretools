import { mount } from 'enzyme';
import React from 'react';

import Record from '../src/models/record.js';

import YearScore from '../src/view/home/yearScore.jsx';
import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';

import CalcStartButton from '../src/view/component/calcStartButton.jsx';

// モックの実体となる関数
function MockFileReader() {
  return ({
    getRecords: () => {
      return [
        new Record(1, "", "", "スコア１増える", "", 1),
        new Record(2, "", "", "スコアゼロ", "", 0),
        new Record(3, "", "", "スコア２増える", "", 2),
        new Record(4, "", "", "スコア横ばい", "", 3),
        new Record(5, "", "", "スコア４。先月のみ", "", 4)
      ];
    }
  });
}

// RecordFileReader のモック。外側に定義しないと置き換えられないので注意
jest.mock("../src/models/recordFileReader.js", () => {
  return MockFileReader;
});

test('今年と今月の合計スコアの差がレンダリングされること', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "1" };
  dummyWhiteBrowser.getInfos = () => {
    return [
      new Record(1, "", "", "スコア１増える", "", 2),
      new Record(2, "", "", "スコアゼロ", "", 0),
      new Record(3, "", "", "スコア２増える", "", 4),
      new Record(4, "", "", "スコア横ばい", "", 3),
      new Record(6, "", "", "スコア５。今月のみ", "", 5)
    ];
  };

  // レンダリング
  const wrapper = mount(<YearScore whiteBrowser={dummyWhiteBrowser} />);

  // カウントを見る
  expect(wrapper.text()).toEqual("4");
});

test('レンダリング抑止時は描画しないこと', () => {
  // 描画するかは設定で切り替えられる
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "0" };

  // レンダリング
  const wrapper = mount(<YearScore whiteBrowser={dummyWhiteBrowser} />);

  // 確認
  expect(wrapper.find(CalcStartButton).exists()).toEqual(true);
});
