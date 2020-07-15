// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/test/utils.js":[function(require,module,exports) {
"use strict";

/**
 * Returns `true` if `value` is `undefined`.
 * @examples
 *    var foo; isUndefined(foo); // true
 *    isUndefined(0); // false
 */
function isUndefined(value) {
  return value === undefined;
}
exports.isUndefined = isUndefined;

/**
 * Returns `true` if value is `null`.
 * @examples
 *    isNull(null); // true
 *    isNull(undefined); // false
 */
function isNull(value) {
  return value === null;
}
exports.isNull = isNull;

/**
 * Returns `true` if value is a string.
 * @examples
 *    isString("moe"); // true
 */
function isString(value) {
  return typeof value === "string";
}
exports.isString = isString;

/**
 * Returns `true` if `value` is a number.
 * @examples
 *    isNumber(8.4 * 5); // true
 */
function isNumber(value) {
  return typeof value === "number";
}
exports.isNumber = isNumber;

/**
 * Returns `true` if `value` is a `RegExp`.
 * @examples
 *    isRegExp(/moe/); // true
 */
function isRegExp(value) {
  return instanceOf(value, RegExp);
}
exports.isRegExp = isRegExp;

/**
 * Returns true if `value` is a `Date`.
 * @examples
 *    isDate(new Date()); // true
 */
function isDate(value) {
  return isObject(value) && instanceOf(value, Date);
}
exports.isDate = isDate;

/**
 * Returns true if object is a Function.
 * @examples
 *    isFunction(function foo(){}) // true
 */
function isFunction(value) {
    return typeof value === "function" && value.call && value.apply;
}
exports.isFunction = isFunction;

/**
 * Returns `true` if `value` is an object (please note that `null` is considered
 * to be an atom and not an object).
 * @examples
 *    isObject({}) // true
 *    isObject(null) // false
 */
function isObject(value) {
    return typeof value === "object" && value !== null;
}
exports.isObject = isObject;

/**
 * Returns true if `value` is an Array.
 * @examples
 *    isArray([1, 2, 3])  // true
 *    isArray({ 0: "foo", length: 1 }) // false
 */
var isArray = Array.isArray || function isArray(value) {
  Object.prototype.toString.call(value) === "[object Array]";
}
exports.isArray = isArray;

/**
 * Returns `true` if `value` is an Arguments object.
 * @examples
 *    (function(){ return isArguments(arguments); })(1, 2, 3); // true
 *    isArguments([1,2,3]); // false
 */
function isArguments(value) {
  Object.prototype.toString.call(value) === "[object Arguments]";
}
exports.isArguments = isArguments;

/**
 * Returns true if it is a primitive `value`. (null, undefined, number,
 * boolean, string)
 * @examples
 *    isPrimitive(3) // true
 *    isPrimitive("foo") // true
 *    isPrimitive({ bar: 3 }) // false
 */
function isPrimitive(value) {
  return !isFunction(value) && !isObject(value);
}
exports.isPrimitive = isPrimitive;

/**
 * Returns `true` if given `object` is flat (it is direct decedent of
 * `Object.prototype` or `null`).
 * @examples
 *    isFlat({}) // true
 *    isFlat(new Type()) // false
 */
function isFlat(object) {
  return isObject(object) && (isNull(Object.getPrototypeOf(object)) ||
                              isNull(Object.getPrototypeOf(
                                     Object.getPrototypeOf(object))));
}
exports.isFlat = isFlat;

/**
 * Returns `true` if object contains no values.
 */
function isEmpty(object) {
  if (isObject(object)) {
    for (var key in object)
      return false;
    return true;
  }
  return false;
}
exports.isEmpty = isEmpty;

/**
 * Returns `true` if `value` is an array / flat object containing only atomic
 * values and other flat objects.
 */
function isJSON(value, visited) {
    // Adding value to array of visited values.
    (visited || (visited = [])).push(value);
            // If `value` is an atom return `true` cause it"s valid JSON.
    return  isPrimitive(value) ||
            // If `value` is an array of JSON values that has not been visited
            // yet.
            (isArray(value) &&  value.every(function(element) {
                                  return isJSON(element, visited);
                                })) ||
            // If `value` is a plain object containing properties with a JSON
            // values it"s a valid JSON.
            (isFlat(value) && Object.keys(value).every(function(key) {
                var $ = Object.getOwnPropertyDescriptor(value, key);
                // Check every proprety of a plain object to verify that
                // it"s neither getter nor setter, but a JSON value, that
                // has not been visited yet.
                return  ((!isObject($.value) || !~visited.indexOf($.value)) &&
                        !("get" in $) && !("set" in $) &&
                        isJSON($.value, visited));
            }));
}
exports.isJSON = function (value) {
  return isJSON(value);
};

/**
 * Returns if `value` is an instance of a given `Type`. This is exactly same as
 * `value instanceof Type` with a difference that `Type` can be from a scope
 * that has a different top level object. (Like in case where `Type` is a
 * function from different iframe / jetpack module / sandbox).
 */
function instanceOf(value, Type) {
  var isConstructorNameSame;
  var isConstructorSourceSame;

  // If `instanceof` returned `true` we know result right away.
  var isInstanceOf = value instanceof Type;

  // If `instanceof` returned `false` we do ducktype check since `Type` may be
  // from a different sandbox. If a constructor of the `value` or a constructor
  // of the value"s prototype has same name and source we assume that it"s an
  // instance of the Type.
  if (!isInstanceOf && value) {
    isConstructorNameSame = value.constructor.name === Type.name;
    isConstructorSourceSame = String(value.constructor) == String(Type);
    isInstanceOf = (isConstructorNameSame && isConstructorSourceSame) ||
                    instanceOf(Object.getPrototypeOf(value), Type);
  }
  return isInstanceOf;
}
exports.instanceOf = instanceOf;

/**
 * Function returns textual representation of a value passed to it. Function
 * takes additional `indent` argument that is used for indentation. Also
 * optional `limit` argument may be passed to limit amount of detail returned.
 * @param {Object} value
 * @param {String} [indent="    "]
 * @param {Number} [limit]
 */
function source(value, indent, limit, offset, visited) {
  var result;
  var names;
  var nestingIndex;
  var isCompact = !isUndefined(limit);

  indent = indent || "    ";
  offset = (offset || "");
  result = "";
  visited = visited || [];

  if (isUndefined(value)) {
    result += "undefined";
  }
  else if (isNull(value)) {
    result += "null";
  }
  else if (isString(value)) {
    result += "\"" + value + "\"";
  }
  else if (isFunction(value)) {
    value = String(value).split("\n");
    if (isCompact && value.length > 2) {
      value = value.splice(0, 2);
      value.push("...}");
    }
    result += value.join("\n" + offset);
  }
  else if (isArray(value)) {
    if ((nestingIndex = (visited.indexOf(value) + 1))) {
      result = "#" + nestingIndex + "#";
    }
    else {
      visited.push(value);

      if (isCompact)
        value = value.slice(0, limit);

      result += "[\n";
      result += value.map(function(value) {
        return offset + indent + source(value, indent, limit, offset + indent,
                                        visited);
      }).join(",\n");
      result += isCompact && value.length > limit ?
                ",\n" + offset + "...]" : "\n" + offset + "]";
    }
  }
  else if (isObject(value)) {
    if ((nestingIndex = (visited.indexOf(value) + 1))) {
      result = "#" + nestingIndex + "#"
    }
    else {
      visited.push(value)

      names = Object.keys(value);

      result += "{ // " + value + "\n";
      result += (isCompact ? names.slice(0, limit) : names).map(function(name) {
        var _limit = isCompact ? limit - 1 : limit;
        var descriptor = Object.getOwnPropertyDescriptor(value, name);
        var result = offset + indent + "// ";
        var accessor;
        if (0 <= name.indexOf(" "))
          name = "\"" + name + "\"";

        if (descriptor.writable)
          result += "writable ";
        if (descriptor.configurable)
          result += "configurable ";
        if (descriptor.enumerable)
          result += "enumerable ";

        result += "\n";
        if ("value" in descriptor) {
          result += offset + indent + name + ": ";
          result += source(descriptor.value, indent, _limit, indent + offset,
                           visited);
        }
        else {

          if (descriptor.get) {
            result += offset + indent + "get " + name + " ";
            accessor = source(descriptor.get, indent, _limit, indent + offset,
                              visited);
            result += accessor.substr(accessor.indexOf("{"));
          }

          if (descriptor.set) {
            if (descriptor.get) result += ",\n";
            result += offset + indent + "set " + name + " ";
            accessor = source(descriptor.set, indent, _limit, indent + offset,
                              visited);
            result += accessor.substr(accessor.indexOf("{"));
          }
        }
        return result;
      }).join(",\n");

      if (isCompact) {
        if (names.length > limit && limit > 0) {
          result += ",\n" + offset  + indent + "//...";
        }
      }
      else {
        if (names.length)
          result += ",";

        result += "\n" + offset + indent + "\"__proto__\": ";
        result += source(Object.getPrototypeOf(value), indent, 0,
                         offset + indent);
      }

      result += "\n" + offset + "}";
    }
  }
  else {
    result += String(value);
  }
  return result;
}
exports.source = function (value, indentation, limit) {
  return source(value, indentation, limit);
};

},{}],"node_modules/test/assert.js":[function(require,module,exports) {
"use strict";

var utils = require("./utils")


/**
 * The `AssertionError` is defined in assert.
 * @extends Error
 * @example
 *  new assert.AssertionError({
 *    message: message,
 *    actual: actual,
 *    expected: expected
 *  })
 */
function AssertionError(options) {
  var assertionError = Object.create(AssertionError.prototype);

  if (utils.isString(options))
    options = { message: options };
  if ("actual" in options)
    assertionError.actual = options.actual;
  if ("expected" in options)
    assertionError.expected = options.expected;
  if ("operator" in options)
    assertionError.operator = options.operator;

  assertionError.message = options.message;
  assertionError.stack = new Error().stack;
  return assertionError;
}
AssertionError.prototype = Object.create(Error.prototype, {
  constructor: { value: AssertionError },
  name: { value: "AssertionError", enumerable: true },
  toString: { value: function toString() {
    var value;
    if (this.message) {
      value = this.name + " : " + this.message;
    }
    else {
      value = [
        this.name + " : ",
        utils.source(this.expected),
        this.operator,
        utils.source(this.actual)
      ].join(" ");
    }
    return value;
  }}
});
exports.AssertionError = AssertionError;

function Assert(logger) {
  return Object.create(Assert.prototype, { _log: { value: logger }});
}
Assert.prototype = {
  fail: function fail(e) {
    this._log.fail(e);
  },
  pass: function pass(message) {
    this._log.pass(message);
  },
  error: function error(e) {
    this._log.error(e);
  },
  ok: function ok(value, message) {
    if (!!!value) {
      this.fail({
        actual: value,
        expected: true,
        message: message,
        operator: "=="
      });
    }
    else {
      this.pass(message);
    }
  },

  /**
   * The equality assertion tests shallow, coercive equality with `==`.
   * @example
   *    assert.equal(1, 1, "one is one");
   */
  equal: function equal(actual, expected, message) {
    if (actual == expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "=="
      });
    }
  },

  /**
   * The non-equality assertion tests for whether two objects are not equal
   * with `!=`.
   * @example
   *    assert.notEqual(1, 2, "one is not two");
   */
  notEqual: function notEqual(actual, expected, message) {
    if (actual != expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=",
      });
    }
  },

  /**
   * The equivalence assertion tests a deep (with `===`) equality relation.
   * @example
   *    assert.deepEqual({ a: "foo" }, { a: "foo" }, "equivalent objects")
   */
   deepEqual: function deepEqual(actual, expected, message) {
    if (isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "deepEqual"
      });
    }
  },

  /**
   * The non-equivalence assertion tests for any deep (with `===`) inequality.
   * @example
   *    assert.notDeepEqual({ a: "foo" }, Object.create({ a: "foo" }),
   *                        "object"s inherit from different prototypes");
   */
  notDeepEqual: function notDeepEqual(actual, expected, message) {
    if (!isDeepEqual(actual, expected)) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "notDeepEqual"
      });
    }
  },

  /**
   * The strict equality assertion tests strict equality, as determined by
   * `===`.
   * @example
   *    assert.strictEqual(null, null, "`null` is `null`")
   */
  strictEqual: function strictEqual(actual, expected, message) {
    if (actual === expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "==="
      });
    }
  },

  /**
   * The strict non-equality assertion tests for strict inequality, as
   * determined by `!==`.
   * @example
   *    assert.notStrictEqual(null, undefined, "`null` is not `undefined`");
   */
  notStrictEqual: function notStrictEqual(actual, expected, message) {
    if (actual !== expected) {
      this.pass(message);
    }
    else {
      this.fail({
        actual: actual,
        expected: expected,
        message: message,
        operator: "!=="
      })
    }
  },

  /**
   * The assertion whether or not given `block` throws an exception. If optional
   * `Error` argument is provided and it"s type of function thrown error is
   * asserted to be an instance of it, if type of `Error` is string then message
   * of throw exception is asserted to contain it.
   * @param {Function} block
   *    Function that is expected to throw.
   * @param {Error|RegExp} [Error]
   *    Error constructor that is expected to be thrown or a string that
   *    must be contained by a message of the thrown exception, or a RegExp
   *    matching a message of the thrown exception.
   * @param {String} message
   *    Description message
   *
   * @examples
   *
   *    assert.throws(function block() {
   *      doSomething(4)
   *    }, "Object is expected", "Incorrect argument is passed");
   *
   *    assert.throws(function block() {
   *      Object.create(5)
   *    }, TypeError, "TypeError is thrown");
   */
  throws: function throws(block, Error, message) {
    var threw = false;
    var exception = null;

    // If third argument is not provided and second argument is a string it
    // means that optional `Error` argument was not passed, so we shift
    // arguments.
    if (utils.isString(Error) && utils.isUndefined(message)) {
      message = Error;
      Error = undefined;
    }

    // Executing given `block`.
    try {
      block();
    }
    catch (e) {
      threw = true;
      exception = e;
    }

    // If exception was thrown and `Error` argument was not passed assert is
    // passed.
    if (threw && (utils.isUndefined(Error) ||
                 // If Error is thrown exception
                 (Error == exception) ||
                 // If passed `Error` is RegExp using it"s test method to
                 // assert thrown exception message.
                 (utils.isRegExp(Error) && Error.test(exception.message)) ||
                 // If passed `Error` is a constructor function testing if
                 // thrown exception is an instance of it.
                 (utils.isFunction(Error) && utils.instanceOf(exception, Error))))
    {
      this.pass(message);
    }

    // Otherwise we report assertion failure.
    else {
      var failure = {
        message: message,
        operator: "throws"
      };

      if (exception)
        failure.actual = exception;

      if (Error)
        failure.expected = Error;

      this.fail(failure);
    }
  }
};
exports.Assert = Assert;

function isDeepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  }

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  else if (utils.isDate(actual) && utils.isDate(expected)) {
    return actual.getTime() === expected.getTime();
  }

  // XXX specification bug: this should be specified
  else if (utils.isPrimitive(actual) || utils.isPrimitive(expected)) {
    return expected === actual;
  }

  else if (utils.instanceOf(actual, Error) ||
           utils.instanceOf(expected, Error)) {
    return actual.message === expected.message &&
           actual.type === expected.type &&
           actual.name === expected.name &&
           (actual.constructor && expected.constructor &&
            actual.constructor.name === expected.constructor.name)
  }

  // 7.3. Other pairs that do not both pass typeof value == "object",
  // equivalence is determined by ==.
  else if (!utils.isObject(actual) && !utils.isObject(expected)) {
    return actual == expected;
  }

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical "prototype" property. Note: this
  // accounts for both named and indexed properties on Arrays.
  else {
    return actual.prototype === expected.prototype &&
           isEquivalent(actual, expected);
  }
}

function isEquivalent(a, b, stack) {
  return isArrayEquivalent(Object.keys(a).sort(),
                           Object.keys(b).sort()) &&
          Object.keys(a).every(function(key) {
            return isDeepEqual(a[key], b[key], stack)
          });
}

function isArrayEquivalent(a, b, stack) {
  return utils.isArray(a) && utils.isArray(b) && a.length === b.length &&
         a.every(function(value, index) {
           return isDeepEqual(value, b[index]);
         });
}

},{"./utils":"node_modules/test/utils.js"}],"node_modules/ansi-font/index.js":[function(require,module,exports) {
var define;
/* vim:set ts=2 sw=2 sts=2 expandtab */

/*jshint asi: true newcap: true undef: true es5: true node: true devel: true
         forin: false */

/*global define: true */
(typeof define === "undefined" ? function ($) {
  $(require, exports, module);
} : define)(function (require, exports, module, undefined) {
  "use strict";

  var ESC = '\u001b['; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

  var SGR_STYLES = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    blink: [5, 25],
    inverse: [7, 27],
    frame: [51, 54],
    encircle: [52, 54],
    overline: [53, 55],
    strikethrough: [53, 55]
  };
  var SGR_COLORS = {};
  var SGR_BACKROUNDS = {};
  var COLORS = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
  COLORS.forEach(function (color, index) {
    SGR_COLORS[color] = [30 + index, 39];
    SGR_BACKROUNDS[color] = [40 + index, 49];
  });

  function sgr(options, id, message) {
    var params = options[id];
    if (params) message = ESC + params[0] + 'm' + message + ESC + params[1] + 'm';
    return message;
  }

  exports.style = sgr.bind(null, SGR_STYLES);
  exports.color = sgr.bind(null, SGR_COLORS);
  exports.background = sgr.bind(null, SGR_BACKROUNDS);
  Object.keys(SGR_STYLES).forEach(function (name) {
    exports[name] = exports.style.bind(null, name);
  });
  Object.keys(SGR_COLORS).forEach(function (name) {
    exports[name] = exports.color.bind(null, name);
    exports['bg' + name] = exports.background.bind(null, name);
  });
  var index = 0;

  while (index++ < 256) {
    SGR_COLORS[index] = ['38;5;' + index, 39];
    SGR_BACKROUNDS[index] = ['48;5;' + index, 39];
  }
});
},{}],"node_modules/test/logger.js":[function(require,module,exports) {
"use strict";

var font = require("ansi-font/index")
var toSource = require("./utils").source

var INDENT = "  "

var report = console.log.bind(console)

function passed(message) {
  return font.green("\u2713 " + message)
}
function failed(message) {
  return font.red("\u2717 " + message)
}
function errored(message) {
  return font.magenta("\u26A1 " + message)
}

function indent(message, indentation) {
  indentation = undefined === indentation ? INDENT : indentation
  message = message || ""
  return message.replace(/^/gm, indentation)
}

function Logger(options) {
  if (!(this instanceof Logger)) return new Logger(options)

  options = options || {}
  var print = options.print || report
  var indentation = options.indentation || ""
  var results = options.results || { passes: [], fails: [], errors: [] }
  this.passes = results.passes
  this.fails = results.fails
  this.errors = results.errors
  results = this


  this.pass = function pass(message) {
    results.passes.push(message)
    print(indent(passed(message), indentation))
  }

  this.fail = function fail(error) {
    results.fails.push(error)
    var message = error.message
    if ("expected" in error)
      message += "\n  Expected: \n" + toSource(error.expected, INDENT)
    if ("actual" in error)
      message += "\n  Actual: \n" + toSource(error.actual, INDENT)
    if ("operator" in error)
      message += "\n  Operator: " + toSource(error.operator, INDENT)
    print(indent(failed(message), indentation))
  }

  this.error = function error(exception) {
    results.errors.push(exception)
    print(indent(errored(exception.stack || exception), indentation))
  }

  this.section = function section(title) {
    print(indent(title, indentation))
    return new Logger({
      print: print,
      indentation: indent(indentation),
      results: results
    })
  }

  this.report = function report() {
    print("Passed:" + results.passes.length +
          " Failed:" + results.fails.length +
          " Errors:" + results.errors.length)
  }
}

Logger.Logger = Logger
module.exports = Logger

},{"ansi-font/index":"node_modules/ansi-font/index.js","./utils":"node_modules/test/utils.js"}],"../../../.nvm/versions/node/v12.18.2/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/test/test.js":[function(require,module,exports) {
var process = require("process");
"use strict";

var Assert = require("./assert").Assert
var Logger = require("./logger").Logger


var ERR_COMPLETED_ASSERT = "Assert in completed test"
var ERR_COMPLETED_COMPLETE = "Attemt to complete test more then one times"
var ERR_EXPECT = "AssertionError"


/**
 * Creates a test function.
 */
function Test(name, unit, logger, Assert) {
  var isSync = unit.length <= 1
  var isFailFast = !unit.length
  var isDone = false
  return function test(next) {
    logger = logger.section(name)
    var assert = Assert(logger)
    assert.end = function end() {
      if (isDone) return logger.error(Error(ERR_COMPLETED_COMPLETE))
      isDone = true
      next()
    }

    try {
      var result = unit(assert, assert.end)
      // If it"s async test that returns a promise.
      if (result && typeof(result.then) === "function") {
        result.then(function passed() {
          logger.pass("passed")
          assert.end()
        }, function failed(reason) {
          logger.fail(reason)
          assert.end()
        })
      } else {
        if (isFailFast) logger.pass("passed")
        if (isSync) assert.end()
      }
    } catch (exception) {
      if (ERR_EXPECT === exception.name) assert.fail(exception)
      else logger.error(exception)
      assert.end()
    }
  }
}

function isTest(name) { return name.indexOf("test") === 0 }

/**
 * Creates a test suite / group. Calling returned function will execute
 * all test in the given suite.
 */
function Suite(name, units, logger, Assert) {
  // Collecting properties that represent test functions or suits.
  var names = Object.keys(units).filter(isTest)
  Assert = units.Assert || Assert
  // Returning a function that executes all test in this suite and all it"s
  // sub-suits.
  return function suite(end) {
    // Chaining test / suits so that each is executed after last is done.
    function next() {
      if (!names.length) return end()
      var name = names.shift()
      var unit = Unit(name, units[name], logger, units.Assert || Assert)
      unit(next)
    }
    next((logger = logger.section(name)))
  }
}
function Unit(name, units, logger, Assert) {
  return typeof(units) === "function" ? Test(name, units, logger, Assert)
                                      : Suite(name, units, logger, Assert)
}


/**
 * Test runner function.
 */
exports.run = function run(units, logger) {
  var exit = logger ? false : true
  logger = logger || new Logger()
  var unit = Unit("Running all tests:", units, logger, Assert)
  unit(function done() {
    logger.report()
    var failed = logger.errors.length !== 0 || logger.fails.length !== 0
    // Exit only if `process.exit` exist and if no logger was provided.
    if (exit && process.exit) process.exit(failed ? 1 : 0)
  })
}

},{"./assert":"node_modules/test/assert.js","./logger":"node_modules/test/logger.js","process":"../../../.nvm/versions/node/v12.18.2/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../../.nvm/versions/node/v12.18.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61809" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v12.18.2/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/test/test.js"], null)
//# sourceMappingURL=/test.06925cdc.js.map