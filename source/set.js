'use strict';

const set = function (object, path, value) {
    let fields = path.split('.');
    let currVal = object;
    let lastField = fields[fields.length - 1];
    
    for (let i = 1; i < fields.length - 1; i++) {
        console.log(fields[i]);
        if (!currVal[fields[i]]) {
            currVal[fields[i]] = {};
        }
        currVal = currVal[fields[i]];
    }
    currVal[lastField] = value;

    return object;
}