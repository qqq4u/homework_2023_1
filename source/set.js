'use strict';

/**
 * Set a value by path.
 * @function
 * @param {Object} object - Object for whose field you want to set a value.
 * @param {string} path - Path to set value
 * @param {Object} value - Value to set.
 * 
 * @return {Object}  The value that was set.
 * 
 * @author Danila Polyakov <polyakovdd@student.bmstu.ru>
 */

const checkPathIsString = (path) => {
    return (typeof path === 'string' || Object.prototype.toString.call(path) === "[object String]");
}

const checkValueISValid = (valueToCheck) => {
    return (valueToCheck !== undefined && valueToCheck===valueToCheck && typeof valueToCheck !== 'function') 
}


const set = (object, path, value) => {
    if (!checkPathIsString(path)){
        throw new TypeError('Path need to be a string!');
    } if (!checkValueISValid(object)){
        throw new TypeError(`Wrong object type`);
    } if (!checkValueISValid(value)){
        throw new TypeError(`Wrong value type`);
    }
    
    const fields = path.split('.').slice(1);
    const lastField = fields.at(-1);
    
    let currVal = object;
    fields.slice(0,-1).forEach(field => {
        if (!currVal[field]) {
            currVal[field] = {};
        }
        currVal = currVal[field];
    });

    currVal[lastField] = value;

    return object;
}
