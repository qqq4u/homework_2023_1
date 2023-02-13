'use strict';


/**
 * Check if path is string
 * @function
 * @param {Object} path - Path to validate
 * 
 * @return {boolean} - Result of validating
 * 
 * @author Danila Polyakov <polyakovdd@student.bmstu.ru>
 */
const checkPathIsString = (path) => {
    return (typeof path === 'string' || Object.prototype.toString.call(path) === "[object String]");
}

/**
 * Check if object is valid
 * @function
 * @param {Object} object - Object to validate
 * 
 * @return {boolean} - Result of validating
 * 
 * @author Danila Polyakov <polyakovdd@student.bmstu.ru>
 */
const checkObjectIsValid = (object) => {
    return (object && !Number.isNaN(object) && typeof object !== 'function' && object !== null) 
}

/**
 * Check if value is valid
 * @function
 * @param {Object} value - Object to validate
 * 
 * @return {boolean} - Result of validating
 * 
 * @author Danila Polyakov <polyakovdd@student.bmstu.ru>
 */
const checkValueIsValid = (value) => {
    return (value !== undefined &&  !Number.isNaN(value) && typeof value !== 'function') 
}


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
const set = (object, path, value) => {
    if (!checkPathIsString(path)){
        throw new TypeError('Path need to be a string!');
    } if (!checkObjectIsValid(object)){
        throw new TypeError('Wrong object type');
    } if (!checkValueIsValid(value)){
        throw new TypeError('Wrong value type');
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


