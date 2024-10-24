# Bigram Parsing Web Application
## Overview
This is a web application that parses any input text and outputs a histogram of bigrams (two adjacent words) found within the text. A bigram is a pair of consecutive words, and the histogram displays the frequency count for each bigram.

The application is built entirely in JavaScript and can be accessed online at Bigram Parser.

## Example
Given the text:
"The quick brown fox and the quick blue hare."
The bigrams and their counts would be:

"the quick": 2
"quick brown": 1
"brown fox": 1
"fox and": 1
"and the": 1
"quick blue": 1
"blue hare": 1
## Features
Bigram Parsing: Automatically detects and counts adjacent word pairs.
Histogram Output: Visualizes the frequency of each bigram in the text input.
Edge Case Handling: Designed to handle punctuation, case sensitivity, and extra spaces.

## How to Use
Visit the Web App: Go to https://ayres-net.com/bigramParser/.
Input:
Enter your text into the input field.
Output:
The app will display a histogram of bigrams with their corresponding counts.
Example:
Input: "The quick brown fox and the quick blue hare."

## Output:
"the quick": 2
"quick brown": 1
"brown fox": 1
"fox and": 1
"and the": 1
"quick blue": 1
"blue hare": 1
## Design Considerations
Bigram Parsing Logic: The core logic for detecting adjacent word pairs is custom-implemented in JavaScript.
Efficiency: The app is optimized to handle typical user inputs swiftly, though performance may vary with extremely large inputs.
