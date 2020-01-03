import DummyWhiteBrowser from '../__test_mocks__/_dummyWhiteBrowser.js';
import Utils from '../src/models/utils.js';

test('getFileSaveFolderがコメント通りの動きをするか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getAppDir = () => { return "C:\\Hoge" };

  expect(Utils.getFileSaveFolder(dummyWhiteBrowser)).toEqual("C:\\Hoge\\temp");
});

test('getScoreFilePrefixのデフォルト名がコメント通りか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = (key, defaultValue) => { return defaultValue; };
  dummyWhiteBrowser.getDBName = () => { return "White Browser.wb" };

  expect(Utils.getScoreFilePrefix(dummyWhiteBrowser)).toEqual("wbScoreTools_White_Browser");
});

test('getScoreSaveFolderがコメント通りの動きをするか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getAppDir = () => { return "C:\\Hoge" };

  expect(Utils.getScoreSaveFolder(dummyWhiteBrowser, "hogehoge.tsv")).toEqual("C:\\Hoge\\temp\\hogehoge.tsv");
});

test('getFirstEndOfLastScoreFileNameが最初に見るのは去年末', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getFirstEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("wbScoreTools_2018_12_31.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getFirstEndOfLastScoreFileNameが最後に見るのは11月末', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.checkFile = jest.fn()
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 12～2
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 3～5
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 6～8
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true); // 9～11

  expect(Utils.getFirstEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("wbScoreTools_2019_11_30.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getFirstEndOfLastScoreFileNameが11月末も見つけられなかったら空文字が戻る', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.checkFile = jest.fn()
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 12～2
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 3～5
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 6～8
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false); // 9～11

  expect(Utils.getFirstEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("");
  
  spy.mockReset();
  spy.mockRestore();
});

test('getLastEndOfLastScoreFileNameが最初に見るのは12月末', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getLastEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("wbScoreTools_2019_12_31.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getLastEndOfLastScoreFileNameが最後に見るのは去年12月末', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.checkFile = jest.fn()
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 12,11,10
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 9,8,7
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 6,5,4
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true); // 3,2,1, 去年末

  expect(Utils.getLastEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("wbScoreTools_2018_12_31.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getLastEndOfLastScoreFileNameが去年末も見つけられなかったら空文字が戻る', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.checkFile = jest.fn()
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 12,11,10
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 9,8,7
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false) // 6,5,4
    .mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false); // 3,2,1, 去年末

  expect(Utils.getLastEndOfLastScoreFileName(dummyWhiteBrowser, (new Date()).getFullYear())).toEqual("");
  
  spy.mockReset();
  spy.mockRestore();
});

test('getScoreFileNameは渡したDate型からコメント通りのファイル名を作る', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getScoreFileName(dummyWhiteBrowser, new Date("2019-01-01"))).toEqual("wbScoreTools_2019_01_01.tsv");
});

test('isEndOfMonthScoreFileがファイル名を元に月末かどうかを判断できるか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "wbScoreTools_2019_01_01.tsv")).toEqual(false);
  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "wbScoreTools_2019_01_31.tsv")).toEqual(true);
  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "wbScoreTools_2019_01_30.tsv")).toEqual(false);
});

test('isEndOfMonthScoreFileはスコアプレフィックスが変更されても対応できる。', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "white_browser" };

  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "white_browser_2019_01_01.tsv")).toEqual(false);
  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "white_browser_2019_01_31.tsv")).toEqual(true);
  expect(Utils.isEndOfMonthScoreFile(dummyWhiteBrowser, "white_browser_2019_01_30.tsv")).toEqual(false);
});

test('extractScoreFileNameDataがファイル名から年月日を取ってこれるか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "wbScoreTools_2019_01_01.tsv")).toEqual(new Date(2019, 0, 1));
  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "wbScoreTools_2019_01_31.tsv")).toEqual(new Date(2019, 0, 31));
  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "wbScoreTools_2019_02_02.tsv")).toEqual(new Date(2019, 1, 2));
});

test('extractScoreFileNameDataはスコアプレフィックスが変更されても対応できる。', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "white_browser" };

  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "white_browser_2019_01_01.tsv")).toEqual(new Date(2019, 0, 1));
  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "white_browser_2019_01_31.tsv")).toEqual(new Date(2019, 0, 31));
  expect(Utils.extractScoreFileNameData(dummyWhiteBrowser, "white_browser_2019_02_02.tsv")).toEqual(new Date(2019, 1, 2));
});

test('getPrevEndOfLastScoreFileNameがコメント通りのファイル名を返すか', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getPrevEndOfLastScoreFileName(dummyWhiteBrowser)).toEqual("wbScoreTools_2018_12_31.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getTodayScoreFileNameがコメント通りのファイル名を返すか', () => {
  // 内部で引数渡して作ることもあるので、そっちはオリジナルを呼ぶ
  const freezeData = new Date("2019-01-01");
  const origData = Date;
  let spy = jest.spyOn(global, "Date").mockImplementation((a1, a2, a3) => {
    return ((a1 && a2 && a3) == 0) ? new origData(a1, a2, a3) : freezeData;
  });
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getTodayScoreFileName(dummyWhiteBrowser)).toEqual("wbScoreTools_2019_01_01.tsv");

  spy.mockReset();
  spy.mockRestore();
});

test('getScoreFilesがディレクトリを弾いてファイル名だけ返すか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };
  dummyWhiteBrowser.getFileList = () => { return [
    {name: "wbScoreTools_2018_12_31.tsv", isDir: false},
    {name: "wbScoreTools_2050_01_02.tsv", isDir: false},
    {name: "wbScoreTools_2018_12_31.tsv", isDir: true}
  ]};

  const result = Utils.getScoreFiles(dummyWhiteBrowser);
  expect(result.length).toEqual(2);
  expect(result[0]).toEqual("wbScoreTools_2018_12_31.tsv");
  expect(result[1]).toEqual("wbScoreTools_2050_01_02.tsv");
});

test('dateToFormatStringは渡したDate型からコメント通りの文字列を生成する', () => {
  expect(Utils.dateToFormatString(new Date("2019-01-02 03:04:05"))).toEqual("2019/01/02 03:04:05");
  expect(Utils.dateToFormatString(new Date("2019-11-12 10:11:12"))).toEqual("2019/11/12 10:11:12");
});

test('getAllYearがスコアファイル名から年の配列を作れるか', () => {
  let dummyWhiteBrowser = new DummyWhiteBrowser();
  dummyWhiteBrowser.getProfile = () => { return "wbScoreTools" };

  expect(Utils.getAllYear(dummyWhiteBrowser, [
    "wbScoreTools_2019_01_01.tsv",
    "wbScoreTools_2018_01_01.tsv",
    "wbScoreTools_2016_01_01.tsv",
    "wbScoreTools_2019_01_01.tsv",
    "wbScoreTools_2018_01_01.tsv"
  ])).toEqual([(new Date()).getFullYear().toString(), "2019", "2018", "2016"]);
});
