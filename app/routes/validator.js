function Validator(req) {
	this.req = req;
	this.validators = [];
	this.errors = [];
}

Validator.prototype.add = function(name, rules) {
	this.validators.push({
    name: name,
    rules: rules
  });
};

Validator.prototype.getErrors = function() {
	return this.errors;
};

Validator.prototype.getFormattedErrors = function() {
	return this.errors.map(this.formatError);
};

Validator.prototype.formatError = function(error) {
	return {
		text: error.message,
		href: '#' + error.name
	}
};

Validator.prototype.getError = function(name) {
	return this.getErrors().filter(error => error.name == name).map(this.formatError)[0];
};

Validator.prototype.validate = function() {
	this.errors = [];
  var validator = null,
    validatorValid = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorValid = validator.rules[j].fn(this.req.body[validator.name],
        validator.rules[j].params);
      if (!validatorValid) {
        this.errors.push({
          name: validator.name,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
};

Validator.prototype.validate = function() {
  const body = this.req.body;
  const errors = [];

  for( let validator of this.validators ){

    const { name, rules } = validator;
    const value = body[ name ];

    for( let rule of rules ){

      const { fn, params, message } = rule;
      const isValid = fn( value, params );

      if( !isValid ){
        errors.push( { name, message } );
        break;
      }
    }
  }

  this.errors = errors;

  return errors.length == 0;
}




module.exports = Validator;