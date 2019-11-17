import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';
import RecordFileReader from '../src/models/recordFileReader.js';

test('空ファイルを読み込ませると空データが戻ってくる', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.readFile = () => { return [] };

  expect((new RecordFileReader(dummyWhiteBrowser, "")).getRecords().length).toEqual(0);
});

test('ヘッダだけのデータを読み込ませると空データが戻ってくる', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.readFile = () => { return [
    "ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE"
  ] };

  expect((new RecordFileReader(dummyWhiteBrowser, "")).getRecords().length).toEqual(0);
});

test('2行のデータを読み込ませると、1レコードもどってくる', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.readFile = () => { return [
    "ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE",
    "1\tC:\t\\Hoge\tFuga\t.avi\t1"
  ] };

  const records = (new RecordFileReader(dummyWhiteBrowser, "")).getRecords();
  expect(records.length).toEqual(1);
  expect(records[0].id).toEqual("1");
  expect(records[0].drive).toEqual("C:");
  expect(records[0].dir).toEqual("\\Hoge");
  expect(records[0].title).toEqual("Fuga");
  expect(records[0].ext).toEqual(".avi");
  expect(records[0].score).toEqual(1);
});

test('3行のデータを読み込ませると、2レコード戻ってくる', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.readFile = () => { return [
    "ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE",
    "1\tC:\t\\Hoge\tFuga\t.avi\t1",
    "2\tD:\t\\Moge\tGoga\t.mp4\t20"
  ] };

  const records = (new RecordFileReader(dummyWhiteBrowser, "")).getRecords();
  expect(records.length).toEqual(2);
  expect(records[0].id).toEqual("1");
  expect(records[0].drive).toEqual("C:");
  expect(records[0].dir).toEqual("\\Hoge");
  expect(records[0].title).toEqual("Fuga");
  expect(records[0].ext).toEqual(".avi");
  expect(records[0].score).toEqual(1);
  expect(records[1].id).toEqual("2");
  expect(records[1].drive).toEqual("D:");
  expect(records[1].dir).toEqual("\\Moge");
  expect(records[1].title).toEqual("Goga");
  expect(records[1].ext).toEqual(".mp4");
  expect(records[1].score).toEqual(20);
});
