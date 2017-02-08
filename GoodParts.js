// *** Selected JavaScript additions from "JavaScript:  The Good Parts" by Douglas Crockford ***

// Object.create
if (typeof Object.create !== 'function') {
     Object.create = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
}


// Function.method to add new methods to objects
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};


// Number.integer
Number.method('integer', function (  ) {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});


// String.trim
String.method('trim', function (  ) {
    return this.replace(/^\s+|\s+$/g, '');
});


// Function.curry
Function.method('curry', function (  ) {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function (  ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});


