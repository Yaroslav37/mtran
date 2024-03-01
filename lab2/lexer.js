
const {grammar} = require('./grammar');
const { isValidIdentifier, isValidBrackets } = require('./service');

function lexer(listOfElements) {
    const answer = [];
    normal_answer = [];
    
    if (!isValidBrackets(listOfElements)) {
        throw Error("Invalid brackets expression " ); 
    }

    for (element of listOfElements) {
        if (element.includes('\r') || element.includes('\n') || element === '') {
            continue;
        } else if (grammar[element]) {
            answer.push({'element': element, 'type': grammar[element]});
        } else if (!isNaN(Number(element))) {
            answer.push({'element': element, 'type': 'literal_number'});
        } else if ((element[0] === '\'' || element[0] === '"') && (element[element.length - 1] === '\'' || element[element.length - 1] === '"')) {
            answer.push({'element': element, 'type': 'literal_string'});
        } else if (element[0] === ':') {
            answer.push({'element': element, 'type': 'constant'});
        } else if (element.startsWith('macro')) {
            answer.push({'element': element, 'type': 'macro'});
        } else if (element.startsWith(';')) {
            answer.push({'element': element, 'type': 'comment'});
        } else if (isValidIdentifier(element) && answer[element] === undefined) {
            answer.push({'element': element, 'type': 'identificator'});
        } else if (answer[element] === undefined) {
            if (element.includes('\'') || element.includes("\"")) {
                throw Error("Syntax Error: Wrong Literal String Format: " + element);   
            }
            if (element.includes('#')) {
                throw Error("Syntax Error: Wrong Boolean Format: " + element);   
            }
            if (element.includes('\\')) {
                throw Error("Syntax Error: Wrong Variable Name Format: " + element);   
            }
            if (!((element[0] >= 'a' && element[0] <= 'z') || (element[0] >= 'A' && element[0] <= 'Z'))) {
                throw Error("Syntax Error: Wrong Number Format: " + element);  
            }
            throw Error("Syntax Error: " + element);
        }
    }

    return answer;
}

module.exports = lexer;

