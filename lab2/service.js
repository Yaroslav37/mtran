function isValidIdentifier(identifier) {
    if (identifier.length === 0) {
        return false;
    }

    const firstChar = identifier[0]
    
    if (!((firstChar >= 'a' && firstChar <= 'z') || (firstChar >= 'A' && firstChar <= 'Z'))) {
        return false;
    }

    for (let i = 1; i < identifier.length; i++) {
        const char = identifier[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === '-' || char === '_')) {
            return false;
        }
    }

    return true;
}

function spaceText(text) {
    const brackets = ['(', ')', '[', ']', '{', '}'];
    
    const characters = text.split('');

    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (brackets.includes(char)) {
            if (i > 0 && characters[i - 1] !== ' ') {
                characters.splice(i, 0, ' ');
                i++;
            }
            if (i < characters.length - 1 && characters[i + 1] !== ' ') {
                characters.splice(i + 1, 0, ' ');
                i++; 
            }
        }
    }

    return characters.join('');
}

function splitIgnoringQuotes(str, delimiter) {
    let elements = [];
    let currentElement = '';
    let insideQuotes = false;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
        }

        if (char === delimiter && !insideQuotes) {
            elements.push(currentElement);
            currentElement = '';
        } else {
            currentElement += char;
        }
    }

    elements.push(currentElement);
    return elements;
}

function isValidBrackets(expression) {
    const stack = [];
    const brackets = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(' || expression[i] === '[' || expression[i] === '{') {
            stack.push(expression[i]);
        } else if (expression[i] === ')' || expression[i] === ']' || expression[i] === '}') {
            const last = stack.pop();
            if (brackets[last] !== expression[i]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

module.exports = {spaceText, splitIgnoringQuotes, isValidIdentifier, isValidBrackets};
