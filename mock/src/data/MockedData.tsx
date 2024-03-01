let mockedFileMap = new Map<string, string[][]>();
let resultToFile: Map<
  string,
  Map<string | number, Map<string, string[][]>>
> = new Map();

/* Set up maps holding column indentifier to map of results */
let searchResultStars: Map<
  string | number,
  Map<string, string[][]>
> = new Map();
let searchResultStarOne: Map<
  string | number,
  Map<string, string[][]>
> = new Map();
let searchResultStarOneCol: Map<
  string | number,
  Map<string, string[][]>
> = new Map();
let searchResultEmpty: Map<
  string | number,
  Map<string, string[][]>
> = new Map();

/* set up files, add to file map, and add in result maps:  */
let starsArray = [
  ["name", "location", "x-coord"],
  ["sun", "milky way", "192"],
  ["96 G. Psc", "milky way", "1032.2"],
  ["sun", "another milky way", "192.3"],
  ["Rigel Kentaurus A", "Andromeda", "3.20"],
];
let starOne = [["sun", "milky way", "192", "bright", "yellow color"]];
let starCol = [["sun"], ["milky way"], ["192"], ["bright"], ["yellow color"]];
let emptyArray = [[]];

mockedFileMap.set("stars", starsArray);
mockedFileMap.set("starsOne", starOne);
mockedFileMap.set("starsCol", starCol);
mockedFileMap.set("empty", emptyArray);

/* set up search results: */
// search result with column header found
searchResultStars.set("name", new Map());
searchResultStars.get("name")!.set("sun", [
  ["sun", "milky way", "192"],
  ["sun", "another milky way", "192.3"],
]);

searchResultStars.set("x-coord", new Map());
searchResultStars
  .get("x-coord")!
  .set("1032.2", [["96 G. Psc", "milky way", "1032.2"]]);

// search result with column number found
searchResultStars.set(0, new Map());
searchResultStars.get(0)!.set("sun", [
  ["sun", "milky way", "192"],
  ["sun", "another milky way", "192.3"],
]);
searchResultStars.set(1, new Map());
searchResultStars.get(1)!.set("milky way", [
  ["sun", "milky way", "192"],
  ["96 G. Psc", "milky way", "1032.2"],
]);
searchResultStars.set(2, new Map());
searchResultStars.get(2)!.set("192.3", [["sun", "another milky way", "192.3"]]);

searchResultStarOne.set(4, new Map());
searchResultStarOne
  .get(4)!
  .set("yellow color", [["sun", "milky way", "192", "bright", "yellow color"]]);

searchResultStarOneCol.set(0, new Map());
searchResultStarOneCol.get(0)!.set("bright", [["bright"]]);

// search result for column name/column index not found
searchResultEmpty.set(0, new Map());
searchResultEmpty.get(0)!.set("bread", []);

searchResultEmpty.set("hi", new Map());
searchResultEmpty.get("hi")!.set("bye", []);

searchResultStars.set(10, new Map());
searchResultStars.get(10)!.set("sun", []);

searchResultStars.set("hi", new Map());
searchResultStars.get("hi")!.set("sun", []);

searchResultStarOneCol.set("wheat", new Map());
searchResultStarOneCol.get("wheat")!.set("bright", []);

// search result for item not found in existing column name / column index but found elsewhere in file
searchResultStars.get("name")!.set("another milky way", []);
searchResultStars.get(1)!.set("sun", []);
searchResultStars.get(0)!.set("another milky way", []);
searchResultStarOne.set(0, new Map());
searchResultStarOne.get(0)!.set("yellow color", []);

// search for something that exist in another file but not the current file
searchResultStarOne.get(4)!.set("another milky way", []);

/**
 * Getter for map storing all mocked data
 *
 * @returns copy of mock file maps
 */
export function getMockedFiles() {
  return new Map(mockedFileMap);
}

resultToFile.set("stars", searchResultStars);
resultToFile.set("starsOne", searchResultStarOne);
resultToFile.set("starsCol", searchResultStarOneCol);
resultToFile.set("empty", searchResultEmpty);
/**
 * Getter for map storing mocked search results according to file name
 *
 * @returns copy of search result to file map
 */
export function getSearchResult() {
  return new Map(resultToFile);
}
