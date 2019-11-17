import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';
import RecordFileWriter from '../src/models/recordFileWriter.js';
import Record from '../src/models/record.js';

test('空データを書くとヘッダだけが書かれる', () => {
  // この変数に値が戻ってくるようにする
  let writeData = "";

  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.writeFile = (name, data, append) => { writeData += data + "\r\n" };

  (new RecordFileWriter(dummyWhiteBrowser, "hoge", []));
  expect(writeData).toEqual("ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE\r\n");
});

test('データを書くと、ヘッダとデータが書かれる', () => {
  // この変数に値が戻ってくるようにする
  let writeData = "";

  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.writeFile = (name, data, append) => { writeData += data + "\r\n" };

  (new RecordFileWriter(dummyWhiteBrowser, "hoge", [
    new Record(1, "C:", "\\Hoge", "ほげ", ".avi", 20),
    new Record(2, "D:", "\\Fuga", "ふが", ".mov", 10)
  ]));

  expect(writeData).toEqual(
    "ID\tDRIVE\tDIR\tTITLE\tEXT\tSCORE\r\n" +
    "1\tC:\t\\Hoge\tほげ\t.avi\t20\r\n" +
    "2\tD:\t\\Fuga\tふが\t.mov\t10\r\n"
  );
});
