/**
 * @author Jeremiah Ayres
 * @date 10-23-24
 */
let numPass = 0;
let numFail = 0;

/**
 * The DOM on ready function
 */
$(document).ready(function(){
    $('#runTestCases').show();
    setTestListeners();
});

/**
 * Sets the DOM event listeners
 */
function setTestListeners(){
    $('#runTestCases').click(function(){
        numPass = 0;
        numFail = 0;
        clearTestResults();
        $('#testResultsContainer').show();
        runTests();
        addToTestResultsField(`${numPass} tests passed<br>${numFail} tests failed`);
    });
}

/**
 * Runs the test cases
 */
function runTests(){
    testInvalidInput();
    testTwoWordInput();
    testIndexOfValueInJsonArrayOneVal();
    testIndexOfValueInJsonArrayManyVals();
    testParseBigramManyWordsSingleCount();
    testParseBigramManyWordsDoubleCount();
    testParseBigramWithOneWord();
}

/**
 * ************* GUI Tests *************
 */

/**
 * Test invalid input
 */
function testInvalidInput(){
    addToTestResultsField("Testing invalid input...")
    $('#largeInput').val("hello");
    $('#processInput').trigger("click")
    let output = $('#outputField').html();
    if(output === "<p>Your string must include more than one word.</p>"){
        numPass++;
        addToTestResultsField("Invalid input Passed")
    }else{
        numFail++;
        addToTestResultsField("Invalid input Failed")
    }
}

/**
 * Test 2 words input
 */
function testTwoWordInput(){
    addToTestResultsField("Testing two word input...");
    $('#largeInput').val("hello world");
    $('#processInput').trigger("click")
    let output = $('#outputField').html();
    if(output === `
    <table class="table">
        <thead>
          <tr>
            <th>Bigram</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
    
            <tr>
                <td>hello world</td>
                <td>1</td>
            </tr>
        
        </tbody>
      </table>
    `){
        numPass++;
        addToTestResultsField("Two word input Passed");
    }else{
        numFail++;
        addToTestResultsField("Two word input Failed");
    }
}

/**
 * ************* Function Testing *************
 */

/**
 * Test the indexOfValueInJsonArray function with one value
 */
function testIndexOfValueInJsonArrayOneVal() {
    addToTestResultsField("Testing testIndexOfValueInJsonArrayOneVal input...");
    let testArray = [
        {
            "value": "test word"
        }
    ];
    if (indexOfValueInJsonArray(testArray, "test word")===-1){
        numFail++;
        addToTestResultsField("Testing testIndexOfValueInJsonArrayOneVal fail");
    }else{
        numPass++;
        addToTestResultsField("Testing testIndexOfValueInJsonArrayOneVal pass");
    }
}

/**
 * Test the indexOfValueInJsonArray function with many values
 */
function testIndexOfValueInJsonArrayManyVals() {
    addToTestResultsField("Testing testIndexOfValueInJsonArrayManyVals input...");
    let testArray = [
        {
            "value": "test word"
        },
        {
            "value": "word testing"
        },
        {
            "value": "testing more"
        },
        {
            "value": "more words"
        },
    ];
    if (indexOfValueInJsonArray(testArray, "more words")===-1){
        numFail++;
        addToTestResultsField("Testing testIndexOfValueInJsonArrayManyVals fail");
    }else{
        numPass++;
        addToTestResultsField("Testing testIndexOfValueInJsonArrayManyVals pass");
    }
}

/**
 * Test the parseBigram function with single counts
 */
function testParseBigramManyWordsSingleCount() {

    let words = "test word testing more words";
    addToTestResultsField("Testing testParseBigramManyWordsSingleCount input...");
    let bigramArray = parseBigram(words);

    if (bigramArray[0]["value"] === "test word" && bigramArray[0]["count"]===1){
        numPass++;
        addToTestResultsField("Testing testParseBigramManyWordsSingleCount pass");
    }else{
        numFail++;
        addToTestResultsField("Testing testParseBigramManyWordsSingleCount fail");
    }
}

/**
 * Test the parseBigram function with double count
 */
function testParseBigramManyWordsDoubleCount() {

    let words = "test word testing more words test word";
    addToTestResultsField("Testing testParseBigramManyWordsDoubleCount input...");
    let bigramArray = parseBigram(words);

    if (bigramArray[0]["value"] === "test word" && bigramArray[0]["count"]===2){
        numPass++;
        addToTestResultsField("Testing testParseBigramManyWordsDoubleCount pass");
    }else{
        numFail++;
        addToTestResultsField("Testing testParseBigramManyWordsDoubleCount fail");
    }
}

/**
 * Test the parseBigram function with one word
 */
function testParseBigramWithOneWord() {
    let words = "test";
    addToTestResultsField("Testing testParseBigramWithOneWord input...");
    let bigramArray = parseBigram(words);

    if (bigramArray.length){
        numFail++;
        addToTestResultsField("Testing testParseBigramWithOneWord fail");
    }else{
        numPass++;
        addToTestResultsField("Testing testParseBigramWithOneWord pass");
    }
}

/**
 * ************* Helper Functions *************
 */

/**
 * Prints to the test output
 * @param text String of the text to be displayed in a paragraph tag.
 */
function addToTestResultsField(text){
    $("#testOutput").append(`<p>${text}</p>`);
}

/**
 * Clears the results' field in the DOM
 */
function clearTestResults(){
    $("#testOutput").empty();
}
