'use strict';

/**
 * Set a value by path.
 * @constructor
 * @param {Object} object - Object for whose field you want to set a value.
 * @param {string} path - Path to set value
 * @param {Object} value - Value to set.
 * 
 * @return {Object}  The value that was set.
 * 
 * @author Danila Polyakov <polyakovdd@student.bmstu.ru>
 */
const set = (object, path, value) => {
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
