'use strict';

const { ERROR_CONSTANTS } = require('../constants.js');

class ValidationError extends Error {
  constructor({ message, errors = [] }) {
    super(message);
    this.type = ERROR_CONSTANTS.COUPONJS_VALIDATION_ERROR.type;
    this.errors = errors;
  }
}

module.exports = ValidationError;
