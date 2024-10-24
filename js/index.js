/**
 * @author Jeremiah Ayres
 * @date 10-23-24
 */

/**
 * The DOM on ready function
 */
$(document).ready(function(){
    setListeners();
});

/**
 * Sets the DOM event listeners
 */
function setListeners(){
    //Process Input Button listener
    $('#processInput').click(function(){
        let input = $('#largeInput').val();
        if(input.length>0) {
            let bigramJsonArray = parseBigram(input);
            if (bigramJsonArray.length > 0) {
                displayResults(bigramJsonArray);
            }
        }else{
            displayError("Please input something above.")
        }
    });
}

/**
 * Parses a string and returns an array of bigrams
 * @param text String to be parsed (special chars will be ignored
 * @return {*[]}
 */
function parseBigram(text){
    let bigrams = [];
    let cleanedStr = text.replace(/\n/g, ' ');
    cleanedStr = cleanedStr.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();

    let words = cleanedStr.split(/\s+/);

    //Check for empty words
    let newWords = [];
    for (let i = 0; i < words.length-1; i++) {
        if(words[i].length >0){
            newWords.push(words[i]);
        }
    }
    words = newWords;

    if(words.length > 1) {
        for (let i = 0; i < words.length-1; i++) {
            let index = indexOfValueInJsonArray(bigrams, words[i] + " " + words[i+1]);
            if (index === -1){
                bigrams.push(
                    {
                        "value":(words[i] + " " + words[i+1]),
                        "count":1
                    }
                )
            }else{
                bigrams[index]["count"]++;
            }
        }

    }else{
        displayError("Your string must include more than one word.");
    }
    return bigrams;
}

/**
 * Gets and returns the index of the bigram object by "value"
 * @param jsonArray Array of bigram objects
 * @param value String of the value to search for
 * @return {number} 0-n or -1 if the index is not found.
 */
function indexOfValueInJsonArray(jsonArray, value){
    for(let i = 0;i<jsonArray.length;i++){
        if(jsonArray[i]["value"] === value){
            return i;
        }
    }
    return -1;
}

/**
 * Displays an error to the dom in paragraph tags
 * @param text String of the error to be displayed
 */
function displayError(text){
    $('#outputField').html(`<p>${text}</p>`);
}

/**
 * Displays the array of bigrams as an HTML table to the DOM
 * @param bigramJsonArray Array of bigram objects
 */
function displayResults(bigramJsonArray){
    let html = `
    <table class="table">
        <thead>
          <tr>
            <th>Bigram</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
    `;
    for(let i = 0;i<bigramJsonArray.length;i++){
        html += `
            <tr>
                <td>${bigramJsonArray[i]["value"]}</td>
                <td>${bigramJsonArray[i]["count"]}</td>
            </tr>
        `;
    }

    html += `
        </tbody>
      </table>
    `;
    $('#outputField').html(html);
}