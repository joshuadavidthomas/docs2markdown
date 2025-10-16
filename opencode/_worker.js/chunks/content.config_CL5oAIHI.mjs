globalThis.process ??= {}; globalThis.process.env ??= {};
import { m as pLimit, o as objectType, c as stringType, a as unionType, q as arrayType, d as recordType, t as anyType, v as literalType, b as booleanType, w as functionType, x as tupleType, y as unknownType, C as CONTENT_LAYER_TYPE, j as getCollectionPathFromRoot, z as defineCollection } from './translations_DJ110TSw.mjs';
import path$1, { relative as relative$1 } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { au as commonjsGlobal, av as getDefaultExportFromCjs, o as bold, a1 as green } from './astro/server_BfFDGVc7.mjs';
import './../xxhash.1y1qkds.wasm';
import { s as slash } from './path_B1fMePyo.mjs';
import path, { sep, basename, dirname, resolve, normalize, relative, posix } from 'path';
import './_astro_assets_DOn0VAFB.mjs';
import { existsSync, promises } from 'node:fs';
import * as nativeFs from 'fs';
import nativeFs__default from 'fs';
import { createRequire } from 'module';
import { d as docsSchema } from './_id__DoQ-35-t.mjs';

/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


var isNothing_1      = isNothing;
var isObject_1       = isObject;
var toArray_1        = toArray;
var repeat_1         = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1         = extend;

var common = {
	isNothing: isNothing_1,
	isObject: isObject_1,
	toArray: toArray_1,
	repeat: repeat_1,
	isNegativeZero: isNegativeZero_1,
	extend: extend_1
};

// YAML error class. http://stackoverflow.com/questions/8458984


function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException$1(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;


YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


var exception = YAMLException$1;

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type$1(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.options       = options; // keep original options in case user wants to extend this type later
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

var type = Type$1;

/*eslint-disable max-len*/





function compileList(schema, name) {
  var result = [];

  schema[name].forEach(function (currentType) {
    var newIndex = result.length;

    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        newIndex = previousIndex;
      }
    });

    result[newIndex] = currentType;
  });

  return result;
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema$1(definition) {
  return this.extend(definition);
}


Schema$1.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type$1.multi) {
      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema$1.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit');
  result.compiledExplicit = compileList(result, 'explicit');
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


var schema = Schema$1;

var str = new type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});

var seq = new type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});

var map = new type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});

var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

var _null = new type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

var bool = new type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

var int = new type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

var float = new type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});

var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});

var core = json;

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

var timestamp = new type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

var merge = new type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});

/*eslint-disable no-bitwise*/





// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

var binary = new type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});

var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString$2.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

var omap = new type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});

var _toString$1 = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString$1.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

var pairs = new type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});

var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

var set = new type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});

core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}

// This module is generated by `script/`.
/* eslint-disable no-control-regex, no-misleading-character-class, no-useless-escape */
const regex = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;

/**
 * Generate a slug.
 *
 * Does not track previously generated slugs: repeated calls with the same value
 * will result in the exact same slug.
 * Use the `GithubSlugger` class to get unique slugs.
 *
 * @param  {string} value
 *   String of text to slugify
 * @param  {boolean} [maintainCase=false]
 *   Keep the current case, otherwise make all lowercase
 * @return {string}
 *   A unique slug string
 */
function slug (value, maintainCase) {
  if (typeof value !== 'string') return ''
  value = value.toLowerCase();
  return value.replace(regex, '').replace(/ /g, '-')
}

var prism = {exports: {}};

var hasRequiredPrism;

function requirePrism () {
	if (hasRequiredPrism) return prism.exports;
	hasRequiredPrism = 1;
	(function (module) {
		/* **********************************************
		     Begin prism-core.js
		********************************************** */

		/// <reference lib="WebWorker"/>

		var _self = (typeof window !== 'undefined')
			? window   // if in browser
			: (
				(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
					? self // if in worker
					: {}   // if in node js
			);

		/**
		 * Prism: Lightweight, robust, elegant syntax highlighting
		 *
		 * @license MIT <https://opensource.org/licenses/MIT>
		 * @author Lea Verou <https://lea.verou.me>
		 * @namespace
		 * @public
		 */
		var Prism = (function (_self) {

			// Private helper vars
			var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
			var uniqueId = 0;

			// The grammar object for plaintext
			var plainTextGrammar = {};


			var _ = {
				/**
				 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
				 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
				 * additional languages or plugins yourself.
				 *
				 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
				 *
				 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
				 * empty Prism object into the global scope before loading the Prism script like this:
				 *
				 * ```js
				 * window.Prism = window.Prism || {};
				 * Prism.manual = true;
				 * // add a new <script> to load Prism's script
				 * ```
				 *
				 * @default false
				 * @type {boolean}
				 * @memberof Prism
				 * @public
				 */
				manual: _self.Prism && _self.Prism.manual,
				/**
				 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
				 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
				 * own worker, you don't want it to do this.
				 *
				 * By setting this value to `true`, Prism will not add its own listeners to the worker.
				 *
				 * You obviously have to change this value before Prism executes. To do this, you can add an
				 * empty Prism object into the global scope before loading the Prism script like this:
				 *
				 * ```js
				 * window.Prism = window.Prism || {};
				 * Prism.disableWorkerMessageHandler = true;
				 * // Load Prism's script
				 * ```
				 *
				 * @default false
				 * @type {boolean}
				 * @memberof Prism
				 * @public
				 */
				disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

				/**
				 * A namespace for utility methods.
				 *
				 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
				 * change or disappear at any time.
				 *
				 * @namespace
				 * @memberof Prism
				 */
				util: {
					encode: function encode(tokens) {
						if (tokens instanceof Token) {
							return new Token(tokens.type, encode(tokens.content), tokens.alias);
						} else if (Array.isArray(tokens)) {
							return tokens.map(encode);
						} else {
							return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
						}
					},

					/**
					 * Returns the name of the type of the given value.
					 *
					 * @param {any} o
					 * @returns {string}
					 * @example
					 * type(null)      === 'Null'
					 * type(undefined) === 'Undefined'
					 * type(123)       === 'Number'
					 * type('foo')     === 'String'
					 * type(true)      === 'Boolean'
					 * type([1, 2])    === 'Array'
					 * type({})        === 'Object'
					 * type(String)    === 'Function'
					 * type(/abc+/)    === 'RegExp'
					 */
					type: function (o) {
						return Object.prototype.toString.call(o).slice(8, -1);
					},

					/**
					 * Returns a unique number for the given object. Later calls will still return the same number.
					 *
					 * @param {Object} obj
					 * @returns {number}
					 */
					objId: function (obj) {
						if (!obj['__id']) {
							Object.defineProperty(obj, '__id', { value: ++uniqueId });
						}
						return obj['__id'];
					},

					/**
					 * Creates a deep clone of the given object.
					 *
					 * The main intended use of this function is to clone language definitions.
					 *
					 * @param {T} o
					 * @param {Record<number, any>} [visited]
					 * @returns {T}
					 * @template T
					 */
					clone: function deepClone(o, visited) {
						visited = visited || {};

						var clone; var id;
						switch (_.util.type(o)) {
							case 'Object':
								id = _.util.objId(o);
								if (visited[id]) {
									return visited[id];
								}
								clone = /** @type {Record<string, any>} */ ({});
								visited[id] = clone;

								for (var key in o) {
									if (o.hasOwnProperty(key)) {
										clone[key] = deepClone(o[key], visited);
									}
								}

								return /** @type {any} */ (clone);

							case 'Array':
								id = _.util.objId(o);
								if (visited[id]) {
									return visited[id];
								}
								clone = [];
								visited[id] = clone;

								(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
									clone[i] = deepClone(v, visited);
								});

								return /** @type {any} */ (clone);

							default:
								return o;
						}
					},

					/**
					 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
					 *
					 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
					 *
					 * @param {Element} element
					 * @returns {string}
					 */
					getLanguage: function (element) {
						while (element) {
							var m = lang.exec(element.className);
							if (m) {
								return m[1].toLowerCase();
							}
							element = element.parentElement;
						}
						return 'none';
					},

					/**
					 * Sets the Prism `language-xxxx` class of the given element.
					 *
					 * @param {Element} element
					 * @param {string} language
					 * @returns {void}
					 */
					setLanguage: function (element, language) {
						// remove all `language-xxxx` classes
						// (this might leave behind a leading space)
						element.className = element.className.replace(RegExp(lang, 'gi'), '');

						// add the new `language-xxxx` class
						// (using `classList` will automatically clean up spaces for us)
						element.classList.add('language-' + language);
					},

					/**
					 * Returns the script element that is currently executing.
					 *
					 * This does __not__ work for line script element.
					 *
					 * @returns {HTMLScriptElement | null}
					 */
					currentScript: function () {
						if (typeof document === 'undefined') {
							return null;
						}
						if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */) {
							return /** @type {any} */ (document.currentScript);
						}

						// IE11 workaround
						// we'll get the src of the current script by parsing IE11's error stack trace
						// this will not work for inline scripts

						try {
							throw new Error();
						} catch (err) {
							// Get file src url from stack. Specifically works with the format of stack traces in IE.
							// A stack will look like this:
							//
							// Error
							//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
							//    at Global code (http://localhost/components/prism-core.js:606:1)

							var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
							if (src) {
								var scripts = document.getElementsByTagName('script');
								for (var i in scripts) {
									if (scripts[i].src == src) {
										return scripts[i];
									}
								}
							}
							return null;
						}
					},

					/**
					 * Returns whether a given class is active for `element`.
					 *
					 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
					 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
					 * given class is just the given class with a `no-` prefix.
					 *
					 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
					 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
					 * ancestors have the given class or the negated version of it, then the default activation will be returned.
					 *
					 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
					 * version of it, the class is considered active.
					 *
					 * @param {Element} element
					 * @param {string} className
					 * @param {boolean} [defaultActivation=false]
					 * @returns {boolean}
					 */
					isActive: function (element, className, defaultActivation) {
						var no = 'no-' + className;

						while (element) {
							var classList = element.classList;
							if (classList.contains(className)) {
								return true;
							}
							if (classList.contains(no)) {
								return false;
							}
							element = element.parentElement;
						}
						return !!defaultActivation;
					}
				},

				/**
				 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
				 *
				 * @namespace
				 * @memberof Prism
				 * @public
				 */
				languages: {
					/**
					 * The grammar for plain, unformatted text.
					 */
					plain: plainTextGrammar,
					plaintext: plainTextGrammar,
					text: plainTextGrammar,
					txt: plainTextGrammar,

					/**
					 * Creates a deep copy of the language with the given id and appends the given tokens.
					 *
					 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
					 * will be overwritten at its original position.
					 *
					 * ## Best practices
					 *
					 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
					 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
					 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
					 *
					 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
					 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
					 *
					 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
					 * @param {Grammar} redef The new tokens to append.
					 * @returns {Grammar} The new language created.
					 * @public
					 * @example
					 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
					 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
					 *     // at its original position
					 *     'comment': { ... },
					 *     // CSS doesn't have a 'color' token, so this token will be appended
					 *     'color': /\b(?:red|green|blue)\b/
					 * });
					 */
					extend: function (id, redef) {
						var lang = _.util.clone(_.languages[id]);

						for (var key in redef) {
							lang[key] = redef[key];
						}

						return lang;
					},

					/**
					 * Inserts tokens _before_ another token in a language definition or any other grammar.
					 *
					 * ## Usage
					 *
					 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
					 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
					 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
					 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
					 * this:
					 *
					 * ```js
					 * Prism.languages.markup.style = {
					 *     // token
					 * };
					 * ```
					 *
					 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
					 * before existing tokens. For the CSS example above, you would use it like this:
					 *
					 * ```js
					 * Prism.languages.insertBefore('markup', 'cdata', {
					 *     'style': {
					 *         // token
					 *     }
					 * });
					 * ```
					 *
					 * ## Special cases
					 *
					 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
					 * will be ignored.
					 *
					 * This behavior can be used to insert tokens after `before`:
					 *
					 * ```js
					 * Prism.languages.insertBefore('markup', 'comment', {
					 *     'comment': Prism.languages.markup.comment,
					 *     // tokens after 'comment'
					 * });
					 * ```
					 *
					 * ## Limitations
					 *
					 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
					 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
					 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
					 * deleting properties which is necessary to insert at arbitrary positions.
					 *
					 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
					 * Instead, it will create a new object and replace all references to the target object with the new one. This
					 * can be done without temporarily deleting properties, so the iteration order is well-defined.
					 *
					 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
					 * you hold the target object in a variable, then the value of the variable will not change.
					 *
					 * ```js
					 * var oldMarkup = Prism.languages.markup;
					 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
					 *
					 * assert(oldMarkup !== Prism.languages.markup);
					 * assert(newMarkup === Prism.languages.markup);
					 * ```
					 *
					 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
					 * object to be modified.
					 * @param {string} before The key to insert before.
					 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
					 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
					 * object to be modified.
					 *
					 * Defaults to `Prism.languages`.
					 * @returns {Grammar} The new grammar object.
					 * @public
					 */
					insertBefore: function (inside, before, insert, root) {
						root = root || /** @type {any} */ (_.languages);
						var grammar = root[inside];
						/** @type {Grammar} */
						var ret = {};

						for (var token in grammar) {
							if (grammar.hasOwnProperty(token)) {

								if (token == before) {
									for (var newToken in insert) {
										if (insert.hasOwnProperty(newToken)) {
											ret[newToken] = insert[newToken];
										}
									}
								}

								// Do not insert token which also occur in insert. See #1525
								if (!insert.hasOwnProperty(token)) {
									ret[token] = grammar[token];
								}
							}
						}

						var old = root[inside];
						root[inside] = ret;

						// Update references in other language definitions
						_.languages.DFS(_.languages, function (key, value) {
							if (value === old && key != inside) {
								this[key] = ret;
							}
						});

						return ret;
					},

					// Traverse a language definition with Depth First Search
					DFS: function DFS(o, callback, type, visited) {
						visited = visited || {};

						var objId = _.util.objId;

						for (var i in o) {
							if (o.hasOwnProperty(i)) {
								callback.call(o, i, o[i], type || i);

								var property = o[i];
								var propertyType = _.util.type(property);

								if (propertyType === 'Object' && !visited[objId(property)]) {
									visited[objId(property)] = true;
									DFS(property, callback, null, visited);
								} else if (propertyType === 'Array' && !visited[objId(property)]) {
									visited[objId(property)] = true;
									DFS(property, callback, i, visited);
								}
							}
						}
					}
				},

				plugins: {},

				/**
				 * This is the most high-level function in Prism’s API.
				 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
				 * each one of them.
				 *
				 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
				 *
				 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
				 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
				 * @memberof Prism
				 * @public
				 */
				highlightAll: function (async, callback) {
					_.highlightAllUnder(document, async, callback);
				},

				/**
				 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
				 * {@link Prism.highlightElement} on each one of them.
				 *
				 * The following hooks will be run:
				 * 1. `before-highlightall`
				 * 2. `before-all-elements-highlight`
				 * 3. All hooks of {@link Prism.highlightElement} for each element.
				 *
				 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
				 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
				 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
				 * @memberof Prism
				 * @public
				 */
				highlightAllUnder: function (container, async, callback) {
					var env = {
						callback: callback,
						container: container,
						selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};

					_.hooks.run('before-highlightall', env);

					env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

					_.hooks.run('before-all-elements-highlight', env);

					for (var i = 0, element; (element = env.elements[i++]);) {
						_.highlightElement(element, async === true, env.callback);
					}
				},

				/**
				 * Highlights the code inside a single element.
				 *
				 * The following hooks will be run:
				 * 1. `before-sanity-check`
				 * 2. `before-highlight`
				 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
				 * 4. `before-insert`
				 * 5. `after-highlight`
				 * 6. `complete`
				 *
				 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
				 * the element's language.
				 *
				 * @param {Element} element The element containing the code.
				 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
				 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
				 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
				 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
				 *
				 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
				 * asynchronous highlighting to work. You can build your own bundle on the
				 * [Download page](https://prismjs.com/download.html).
				 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
				 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
				 * @memberof Prism
				 * @public
				 */
				highlightElement: function (element, async, callback) {
					// Find language
					var language = _.util.getLanguage(element);
					var grammar = _.languages[language];

					// Set language on the element, if not present
					_.util.setLanguage(element, language);

					// Set language on the parent, for styling
					var parent = element.parentElement;
					if (parent && parent.nodeName.toLowerCase() === 'pre') {
						_.util.setLanguage(parent, language);
					}

					var code = element.textContent;

					var env = {
						element: element,
						language: language,
						grammar: grammar,
						code: code
					};

					function insertHighlightedCode(highlightedCode) {
						env.highlightedCode = highlightedCode;

						_.hooks.run('before-insert', env);

						env.element.innerHTML = env.highlightedCode;

						_.hooks.run('after-highlight', env);
						_.hooks.run('complete', env);
						callback && callback.call(env.element);
					}

					_.hooks.run('before-sanity-check', env);

					// plugins may change/add the parent/element
					parent = env.element.parentElement;
					if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
						parent.setAttribute('tabindex', '0');
					}

					if (!env.code) {
						_.hooks.run('complete', env);
						callback && callback.call(env.element);
						return;
					}

					_.hooks.run('before-highlight', env);

					if (!env.grammar) {
						insertHighlightedCode(_.util.encode(env.code));
						return;
					}

					if (async && _self.Worker) {
						var worker = new Worker(_.filename);

						worker.onmessage = function (evt) {
							insertHighlightedCode(evt.data);
						};

						worker.postMessage(JSON.stringify({
							language: env.language,
							code: env.code,
							immediateClose: true
						}));
					} else {
						insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
					}
				},

				/**
				 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
				 * and the language definitions to use, and returns a string with the HTML produced.
				 *
				 * The following hooks will be run:
				 * 1. `before-tokenize`
				 * 2. `after-tokenize`
				 * 3. `wrap`: On each {@link Token}.
				 *
				 * @param {string} text A string with the code to be highlighted.
				 * @param {Grammar} grammar An object containing the tokens to use.
				 *
				 * Usually a language definition like `Prism.languages.markup`.
				 * @param {string} language The name of the language definition passed to `grammar`.
				 * @returns {string} The highlighted HTML.
				 * @memberof Prism
				 * @public
				 * @example
				 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
				 */
				highlight: function (text, grammar, language) {
					var env = {
						code: text,
						grammar: grammar,
						language: language
					};
					_.hooks.run('before-tokenize', env);
					if (!env.grammar) {
						throw new Error('The language "' + env.language + '" has no grammar.');
					}
					env.tokens = _.tokenize(env.code, env.grammar);
					_.hooks.run('after-tokenize', env);
					return Token.stringify(_.util.encode(env.tokens), env.language);
				},

				/**
				 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
				 * and the language definitions to use, and returns an array with the tokenized code.
				 *
				 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
				 *
				 * This method could be useful in other contexts as well, as a very crude parser.
				 *
				 * @param {string} text A string with the code to be highlighted.
				 * @param {Grammar} grammar An object containing the tokens to use.
				 *
				 * Usually a language definition like `Prism.languages.markup`.
				 * @returns {TokenStream} An array of strings and tokens, a token stream.
				 * @memberof Prism
				 * @public
				 * @example
				 * let code = `var foo = 0;`;
				 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
				 * tokens.forEach(token => {
				 *     if (token instanceof Prism.Token && token.type === 'number') {
				 *         console.log(`Found numeric literal: ${token.content}`);
				 *     }
				 * });
				 */
				tokenize: function (text, grammar) {
					var rest = grammar.rest;
					if (rest) {
						for (var token in rest) {
							grammar[token] = rest[token];
						}

						delete grammar.rest;
					}

					var tokenList = new LinkedList();
					addAfter(tokenList, tokenList.head, text);

					matchGrammar(text, tokenList, grammar, tokenList.head, 0);

					return toArray(tokenList);
				},

				/**
				 * @namespace
				 * @memberof Prism
				 * @public
				 */
				hooks: {
					all: {},

					/**
					 * Adds the given callback to the list of callbacks for the given hook.
					 *
					 * The callback will be invoked when the hook it is registered for is run.
					 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
					 *
					 * One callback function can be registered to multiple hooks and the same hook multiple times.
					 *
					 * @param {string} name The name of the hook.
					 * @param {HookCallback} callback The callback function which is given environment variables.
					 * @public
					 */
					add: function (name, callback) {
						var hooks = _.hooks.all;

						hooks[name] = hooks[name] || [];

						hooks[name].push(callback);
					},

					/**
					 * Runs a hook invoking all registered callbacks with the given environment variables.
					 *
					 * Callbacks will be invoked synchronously and in the order in which they were registered.
					 *
					 * @param {string} name The name of the hook.
					 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
					 * @public
					 */
					run: function (name, env) {
						var callbacks = _.hooks.all[name];

						if (!callbacks || !callbacks.length) {
							return;
						}

						for (var i = 0, callback; (callback = callbacks[i++]);) {
							callback(env);
						}
					}
				},

				Token: Token
			};
			_self.Prism = _;


			// Typescript note:
			// The following can be used to import the Token type in JSDoc:
			//
			//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

			/**
			 * Creates a new token.
			 *
			 * @param {string} type See {@link Token#type type}
			 * @param {string | TokenStream} content See {@link Token#content content}
			 * @param {string|string[]} [alias] The alias(es) of the token.
			 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
			 * @class
			 * @global
			 * @public
			 */
			function Token(type, content, alias, matchedStr) {
				/**
				 * The type of the token.
				 *
				 * This is usually the key of a pattern in a {@link Grammar}.
				 *
				 * @type {string}
				 * @see GrammarToken
				 * @public
				 */
				this.type = type;
				/**
				 * The strings or tokens contained by this token.
				 *
				 * This will be a token stream if the pattern matched also defined an `inside` grammar.
				 *
				 * @type {string | TokenStream}
				 * @public
				 */
				this.content = content;
				/**
				 * The alias(es) of the token.
				 *
				 * @type {string|string[]}
				 * @see GrammarToken
				 * @public
				 */
				this.alias = alias;
				// Copy of the full string this token was created from
				this.length = (matchedStr || '').length | 0;
			}

			/**
			 * A token stream is an array of strings and {@link Token Token} objects.
			 *
			 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
			 * them.
			 *
			 * 1. No adjacent strings.
			 * 2. No empty strings.
			 *
			 *    The only exception here is the token stream that only contains the empty string and nothing else.
			 *
			 * @typedef {Array<string | Token>} TokenStream
			 * @global
			 * @public
			 */

			/**
			 * Converts the given token or token stream to an HTML representation.
			 *
			 * The following hooks will be run:
			 * 1. `wrap`: On each {@link Token}.
			 *
			 * @param {string | Token | TokenStream} o The token or token stream to be converted.
			 * @param {string} language The name of current language.
			 * @returns {string} The HTML representation of the token or token stream.
			 * @memberof Token
			 * @static
			 */
			Token.stringify = function stringify(o, language) {
				if (typeof o == 'string') {
					return o;
				}
				if (Array.isArray(o)) {
					var s = '';
					o.forEach(function (e) {
						s += stringify(e, language);
					});
					return s;
				}

				var env = {
					type: o.type,
					content: stringify(o.content, language),
					tag: 'span',
					classes: ['token', o.type],
					attributes: {},
					language: language
				};

				var aliases = o.alias;
				if (aliases) {
					if (Array.isArray(aliases)) {
						Array.prototype.push.apply(env.classes, aliases);
					} else {
						env.classes.push(aliases);
					}
				}

				_.hooks.run('wrap', env);

				var attributes = '';
				for (var name in env.attributes) {
					attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
				}

				return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
			};

			/**
			 * @param {RegExp} pattern
			 * @param {number} pos
			 * @param {string} text
			 * @param {boolean} lookbehind
			 * @returns {RegExpExecArray | null}
			 */
			function matchPattern(pattern, pos, text, lookbehind) {
				pattern.lastIndex = pos;
				var match = pattern.exec(text);
				if (match && lookbehind && match[1]) {
					// change the match to remove the text matched by the Prism lookbehind group
					var lookbehindLength = match[1].length;
					match.index += lookbehindLength;
					match[0] = match[0].slice(lookbehindLength);
				}
				return match;
			}

			/**
			 * @param {string} text
			 * @param {LinkedList<string | Token>} tokenList
			 * @param {any} grammar
			 * @param {LinkedListNode<string | Token>} startNode
			 * @param {number} startPos
			 * @param {RematchOptions} [rematch]
			 * @returns {void}
			 * @private
			 *
			 * @typedef RematchOptions
			 * @property {string} cause
			 * @property {number} reach
			 */
			function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
				for (var token in grammar) {
					if (!grammar.hasOwnProperty(token) || !grammar[token]) {
						continue;
					}

					var patterns = grammar[token];
					patterns = Array.isArray(patterns) ? patterns : [patterns];

					for (var j = 0; j < patterns.length; ++j) {
						if (rematch && rematch.cause == token + ',' + j) {
							return;
						}

						var patternObj = patterns[j];
						var inside = patternObj.inside;
						var lookbehind = !!patternObj.lookbehind;
						var greedy = !!patternObj.greedy;
						var alias = patternObj.alias;

						if (greedy && !patternObj.pattern.global) {
							// Without the global flag, lastIndex won't work
							var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
							patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
						}

						/** @type {RegExp} */
						var pattern = patternObj.pattern || patternObj;

						for ( // iterate the token list and keep track of the current token/string position
							var currentNode = startNode.next, pos = startPos;
							currentNode !== tokenList.tail;
							pos += currentNode.value.length, currentNode = currentNode.next
						) {

							if (rematch && pos >= rematch.reach) {
								break;
							}

							var str = currentNode.value;

							if (tokenList.length > text.length) {
								// Something went terribly wrong, ABORT, ABORT!
								return;
							}

							if (str instanceof Token) {
								continue;
							}

							var removeCount = 1; // this is the to parameter of removeBetween
							var match;

							if (greedy) {
								match = matchPattern(pattern, pos, text, lookbehind);
								if (!match || match.index >= text.length) {
									break;
								}

								var from = match.index;
								var to = match.index + match[0].length;
								var p = pos;

								// find the node that contains the match
								p += currentNode.value.length;
								while (from >= p) {
									currentNode = currentNode.next;
									p += currentNode.value.length;
								}
								// adjust pos (and p)
								p -= currentNode.value.length;
								pos = p;

								// the current node is a Token, then the match starts inside another Token, which is invalid
								if (currentNode.value instanceof Token) {
									continue;
								}

								// find the last node which is affected by this match
								for (
									var k = currentNode;
									k !== tokenList.tail && (p < to || typeof k.value === 'string');
									k = k.next
								) {
									removeCount++;
									p += k.value.length;
								}
								removeCount--;

								// replace with the new match
								str = text.slice(pos, p);
								match.index -= pos;
							} else {
								match = matchPattern(pattern, 0, str, lookbehind);
								if (!match) {
									continue;
								}
							}

							// eslint-disable-next-line no-redeclare
							var from = match.index;
							var matchStr = match[0];
							var before = str.slice(0, from);
							var after = str.slice(from + matchStr.length);

							var reach = pos + str.length;
							if (rematch && reach > rematch.reach) {
								rematch.reach = reach;
							}

							var removeFrom = currentNode.prev;

							if (before) {
								removeFrom = addAfter(tokenList, removeFrom, before);
								pos += before.length;
							}

							removeRange(tokenList, removeFrom, removeCount);

							var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
							currentNode = addAfter(tokenList, removeFrom, wrapped);

							if (after) {
								addAfter(tokenList, currentNode, after);
							}

							if (removeCount > 1) {
								// at least one Token object was removed, so we have to do some rematching
								// this can only happen if the current pattern is greedy

								/** @type {RematchOptions} */
								var nestedRematch = {
									cause: token + ',' + j,
									reach: reach
								};
								matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

								// the reach might have been extended because of the rematching
								if (rematch && nestedRematch.reach > rematch.reach) {
									rematch.reach = nestedRematch.reach;
								}
							}
						}
					}
				}
			}

			/**
			 * @typedef LinkedListNode
			 * @property {T} value
			 * @property {LinkedListNode<T> | null} prev The previous node.
			 * @property {LinkedListNode<T> | null} next The next node.
			 * @template T
			 * @private
			 */

			/**
			 * @template T
			 * @private
			 */
			function LinkedList() {
				/** @type {LinkedListNode<T>} */
				var head = { value: null, prev: null, next: null };
				/** @type {LinkedListNode<T>} */
				var tail = { value: null, prev: head, next: null };
				head.next = tail;

				/** @type {LinkedListNode<T>} */
				this.head = head;
				/** @type {LinkedListNode<T>} */
				this.tail = tail;
				this.length = 0;
			}

			/**
			 * Adds a new node with the given value to the list.
			 *
			 * @param {LinkedList<T>} list
			 * @param {LinkedListNode<T>} node
			 * @param {T} value
			 * @returns {LinkedListNode<T>} The added node.
			 * @template T
			 */
			function addAfter(list, node, value) {
				// assumes that node != list.tail && values.length >= 0
				var next = node.next;

				var newNode = { value: value, prev: node, next: next };
				node.next = newNode;
				next.prev = newNode;
				list.length++;

				return newNode;
			}
			/**
			 * Removes `count` nodes after the given node. The given node will not be removed.
			 *
			 * @param {LinkedList<T>} list
			 * @param {LinkedListNode<T>} node
			 * @param {number} count
			 * @template T
			 */
			function removeRange(list, node, count) {
				var next = node.next;
				for (var i = 0; i < count && next !== list.tail; i++) {
					next = next.next;
				}
				node.next = next;
				next.prev = node;
				list.length -= i;
			}
			/**
			 * @param {LinkedList<T>} list
			 * @returns {T[]}
			 * @template T
			 */
			function toArray(list) {
				var array = [];
				var node = list.head.next;
				while (node !== list.tail) {
					array.push(node.value);
					node = node.next;
				}
				return array;
			}


			if (!_self.document) {
				if (!_self.addEventListener) {
					// in Node.js
					return _;
				}

				if (!_.disableWorkerMessageHandler) {
					// In worker
					_self.addEventListener('message', function (evt) {
						var message = JSON.parse(evt.data);
						var lang = message.language;
						var code = message.code;
						var immediateClose = message.immediateClose;

						_self.postMessage(_.highlight(code, _.languages[lang], lang));
						if (immediateClose) {
							_self.close();
						}
					}, false);
				}

				return _;
			}

			// Get current script and highlight
			var script = _.util.currentScript();

			if (script) {
				_.filename = script.src;

				if (script.hasAttribute('data-manual')) {
					_.manual = true;
				}
			}

			function highlightAutomaticallyCallback() {
				if (!_.manual) {
					_.highlightAll();
				}
			}

			if (!_.manual) {
				// If the document state is "loading", then we'll use DOMContentLoaded.
				// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
				// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
				// might take longer one animation frame to execute which can create a race condition where only some plugins have
				// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
				// See https://github.com/PrismJS/prism/issues/2102
				var readyState = document.readyState;
				if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
					document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
				} else {
					if (window.requestAnimationFrame) {
						window.requestAnimationFrame(highlightAutomaticallyCallback);
					} else {
						window.setTimeout(highlightAutomaticallyCallback, 16);
					}
				}
			}

			return _;

		}(_self));

		if (module.exports) {
			module.exports = Prism;
		}

		// hack for components to work correctly in node.js
		if (typeof commonjsGlobal !== 'undefined') {
			commonjsGlobal.Prism = Prism;
		}

		// some additional documentation/types

		/**
		 * The expansion of a simple `RegExp` literal to support additional properties.
		 *
		 * @typedef GrammarToken
		 * @property {RegExp} pattern The regular expression of the token.
		 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
		 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
		 * @property {boolean} [greedy=false] Whether the token is greedy.
		 * @property {string|string[]} [alias] An optional alias or list of aliases.
		 * @property {Grammar} [inside] The nested grammar of this token.
		 *
		 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
		 *
		 * This can be used to make nested and even recursive language definitions.
		 *
		 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
		 * each another.
		 * @global
		 * @public
		 */

		/**
		 * @typedef Grammar
		 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
		 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
		 * @global
		 * @public
		 */

		/**
		 * A function which will invoked after an element was successfully highlighted.
		 *
		 * @callback HighlightCallback
		 * @param {Element} element The element successfully highlighted.
		 * @returns {void}
		 * @global
		 * @public
		 */

		/**
		 * @callback HookCallback
		 * @param {Object<string, any>} env The environment variables of the hook.
		 * @returns {void}
		 * @global
		 * @public
		 */


		/* **********************************************
		     Begin prism-markup.js
		********************************************** */

		Prism.languages.markup = {
			'comment': {
				pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
				greedy: true
			},
			'prolog': {
				pattern: /<\?[\s\S]+?\?>/,
				greedy: true
			},
			'doctype': {
				// https://www.w3.org/TR/xml/#NT-doctypedecl
				pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
				greedy: true,
				inside: {
					'internal-subset': {
						pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
						lookbehind: true,
						greedy: true,
						inside: null // see below
					},
					'string': {
						pattern: /"[^"]*"|'[^']*'/,
						greedy: true
					},
					'punctuation': /^<!|>$|[[\]]/,
					'doctype-tag': /^DOCTYPE/i,
					'name': /[^\s<>'"]+/
				}
			},
			'cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				greedy: true
			},
			'tag': {
				pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
				greedy: true,
				inside: {
					'tag': {
						pattern: /^<\/?[^\s>\/]+/,
						inside: {
							'punctuation': /^<\/?/,
							'namespace': /^[^\s>\/:]+:/
						}
					},
					'special-attr': [],
					'attr-value': {
						pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
						inside: {
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								{
									pattern: /^(\s*)["']|["']$/,
									lookbehind: true
								}
							]
						}
					},
					'punctuation': /\/?>/,
					'attr-name': {
						pattern: /[^\s>\/]+/,
						inside: {
							'namespace': /^[^\s>\/:]+:/
						}
					}

				}
			},
			'entity': [
				{
					pattern: /&[\da-z]{1,8};/i,
					alias: 'named-entity'
				},
				/&#x?[\da-f]{1,8};/i
			]
		};

		Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
			Prism.languages.markup['entity'];
		Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

		// Plugin to make entity title show the real entity, idea by Roman Komarov
		Prism.hooks.add('wrap', function (env) {

			if (env.type === 'entity') {
				env.attributes['title'] = env.content.replace(/&amp;/, '&');
			}
		});

		Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
			/**
			 * Adds an inlined language to markup.
			 *
			 * An example of an inlined language is CSS with `<style>` tags.
			 *
			 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
			 * case insensitive.
			 * @param {string} lang The language key.
			 * @example
			 * addInlined('style', 'css');
			 */
			value: function addInlined(tagName, lang) {
				var includedCdataInside = {};
				includedCdataInside['language-' + lang] = {
					pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
					lookbehind: true,
					inside: Prism.languages[lang]
				};
				includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

				var inside = {
					'included-cdata': {
						pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
						inside: includedCdataInside
					}
				};
				inside['language-' + lang] = {
					pattern: /[\s\S]+/,
					inside: Prism.languages[lang]
				};

				var def = {};
				def[tagName] = {
					pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
					lookbehind: true,
					greedy: true,
					inside: inside
				};

				Prism.languages.insertBefore('markup', 'cdata', def);
			}
		});
		Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
			/**
			 * Adds an pattern to highlight languages embedded in HTML attributes.
			 *
			 * An example of an inlined language is CSS with `style` attributes.
			 *
			 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
			 * case insensitive.
			 * @param {string} lang The language key.
			 * @example
			 * addAttribute('style', 'css');
			 */
			value: function (attrName, lang) {
				Prism.languages.markup.tag.inside['special-attr'].push({
					pattern: RegExp(
						/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
						'i'
					),
					lookbehind: true,
					inside: {
						'attr-name': /^[^\s=]+/,
						'attr-value': {
							pattern: /=[\s\S]+/,
							inside: {
								'value': {
									pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
									lookbehind: true,
									alias: [lang, 'language-' + lang],
									inside: Prism.languages[lang]
								},
								'punctuation': [
									{
										pattern: /^=/,
										alias: 'attr-equals'
									},
									/"|'/
								]
							}
						}
					}
				});
			}
		});

		Prism.languages.html = Prism.languages.markup;
		Prism.languages.mathml = Prism.languages.markup;
		Prism.languages.svg = Prism.languages.markup;

		Prism.languages.xml = Prism.languages.extend('markup', {});
		Prism.languages.ssml = Prism.languages.xml;
		Prism.languages.atom = Prism.languages.xml;
		Prism.languages.rss = Prism.languages.xml;


		/* **********************************************
		     Begin prism-css.js
		********************************************** */

		(function (Prism) {

			var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

			Prism.languages.css = {
				'comment': /\/\*[\s\S]*?\*\//,
				'atrule': {
					pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
					inside: {
						'rule': /^@[\w-]+/,
						'selector-function-argument': {
							pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
							lookbehind: true,
							alias: 'selector'
						},
						'keyword': {
							pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
							lookbehind: true
						}
						// See rest below
					}
				},
				'url': {
					// https://drafts.csswg.org/css-values-3/#urls
					pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
					greedy: true,
					inside: {
						'function': /^url/i,
						'punctuation': /^\(|\)$/,
						'string': {
							pattern: RegExp('^' + string.source + '$'),
							alias: 'url'
						}
					}
				},
				'selector': {
					pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
					lookbehind: true
				},
				'string': {
					pattern: string,
					greedy: true
				},
				'property': {
					pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
					lookbehind: true
				},
				'important': /!important\b/i,
				'function': {
					pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
					lookbehind: true
				},
				'punctuation': /[(){};:,]/
			};

			Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

			var markup = Prism.languages.markup;
			if (markup) {
				markup.tag.addInlined('style', 'css');
				markup.tag.addAttribute('style', 'css');
			}

		}(Prism));


		/* **********************************************
		     Begin prism-clike.js
		********************************************** */

		Prism.languages.clike = {
			'comment': [
				{
					pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
					lookbehind: true,
					greedy: true
				},
				{
					pattern: /(^|[^\\:])\/\/.*/,
					lookbehind: true,
					greedy: true
				}
			],
			'string': {
				pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
				greedy: true
			},
			'class-name': {
				pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
				lookbehind: true,
				inside: {
					'punctuation': /[.\\]/
				}
			},
			'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
			'boolean': /\b(?:false|true)\b/,
			'function': /\b\w+(?=\()/,
			'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
			'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
			'punctuation': /[{}[\];(),.:]/
		};


		/* **********************************************
		     Begin prism-javascript.js
		********************************************** */

		Prism.languages.javascript = Prism.languages.extend('clike', {
			'class-name': [
				Prism.languages.clike['class-name'],
				{
					pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
					lookbehind: true
				}
			],
			'keyword': [
				{
					pattern: /((?:^|\})\s*)catch\b/,
					lookbehind: true
				},
				{
					pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
					lookbehind: true
				},
			],
			// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
			'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
			'number': {
				pattern: RegExp(
					/(^|[^\w$])/.source +
					'(?:' +
					(
						// constant
						/NaN|Infinity/.source +
						'|' +
						// binary integer
						/0[bB][01]+(?:_[01]+)*n?/.source +
						'|' +
						// octal integer
						/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
						'|' +
						// hexadecimal integer
						/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
						'|' +
						// decimal bigint
						/\d+(?:_\d+)*n/.source +
						'|' +
						// decimal number (integer or float) but no bigint
						/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
					) +
					')' +
					/(?![\w$])/.source
				),
				lookbehind: true
			},
			'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
		});

		Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

		Prism.languages.insertBefore('javascript', 'keyword', {
			'regex': {
				pattern: RegExp(
					// lookbehind
					// eslint-disable-next-line regexp/no-dupe-characters-character-class
					/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
					// Regex pattern:
					// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
					// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
					// with the only syntax, so we have to define 2 different regex patterns.
					/\//.source +
					'(?:' +
					/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
					'|' +
					// `v` flag syntax. This supports 3 levels of nested character classes.
					/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
					')' +
					// lookahead
					/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
				),
				lookbehind: true,
				greedy: true,
				inside: {
					'regex-source': {
						pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
						lookbehind: true,
						alias: 'language-regex',
						inside: Prism.languages.regex
					},
					'regex-delimiter': /^\/|\/$/,
					'regex-flags': /^[a-z]+$/,
				}
			},
			// This must be declared before keyword because we use "function" inside the look-forward
			'function-variable': {
				pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
				alias: 'function'
			},
			'parameter': [
				{
					pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
					lookbehind: true,
					inside: Prism.languages.javascript
				},
				{
					pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
					lookbehind: true,
					inside: Prism.languages.javascript
				}
			],
			'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
		});

		Prism.languages.insertBefore('javascript', 'string', {
			'hashbang': {
				pattern: /^#!.*/,
				greedy: true,
				alias: 'comment'
			},
			'template-string': {
				pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
				greedy: true,
				inside: {
					'template-punctuation': {
						pattern: /^`|`$/,
						alias: 'string'
					},
					'interpolation': {
						pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
						lookbehind: true,
						inside: {
							'interpolation-punctuation': {
								pattern: /^\$\{|\}$/,
								alias: 'punctuation'
							},
							rest: Prism.languages.javascript
						}
					},
					'string': /[\s\S]+/
				}
			},
			'string-property': {
				pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
				lookbehind: true,
				greedy: true,
				alias: 'property'
			}
		});

		Prism.languages.insertBefore('javascript', 'operator', {
			'literal-property': {
				pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
				lookbehind: true,
				alias: 'property'
			},
		});

		if (Prism.languages.markup) {
			Prism.languages.markup.tag.addInlined('script', 'javascript');

			// add attribute support for all DOM events.
			// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
			Prism.languages.markup.tag.addAttribute(
				/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
				'javascript'
			);
		}

		Prism.languages.js = Prism.languages.javascript;


		/* **********************************************
		     Begin prism-file-highlight.js
		********************************************** */

		(function () {

			if (typeof Prism === 'undefined' || typeof document === 'undefined') {
				return;
			}

			// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
			if (!Element.prototype.matches) {
				Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
			}

			var LOADING_MESSAGE = 'Loading…';
			var FAILURE_MESSAGE = function (status, message) {
				return '✖ Error ' + status + ' while fetching file: ' + message;
			};
			var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

			var EXTENSIONS = {
				'js': 'javascript',
				'py': 'python',
				'rb': 'ruby',
				'ps1': 'powershell',
				'psm1': 'powershell',
				'sh': 'bash',
				'bat': 'batch',
				'h': 'c',
				'tex': 'latex'
			};

			var STATUS_ATTR = 'data-src-status';
			var STATUS_LOADING = 'loading';
			var STATUS_LOADED = 'loaded';
			var STATUS_FAILED = 'failed';

			var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
				+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

			/**
			 * Loads the given file.
			 *
			 * @param {string} src The URL or path of the source file to load.
			 * @param {(result: string) => void} success
			 * @param {(reason: string) => void} error
			 */
			function loadFile(src, success, error) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', src, true);
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						if (xhr.status < 400 && xhr.responseText) {
							success(xhr.responseText);
						} else {
							if (xhr.status >= 400) {
								error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
							} else {
								error(FAILURE_EMPTY_MESSAGE);
							}
						}
					}
				};
				xhr.send(null);
			}

			/**
			 * Parses the given range.
			 *
			 * This returns a range with inclusive ends.
			 *
			 * @param {string | null | undefined} range
			 * @returns {[number, number | undefined] | undefined}
			 */
			function parseRange(range) {
				var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
				if (m) {
					var start = Number(m[1]);
					var comma = m[2];
					var end = m[3];

					if (!comma) {
						return [start, start];
					}
					if (!end) {
						return [start, undefined];
					}
					return [start, Number(end)];
				}
				return undefined;
			}

			Prism.hooks.add('before-highlightall', function (env) {
				env.selector += ', ' + SELECTOR;
			});

			Prism.hooks.add('before-sanity-check', function (env) {
				var pre = /** @type {HTMLPreElement} */ (env.element);
				if (pre.matches(SELECTOR)) {
					env.code = ''; // fast-path the whole thing and go to complete

					pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

					// add code element with loading message
					var code = pre.appendChild(document.createElement('CODE'));
					code.textContent = LOADING_MESSAGE;

					var src = pre.getAttribute('data-src');

					var language = env.language;
					if (language === 'none') {
						// the language might be 'none' because there is no language set;
						// in this case, we want to use the extension as the language
						var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
						language = EXTENSIONS[extension] || extension;
					}

					// set language classes
					Prism.util.setLanguage(code, language);
					Prism.util.setLanguage(pre, language);

					// preload the language
					var autoloader = Prism.plugins.autoloader;
					if (autoloader) {
						autoloader.loadLanguages(language);
					}

					// load file
					loadFile(
						src,
						function (text) {
							// mark as loaded
							pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

							// handle data-range
							var range = parseRange(pre.getAttribute('data-range'));
							if (range) {
								var lines = text.split(/\r\n?|\n/g);

								// the range is one-based and inclusive on both ends
								var start = range[0];
								var end = range[1] == null ? lines.length : range[1];

								if (start < 0) { start += lines.length; }
								start = Math.max(0, Math.min(start - 1, lines.length));
								if (end < 0) { end += lines.length; }
								end = Math.max(0, Math.min(end, lines.length));

								text = lines.slice(start, end).join('\n');

								// add data-start for line numbers
								if (!pre.hasAttribute('data-start')) {
									pre.setAttribute('data-start', String(start + 1));
								}
							}

							// highlight code
							code.textContent = text;
							Prism.highlightElement(code);
						},
						function (error) {
							// mark as failed
							pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

							code.textContent = error;
						}
					);
				}
			});

			Prism.plugins.fileHighlight = {
				/**
				 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
				 *
				 * Note: Elements which are already loaded or currently loading will not be touched by this method.
				 *
				 * @param {ParentNode} [container=document]
				 */
				highlight: function highlight(container) {
					var elements = (container || document).querySelectorAll(SELECTOR);

					for (var i = 0, element; (element = elements[i++]);) {
						Prism.highlightElement(element);
					}
				}
			};

			var logged = false;
			/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
			Prism.fileHighlight = function () {
				if (!logged) {
					console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
					logged = true;
				}
				Prism.plugins.fileHighlight.highlight.apply(this, arguments);
			};

		}()); 
	} (prism));
	return prism.exports;
}

requirePrism();

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var components = {exports: {}};

var hasRequiredComponents$1;

function requireComponents$1 () {
	if (hasRequiredComponents$1) return components.exports;
	hasRequiredComponents$1 = 1;
	(function (module) {
		var components = {"core":{"meta":{"path":"components/prism-core.js","option":"mandatory"},"core":"Core"},"themes":{"meta":{"path":"themes/{id}.css","link":"index.html?theme={id}","exclusive":true},"prism":{"title":"Default","option":"default"},"prism-dark":"Dark","prism-funky":"Funky","prism-okaidia":{"title":"Okaidia","owner":"ocodia"},"prism-twilight":{"title":"Twilight","owner":"remybach"},"prism-coy":{"title":"Coy","owner":"tshedor"},"prism-solarizedlight":{"title":"Solarized Light","owner":"hectormatos2011 "},"prism-tomorrow":{"title":"Tomorrow Night","owner":"Rosey"}},"languages":{"meta":{"path":"components/prism-{id}","noCSS":true,"examplesPath":"examples/prism-{id}","addCheckAll":true},"markup":{"title":"Markup","alias":["html","xml","svg","mathml","ssml","atom","rss"],"aliasTitles":{"html":"HTML","xml":"XML","svg":"SVG","mathml":"MathML","ssml":"SSML","atom":"Atom","rss":"RSS"},"option":"default"},"css":{"title":"CSS","option":"default","modify":"markup"},"clike":{"title":"C-like","option":"default"},"javascript":{"title":"JavaScript","require":"clike","modify":"markup","optional":"regex","alias":"js","option":"default"},"abap":{"title":"ABAP","owner":"dellagustin"},"abnf":{"title":"ABNF","owner":"RunDevelopment"},"actionscript":{"title":"ActionScript","require":"javascript","modify":"markup","owner":"Golmote"},"ada":{"title":"Ada","owner":"Lucretia"},"agda":{"title":"Agda","owner":"xy-ren"},"al":{"title":"AL","owner":"RunDevelopment"},"antlr4":{"title":"ANTLR4","alias":"g4","owner":"RunDevelopment"},"apacheconf":{"title":"Apache Configuration","owner":"GuiTeK"},"apex":{"title":"Apex","require":["clike","sql"],"owner":"RunDevelopment"},"apl":{"title":"APL","owner":"ngn"},"applescript":{"title":"AppleScript","owner":"Golmote"},"aql":{"title":"AQL","owner":"RunDevelopment"},"arduino":{"title":"Arduino","require":"cpp","alias":"ino","owner":"dkern"},"arff":{"title":"ARFF","owner":"Golmote"},"armasm":{"title":"ARM Assembly","alias":"arm-asm","owner":"RunDevelopment"},"arturo":{"title":"Arturo","alias":"art","optional":["bash","css","javascript","markup","markdown","sql"],"owner":"drkameleon"},"asciidoc":{"alias":"adoc","title":"AsciiDoc","owner":"Golmote"},"aspnet":{"title":"ASP.NET (C#)","require":["markup","csharp"],"owner":"nauzilus"},"asm6502":{"title":"6502 Assembly","owner":"kzurawel"},"asmatmel":{"title":"Atmel AVR Assembly","owner":"cerkit"},"autohotkey":{"title":"AutoHotkey","owner":"aviaryan"},"autoit":{"title":"AutoIt","owner":"Golmote"},"avisynth":{"title":"AviSynth","alias":"avs","owner":"Zinfidel"},"avro-idl":{"title":"Avro IDL","alias":"avdl","owner":"RunDevelopment"},"awk":{"title":"AWK","alias":"gawk","aliasTitles":{"gawk":"GAWK"},"owner":"RunDevelopment"},"bash":{"title":"Bash","alias":["sh","shell"],"aliasTitles":{"sh":"Shell","shell":"Shell"},"owner":"zeitgeist87"},"basic":{"title":"BASIC","owner":"Golmote"},"batch":{"title":"Batch","owner":"Golmote"},"bbcode":{"title":"BBcode","alias":"shortcode","aliasTitles":{"shortcode":"Shortcode"},"owner":"RunDevelopment"},"bbj":{"title":"BBj","owner":"hyyan"},"bicep":{"title":"Bicep","owner":"johnnyreilly"},"birb":{"title":"Birb","require":"clike","owner":"Calamity210"},"bison":{"title":"Bison","require":"c","owner":"Golmote"},"bnf":{"title":"BNF","alias":"rbnf","aliasTitles":{"rbnf":"RBNF"},"owner":"RunDevelopment"},"bqn":{"title":"BQN","owner":"yewscion"},"brainfuck":{"title":"Brainfuck","owner":"Golmote"},"brightscript":{"title":"BrightScript","owner":"RunDevelopment"},"bro":{"title":"Bro","owner":"wayward710"},"bsl":{"title":"BSL (1C:Enterprise)","alias":"oscript","aliasTitles":{"oscript":"OneScript"},"owner":"Diversus23"},"c":{"title":"C","require":"clike","owner":"zeitgeist87"},"csharp":{"title":"C#","require":"clike","alias":["cs","dotnet"],"owner":"mvalipour"},"cpp":{"title":"C++","require":"c","owner":"zeitgeist87"},"cfscript":{"title":"CFScript","require":"clike","alias":"cfc","owner":"mjclemente"},"chaiscript":{"title":"ChaiScript","require":["clike","cpp"],"owner":"RunDevelopment"},"cil":{"title":"CIL","owner":"sbrl"},"cilkc":{"title":"Cilk/C","require":"c","alias":"cilk-c","owner":"OpenCilk"},"cilkcpp":{"title":"Cilk/C++","require":"cpp","alias":["cilk-cpp","cilk"],"owner":"OpenCilk"},"clojure":{"title":"Clojure","owner":"troglotit"},"cmake":{"title":"CMake","owner":"mjrogozinski"},"cobol":{"title":"COBOL","owner":"RunDevelopment"},"coffeescript":{"title":"CoffeeScript","require":"javascript","alias":"coffee","owner":"R-osey"},"concurnas":{"title":"Concurnas","alias":"conc","owner":"jasontatton"},"csp":{"title":"Content-Security-Policy","owner":"ScottHelme"},"cooklang":{"title":"Cooklang","owner":"ahue"},"coq":{"title":"Coq","owner":"RunDevelopment"},"crystal":{"title":"Crystal","require":"ruby","owner":"MakeNowJust"},"css-extras":{"title":"CSS Extras","require":"css","modify":"css","owner":"milesj"},"csv":{"title":"CSV","owner":"RunDevelopment"},"cue":{"title":"CUE","owner":"RunDevelopment"},"cypher":{"title":"Cypher","owner":"RunDevelopment"},"d":{"title":"D","require":"clike","owner":"Golmote"},"dart":{"title":"Dart","require":"clike","owner":"Golmote"},"dataweave":{"title":"DataWeave","owner":"machaval"},"dax":{"title":"DAX","owner":"peterbud"},"dhall":{"title":"Dhall","owner":"RunDevelopment"},"diff":{"title":"Diff","owner":"uranusjr"},"django":{"title":"Django/Jinja2","require":"markup-templating","alias":"jinja2","owner":"romanvm"},"dns-zone-file":{"title":"DNS zone file","owner":"RunDevelopment","alias":"dns-zone"},"docker":{"title":"Docker","alias":"dockerfile","owner":"JustinBeckwith"},"dot":{"title":"DOT (Graphviz)","alias":"gv","optional":"markup","owner":"RunDevelopment"},"ebnf":{"title":"EBNF","owner":"RunDevelopment"},"editorconfig":{"title":"EditorConfig","owner":"osipxd"},"eiffel":{"title":"Eiffel","owner":"Conaclos"},"ejs":{"title":"EJS","require":["javascript","markup-templating"],"owner":"RunDevelopment","alias":"eta","aliasTitles":{"eta":"Eta"}},"elixir":{"title":"Elixir","owner":"Golmote"},"elm":{"title":"Elm","owner":"zwilias"},"etlua":{"title":"Embedded Lua templating","require":["lua","markup-templating"],"owner":"RunDevelopment"},"erb":{"title":"ERB","require":["ruby","markup-templating"],"owner":"Golmote"},"erlang":{"title":"Erlang","owner":"Golmote"},"excel-formula":{"title":"Excel Formula","alias":["xlsx","xls"],"owner":"RunDevelopment"},"fsharp":{"title":"F#","require":"clike","owner":"simonreynolds7"},"factor":{"title":"Factor","owner":"catb0t"},"false":{"title":"False","owner":"edukisto"},"firestore-security-rules":{"title":"Firestore security rules","require":"clike","owner":"RunDevelopment"},"flow":{"title":"Flow","require":"javascript","owner":"Golmote"},"fortran":{"title":"Fortran","owner":"Golmote"},"ftl":{"title":"FreeMarker Template Language","require":"markup-templating","owner":"RunDevelopment"},"gml":{"title":"GameMaker Language","alias":"gamemakerlanguage","require":"clike","owner":"LiarOnce"},"gap":{"title":"GAP (CAS)","owner":"RunDevelopment"},"gcode":{"title":"G-code","owner":"RunDevelopment"},"gdscript":{"title":"GDScript","owner":"RunDevelopment"},"gedcom":{"title":"GEDCOM","owner":"Golmote"},"gettext":{"title":"gettext","alias":"po","owner":"RunDevelopment"},"gherkin":{"title":"Gherkin","owner":"hason"},"git":{"title":"Git","owner":"lgiraudel"},"glsl":{"title":"GLSL","require":"c","owner":"Golmote"},"gn":{"title":"GN","alias":"gni","owner":"RunDevelopment"},"linker-script":{"title":"GNU Linker Script","alias":"ld","owner":"RunDevelopment"},"go":{"title":"Go","require":"clike","owner":"arnehormann"},"go-module":{"title":"Go module","alias":"go-mod","owner":"RunDevelopment"},"gradle":{"title":"Gradle","require":"clike","owner":"zeabdelkhalek-badido18"},"graphql":{"title":"GraphQL","optional":"markdown","owner":"Golmote"},"groovy":{"title":"Groovy","require":"clike","owner":"robfletcher"},"haml":{"title":"Haml","require":"ruby","optional":["css","css-extras","coffeescript","erb","javascript","less","markdown","scss","textile"],"owner":"Golmote"},"handlebars":{"title":"Handlebars","require":"markup-templating","alias":["hbs","mustache"],"aliasTitles":{"mustache":"Mustache"},"owner":"Golmote"},"haskell":{"title":"Haskell","alias":"hs","owner":"bholst"},"haxe":{"title":"Haxe","require":"clike","optional":"regex","owner":"Golmote"},"hcl":{"title":"HCL","owner":"outsideris"},"hlsl":{"title":"HLSL","require":"c","owner":"RunDevelopment"},"hoon":{"title":"Hoon","owner":"matildepark"},"http":{"title":"HTTP","optional":["csp","css","hpkp","hsts","javascript","json","markup","uri"],"owner":"danielgtaylor"},"hpkp":{"title":"HTTP Public-Key-Pins","owner":"ScottHelme"},"hsts":{"title":"HTTP Strict-Transport-Security","owner":"ScottHelme"},"ichigojam":{"title":"IchigoJam","owner":"BlueCocoa"},"icon":{"title":"Icon","owner":"Golmote"},"icu-message-format":{"title":"ICU Message Format","owner":"RunDevelopment"},"idris":{"title":"Idris","alias":"idr","owner":"KeenS","require":"haskell"},"ignore":{"title":".ignore","owner":"osipxd","alias":["gitignore","hgignore","npmignore"],"aliasTitles":{"gitignore":".gitignore","hgignore":".hgignore","npmignore":".npmignore"}},"inform7":{"title":"Inform 7","owner":"Golmote"},"ini":{"title":"Ini","owner":"aviaryan"},"io":{"title":"Io","owner":"AlesTsurko"},"j":{"title":"J","owner":"Golmote"},"java":{"title":"Java","require":"clike","owner":"sherblot"},"javadoc":{"title":"JavaDoc","require":["markup","java","javadoclike"],"modify":"java","optional":"scala","owner":"RunDevelopment"},"javadoclike":{"title":"JavaDoc-like","modify":["java","javascript","php"],"owner":"RunDevelopment"},"javastacktrace":{"title":"Java stack trace","owner":"RunDevelopment"},"jexl":{"title":"Jexl","owner":"czosel"},"jolie":{"title":"Jolie","require":"clike","owner":"thesave"},"jq":{"title":"JQ","owner":"RunDevelopment"},"jsdoc":{"title":"JSDoc","require":["javascript","javadoclike","typescript"],"modify":"javascript","optional":["actionscript","coffeescript"],"owner":"RunDevelopment"},"js-extras":{"title":"JS Extras","require":"javascript","modify":"javascript","optional":["actionscript","coffeescript","flow","n4js","typescript"],"owner":"RunDevelopment"},"json":{"title":"JSON","alias":"webmanifest","aliasTitles":{"webmanifest":"Web App Manifest"},"owner":"CupOfTea696"},"json5":{"title":"JSON5","require":"json","owner":"RunDevelopment"},"jsonp":{"title":"JSONP","require":"json","owner":"RunDevelopment"},"jsstacktrace":{"title":"JS stack trace","owner":"sbrl"},"js-templates":{"title":"JS Templates","require":"javascript","modify":"javascript","optional":["css","css-extras","graphql","markdown","markup","sql"],"owner":"RunDevelopment"},"julia":{"title":"Julia","owner":"cdagnino"},"keepalived":{"title":"Keepalived Configure","owner":"dev-itsheng"},"keyman":{"title":"Keyman","owner":"mcdurdin"},"kotlin":{"title":"Kotlin","alias":["kt","kts"],"aliasTitles":{"kts":"Kotlin Script"},"require":"clike","owner":"Golmote"},"kumir":{"title":"KuMir (КуМир)","alias":"kum","owner":"edukisto"},"kusto":{"title":"Kusto","owner":"RunDevelopment"},"latex":{"title":"LaTeX","alias":["tex","context"],"aliasTitles":{"tex":"TeX","context":"ConTeXt"},"owner":"japborst"},"latte":{"title":"Latte","require":["clike","markup-templating","php"],"owner":"nette"},"less":{"title":"Less","require":"css","optional":"css-extras","owner":"Golmote"},"lilypond":{"title":"LilyPond","require":"scheme","alias":"ly","owner":"RunDevelopment"},"liquid":{"title":"Liquid","require":"markup-templating","owner":"cinhtau"},"lisp":{"title":"Lisp","alias":["emacs","elisp","emacs-lisp"],"owner":"JuanCaicedo"},"livescript":{"title":"LiveScript","owner":"Golmote"},"llvm":{"title":"LLVM IR","owner":"porglezomp"},"log":{"title":"Log file","optional":"javastacktrace","owner":"RunDevelopment"},"lolcode":{"title":"LOLCODE","owner":"Golmote"},"lua":{"title":"Lua","owner":"Golmote"},"magma":{"title":"Magma (CAS)","owner":"RunDevelopment"},"makefile":{"title":"Makefile","owner":"Golmote"},"markdown":{"title":"Markdown","require":"markup","optional":"yaml","alias":"md","owner":"Golmote"},"markup-templating":{"title":"Markup templating","require":"markup","owner":"Golmote"},"mata":{"title":"Mata","owner":"RunDevelopment"},"matlab":{"title":"MATLAB","owner":"Golmote"},"maxscript":{"title":"MAXScript","owner":"RunDevelopment"},"mel":{"title":"MEL","owner":"Golmote"},"mermaid":{"title":"Mermaid","owner":"RunDevelopment"},"metafont":{"title":"METAFONT","owner":"LaeriExNihilo"},"mizar":{"title":"Mizar","owner":"Golmote"},"mongodb":{"title":"MongoDB","owner":"airs0urce","require":"javascript"},"monkey":{"title":"Monkey","owner":"Golmote"},"moonscript":{"title":"MoonScript","alias":"moon","owner":"RunDevelopment"},"n1ql":{"title":"N1QL","owner":"TMWilds"},"n4js":{"title":"N4JS","require":"javascript","optional":"jsdoc","alias":"n4jsd","owner":"bsmith-n4"},"nand2tetris-hdl":{"title":"Nand To Tetris HDL","owner":"stephanmax"},"naniscript":{"title":"Naninovel Script","owner":"Elringus","alias":"nani"},"nasm":{"title":"NASM","owner":"rbmj"},"neon":{"title":"NEON","owner":"nette"},"nevod":{"title":"Nevod","owner":"nezaboodka"},"nginx":{"title":"nginx","owner":"volado"},"nim":{"title":"Nim","owner":"Golmote"},"nix":{"title":"Nix","owner":"Golmote"},"nsis":{"title":"NSIS","owner":"idleberg"},"objectivec":{"title":"Objective-C","require":"c","alias":"objc","owner":"uranusjr"},"ocaml":{"title":"OCaml","owner":"Golmote"},"odin":{"title":"Odin","owner":"edukisto"},"opencl":{"title":"OpenCL","require":"c","modify":["c","cpp"],"owner":"Milania1"},"openqasm":{"title":"OpenQasm","alias":"qasm","owner":"RunDevelopment"},"oz":{"title":"Oz","owner":"Golmote"},"parigp":{"title":"PARI/GP","owner":"Golmote"},"parser":{"title":"Parser","require":"markup","owner":"Golmote"},"pascal":{"title":"Pascal","alias":"objectpascal","aliasTitles":{"objectpascal":"Object Pascal"},"owner":"Golmote"},"pascaligo":{"title":"Pascaligo","owner":"DefinitelyNotAGoat"},"psl":{"title":"PATROL Scripting Language","owner":"bertysentry"},"pcaxis":{"title":"PC-Axis","alias":"px","owner":"RunDevelopment"},"peoplecode":{"title":"PeopleCode","alias":"pcode","owner":"RunDevelopment"},"perl":{"title":"Perl","owner":"Golmote"},"php":{"title":"PHP","require":"markup-templating","owner":"milesj"},"phpdoc":{"title":"PHPDoc","require":["php","javadoclike"],"modify":"php","owner":"RunDevelopment"},"php-extras":{"title":"PHP Extras","require":"php","modify":"php","owner":"milesj"},"plant-uml":{"title":"PlantUML","alias":"plantuml","owner":"RunDevelopment"},"plsql":{"title":"PL/SQL","require":"sql","owner":"Golmote"},"powerquery":{"title":"PowerQuery","alias":["pq","mscript"],"owner":"peterbud"},"powershell":{"title":"PowerShell","owner":"nauzilus"},"processing":{"title":"Processing","require":"clike","owner":"Golmote"},"prolog":{"title":"Prolog","owner":"Golmote"},"promql":{"title":"PromQL","owner":"arendjr"},"properties":{"title":".properties","owner":"Golmote"},"protobuf":{"title":"Protocol Buffers","require":"clike","owner":"just-boris"},"pug":{"title":"Pug","require":["markup","javascript"],"optional":["coffeescript","ejs","handlebars","less","livescript","markdown","scss","stylus","twig"],"owner":"Golmote"},"puppet":{"title":"Puppet","owner":"Golmote"},"pure":{"title":"Pure","optional":["c","cpp","fortran"],"owner":"Golmote"},"purebasic":{"title":"PureBasic","require":"clike","alias":"pbfasm","owner":"HeX0R101"},"purescript":{"title":"PureScript","require":"haskell","alias":"purs","owner":"sriharshachilakapati"},"python":{"title":"Python","alias":"py","owner":"multipetros"},"qsharp":{"title":"Q#","require":"clike","alias":"qs","owner":"fedonman"},"q":{"title":"Q (kdb+ database)","owner":"Golmote"},"qml":{"title":"QML","require":"javascript","owner":"RunDevelopment"},"qore":{"title":"Qore","require":"clike","owner":"temnroegg"},"r":{"title":"R","owner":"Golmote"},"racket":{"title":"Racket","require":"scheme","alias":"rkt","owner":"RunDevelopment"},"cshtml":{"title":"Razor C#","alias":"razor","require":["markup","csharp"],"optional":["css","css-extras","javascript","js-extras"],"owner":"RunDevelopment"},"jsx":{"title":"React JSX","require":["markup","javascript"],"optional":["jsdoc","js-extras","js-templates"],"owner":"vkbansal"},"tsx":{"title":"React TSX","require":["jsx","typescript"]},"reason":{"title":"Reason","require":"clike","owner":"Golmote"},"regex":{"title":"Regex","owner":"RunDevelopment"},"rego":{"title":"Rego","owner":"JordanSh"},"renpy":{"title":"Ren'py","alias":"rpy","owner":"HyuchiaDiego"},"rescript":{"title":"ReScript","alias":"res","owner":"vmarcosp"},"rest":{"title":"reST (reStructuredText)","owner":"Golmote"},"rip":{"title":"Rip","owner":"ravinggenius"},"roboconf":{"title":"Roboconf","owner":"Golmote"},"robotframework":{"title":"Robot Framework","alias":"robot","owner":"RunDevelopment"},"ruby":{"title":"Ruby","require":"clike","alias":"rb","owner":"samflores"},"rust":{"title":"Rust","owner":"Golmote"},"sas":{"title":"SAS","optional":["groovy","lua","sql"],"owner":"Golmote"},"sass":{"title":"Sass (Sass)","require":"css","optional":"css-extras","owner":"Golmote"},"scss":{"title":"Sass (SCSS)","require":"css","optional":"css-extras","owner":"MoOx"},"scala":{"title":"Scala","require":"java","owner":"jozic"},"scheme":{"title":"Scheme","owner":"bacchus123"},"shell-session":{"title":"Shell session","require":"bash","alias":["sh-session","shellsession"],"owner":"RunDevelopment"},"smali":{"title":"Smali","owner":"RunDevelopment"},"smalltalk":{"title":"Smalltalk","owner":"Golmote"},"smarty":{"title":"Smarty","require":"markup-templating","optional":"php","owner":"Golmote"},"sml":{"title":"SML","alias":"smlnj","aliasTitles":{"smlnj":"SML/NJ"},"owner":"RunDevelopment"},"solidity":{"title":"Solidity (Ethereum)","alias":"sol","require":"clike","owner":"glachaud"},"solution-file":{"title":"Solution file","alias":"sln","owner":"RunDevelopment"},"soy":{"title":"Soy (Closure Template)","require":"markup-templating","owner":"Golmote"},"sparql":{"title":"SPARQL","require":"turtle","owner":"Triply-Dev","alias":"rq"},"splunk-spl":{"title":"Splunk SPL","owner":"RunDevelopment"},"sqf":{"title":"SQF: Status Quo Function (Arma 3)","require":"clike","owner":"RunDevelopment"},"sql":{"title":"SQL","owner":"multipetros"},"squirrel":{"title":"Squirrel","require":"clike","owner":"RunDevelopment"},"stan":{"title":"Stan","owner":"RunDevelopment"},"stata":{"title":"Stata Ado","require":["mata","java","python"],"owner":"RunDevelopment"},"iecst":{"title":"Structured Text (IEC 61131-3)","owner":"serhioromano"},"stylus":{"title":"Stylus","owner":"vkbansal"},"supercollider":{"title":"SuperCollider","alias":"sclang","owner":"RunDevelopment"},"swift":{"title":"Swift","owner":"chrischares"},"systemd":{"title":"Systemd configuration file","owner":"RunDevelopment"},"t4-templating":{"title":"T4 templating","owner":"RunDevelopment"},"t4-cs":{"title":"T4 Text Templates (C#)","require":["t4-templating","csharp"],"alias":"t4","owner":"RunDevelopment"},"t4-vb":{"title":"T4 Text Templates (VB)","require":["t4-templating","vbnet"],"owner":"RunDevelopment"},"tap":{"title":"TAP","owner":"isaacs","require":"yaml"},"tcl":{"title":"Tcl","owner":"PeterChaplin"},"tt2":{"title":"Template Toolkit 2","require":["clike","markup-templating"],"owner":"gflohr"},"textile":{"title":"Textile","require":"markup","optional":"css","owner":"Golmote"},"toml":{"title":"TOML","owner":"RunDevelopment"},"tremor":{"title":"Tremor","alias":["trickle","troy"],"owner":"darach","aliasTitles":{"trickle":"trickle","troy":"troy"}},"turtle":{"title":"Turtle","alias":"trig","aliasTitles":{"trig":"TriG"},"owner":"jakubklimek"},"twig":{"title":"Twig","require":"markup-templating","owner":"brandonkelly"},"typescript":{"title":"TypeScript","require":"javascript","optional":"js-templates","alias":"ts","owner":"vkbansal"},"typoscript":{"title":"TypoScript","alias":"tsconfig","aliasTitles":{"tsconfig":"TSConfig"},"owner":"dkern"},"unrealscript":{"title":"UnrealScript","alias":["uscript","uc"],"owner":"RunDevelopment"},"uorazor":{"title":"UO Razor Script","owner":"jaseowns"},"uri":{"title":"URI","alias":"url","aliasTitles":{"url":"URL"},"owner":"RunDevelopment"},"v":{"title":"V","require":"clike","owner":"taggon"},"vala":{"title":"Vala","require":"clike","optional":"regex","owner":"TemplarVolk"},"vbnet":{"title":"VB.Net","require":"basic","owner":"Bigsby"},"velocity":{"title":"Velocity","require":"markup","owner":"Golmote"},"verilog":{"title":"Verilog","owner":"a-rey"},"vhdl":{"title":"VHDL","owner":"a-rey"},"vim":{"title":"vim","owner":"westonganger"},"visual-basic":{"title":"Visual Basic","alias":["vb","vba"],"aliasTitles":{"vba":"VBA"},"owner":"Golmote"},"warpscript":{"title":"WarpScript","owner":"RunDevelopment"},"wasm":{"title":"WebAssembly","owner":"Golmote"},"web-idl":{"title":"Web IDL","alias":"webidl","owner":"RunDevelopment"},"wgsl":{"title":"WGSL","owner":"Dr4gonthree"},"wiki":{"title":"Wiki markup","require":"markup","owner":"Golmote"},"wolfram":{"title":"Wolfram language","alias":["mathematica","nb","wl"],"aliasTitles":{"mathematica":"Mathematica","nb":"Mathematica Notebook"},"owner":"msollami"},"wren":{"title":"Wren","owner":"clsource"},"xeora":{"title":"Xeora","require":"markup","alias":"xeoracube","aliasTitles":{"xeoracube":"XeoraCube"},"owner":"freakmaxi"},"xml-doc":{"title":"XML doc (.net)","require":"markup","modify":["csharp","fsharp","vbnet"],"owner":"RunDevelopment"},"xojo":{"title":"Xojo (REALbasic)","owner":"Golmote"},"xquery":{"title":"XQuery","require":"markup","owner":"Golmote"},"yaml":{"title":"YAML","alias":"yml","owner":"hason"},"yang":{"title":"YANG","owner":"RunDevelopment"},"zig":{"title":"Zig","owner":"RunDevelopment"}},"plugins":{"meta":{"path":"plugins/{id}/prism-{id}","link":"plugins/{id}/"},"line-highlight":{"title":"Line Highlight","description":"Highlights specific lines and/or line ranges."},"line-numbers":{"title":"Line Numbers","description":"Line number at the beginning of code lines.","owner":"kuba-kubula"},"show-invisibles":{"title":"Show Invisibles","description":"Show hidden characters such as tabs and line breaks.","optional":["autolinker","data-uri-highlight"]},"autolinker":{"title":"Autolinker","description":"Converts URLs and emails in code to clickable links. Parses Markdown links in comments."},"wpd":{"title":"WebPlatform Docs","description":"Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."},"custom-class":{"title":"Custom Class","description":"This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.","owner":"dvkndn","noCSS":true},"file-highlight":{"title":"File Highlight","description":"Fetch external files and highlight them with Prism. Used on the Prism website itself.","noCSS":true},"show-language":{"title":"Show Language","description":"Display the highlighted language in code blocks (inline code does not show the label).","owner":"nauzilus","noCSS":true,"require":"toolbar"},"jsonp-highlight":{"title":"JSONP Highlight","description":"Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).","noCSS":true,"owner":"nauzilus"},"highlight-keywords":{"title":"Highlight Keywords","description":"Adds special CSS classes for each keyword for fine-grained highlighting.","owner":"vkbansal","noCSS":true},"remove-initial-line-feed":{"title":"Remove initial line feed","description":"Removes the initial line feed in code blocks.","owner":"Golmote","noCSS":true},"inline-color":{"title":"Inline color","description":"Adds a small inline preview for colors in style sheets.","require":"css-extras","owner":"RunDevelopment"},"previewers":{"title":"Previewers","description":"Previewers for angles, colors, gradients, easing and time.","require":"css-extras","owner":"Golmote"},"autoloader":{"title":"Autoloader","description":"Automatically loads the needed languages to highlight the code blocks.","owner":"Golmote","noCSS":true},"keep-markup":{"title":"Keep Markup","description":"Prevents custom markup from being dropped out during highlighting.","owner":"Golmote","optional":"normalize-whitespace","noCSS":true},"command-line":{"title":"Command Line","description":"Display a command line with a prompt and, optionally, the output/response from the commands.","owner":"chriswells0"},"unescaped-markup":{"title":"Unescaped Markup","description":"Write markup without having to escape anything."},"normalize-whitespace":{"title":"Normalize Whitespace","description":"Supports multiple operations to normalize whitespace in code blocks.","owner":"zeitgeist87","optional":"unescaped-markup","noCSS":true},"data-uri-highlight":{"title":"Data-URI Highlight","description":"Highlights data-URI contents.","owner":"Golmote","noCSS":true},"toolbar":{"title":"Toolbar","description":"Attach a toolbar for plugins to easily register buttons on the top of a code block.","owner":"mAAdhaTTah"},"copy-to-clipboard":{"title":"Copy to Clipboard Button","description":"Add a button that copies the code block to the clipboard when clicked.","owner":"mAAdhaTTah","require":"toolbar","noCSS":true},"download-button":{"title":"Download Button","description":"A button in the toolbar of a code block adding a convenient way to download a code file.","owner":"Golmote","require":"toolbar","noCSS":true},"match-braces":{"title":"Match braces","description":"Highlights matching braces.","owner":"RunDevelopment"},"diff-highlight":{"title":"Diff Highlight","description":"Highlights the code inside diff blocks.","owner":"RunDevelopment","require":"diff"},"filter-highlight-all":{"title":"Filter highlightAll","description":"Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.","owner":"RunDevelopment","noCSS":true},"treeview":{"title":"Treeview","description":"A language with special styles to highlight file system tree structures.","owner":"Golmote"}}};
		if (module.exports) { module.exports = components; } 
	} (components));
	return components.exports;
}

var dependencies = {exports: {}};

var hasRequiredDependencies;

function requireDependencies () {
	if (hasRequiredDependencies) return dependencies.exports;
	hasRequiredDependencies = 1;
	(function (module) {

		/**
		 * @typedef {Object<string, ComponentCategory>} Components
		 * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
		 *
		 * @typedef ComponentEntry
		 * @property {string} [title] The title of the component.
		 * @property {string} [owner] The GitHub user name of the owner.
		 * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
		 * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
		 * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
		 *
		 * Aliases which are not in this map will the get title of the component.
		 * @property {string | string[]} [optional]
		 * @property {string | string[]} [require]
		 * @property {string | string[]} [modify]
		 */

		var getLoader = (function () {

			/**
			 * A function which does absolutely nothing.
			 *
			 * @type {any}
			 */
			var noop = function () { };

			/**
			 * Invokes the given callback for all elements of the given value.
			 *
			 * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
			 * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
			 * value as parameter.
			 *
			 * @param {null | undefined | T | T[]} value
			 * @param {(value: T, index: number) => void} callbackFn
			 * @returns {void}
			 * @template T
			 */
			function forEach(value, callbackFn) {
				if (Array.isArray(value)) {
					value.forEach(callbackFn);
				} else if (value != null) {
					callbackFn(value, 0);
				}
			}

			/**
			 * Returns a new set for the given string array.
			 *
			 * @param {string[]} array
			 * @returns {StringSet}
			 *
			 * @typedef {Object<string, true>} StringSet
			 */
			function toSet(array) {
				/** @type {StringSet} */
				var set = {};
				for (var i = 0, l = array.length; i < l; i++) {
					set[array[i]] = true;
				}
				return set;
			}

			/**
			 * Creates a map of every components id to its entry.
			 *
			 * @param {Components} components
			 * @returns {EntryMap}
			 *
			 * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
			 */
			function createEntryMap(components) {
				/** @type {Object<string, Readonly<ComponentEntry>>} */
				var map = {};

				for (var categoryName in components) {
					var category = components[categoryName];
					for (var id in category) {
						if (id != 'meta') {
							/** @type {ComponentEntry | string} */
							var entry = category[id];
							map[id] = typeof entry == 'string' ? { title: entry } : entry;
						}
					}
				}

				return map;
			}

			/**
			 * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
			 *
			 * @param {EntryMap} entryMap
			 * @returns {DependencyResolver}
			 *
			 * @typedef {(id: string) => StringSet} DependencyResolver
			 */
			function createDependencyResolver(entryMap) {
				/** @type {Object<string, StringSet>} */
				var map = {};
				var _stackArray = [];

				/**
				 * Adds the dependencies of the given component to the dependency map.
				 *
				 * @param {string} id
				 * @param {string[]} stack
				 */
				function addToMap(id, stack) {
					if (id in map) {
						return;
					}

					stack.push(id);

					// check for circular dependencies
					var firstIndex = stack.indexOf(id);
					if (firstIndex < stack.length - 1) {
						throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
					}

					/** @type {StringSet} */
					var dependencies = {};

					var entry = entryMap[id];
					if (entry) {
						/**
						 * This will add the direct dependency and all of its transitive dependencies to the set of
						 * dependencies of `entry`.
						 *
						 * @param {string} depId
						 * @returns {void}
						 */
						function handleDirectDependency(depId) {
							if (!(depId in entryMap)) {
								throw new Error(id + ' depends on an unknown component ' + depId);
							}
							if (depId in dependencies) {
								// if the given dependency is already in the set of deps, then so are its transitive deps
								return;
							}

							addToMap(depId, stack);
							dependencies[depId] = true;
							for (var transitiveDepId in map[depId]) {
								dependencies[transitiveDepId] = true;
							}
						}

						forEach(entry.require, handleDirectDependency);
						forEach(entry.optional, handleDirectDependency);
						forEach(entry.modify, handleDirectDependency);
					}

					map[id] = dependencies;

					stack.pop();
				}

				return function (id) {
					var deps = map[id];
					if (!deps) {
						addToMap(id, _stackArray);
						deps = map[id];
					}
					return deps;
				};
			}

			/**
			 * Returns a function which resolves the aliases of its given id of alias.
			 *
			 * @param {EntryMap} entryMap
			 * @returns {(idOrAlias: string) => string}
			 */
			function createAliasResolver(entryMap) {
				/** @type {Object<string, string> | undefined} */
				var map;

				return function (idOrAlias) {
					if (idOrAlias in entryMap) {
						return idOrAlias;
					} else {
						// only create the alias map if necessary
						if (!map) {
							map = {};

							for (var id in entryMap) {
								var entry = entryMap[id];
								forEach(entry && entry.alias, function (alias) {
									if (alias in map) {
										throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
									}
									if (alias in entryMap) {
										throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
									}
									map[alias] = id;
								});
							}
						}
						return map[idOrAlias] || idOrAlias;
					}
				};
			}

			/**
			 * @typedef LoadChainer
			 * @property {(before: T, after: () => T) => T} series
			 * @property {(values: T[]) => T} parallel
			 * @template T
			 */

			/**
			 * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
			 * component in topological order.
			 *
			 * @param {DependencyResolver} dependencyResolver
			 * @param {StringSet} ids
			 * @param {(id: string) => T} loadComponent
			 * @param {LoadChainer<T>} [chainer]
			 * @returns {T}
			 * @template T
			 */
			function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
				var series = chainer ? chainer.series : undefined;
				var parallel = chainer ? chainer.parallel : noop;

				/** @type {Object<string, T>} */
				var cache = {};

				/**
				 * A set of ids of nodes which are not depended upon by any other node in the graph.
				 *
				 * @type {StringSet}
				 */
				var ends = {};

				/**
				 * Loads the given component and its dependencies or returns the cached value.
				 *
				 * @param {string} id
				 * @returns {T}
				 */
				function handleId(id) {
					if (id in cache) {
						return cache[id];
					}

					// assume that it's an end
					// if it isn't, it will be removed later
					ends[id] = true;

					// all dependencies of the component in the given ids
					var dependsOn = [];
					for (var depId in dependencyResolver(id)) {
						if (depId in ids) {
							dependsOn.push(depId);
						}
					}

					/**
					 * The value to be returned.
					 *
					 * @type {T}
					 */
					var value;

					if (dependsOn.length === 0) {
						value = loadComponent(id);
					} else {
						var depsValue = parallel(dependsOn.map(function (depId) {
							var value = handleId(depId);
							// none of the dependencies can be ends
							delete ends[depId];
							return value;
						}));
						if (series) {
							// the chainer will be responsibly for calling the function calling loadComponent
							value = series(depsValue, function () { return loadComponent(id); });
						} else {
							// we don't have a chainer, so we call loadComponent ourselves
							loadComponent(id);
						}
					}

					// cache and return
					return cache[id] = value;
				}

				for (var id in ids) {
					handleId(id);
				}

				/** @type {T[]} */
				var endValues = [];
				for (var endId in ends) {
					endValues.push(cache[endId]);
				}
				return parallel(endValues);
			}

			/**
			 * Returns whether the given object has any keys.
			 *
			 * @param {object} obj
			 */
			function hasKeys(obj) {
				for (var key in obj) {
					return true;
				}
				return false;
			}

			/**
			 * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
			 * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
			 *
			 * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
			 * components will have to reloaded.
			 *
			 * The ids in `load` and `loaded` may be in any order and can contain duplicates.
			 *
			 * @param {Components} components
			 * @param {string[]} load
			 * @param {string[]} [loaded=[]] A list of already loaded components.
			 *
			 * If a component is in this list, then all of its requirements will also be assumed to be in the list.
			 * @returns {Loader}
			 *
			 * @typedef Loader
			 * @property {() => string[]} getIds A function to get all ids of the components to load.
			 *
			 * The returned ids will be duplicate-free, alias-free and in load order.
			 * @property {LoadFunction} load A functional interface to load components.
			 *
			 * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
			 * A functional interface to load components.
			 *
			 * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
			 *
			 * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
			 * `Promise#then` and `Promise.all`.
			 *
			 * @example
			 * load(id => { loadComponent(id); }); // returns undefined
			 *
			 * await load(
			 *     id => loadComponentAsync(id), // returns a Promise for each id
			 *     {
			 *         series: async (before, after) => {
			 *             await before;
			 *             await after();
			 *         },
			 *         parallel: async (values) => {
			 *             await Promise.all(values);
			 *         }
			 *     }
			 * );
			 */
			function getLoader(components, load, loaded) {
				var entryMap = createEntryMap(components);
				var resolveAlias = createAliasResolver(entryMap);

				load = load.map(resolveAlias);
				loaded = (loaded || []).map(resolveAlias);

				var loadSet = toSet(load);
				var loadedSet = toSet(loaded);

				// add requirements

				load.forEach(addRequirements);
				function addRequirements(id) {
					var entry = entryMap[id];
					forEach(entry && entry.require, function (reqId) {
						if (!(reqId in loadedSet)) {
							loadSet[reqId] = true;
							addRequirements(reqId);
						}
					});
				}

				// add components to reload

				// A component x in `loaded` has to be reloaded if
				//  1) a component in `load` modifies x.
				//  2) x depends on a component in `load`.
				// The above two condition have to be applied until nothing changes anymore.

				var dependencyResolver = createDependencyResolver(entryMap);

				/** @type {StringSet} */
				var loadAdditions = loadSet;
				/** @type {StringSet} */
				var newIds;
				while (hasKeys(loadAdditions)) {
					newIds = {};

					// condition 1)
					for (var loadId in loadAdditions) {
						var entry = entryMap[loadId];
						forEach(entry && entry.modify, function (modId) {
							if (modId in loadedSet) {
								newIds[modId] = true;
							}
						});
					}

					// condition 2)
					for (var loadedId in loadedSet) {
						if (!(loadedId in loadSet)) {
							for (var depId in dependencyResolver(loadedId)) {
								if (depId in loadSet) {
									newIds[loadedId] = true;
									break;
								}
							}
						}
					}

					loadAdditions = newIds;
					for (var newId in loadAdditions) {
						loadSet[newId] = true;
					}
				}

				/** @type {Loader} */
				var loader = {
					getIds: function () {
						var ids = [];
						loader.load(function (id) {
							ids.push(id);
						});
						return ids;
					},
					load: function (loadComponent, chainer) {
						return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
					}
				};

				return loader;
			}

			return getLoader;

		}());

		{
			module.exports = getLoader;
		} 
	} (dependencies));
	return dependencies.exports;
}

var components_1;
var hasRequiredComponents;

function requireComponents () {
	if (hasRequiredComponents) return components_1;
	hasRequiredComponents = 1;
	const components = requireComponents$1();
	const getLoader = requireDependencies();


	/**
	 * The set of all languages which have been loaded using the below function.
	 *
	 * @type {Set<string>}
	 */
	const loadedLanguages = new Set();

	/**
	 * Loads the given languages and adds them to the current Prism instance.
	 *
	 * If no languages are provided, __all__ Prism languages will be loaded.
	 *
	 * @param {string|string[]} [languages]
	 * @returns {void}
	 */
	function loadLanguages(languages) {
		if (languages === undefined) {
			languages = Object.keys(components.languages).filter(l => l != 'meta');
		} else if (!Array.isArray(languages)) {
			languages = [languages];
		}

		// the user might have loaded languages via some other way or used `prism.js` which already includes some
		// we don't need to validate the ids because `getLoader` will ignore invalid ones
		const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];

		getLoader(components, languages, loaded).load(lang => {
			if (!(lang in components.languages)) {
				if (!loadLanguages.silent) {
					console.warn('Language does not exist: ' + lang);
				}
				return;
			}

			const pathToLanguage = './prism-' + lang;

			// remove from require cache and from Prism
			delete require.cache[require.resolve(pathToLanguage)];
			delete Prism.languages[lang];

			commonjsRequire(pathToLanguage);

			loadedLanguages.add(lang);
		});
	}

	/**
	 * Set this to `true` to prevent all warning messages `loadLanguages` logs.
	 */
	loadLanguages.silent = false;

	components_1 = loadLanguages;
	return components_1;
}

requireComponents();

Boolean(process.env.ASTRO_PERFORMANCE_BENCHMARK);

var commonAncestorPath_1;
var hasRequiredCommonAncestorPath;

function requireCommonAncestorPath () {
	if (hasRequiredCommonAncestorPath) return commonAncestorPath_1;
	hasRequiredCommonAncestorPath = 1;
	const {parse, sep, normalize: norm} = path;

	function* commonArrayMembers (a, b) {
	  const [l, s] = a.length > b.length ? [a, b] : [b, a];
	  for (const x of s) {
	    if (x === l.shift())
	      yield x;
	    else
	      break
	  }
	}

	const commonAncestorPath = (a, b) => a === b ? a
	  : parse(a).root !== parse(b).root ? null
	  : [...commonArrayMembers(norm(a).split(sep), norm(b).split(sep))].join(sep);

	commonAncestorPath_1 = (...paths) => paths.reduce(commonAncestorPath);
	return commonAncestorPath_1;
}

requireCommonAncestorPath();

const isWindows = typeof process !== "undefined" && process.platform === "win32";
function normalizePath$1(id) {
  return path$1.posix.normalize(isWindows ? slash(id) : id);
}

var utils = {};

var constants;
var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;

	const WIN_SLASH = '\\\\/';
	const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

	/**
	 * Posix glob regex
	 */

	const DOT_LITERAL = '\\.';
	const PLUS_LITERAL = '\\+';
	const QMARK_LITERAL = '\\?';
	const SLASH_LITERAL = '\\/';
	const ONE_CHAR = '(?=.)';
	const QMARK = '[^/]';
	const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
	const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
	const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
	const NO_DOT = `(?!${DOT_LITERAL})`;
	const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
	const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
	const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
	const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
	const STAR = `${QMARK}*?`;
	const SEP = '/';

	const POSIX_CHARS = {
	  DOT_LITERAL,
	  PLUS_LITERAL,
	  QMARK_LITERAL,
	  SLASH_LITERAL,
	  ONE_CHAR,
	  QMARK,
	  END_ANCHOR,
	  DOTS_SLASH,
	  NO_DOT,
	  NO_DOTS,
	  NO_DOT_SLASH,
	  NO_DOTS_SLASH,
	  QMARK_NO_DOT,
	  STAR,
	  START_ANCHOR,
	  SEP
	};

	/**
	 * Windows glob regex
	 */

	const WINDOWS_CHARS = {
	  ...POSIX_CHARS,

	  SLASH_LITERAL: `[${WIN_SLASH}]`,
	  QMARK: WIN_NO_SLASH,
	  STAR: `${WIN_NO_SLASH}*?`,
	  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
	  NO_DOT: `(?!${DOT_LITERAL})`,
	  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
	  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
	  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
	  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
	  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
	  SEP: '\\'
	};

	/**
	 * POSIX Bracket Regex
	 */

	const POSIX_REGEX_SOURCE = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  ascii: '\\x00-\\x7F',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E ',
	  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word: 'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9'
	};

	constants = {
	  MAX_LENGTH: 1024 * 64,
	  POSIX_REGEX_SOURCE,

	  // regular expressions
	  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
	  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
	  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
	  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
	  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
	  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

	  // Replace globs with equivalent patterns to reduce parsing time.
	  REPLACEMENTS: {
	    __proto__: null,
	    '***': '*',
	    '**/**': '**',
	    '**/**/**': '**'
	  },

	  // Digits
	  CHAR_0: 48, /* 0 */
	  CHAR_9: 57, /* 9 */

	  // Alphabet chars.
	  CHAR_UPPERCASE_A: 65, /* A */
	  CHAR_LOWERCASE_A: 97, /* a */
	  CHAR_UPPERCASE_Z: 90, /* Z */
	  CHAR_LOWERCASE_Z: 122, /* z */

	  CHAR_LEFT_PARENTHESES: 40, /* ( */
	  CHAR_RIGHT_PARENTHESES: 41, /* ) */

	  CHAR_ASTERISK: 42, /* * */

	  // Non-alphabetic chars.
	  CHAR_AMPERSAND: 38, /* & */
	  CHAR_AT: 64, /* @ */
	  CHAR_BACKWARD_SLASH: 92, /* \ */
	  CHAR_CARRIAGE_RETURN: 13, /* \r */
	  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
	  CHAR_COLON: 58, /* : */
	  CHAR_COMMA: 44, /* , */
	  CHAR_DOT: 46, /* . */
	  CHAR_DOUBLE_QUOTE: 34, /* " */
	  CHAR_EQUAL: 61, /* = */
	  CHAR_EXCLAMATION_MARK: 33, /* ! */
	  CHAR_FORM_FEED: 12, /* \f */
	  CHAR_FORWARD_SLASH: 47, /* / */
	  CHAR_GRAVE_ACCENT: 96, /* ` */
	  CHAR_HASH: 35, /* # */
	  CHAR_HYPHEN_MINUS: 45, /* - */
	  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
	  CHAR_LEFT_CURLY_BRACE: 123, /* { */
	  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
	  CHAR_LINE_FEED: 10, /* \n */
	  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
	  CHAR_PERCENT: 37, /* % */
	  CHAR_PLUS: 43, /* + */
	  CHAR_QUESTION_MARK: 63, /* ? */
	  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
	  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
	  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
	  CHAR_SEMICOLON: 59, /* ; */
	  CHAR_SINGLE_QUOTE: 39, /* ' */
	  CHAR_SPACE: 32, /*   */
	  CHAR_TAB: 9, /* \t */
	  CHAR_UNDERSCORE: 95, /* _ */
	  CHAR_VERTICAL_LINE: 124, /* | */
	  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

	  /**
	   * Create EXTGLOB_CHARS
	   */

	  extglobChars(chars) {
	    return {
	      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
	      '?': { type: 'qmark', open: '(?:', close: ')?' },
	      '+': { type: 'plus', open: '(?:', close: ')+' },
	      '*': { type: 'star', open: '(?:', close: ')*' },
	      '@': { type: 'at', open: '(?:', close: ')' }
	    };
	  },

	  /**
	   * Create GLOB_CHARS
	   */

	  globChars(win32) {
	    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
	  }
	};
	return constants;
}

/*global navigator*/

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {

		const {
		  REGEX_BACKSLASH,
		  REGEX_REMOVE_BACKSLASH,
		  REGEX_SPECIAL_CHARS,
		  REGEX_SPECIAL_CHARS_GLOBAL
		} = /*@__PURE__*/ requireConstants();

		exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
		exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
		exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
		exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
		exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

		exports.isWindows = () => {
		  if (typeof navigator !== 'undefined' && navigator.platform) {
		    const platform = navigator.platform.toLowerCase();
		    return platform === 'win32' || platform === 'windows';
		  }

		  if (typeof process !== 'undefined' && process.platform) {
		    return process.platform === 'win32';
		  }

		  return false;
		};

		exports.removeBackslashes = str => {
		  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
		    return match === '\\' ? '' : match;
		  });
		};

		exports.escapeLast = (input, char, lastIdx) => {
		  const idx = input.lastIndexOf(char, lastIdx);
		  if (idx === -1) return input;
		  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
		  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
		};

		exports.removePrefix = (input, state = {}) => {
		  let output = input;
		  if (output.startsWith('./')) {
		    output = output.slice(2);
		    state.prefix = './';
		  }
		  return output;
		};

		exports.wrapOutput = (input, state = {}, options = {}) => {
		  const prepend = options.contains ? '' : '^';
		  const append = options.contains ? '' : '$';

		  let output = `${prepend}(?:${input})${append}`;
		  if (state.negated === true) {
		    output = `(?:^(?!${output}).*$)`;
		  }
		  return output;
		};

		exports.basename = (path, { windows } = {}) => {
		  const segs = path.split(windows ? /[\\/]/ : '/');
		  const last = segs[segs.length - 1];

		  if (last === '') {
		    return segs[segs.length - 2];
		  }

		  return last;
		}; 
	} (utils));
	return utils;
}

var scan_1;
var hasRequiredScan;

function requireScan () {
	if (hasRequiredScan) return scan_1;
	hasRequiredScan = 1;

	const utils = /*@__PURE__*/ requireUtils();
	const {
	  CHAR_ASTERISK,             /* * */
	  CHAR_AT,                   /* @ */
	  CHAR_BACKWARD_SLASH,       /* \ */
	  CHAR_COMMA,                /* , */
	  CHAR_DOT,                  /* . */
	  CHAR_EXCLAMATION_MARK,     /* ! */
	  CHAR_FORWARD_SLASH,        /* / */
	  CHAR_LEFT_CURLY_BRACE,     /* { */
	  CHAR_LEFT_PARENTHESES,     /* ( */
	  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
	  CHAR_PLUS,                 /* + */
	  CHAR_QUESTION_MARK,        /* ? */
	  CHAR_RIGHT_CURLY_BRACE,    /* } */
	  CHAR_RIGHT_PARENTHESES,    /* ) */
	  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
	} = /*@__PURE__*/ requireConstants();

	const isPathSeparator = code => {
	  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
	};

	const depth = token => {
	  if (token.isPrefix !== true) {
	    token.depth = token.isGlobstar ? Infinity : 1;
	  }
	};

	/**
	 * Quickly scans a glob pattern and returns an object with a handful of
	 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
	 * `glob` (the actual pattern), `negated` (true if the path starts with `!` but not
	 * with `!(`) and `negatedExtglob` (true if the path starts with `!(`).
	 *
	 * ```js
	 * const pm = require('picomatch');
	 * console.log(pm.scan('foo/bar/*.js'));
	 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
	 * ```
	 * @param {String} `str`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with tokens and regex source string.
	 * @api public
	 */

	const scan = (input, options) => {
	  const opts = options || {};

	  const length = input.length - 1;
	  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
	  const slashes = [];
	  const tokens = [];
	  const parts = [];

	  let str = input;
	  let index = -1;
	  let start = 0;
	  let lastIndex = 0;
	  let isBrace = false;
	  let isBracket = false;
	  let isGlob = false;
	  let isExtglob = false;
	  let isGlobstar = false;
	  let braceEscaped = false;
	  let backslashes = false;
	  let negated = false;
	  let negatedExtglob = false;
	  let finished = false;
	  let braces = 0;
	  let prev;
	  let code;
	  let token = { value: '', depth: 0, isGlob: false };

	  const eos = () => index >= length;
	  const peek = () => str.charCodeAt(index + 1);
	  const advance = () => {
	    prev = code;
	    return str.charCodeAt(++index);
	  };

	  while (index < length) {
	    code = advance();
	    let next;

	    if (code === CHAR_BACKWARD_SLASH) {
	      backslashes = token.backslashes = true;
	      code = advance();

	      if (code === CHAR_LEFT_CURLY_BRACE) {
	        braceEscaped = true;
	      }
	      continue;
	    }

	    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
	      braces++;

	      while (eos() !== true && (code = advance())) {
	        if (code === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (code === CHAR_LEFT_CURLY_BRACE) {
	          braces++;
	          continue;
	        }

	        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (braceEscaped !== true && code === CHAR_COMMA) {
	          isBrace = token.isBrace = true;
	          isGlob = token.isGlob = true;
	          finished = true;

	          if (scanToEnd === true) {
	            continue;
	          }

	          break;
	        }

	        if (code === CHAR_RIGHT_CURLY_BRACE) {
	          braces--;

	          if (braces === 0) {
	            braceEscaped = false;
	            isBrace = token.isBrace = true;
	            finished = true;
	            break;
	          }
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (code === CHAR_FORWARD_SLASH) {
	      slashes.push(index);
	      tokens.push(token);
	      token = { value: '', depth: 0, isGlob: false };

	      if (finished === true) continue;
	      if (prev === CHAR_DOT && index === (start + 1)) {
	        start += 2;
	        continue;
	      }

	      lastIndex = index + 1;
	      continue;
	    }

	    if (opts.noext !== true) {
	      const isExtglobChar = code === CHAR_PLUS
	        || code === CHAR_AT
	        || code === CHAR_ASTERISK
	        || code === CHAR_QUESTION_MARK
	        || code === CHAR_EXCLAMATION_MARK;

	      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
	        isGlob = token.isGlob = true;
	        isExtglob = token.isExtglob = true;
	        finished = true;
	        if (code === CHAR_EXCLAMATION_MARK && index === start) {
	          negatedExtglob = true;
	        }

	        if (scanToEnd === true) {
	          while (eos() !== true && (code = advance())) {
	            if (code === CHAR_BACKWARD_SLASH) {
	              backslashes = token.backslashes = true;
	              code = advance();
	              continue;
	            }

	            if (code === CHAR_RIGHT_PARENTHESES) {
	              isGlob = token.isGlob = true;
	              finished = true;
	              break;
	            }
	          }
	          continue;
	        }
	        break;
	      }
	    }

	    if (code === CHAR_ASTERISK) {
	      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_QUESTION_MARK) {
	      isGlob = token.isGlob = true;
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }
	      break;
	    }

	    if (code === CHAR_LEFT_SQUARE_BRACKET) {
	      while (eos() !== true && (next = advance())) {
	        if (next === CHAR_BACKWARD_SLASH) {
	          backslashes = token.backslashes = true;
	          advance();
	          continue;
	        }

	        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
	          isBracket = token.isBracket = true;
	          isGlob = token.isGlob = true;
	          finished = true;
	          break;
	        }
	      }

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }

	    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
	      negated = token.negated = true;
	      start++;
	      continue;
	    }

	    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
	      isGlob = token.isGlob = true;

	      if (scanToEnd === true) {
	        while (eos() !== true && (code = advance())) {
	          if (code === CHAR_LEFT_PARENTHESES) {
	            backslashes = token.backslashes = true;
	            code = advance();
	            continue;
	          }

	          if (code === CHAR_RIGHT_PARENTHESES) {
	            finished = true;
	            break;
	          }
	        }
	        continue;
	      }
	      break;
	    }

	    if (isGlob === true) {
	      finished = true;

	      if (scanToEnd === true) {
	        continue;
	      }

	      break;
	    }
	  }

	  if (opts.noext === true) {
	    isExtglob = false;
	    isGlob = false;
	  }

	  let base = str;
	  let prefix = '';
	  let glob = '';

	  if (start > 0) {
	    prefix = str.slice(0, start);
	    str = str.slice(start);
	    lastIndex -= start;
	  }

	  if (base && isGlob === true && lastIndex > 0) {
	    base = str.slice(0, lastIndex);
	    glob = str.slice(lastIndex);
	  } else if (isGlob === true) {
	    base = '';
	    glob = str;
	  } else {
	    base = str;
	  }

	  if (base && base !== '' && base !== '/' && base !== str) {
	    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
	      base = base.slice(0, -1);
	    }
	  }

	  if (opts.unescape === true) {
	    if (glob) glob = utils.removeBackslashes(glob);

	    if (base && backslashes === true) {
	      base = utils.removeBackslashes(base);
	    }
	  }

	  const state = {
	    prefix,
	    input,
	    start,
	    base,
	    glob,
	    isBrace,
	    isBracket,
	    isGlob,
	    isExtglob,
	    isGlobstar,
	    negated,
	    negatedExtglob
	  };

	  if (opts.tokens === true) {
	    state.maxDepth = 0;
	    if (!isPathSeparator(code)) {
	      tokens.push(token);
	    }
	    state.tokens = tokens;
	  }

	  if (opts.parts === true || opts.tokens === true) {
	    let prevIndex;

	    for (let idx = 0; idx < slashes.length; idx++) {
	      const n = prevIndex ? prevIndex + 1 : start;
	      const i = slashes[idx];
	      const value = input.slice(n, i);
	      if (opts.tokens) {
	        if (idx === 0 && start !== 0) {
	          tokens[idx].isPrefix = true;
	          tokens[idx].value = prefix;
	        } else {
	          tokens[idx].value = value;
	        }
	        depth(tokens[idx]);
	        state.maxDepth += tokens[idx].depth;
	      }
	      if (idx !== 0 || value !== '') {
	        parts.push(value);
	      }
	      prevIndex = i;
	    }

	    if (prevIndex && prevIndex + 1 < input.length) {
	      const value = input.slice(prevIndex + 1);
	      parts.push(value);

	      if (opts.tokens) {
	        tokens[tokens.length - 1].value = value;
	        depth(tokens[tokens.length - 1]);
	        state.maxDepth += tokens[tokens.length - 1].depth;
	      }
	    }

	    state.slashes = slashes;
	    state.parts = parts;
	  }

	  return state;
	};

	scan_1 = scan;
	return scan_1;
}

var parse_1;
var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse_1;
	hasRequiredParse = 1;

	const constants = /*@__PURE__*/ requireConstants();
	const utils = /*@__PURE__*/ requireUtils();

	/**
	 * Constants
	 */

	const {
	  MAX_LENGTH,
	  POSIX_REGEX_SOURCE,
	  REGEX_NON_SPECIAL_CHARS,
	  REGEX_SPECIAL_CHARS_BACKREF,
	  REPLACEMENTS
	} = constants;

	/**
	 * Helpers
	 */

	const expandRange = (args, options) => {
	  if (typeof options.expandRange === 'function') {
	    return options.expandRange(...args, options);
	  }

	  args.sort();
	  const value = `[${args.join('-')}]`;

	  try {
	    /* eslint-disable-next-line no-new */
	    new RegExp(value);
	  } catch (ex) {
	    return args.map(v => utils.escapeRegex(v)).join('..');
	  }

	  return value;
	};

	/**
	 * Create the message for a syntax error
	 */

	const syntaxError = (type, char) => {
	  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
	};

	/**
	 * Parse the given input string.
	 * @param {String} input
	 * @param {Object} options
	 * @return {Object}
	 */

	const parse = (input, options) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected a string');
	  }

	  input = REPLACEMENTS[input] || input;

	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

	  let len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
	  const tokens = [bos];

	  const capture = opts.capture ? '' : '?:';

	  // create constants based on platform, for windows or posix
	  const PLATFORM_CHARS = constants.globChars(opts.windows);
	  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

	  const {
	    DOT_LITERAL,
	    PLUS_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOT_SLASH,
	    NO_DOTS_SLASH,
	    QMARK,
	    QMARK_NO_DOT,
	    STAR,
	    START_ANCHOR
	  } = PLATFORM_CHARS;

	  const globstar = opts => {
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const nodot = opts.dot ? '' : NO_DOT;
	  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
	  let star = opts.bash === true ? globstar(opts) : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  // minimatch options support
	  if (typeof opts.noext === 'boolean') {
	    opts.noextglob = opts.noext;
	  }

	  const state = {
	    input,
	    index: -1,
	    start: 0,
	    dot: opts.dot === true,
	    consumed: '',
	    output: '',
	    prefix: '',
	    backtrack: false,
	    negated: false,
	    brackets: 0,
	    braces: 0,
	    parens: 0,
	    quotes: 0,
	    globstar: false,
	    tokens
	  };

	  input = utils.removePrefix(input, state);
	  len = input.length;

	  const extglobs = [];
	  const braces = [];
	  const stack = [];
	  let prev = bos;
	  let value;

	  /**
	   * Tokenizing helpers
	   */

	  const eos = () => state.index === len - 1;
	  const peek = state.peek = (n = 1) => input[state.index + n];
	  const advance = state.advance = () => input[++state.index] || '';
	  const remaining = () => input.slice(state.index + 1);
	  const consume = (value = '', num = 0) => {
	    state.consumed += value;
	    state.index += num;
	  };

	  const append = token => {
	    state.output += token.output != null ? token.output : token.value;
	    consume(token.value);
	  };

	  const negate = () => {
	    let count = 1;

	    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
	      advance();
	      state.start++;
	      count++;
	    }

	    if (count % 2 === 0) {
	      return false;
	    }

	    state.negated = true;
	    state.start++;
	    return true;
	  };

	  const increment = type => {
	    state[type]++;
	    stack.push(type);
	  };

	  const decrement = type => {
	    state[type]--;
	    stack.pop();
	  };

	  /**
	   * Push tokens onto the tokens array. This helper speeds up
	   * tokenizing by 1) helping us avoid backtracking as much as possible,
	   * and 2) helping us avoid creating extra tokens when consecutive
	   * characters are plain text. This improves performance and simplifies
	   * lookbehinds.
	   */

	  const push = tok => {
	    if (prev.type === 'globstar') {
	      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
	      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

	      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
	        state.output = state.output.slice(0, -prev.output.length);
	        prev.type = 'star';
	        prev.value = '*';
	        prev.output = star;
	        state.output += prev.output;
	      }
	    }

	    if (extglobs.length && tok.type !== 'paren') {
	      extglobs[extglobs.length - 1].inner += tok.value;
	    }

	    if (tok.value || tok.output) append(tok);
	    if (prev && prev.type === 'text' && tok.type === 'text') {
	      prev.output = (prev.output || prev.value) + tok.value;
	      prev.value += tok.value;
	      return;
	    }

	    tok.prev = prev;
	    tokens.push(tok);
	    prev = tok;
	  };

	  const extglobOpen = (type, value) => {
	    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

	    token.prev = prev;
	    token.parens = state.parens;
	    token.output = state.output;
	    const output = (opts.capture ? '(' : '') + token.open;

	    increment('parens');
	    push({ type, value, output: state.output ? '' : ONE_CHAR });
	    push({ type: 'paren', extglob: true, value: advance(), output });
	    extglobs.push(token);
	  };

	  const extglobClose = token => {
	    let output = token.close + (opts.capture ? ')' : '');
	    let rest;

	    if (token.type === 'negate') {
	      let extglobStar = star;

	      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
	        extglobStar = globstar(opts);
	      }

	      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
	        output = token.close = `)$))${extglobStar}`;
	      }

	      if (token.inner.includes('*') && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
	        // Any non-magical string (`.ts`) or even nested expression (`.{ts,tsx}`) can follow after the closing parenthesis.
	        // In this case, we need to parse the string and use it in the output of the original pattern.
	        // Suitable patterns: `/!(*.d).ts`, `/!(*.d).{ts,tsx}`, `**/!(*-dbg).@(js)`.
	        //
	        // Disabling the `fastpaths` option due to a problem with parsing strings as `.ts` in the pattern like `**/!(*.d).ts`.
	        const expression = parse(rest, { ...options, fastpaths: false }).output;

	        output = token.close = `)${expression})${extglobStar})`;
	      }

	      if (token.prev.type === 'bos') {
	        state.negatedExtglob = true;
	      }
	    }

	    push({ type: 'paren', extglob: true, value, output });
	    decrement('parens');
	  };

	  /**
	   * Fast paths
	   */

	  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
	    let backslashes = false;

	    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
	      if (first === '\\') {
	        backslashes = true;
	        return m;
	      }

	      if (first === '?') {
	        if (esc) {
	          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        if (index === 0) {
	          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
	        }
	        return QMARK.repeat(chars.length);
	      }

	      if (first === '.') {
	        return DOT_LITERAL.repeat(chars.length);
	      }

	      if (first === '*') {
	        if (esc) {
	          return esc + first + (rest ? star : '');
	        }
	        return star;
	      }
	      return esc ? m : `\\${m}`;
	    });

	    if (backslashes === true) {
	      if (opts.unescape === true) {
	        output = output.replace(/\\/g, '');
	      } else {
	        output = output.replace(/\\+/g, m => {
	          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
	        });
	      }
	    }

	    if (output === input && opts.contains === true) {
	      state.output = input;
	      return state;
	    }

	    state.output = utils.wrapOutput(output, state, options);
	    return state;
	  }

	  /**
	   * Tokenize input until we reach end-of-string
	   */

	  while (!eos()) {
	    value = advance();

	    if (value === '\u0000') {
	      continue;
	    }

	    /**
	     * Escaped characters
	     */

	    if (value === '\\') {
	      const next = peek();

	      if (next === '/' && opts.bash !== true) {
	        continue;
	      }

	      if (next === '.' || next === ';') {
	        continue;
	      }

	      if (!next) {
	        value += '\\';
	        push({ type: 'text', value });
	        continue;
	      }

	      // collapse slashes to reduce potential for exploits
	      const match = /^\\+/.exec(remaining());
	      let slashes = 0;

	      if (match && match[0].length > 2) {
	        slashes = match[0].length;
	        state.index += slashes;
	        if (slashes % 2 !== 0) {
	          value += '\\';
	        }
	      }

	      if (opts.unescape === true) {
	        value = advance();
	      } else {
	        value += advance();
	      }

	      if (state.brackets === 0) {
	        push({ type: 'text', value });
	        continue;
	      }
	    }

	    /**
	     * If we're inside a regex character class, continue
	     * until we reach the closing bracket.
	     */

	    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
	      if (opts.posix !== false && value === ':') {
	        const inner = prev.value.slice(1);
	        if (inner.includes('[')) {
	          prev.posix = true;

	          if (inner.includes(':')) {
	            const idx = prev.value.lastIndexOf('[');
	            const pre = prev.value.slice(0, idx);
	            const rest = prev.value.slice(idx + 2);
	            const posix = POSIX_REGEX_SOURCE[rest];
	            if (posix) {
	              prev.value = pre + posix;
	              state.backtrack = true;
	              advance();

	              if (!bos.output && tokens.indexOf(prev) === 1) {
	                bos.output = ONE_CHAR;
	              }
	              continue;
	            }
	          }
	        }
	      }

	      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
	        value = `\\${value}`;
	      }

	      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
	        value = `\\${value}`;
	      }

	      if (opts.posix === true && value === '!' && prev.value === '[') {
	        value = '^';
	      }

	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * If we're inside a quoted string, continue
	     * until we reach the closing double quote.
	     */

	    if (state.quotes === 1 && value !== '"') {
	      value = utils.escapeRegex(value);
	      prev.value += value;
	      append({ value });
	      continue;
	    }

	    /**
	     * Double quotes
	     */

	    if (value === '"') {
	      state.quotes = state.quotes === 1 ? 0 : 1;
	      if (opts.keepQuotes === true) {
	        push({ type: 'text', value });
	      }
	      continue;
	    }

	    /**
	     * Parentheses
	     */

	    if (value === '(') {
	      increment('parens');
	      push({ type: 'paren', value });
	      continue;
	    }

	    if (value === ')') {
	      if (state.parens === 0 && opts.strictBrackets === true) {
	        throw new SyntaxError(syntaxError('opening', '('));
	      }

	      const extglob = extglobs[extglobs.length - 1];
	      if (extglob && state.parens === extglob.parens + 1) {
	        extglobClose(extglobs.pop());
	        continue;
	      }

	      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
	      decrement('parens');
	      continue;
	    }

	    /**
	     * Square brackets
	     */

	    if (value === '[') {
	      if (opts.nobracket === true || !remaining().includes(']')) {
	        if (opts.nobracket !== true && opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('closing', ']'));
	        }

	        value = `\\${value}`;
	      } else {
	        increment('brackets');
	      }

	      push({ type: 'bracket', value });
	      continue;
	    }

	    if (value === ']') {
	      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      if (state.brackets === 0) {
	        if (opts.strictBrackets === true) {
	          throw new SyntaxError(syntaxError('opening', '['));
	        }

	        push({ type: 'text', value, output: `\\${value}` });
	        continue;
	      }

	      decrement('brackets');

	      const prevValue = prev.value.slice(1);
	      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
	        value = `/${value}`;
	      }

	      prev.value += value;
	      append({ value });

	      // when literal brackets are explicitly disabled
	      // assume we should match with a regex character class
	      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
	        continue;
	      }

	      const escaped = utils.escapeRegex(prev.value);
	      state.output = state.output.slice(0, -prev.value.length);

	      // when literal brackets are explicitly enabled
	      // assume we should escape the brackets to match literal characters
	      if (opts.literalBrackets === true) {
	        state.output += escaped;
	        prev.value = escaped;
	        continue;
	      }

	      // when the user specifies nothing, try to match both
	      prev.value = `(${capture}${escaped}|${prev.value})`;
	      state.output += prev.value;
	      continue;
	    }

	    /**
	     * Braces
	     */

	    if (value === '{' && opts.nobrace !== true) {
	      increment('braces');

	      const open = {
	        type: 'brace',
	        value,
	        output: '(',
	        outputIndex: state.output.length,
	        tokensIndex: state.tokens.length
	      };

	      braces.push(open);
	      push(open);
	      continue;
	    }

	    if (value === '}') {
	      const brace = braces[braces.length - 1];

	      if (opts.nobrace === true || !brace) {
	        push({ type: 'text', value, output: value });
	        continue;
	      }

	      let output = ')';

	      if (brace.dots === true) {
	        const arr = tokens.slice();
	        const range = [];

	        for (let i = arr.length - 1; i >= 0; i--) {
	          tokens.pop();
	          if (arr[i].type === 'brace') {
	            break;
	          }
	          if (arr[i].type !== 'dots') {
	            range.unshift(arr[i].value);
	          }
	        }

	        output = expandRange(range, opts);
	        state.backtrack = true;
	      }

	      if (brace.comma !== true && brace.dots !== true) {
	        const out = state.output.slice(0, brace.outputIndex);
	        const toks = state.tokens.slice(brace.tokensIndex);
	        brace.value = brace.output = '\\{';
	        value = output = '\\}';
	        state.output = out;
	        for (const t of toks) {
	          state.output += (t.output || t.value);
	        }
	      }

	      push({ type: 'brace', value, output });
	      decrement('braces');
	      braces.pop();
	      continue;
	    }

	    /**
	     * Pipes
	     */

	    if (value === '|') {
	      if (extglobs.length > 0) {
	        extglobs[extglobs.length - 1].conditions++;
	      }
	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Commas
	     */

	    if (value === ',') {
	      let output = value;

	      const brace = braces[braces.length - 1];
	      if (brace && stack[stack.length - 1] === 'braces') {
	        brace.comma = true;
	        output = '|';
	      }

	      push({ type: 'comma', value, output });
	      continue;
	    }

	    /**
	     * Slashes
	     */

	    if (value === '/') {
	      // if the beginning of the glob is "./", advance the start
	      // to the current index, and don't add the "./" characters
	      // to the state. This greatly simplifies lookbehinds when
	      // checking for BOS characters like "!" and "." (not "./")
	      if (prev.type === 'dot' && state.index === state.start + 1) {
	        state.start = state.index + 1;
	        state.consumed = '';
	        state.output = '';
	        tokens.pop();
	        prev = bos; // reset "prev" to the first token
	        continue;
	      }

	      push({ type: 'slash', value, output: SLASH_LITERAL });
	      continue;
	    }

	    /**
	     * Dots
	     */

	    if (value === '.') {
	      if (state.braces > 0 && prev.type === 'dot') {
	        if (prev.value === '.') prev.output = DOT_LITERAL;
	        const brace = braces[braces.length - 1];
	        prev.type = 'dots';
	        prev.output += value;
	        prev.value += value;
	        brace.dots = true;
	        continue;
	      }

	      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
	        push({ type: 'text', value, output: DOT_LITERAL });
	        continue;
	      }

	      push({ type: 'dot', value, output: DOT_LITERAL });
	      continue;
	    }

	    /**
	     * Question marks
	     */

	    if (value === '?') {
	      const isGroup = prev && prev.value === '(';
	      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('qmark', value);
	        continue;
	      }

	      if (prev && prev.type === 'paren') {
	        const next = peek();
	        let output = value;

	        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
	          output = `\\${value}`;
	        }

	        push({ type: 'text', value, output });
	        continue;
	      }

	      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
	        push({ type: 'qmark', value, output: QMARK_NO_DOT });
	        continue;
	      }

	      push({ type: 'qmark', value, output: QMARK });
	      continue;
	    }

	    /**
	     * Exclamation
	     */

	    if (value === '!') {
	      if (opts.noextglob !== true && peek() === '(') {
	        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
	          extglobOpen('negate', value);
	          continue;
	        }
	      }

	      if (opts.nonegate !== true && state.index === 0) {
	        negate();
	        continue;
	      }
	    }

	    /**
	     * Plus
	     */

	    if (value === '+') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        extglobOpen('plus', value);
	        continue;
	      }

	      if ((prev && prev.value === '(') || opts.regex === false) {
	        push({ type: 'plus', value, output: PLUS_LITERAL });
	        continue;
	      }

	      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
	        push({ type: 'plus', value });
	        continue;
	      }

	      push({ type: 'plus', value: PLUS_LITERAL });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value === '@') {
	      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
	        push({ type: 'at', extglob: true, value, output: '' });
	        continue;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Plain text
	     */

	    if (value !== '*') {
	      if (value === '$' || value === '^') {
	        value = `\\${value}`;
	      }

	      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
	      if (match) {
	        value += match[0];
	        state.index += match[0].length;
	      }

	      push({ type: 'text', value });
	      continue;
	    }

	    /**
	     * Stars
	     */

	    if (prev && (prev.type === 'globstar' || prev.star === true)) {
	      prev.type = 'star';
	      prev.star = true;
	      prev.value += value;
	      prev.output = star;
	      state.backtrack = true;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    let rest = remaining();
	    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
	      extglobOpen('star', value);
	      continue;
	    }

	    if (prev.type === 'star') {
	      if (opts.noglobstar === true) {
	        consume(value);
	        continue;
	      }

	      const prior = prev.prev;
	      const before = prior.prev;
	      const isStart = prior.type === 'slash' || prior.type === 'bos';
	      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

	      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
	      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
	      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
	        push({ type: 'star', value, output: '' });
	        continue;
	      }

	      // strip consecutive `/**/`
	      while (rest.slice(0, 3) === '/**') {
	        const after = input[state.index + 4];
	        if (after && after !== '/') {
	          break;
	        }
	        rest = rest.slice(3);
	        consume('/**', 3);
	      }

	      if (prior.type === 'bos' && eos()) {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = globstar(opts);
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
	        prev.value += value;
	        state.globstar = true;
	        state.output += prior.output + prev.output;
	        consume(value);
	        continue;
	      }

	      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
	        const end = rest[1] !== void 0 ? '|$' : '';

	        state.output = state.output.slice(0, -(prior.output + prev.output).length);
	        prior.output = `(?:${prior.output}`;

	        prev.type = 'globstar';
	        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
	        prev.value += value;

	        state.output += prior.output + prev.output;
	        state.globstar = true;

	        consume(value + advance());

	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      if (prior.type === 'bos' && rest[0] === '/') {
	        prev.type = 'globstar';
	        prev.value += value;
	        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
	        state.output = prev.output;
	        state.globstar = true;
	        consume(value + advance());
	        push({ type: 'slash', value: '/', output: '' });
	        continue;
	      }

	      // remove single star from output
	      state.output = state.output.slice(0, -prev.output.length);

	      // reset previous token to globstar
	      prev.type = 'globstar';
	      prev.output = globstar(opts);
	      prev.value += value;

	      // reset output with globstar
	      state.output += prev.output;
	      state.globstar = true;
	      consume(value);
	      continue;
	    }

	    const token = { type: 'star', value, output: star };

	    if (opts.bash === true) {
	      token.output = '.*?';
	      if (prev.type === 'bos' || prev.type === 'slash') {
	        token.output = nodot + token.output;
	      }
	      push(token);
	      continue;
	    }

	    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
	      token.output = value;
	      push(token);
	      continue;
	    }

	    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
	      if (prev.type === 'dot') {
	        state.output += NO_DOT_SLASH;
	        prev.output += NO_DOT_SLASH;

	      } else if (opts.dot === true) {
	        state.output += NO_DOTS_SLASH;
	        prev.output += NO_DOTS_SLASH;

	      } else {
	        state.output += nodot;
	        prev.output += nodot;
	      }

	      if (peek() !== '*') {
	        state.output += ONE_CHAR;
	        prev.output += ONE_CHAR;
	      }
	    }

	    push(token);
	  }

	  while (state.brackets > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
	    state.output = utils.escapeLast(state.output, '[');
	    decrement('brackets');
	  }

	  while (state.parens > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
	    state.output = utils.escapeLast(state.output, '(');
	    decrement('parens');
	  }

	  while (state.braces > 0) {
	    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
	    state.output = utils.escapeLast(state.output, '{');
	    decrement('braces');
	  }

	  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
	    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
	  }

	  // rebuild the output if we had to backtrack at any point
	  if (state.backtrack === true) {
	    state.output = '';

	    for (const token of state.tokens) {
	      state.output += token.output != null ? token.output : token.value;

	      if (token.suffix) {
	        state.output += token.suffix;
	      }
	    }
	  }

	  return state;
	};

	/**
	 * Fast paths for creating regular expressions for common glob patterns.
	 * This can significantly speed up processing and has very little downside
	 * impact when none of the fast paths match.
	 */

	parse.fastpaths = (input, options) => {
	  const opts = { ...options };
	  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
	  const len = input.length;
	  if (len > max) {
	    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
	  }

	  input = REPLACEMENTS[input] || input;

	  // create constants based on platform, for windows or posix
	  const {
	    DOT_LITERAL,
	    SLASH_LITERAL,
	    ONE_CHAR,
	    DOTS_SLASH,
	    NO_DOT,
	    NO_DOTS,
	    NO_DOTS_SLASH,
	    STAR,
	    START_ANCHOR
	  } = constants.globChars(opts.windows);

	  const nodot = opts.dot ? NO_DOTS : NO_DOT;
	  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
	  const capture = opts.capture ? '' : '?:';
	  const state = { negated: false, prefix: '' };
	  let star = opts.bash === true ? '.*?' : STAR;

	  if (opts.capture) {
	    star = `(${star})`;
	  }

	  const globstar = opts => {
	    if (opts.noglobstar === true) return star;
	    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
	  };

	  const create = str => {
	    switch (str) {
	      case '*':
	        return `${nodot}${ONE_CHAR}${star}`;

	      case '.*':
	        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*.*':
	        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '*/*':
	        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

	      case '**':
	        return nodot + globstar(opts);

	      case '**/*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

	      case '**/*.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

	      case '**/.*':
	        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

	      default: {
	        const match = /^(.*?)\.(\w+)$/.exec(str);
	        if (!match) return;

	        const source = create(match[1]);
	        if (!source) return;

	        return source + DOT_LITERAL + match[2];
	      }
	    }
	  };

	  const output = utils.removePrefix(input, state);
	  let source = create(output);

	  if (source && opts.strictSlashes !== true) {
	    source += `${SLASH_LITERAL}?`;
	  }

	  return source;
	};

	parse_1 = parse;
	return parse_1;
}

var picomatch_1$1;
var hasRequiredPicomatch$1;

function requirePicomatch$1 () {
	if (hasRequiredPicomatch$1) return picomatch_1$1;
	hasRequiredPicomatch$1 = 1;

	const scan = /*@__PURE__*/ requireScan();
	const parse = /*@__PURE__*/ requireParse();
	const utils = /*@__PURE__*/ requireUtils();
	const constants = /*@__PURE__*/ requireConstants();
	const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

	/**
	 * Creates a matcher function from one or more glob patterns. The
	 * returned function takes a string to match as its first argument,
	 * and returns true if the string is a match. The returned matcher
	 * function also takes a boolean as the second argument that, when true,
	 * returns an object with additional information.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch(glob[, options]);
	 *
	 * const isMatch = picomatch('*.!(*a)');
	 * console.log(isMatch('a.a')); //=> false
	 * console.log(isMatch('a.b')); //=> true
	 * ```
	 * @name picomatch
	 * @param {String|Array} `globs` One or more glob patterns.
	 * @param {Object=} `options`
	 * @return {Function=} Returns a matcher function.
	 * @api public
	 */

	const picomatch = (glob, options, returnState = false) => {
	  if (Array.isArray(glob)) {
	    const fns = glob.map(input => picomatch(input, options, returnState));
	    const arrayMatcher = str => {
	      for (const isMatch of fns) {
	        const state = isMatch(str);
	        if (state) return state;
	      }
	      return false;
	    };
	    return arrayMatcher;
	  }

	  const isState = isObject(glob) && glob.tokens && glob.input;

	  if (glob === '' || (typeof glob !== 'string' && !isState)) {
	    throw new TypeError('Expected pattern to be a non-empty string');
	  }

	  const opts = options || {};
	  const posix = opts.windows;
	  const regex = isState
	    ? picomatch.compileRe(glob, options)
	    : picomatch.makeRe(glob, options, false, true);

	  const state = regex.state;
	  delete regex.state;

	  let isIgnored = () => false;
	  if (opts.ignore) {
	    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
	    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
	  }

	  const matcher = (input, returnObject = false) => {
	    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
	    const result = { glob, state, regex, posix, input, output, match, isMatch };

	    if (typeof opts.onResult === 'function') {
	      opts.onResult(result);
	    }

	    if (isMatch === false) {
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (isIgnored(input)) {
	      if (typeof opts.onIgnore === 'function') {
	        opts.onIgnore(result);
	      }
	      result.isMatch = false;
	      return returnObject ? result : false;
	    }

	    if (typeof opts.onMatch === 'function') {
	      opts.onMatch(result);
	    }
	    return returnObject ? result : true;
	  };

	  if (returnState) {
	    matcher.state = state;
	  }

	  return matcher;
	};

	/**
	 * Test `input` with the given `regex`. This is used by the main
	 * `picomatch()` function to test the input string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.test(input, regex[, options]);
	 *
	 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
	 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp} `regex`
	 * @return {Object} Returns an object with matching info.
	 * @api public
	 */

	picomatch.test = (input, regex, options, { glob, posix } = {}) => {
	  if (typeof input !== 'string') {
	    throw new TypeError('Expected input to be a string');
	  }

	  if (input === '') {
	    return { isMatch: false, output: '' };
	  }

	  const opts = options || {};
	  const format = opts.format || (posix ? utils.toPosixSlashes : null);
	  let match = input === glob;
	  let output = (match && format) ? format(input) : input;

	  if (match === false) {
	    output = format ? format(input) : input;
	    match = output === glob;
	  }

	  if (match === false || opts.capture === true) {
	    if (opts.matchBase === true || opts.basename === true) {
	      match = picomatch.matchBase(input, regex, options, posix);
	    } else {
	      match = regex.exec(output);
	    }
	  }

	  return { isMatch: Boolean(match), match, output };
	};

	/**
	 * Match the basename of a filepath.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.matchBase(input, glob[, options]);
	 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
	 * ```
	 * @param {String} `input` String to test.
	 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
	 * @return {Boolean}
	 * @api public
	 */

	picomatch.matchBase = (input, glob, options) => {
	  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
	  return regex.test(utils.basename(input));
	};

	/**
	 * Returns true if **any** of the given glob `patterns` match the specified `string`.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.isMatch(string, patterns[, options]);
	 *
	 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
	 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
	 * ```
	 * @param {String|Array} str The string to test.
	 * @param {String|Array} patterns One or more glob patterns to use for matching.
	 * @param {Object} [options] See available [options](#options).
	 * @return {Boolean} Returns true if any patterns match `str`
	 * @api public
	 */

	picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

	/**
	 * Parse a glob pattern to create the source string for a regular
	 * expression.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const result = picomatch.parse(pattern[, options]);
	 * ```
	 * @param {String} `pattern`
	 * @param {Object} `options`
	 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
	 * @api public
	 */

	picomatch.parse = (pattern, options) => {
	  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
	  return parse(pattern, { ...options, fastpaths: false });
	};

	/**
	 * Scan a glob pattern to separate the pattern into segments.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.scan(input[, options]);
	 *
	 * const result = picomatch.scan('!./foo/*.js');
	 * console.log(result);
	 * { prefix: '!./',
	 *   input: '!./foo/*.js',
	 *   start: 3,
	 *   base: 'foo',
	 *   glob: '*.js',
	 *   isBrace: false,
	 *   isBracket: false,
	 *   isGlob: true,
	 *   isExtglob: false,
	 *   isGlobstar: false,
	 *   negated: true }
	 * ```
	 * @param {String} `input` Glob pattern to scan.
	 * @param {Object} `options`
	 * @return {Object} Returns an object with
	 * @api public
	 */

	picomatch.scan = (input, options) => scan(input, options);

	/**
	 * Compile a regular expression from the `state` object returned by the
	 * [parse()](#parse) method.
	 *
	 * @param {Object} `state`
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Intended for implementors, this argument allows you to return the raw output from the parser.
	 * @param {Boolean} `returnState` Adds the state to a `state` property on the returned regex. Useful for implementors and debugging.
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
	  if (returnOutput === true) {
	    return state.output;
	  }

	  const opts = options || {};
	  const prepend = opts.contains ? '' : '^';
	  const append = opts.contains ? '' : '$';

	  let source = `${prepend}(?:${state.output})${append}`;
	  if (state && state.negated === true) {
	    source = `^(?!${source}).*$`;
	  }

	  const regex = picomatch.toRegex(source, options);
	  if (returnState === true) {
	    regex.state = state;
	  }

	  return regex;
	};

	/**
	 * Create a regular expression from a parsed glob pattern.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * const state = picomatch.parse('*.js');
	 * // picomatch.compileRe(state[, options]);
	 *
	 * console.log(picomatch.compileRe(state));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `state` The object returned from the `.parse` method.
	 * @param {Object} `options`
	 * @param {Boolean} `returnOutput` Implementors may use this argument to return the compiled output, instead of a regular expression. This is not exposed on the options to prevent end-users from mutating the result.
	 * @param {Boolean} `returnState` Implementors may use this argument to return the state from the parsed glob with the returned regular expression.
	 * @return {RegExp} Returns a regex created from the given pattern.
	 * @api public
	 */

	picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
	  if (!input || typeof input !== 'string') {
	    throw new TypeError('Expected a non-empty string');
	  }

	  let parsed = { negated: false, fastpaths: true };

	  if (options.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
	    parsed.output = parse.fastpaths(input, options);
	  }

	  if (!parsed.output) {
	    parsed = parse(input, options);
	  }

	  return picomatch.compileRe(parsed, options, returnOutput, returnState);
	};

	/**
	 * Create a regular expression from the given regex source string.
	 *
	 * ```js
	 * const picomatch = require('picomatch');
	 * // picomatch.toRegex(source[, options]);
	 *
	 * const { output } = picomatch.parse('*.js');
	 * console.log(picomatch.toRegex(output));
	 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
	 * ```
	 * @param {String} `source` Regular expression source string.
	 * @param {Object} `options`
	 * @return {RegExp}
	 * @api public
	 */

	picomatch.toRegex = (source, options) => {
	  try {
	    const opts = options || {};
	    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
	  } catch (err) {
	    if (options && options.debug === true) throw err;
	    return /$^/;
	  }
	};

	/**
	 * Picomatch constants.
	 * @return {Object}
	 */

	picomatch.constants = constants;

	/**
	 * Expose "picomatch"
	 */

	picomatch_1$1 = picomatch;
	return picomatch_1$1;
}

var picomatch_1;
var hasRequiredPicomatch;

function requirePicomatch () {
	if (hasRequiredPicomatch) return picomatch_1;
	hasRequiredPicomatch = 1;

	const pico = /*@__PURE__*/ requirePicomatch$1();
	const utils = /*@__PURE__*/ requireUtils();

	function picomatch(glob, options, returnState = false) {
	  // default to os.platform()
	  if (options && (options.windows === null || options.windows === undefined)) {
	    // don't mutate the original options object
	    options = { ...options, windows: utils.isWindows() };
	  }

	  return pico(glob, options, returnState);
	}

	Object.assign(picomatch, pico);
	picomatch_1 = picomatch;
	return picomatch_1;
}

var picomatchExports = /*@__PURE__*/ requirePicomatch();
const picomatch = /*@__PURE__*/getDefaultExportFromCjs(picomatchExports);

var url = {};

var punycode$1 = {exports: {}};

/*! https://mths.be/punycode v1.3.2 by @mathias */
var punycode = punycode$1.exports;

var hasRequiredPunycode;

function requirePunycode () {
	if (hasRequiredPunycode) return punycode$1.exports;
	hasRequiredPunycode = 1;
	(function (module, exports) {
(function(root) {

			/** Detect free variables */
			var freeExports = exports &&
				!exports.nodeType && exports;
			var freeModule = module &&
				!module.nodeType && module;
			var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
			if (
				freeGlobal.global === freeGlobal ||
				freeGlobal.window === freeGlobal ||
				freeGlobal.self === freeGlobal
			) {
				root = freeGlobal;
			}

			/**
			 * The `punycode` object.
			 * @name punycode
			 * @type Object
			 */
			var punycode,

			/** Highest positive signed 32-bit float value */
			maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

			/** Bootstring parameters */
			base = 36,
			tMin = 1,
			tMax = 26,
			skew = 38,
			damp = 700,
			initialBias = 72,
			initialN = 128, // 0x80
			delimiter = '-', // '\x2D'

			/** Regular expressions */
			regexPunycode = /^xn--/,
			regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
			regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

			/** Error messages */
			errors = {
				'overflow': 'Overflow: input needs wider integers to process',
				'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
				'invalid-input': 'Invalid input'
			},

			/** Convenience shortcuts */
			baseMinusTMin = base - tMin,
			floor = Math.floor,
			stringFromCharCode = String.fromCharCode,

			/** Temporary variable */
			key;

			/*--------------------------------------------------------------------------*/

			/**
			 * A generic error utility function.
			 * @private
			 * @param {String} type The error type.
			 * @returns {Error} Throws a `RangeError` with the applicable error message.
			 */
			function error(type) {
				throw RangeError(errors[type]);
			}

			/**
			 * A generic `Array#map` utility function.
			 * @private
			 * @param {Array} array The array to iterate over.
			 * @param {Function} callback The function that gets called for every array
			 * item.
			 * @returns {Array} A new array of values returned by the callback function.
			 */
			function map(array, fn) {
				var length = array.length;
				var result = [];
				while (length--) {
					result[length] = fn(array[length]);
				}
				return result;
			}

			/**
			 * A simple `Array#map`-like wrapper to work with domain name strings or email
			 * addresses.
			 * @private
			 * @param {String} domain The domain name or email address.
			 * @param {Function} callback The function that gets called for every
			 * character.
			 * @returns {Array} A new string of characters returned by the callback
			 * function.
			 */
			function mapDomain(string, fn) {
				var parts = string.split('@');
				var result = '';
				if (parts.length > 1) {
					// In email addresses, only the domain name should be punycoded. Leave
					// the local part (i.e. everything up to `@`) intact.
					result = parts[0] + '@';
					string = parts[1];
				}
				// Avoid `split(regex)` for IE8 compatibility. See #17.
				string = string.replace(regexSeparators, '\x2E');
				var labels = string.split('.');
				var encoded = map(labels, fn).join('.');
				return result + encoded;
			}

			/**
			 * Creates an array containing the numeric code points of each Unicode
			 * character in the string. While JavaScript uses UCS-2 internally,
			 * this function will convert a pair of surrogate halves (each of which
			 * UCS-2 exposes as separate characters) into a single code point,
			 * matching UTF-16.
			 * @see `punycode.ucs2.encode`
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode.ucs2
			 * @name decode
			 * @param {String} string The Unicode input string (UCS-2).
			 * @returns {Array} The new array of code points.
			 */
			function ucs2decode(string) {
				var output = [],
				    counter = 0,
				    length = string.length,
				    value,
				    extra;
				while (counter < length) {
					value = string.charCodeAt(counter++);
					if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
						// high surrogate, and there is a next character
						extra = string.charCodeAt(counter++);
						if ((extra & 0xFC00) == 0xDC00) { // low surrogate
							output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
						} else {
							// unmatched surrogate; only append this code unit, in case the next
							// code unit is the high surrogate of a surrogate pair
							output.push(value);
							counter--;
						}
					} else {
						output.push(value);
					}
				}
				return output;
			}

			/**
			 * Creates a string based on an array of numeric code points.
			 * @see `punycode.ucs2.decode`
			 * @memberOf punycode.ucs2
			 * @name encode
			 * @param {Array} codePoints The array of numeric code points.
			 * @returns {String} The new Unicode string (UCS-2).
			 */
			function ucs2encode(array) {
				return map(array, function(value) {
					var output = '';
					if (value > 0xFFFF) {
						value -= 0x10000;
						output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
						value = 0xDC00 | value & 0x3FF;
					}
					output += stringFromCharCode(value);
					return output;
				}).join('');
			}

			/**
			 * Converts a basic code point into a digit/integer.
			 * @see `digitToBasic()`
			 * @private
			 * @param {Number} codePoint The basic numeric code point value.
			 * @returns {Number} The numeric value of a basic code point (for use in
			 * representing integers) in the range `0` to `base - 1`, or `base` if
			 * the code point does not represent a value.
			 */
			function basicToDigit(codePoint) {
				if (codePoint - 48 < 10) {
					return codePoint - 22;
				}
				if (codePoint - 65 < 26) {
					return codePoint - 65;
				}
				if (codePoint - 97 < 26) {
					return codePoint - 97;
				}
				return base;
			}

			/**
			 * Converts a digit/integer into a basic code point.
			 * @see `basicToDigit()`
			 * @private
			 * @param {Number} digit The numeric value of a basic code point.
			 * @returns {Number} The basic code point whose value (when used for
			 * representing integers) is `digit`, which needs to be in the range
			 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
			 * used; else, the lowercase form is used. The behavior is undefined
			 * if `flag` is non-zero and `digit` has no uppercase form.
			 */
			function digitToBasic(digit, flag) {
				//  0..25 map to ASCII a..z or A..Z
				// 26..35 map to ASCII 0..9
				return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
			}

			/**
			 * Bias adaptation function as per section 3.4 of RFC 3492.
			 * http://tools.ietf.org/html/rfc3492#section-3.4
			 * @private
			 */
			function adapt(delta, numPoints, firstTime) {
				var k = 0;
				delta = firstTime ? floor(delta / damp) : delta >> 1;
				delta += floor(delta / numPoints);
				for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
					delta = floor(delta / baseMinusTMin);
				}
				return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
			}

			/**
			 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
			 * symbols.
			 * @memberOf punycode
			 * @param {String} input The Punycode string of ASCII-only symbols.
			 * @returns {String} The resulting string of Unicode symbols.
			 */
			function decode(input) {
				// Don't use UCS-2
				var output = [],
				    inputLength = input.length,
				    out,
				    i = 0,
				    n = initialN,
				    bias = initialBias,
				    basic,
				    j,
				    index,
				    oldi,
				    w,
				    k,
				    digit,
				    t,
				    /** Cached calculation results */
				    baseMinusT;

				// Handle the basic code points: let `basic` be the number of input code
				// points before the last delimiter, or `0` if there is none, then copy
				// the first basic code points to the output.

				basic = input.lastIndexOf(delimiter);
				if (basic < 0) {
					basic = 0;
				}

				for (j = 0; j < basic; ++j) {
					// if it's not a basic code point
					if (input.charCodeAt(j) >= 0x80) {
						error('not-basic');
					}
					output.push(input.charCodeAt(j));
				}

				// Main decoding loop: start just after the last delimiter if any basic code
				// points were copied; start at the beginning otherwise.

				for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

					// `index` is the index of the next character to be consumed.
					// Decode a generalized variable-length integer into `delta`,
					// which gets added to `i`. The overflow checking is easier
					// if we increase `i` as we go, then subtract off its starting
					// value at the end to obtain `delta`.
					for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

						if (index >= inputLength) {
							error('invalid-input');
						}

						digit = basicToDigit(input.charCodeAt(index++));

						if (digit >= base || digit > floor((maxInt - i) / w)) {
							error('overflow');
						}

						i += digit * w;
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

						if (digit < t) {
							break;
						}

						baseMinusT = base - t;
						if (w > floor(maxInt / baseMinusT)) {
							error('overflow');
						}

						w *= baseMinusT;

					}

					out = output.length + 1;
					bias = adapt(i - oldi, out, oldi == 0);

					// `i` was supposed to wrap around from `out` to `0`,
					// incrementing `n` each time, so we'll fix that now:
					if (floor(i / out) > maxInt - n) {
						error('overflow');
					}

					n += floor(i / out);
					i %= out;

					// Insert `n` at position `i` of the output
					output.splice(i++, 0, n);

				}

				return ucs2encode(output);
			}

			/**
			 * Converts a string of Unicode symbols (e.g. a domain name label) to a
			 * Punycode string of ASCII-only symbols.
			 * @memberOf punycode
			 * @param {String} input The string of Unicode symbols.
			 * @returns {String} The resulting Punycode string of ASCII-only symbols.
			 */
			function encode(input) {
				var n,
				    delta,
				    handledCPCount,
				    basicLength,
				    bias,
				    j,
				    m,
				    q,
				    k,
				    t,
				    currentValue,
				    output = [],
				    /** `inputLength` will hold the number of code points in `input`. */
				    inputLength,
				    /** Cached calculation results */
				    handledCPCountPlusOne,
				    baseMinusT,
				    qMinusT;

				// Convert the input in UCS-2 to Unicode
				input = ucs2decode(input);

				// Cache the length
				inputLength = input.length;

				// Initialize the state
				n = initialN;
				delta = 0;
				bias = initialBias;

				// Handle the basic code points
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue < 0x80) {
						output.push(stringFromCharCode(currentValue));
					}
				}

				handledCPCount = basicLength = output.length;

				// `handledCPCount` is the number of code points that have been handled;
				// `basicLength` is the number of basic code points.

				// Finish the basic string - if it is not empty - with a delimiter
				if (basicLength) {
					output.push(delimiter);
				}

				// Main encoding loop:
				while (handledCPCount < inputLength) {

					// All non-basic code points < n have been handled already. Find the next
					// larger one:
					for (m = maxInt, j = 0; j < inputLength; ++j) {
						currentValue = input[j];
						if (currentValue >= n && currentValue < m) {
							m = currentValue;
						}
					}

					// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
					// but guard against overflow
					handledCPCountPlusOne = handledCPCount + 1;
					if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
						error('overflow');
					}

					delta += (m - n) * handledCPCountPlusOne;
					n = m;

					for (j = 0; j < inputLength; ++j) {
						currentValue = input[j];

						if (currentValue < n && ++delta > maxInt) {
							error('overflow');
						}

						if (currentValue == n) {
							// Represent delta as a generalized variable-length integer
							for (q = delta, k = base; /* no condition */; k += base) {
								t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
								if (q < t) {
									break;
								}
								qMinusT = q - t;
								baseMinusT = base - t;
								output.push(
									stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
								);
								q = floor(qMinusT / baseMinusT);
							}

							output.push(stringFromCharCode(digitToBasic(q, 0)));
							bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
							delta = 0;
							++handledCPCount;
						}
					}

					++delta;
					++n;

				}
				return output.join('');
			}

			/**
			 * Converts a Punycode string representing a domain name or an email address
			 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
			 * it doesn't matter if you call it on a string that has already been
			 * converted to Unicode.
			 * @memberOf punycode
			 * @param {String} input The Punycoded domain name or email address to
			 * convert to Unicode.
			 * @returns {String} The Unicode representation of the given Punycode
			 * string.
			 */
			function toUnicode(input) {
				return mapDomain(input, function(string) {
					return regexPunycode.test(string)
						? decode(string.slice(4).toLowerCase())
						: string;
				});
			}

			/**
			 * Converts a Unicode string representing a domain name or an email address to
			 * Punycode. Only the non-ASCII parts of the domain name will be converted,
			 * i.e. it doesn't matter if you call it with a domain that's already in
			 * ASCII.
			 * @memberOf punycode
			 * @param {String} input The domain name or email address to convert, as a
			 * Unicode string.
			 * @returns {String} The Punycode representation of the given domain name or
			 * email address.
			 */
			function toASCII(input) {
				return mapDomain(input, function(string) {
					return regexNonASCII.test(string)
						? 'xn--' + encode(string)
						: string;
				});
			}

			/*--------------------------------------------------------------------------*/

			/** Define the public API */
			punycode = {
				/**
				 * A string representing the current Punycode.js version number.
				 * @memberOf punycode
				 * @type String
				 */
				'version': '1.3.2',
				/**
				 * An object of methods to convert from JavaScript's internal character
				 * representation (UCS-2) to Unicode code points, and back.
				 * @see <https://mathiasbynens.be/notes/javascript-encoding>
				 * @memberOf punycode
				 * @type Object
				 */
				'ucs2': {
					'decode': ucs2decode,
					'encode': ucs2encode
				},
				'decode': decode,
				'encode': encode,
				'toASCII': toASCII,
				'toUnicode': toUnicode
			};

			/** Expose `punycode` */
			// Some AMD build optimizers, like r.js, check for specific condition patterns
			// like the following:
			if (freeExports && freeModule) {
				if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
					freeModule.exports = punycode;
				} else { // in Narwhal or RingoJS v0.7.0-
					for (key in punycode) {
						punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
					}
				}
			} else { // in Rhino or a web browser
				root.punycode = punycode;
			}

		}(punycode)); 
	} (punycode$1, punycode$1.exports));
	return punycode$1.exports;
}

var querystring = {};

var decode;
var hasRequiredDecode;

function requireDecode () {
	if (hasRequiredDecode) return decode;
	hasRequiredDecode = 1;

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	decode = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};
	return decode;
}

var encode;
var hasRequiredEncode;

function requireEncode () {
	if (hasRequiredEncode) return encode;
	hasRequiredEncode = 1;

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	encode = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};
	return encode;
}

var hasRequiredQuerystring;

function requireQuerystring () {
	if (hasRequiredQuerystring) return querystring;
	hasRequiredQuerystring = 1;

	querystring.decode = querystring.parse = requireDecode();
	querystring.encode = querystring.stringify = requireEncode();
	return querystring;
}

var hasRequiredUrl;

function requireUrl () {
	if (hasRequiredUrl) return url;
	hasRequiredUrl = 1;
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var punycode = requirePunycode();

	url.parse = urlParse;
	url.resolve = urlResolve;
	url.resolveObject = urlResolveObject;
	url.format = urlFormat;

	url.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = requireQuerystring();

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};

	function isString(arg) {
	  return typeof arg === "string";
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}
	return url;
}

var urlExports = requireUrl();

//#region rolldown:runtime
var __require = /* @__PURE__ */ createRequire(import.meta.url);

//#endregion
//#region src/utils.ts
function cleanPath(path) {
	let normalized = normalize(path);
	if (normalized.length > 1 && normalized[normalized.length - 1] === sep) normalized = normalized.substring(0, normalized.length - 1);
	return normalized;
}
const SLASHES_REGEX = /[\\/]/g;
function convertSlashes(path, separator) {
	return path.replace(SLASHES_REGEX, separator);
}
const WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
function isRootDirectory(path) {
	return path === "/" || WINDOWS_ROOT_DIR_REGEX.test(path);
}
function normalizePath(path, options) {
	const { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options;
	const pathNeedsCleaning = process.platform === "win32" && path.includes("/") || path.startsWith(".");
	if (resolvePaths) path = resolve(path);
	if (normalizePath$1 || pathNeedsCleaning) path = cleanPath(path);
	if (path === ".") return "";
	const needsSeperator = path[path.length - 1] !== pathSeparator;
	return convertSlashes(needsSeperator ? path + pathSeparator : path, pathSeparator);
}

//#endregion
//#region src/api/functions/join-path.ts
function joinPathWithBasePath(filename, directoryPath) {
	return directoryPath + filename;
}
function joinPathWithRelativePath(root, options) {
	return function(filename, directoryPath) {
		const sameRoot = directoryPath.startsWith(root);
		if (sameRoot) return directoryPath.slice(root.length) + filename;
		else return convertSlashes(relative(root, directoryPath), options.pathSeparator) + options.pathSeparator + filename;
	};
}
function joinPath(filename) {
	return filename;
}
function joinDirectoryPath(filename, directoryPath, separator) {
	return directoryPath + filename + separator;
}
function build$7(root, options) {
	const { relativePaths, includeBasePath } = options;
	return relativePaths && root ? joinPathWithRelativePath(root, options) : includeBasePath ? joinPathWithBasePath : joinPath;
}

//#endregion
//#region src/api/functions/push-directory.ts
function pushDirectoryWithRelativePath(root) {
	return function(directoryPath, paths) {
		paths.push(directoryPath.substring(root.length) || ".");
	};
}
function pushDirectoryFilterWithRelativePath(root) {
	return function(directoryPath, paths, filters) {
		const relativePath = directoryPath.substring(root.length) || ".";
		if (filters.every((filter) => filter(relativePath, true))) paths.push(relativePath);
	};
}
const pushDirectory = (directoryPath, paths) => {
	paths.push(directoryPath || ".");
};
const pushDirectoryFilter = (directoryPath, paths, filters) => {
	const path = directoryPath || ".";
	if (filters.every((filter) => filter(path, true))) paths.push(path);
};
const empty$2 = () => {};
function build$6(root, options) {
	const { includeDirs, filters, relativePaths } = options;
	if (!includeDirs) return empty$2;
	if (relativePaths) return filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root);
	return filters && filters.length ? pushDirectoryFilter : pushDirectory;
}

//#endregion
//#region src/api/functions/push-file.ts
const pushFileFilterAndCount = (filename, _paths, counts, filters) => {
	if (filters.every((filter) => filter(filename, false))) counts.files++;
};
const pushFileFilter = (filename, paths, _counts, filters) => {
	if (filters.every((filter) => filter(filename, false))) paths.push(filename);
};
const pushFileCount = (_filename, _paths, counts, _filters) => {
	counts.files++;
};
const pushFile = (filename, paths) => {
	paths.push(filename);
};
const empty$1 = () => {};
function build$5(options) {
	const { excludeFiles, filters, onlyCounts } = options;
	if (excludeFiles) return empty$1;
	if (filters && filters.length) return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
	else if (onlyCounts) return pushFileCount;
	else return pushFile;
}

//#endregion
//#region src/api/functions/get-array.ts
const getArray = (paths) => {
	return paths;
};
const getArrayGroup = () => {
	return [""].slice(0, 0);
};
function build$4(options) {
	return options.group ? getArrayGroup : getArray;
}

//#endregion
//#region src/api/functions/group-files.ts
const groupFiles = (groups, directory, files) => {
	groups.push({
		directory,
		files,
		dir: directory
	});
};
const empty = () => {};
function build$3(options) {
	return options.group ? groupFiles : empty;
}

//#endregion
//#region src/api/functions/resolve-symlink.ts
const resolveSymlinksAsync = function(path, state, callback$1) {
	const { queue, fs, options: { suppressErrors } } = state;
	queue.enqueue();
	fs.realpath(path, (error, resolvedPath) => {
		if (error) return queue.dequeue(suppressErrors ? null : error, state);
		fs.stat(resolvedPath, (error$1, stat) => {
			if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
			if (stat.isDirectory() && isRecursive(path, resolvedPath, state)) return queue.dequeue(null, state);
			callback$1(stat, resolvedPath);
			queue.dequeue(null, state);
		});
	});
};
const resolveSymlinks = function(path, state, callback$1) {
	const { queue, fs, options: { suppressErrors } } = state;
	queue.enqueue();
	try {
		const resolvedPath = fs.realpathSync(path);
		const stat = fs.statSync(resolvedPath);
		if (stat.isDirectory() && isRecursive(path, resolvedPath, state)) return;
		callback$1(stat, resolvedPath);
	} catch (e) {
		if (!suppressErrors) throw e;
	}
};
function build$2(options, isSynchronous) {
	if (!options.resolveSymlinks || options.excludeSymlinks) return null;
	return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
}
function isRecursive(path, resolved, state) {
	if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
	let parent = dirname(path);
	let depth = 1;
	while (parent !== state.root && depth < 2) {
		const resolvedPath = state.symlinks.get(parent);
		const isSameRoot = !!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath));
		if (isSameRoot) depth++;
		else parent = dirname(parent);
	}
	state.symlinks.set(path, resolved);
	return depth > 1;
}
function isRecursiveUsingRealPaths(resolved, state) {
	return state.visited.includes(resolved + state.options.pathSeparator);
}

//#endregion
//#region src/api/functions/invoke-callback.ts
const onlyCountsSync = (state) => {
	return state.counts;
};
const groupsSync = (state) => {
	return state.groups;
};
const defaultSync = (state) => {
	return state.paths;
};
const limitFilesSync = (state) => {
	return state.paths.slice(0, state.options.maxFiles);
};
const onlyCountsAsync = (state, error, callback$1) => {
	report(error, callback$1, state.counts, state.options.suppressErrors);
	return null;
};
const defaultAsync = (state, error, callback$1) => {
	report(error, callback$1, state.paths, state.options.suppressErrors);
	return null;
};
const limitFilesAsync = (state, error, callback$1) => {
	report(error, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
	return null;
};
const groupsAsync = (state, error, callback$1) => {
	report(error, callback$1, state.groups, state.options.suppressErrors);
	return null;
};
function report(error, callback$1, output, suppressErrors) {
	if (error && !suppressErrors) callback$1(error, output);
	else callback$1(null, output);
}
function build$1(options, isSynchronous) {
	const { onlyCounts, group, maxFiles } = options;
	if (onlyCounts) return isSynchronous ? onlyCountsSync : onlyCountsAsync;
	else if (group) return isSynchronous ? groupsSync : groupsAsync;
	else if (maxFiles) return isSynchronous ? limitFilesSync : limitFilesAsync;
	else return isSynchronous ? defaultSync : defaultAsync;
}

//#endregion
//#region src/api/functions/walk-directory.ts
const readdirOpts = { withFileTypes: true };
const walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
	state.queue.enqueue();
	if (currentDepth < 0) return state.queue.dequeue(null, state);
	const { fs } = state;
	state.visited.push(crawlPath);
	state.counts.directories++;
	fs.readdir(crawlPath || ".", readdirOpts, (error, entries = []) => {
		callback$1(entries, directoryPath, currentDepth);
		state.queue.dequeue(state.options.suppressErrors ? null : error, state);
	});
};
const walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
	const { fs } = state;
	if (currentDepth < 0) return;
	state.visited.push(crawlPath);
	state.counts.directories++;
	let entries = [];
	try {
		entries = fs.readdirSync(crawlPath || ".", readdirOpts);
	} catch (e) {
		if (!state.options.suppressErrors) throw e;
	}
	callback$1(entries, directoryPath, currentDepth);
};
function build(isSynchronous) {
	return isSynchronous ? walkSync : walkAsync;
}

//#endregion
//#region src/api/queue.ts
/**
* This is a custom stateless queue to track concurrent async fs calls.
* It increments a counter whenever a call is queued and decrements it
* as soon as it completes. When the counter hits 0, it calls onQueueEmpty.
*/
var Queue = class {
	count = 0;
	constructor(onQueueEmpty) {
		this.onQueueEmpty = onQueueEmpty;
	}
	enqueue() {
		this.count++;
		return this.count;
	}
	dequeue(error, output) {
		if (this.onQueueEmpty && (--this.count <= 0 || error)) {
			this.onQueueEmpty(error, output);
			if (error) {
				output.controller.abort();
				this.onQueueEmpty = void 0;
			}
		}
	}
};

//#endregion
//#region src/api/counter.ts
var Counter = class {
	_files = 0;
	_directories = 0;
	set files(num) {
		this._files = num;
	}
	get files() {
		return this._files;
	}
	set directories(num) {
		this._directories = num;
	}
	get directories() {
		return this._directories;
	}
	/**
	* @deprecated use `directories` instead
	*/
	/* c8 ignore next 3 */
	get dirs() {
		return this._directories;
	}
};

//#endregion
//#region src/api/aborter.ts
/**
* AbortController is not supported on Node 14 so we use this until we can drop
* support for Node 14.
*/
var Aborter = class {
	aborted = false;
	abort() {
		this.aborted = true;
	}
};

//#endregion
//#region src/api/walker.ts
var Walker = class {
	root;
	isSynchronous;
	state;
	joinPath;
	pushDirectory;
	pushFile;
	getArray;
	groupFiles;
	resolveSymlink;
	walkDirectory;
	callbackInvoker;
	constructor(root, options, callback$1) {
		this.isSynchronous = !callback$1;
		this.callbackInvoker = build$1(options, this.isSynchronous);
		this.root = normalizePath(root, options);
		this.state = {
			root: isRootDirectory(this.root) ? this.root : this.root.slice(0, -1),
			paths: [""].slice(0, 0),
			groups: [],
			counts: new Counter(),
			options,
			queue: new Queue((error, state) => this.callbackInvoker(state, error, callback$1)),
			symlinks: /* @__PURE__ */ new Map(),
			visited: [""].slice(0, 0),
			controller: new Aborter(),
			fs: options.fs || nativeFs
		};
		this.joinPath = build$7(this.root, options);
		this.pushDirectory = build$6(this.root, options);
		this.pushFile = build$5(options);
		this.getArray = build$4(options);
		this.groupFiles = build$3(options);
		this.resolveSymlink = build$2(options, this.isSynchronous);
		this.walkDirectory = build(this.isSynchronous);
	}
	start() {
		this.pushDirectory(this.root, this.state.paths, this.state.options.filters);
		this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
		return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
	}
	walk = (entries, directoryPath, depth) => {
		const { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator }, controller } = this.state;
		if (controller.aborted || signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
		const files = this.getArray(this.state.paths);
		for (let i = 0; i < entries.length; ++i) {
			const entry = entries[i];
			if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
				const filename = this.joinPath(entry.name, directoryPath);
				this.pushFile(filename, files, this.state.counts, filters);
			} else if (entry.isDirectory()) {
				let path = joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
				if (exclude && exclude(entry.name, path)) continue;
				this.pushDirectory(path, paths, filters);
				this.walkDirectory(this.state, path, path, depth - 1, this.walk);
			} else if (this.resolveSymlink && entry.isSymbolicLink()) {
				let path = joinPathWithBasePath(entry.name, directoryPath);
				this.resolveSymlink(path, this.state, (stat, resolvedPath) => {
					if (stat.isDirectory()) {
						resolvedPath = normalizePath(resolvedPath, this.state.options);
						if (exclude && exclude(entry.name, useRealPaths ? resolvedPath : path + pathSeparator)) return;
						this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path + pathSeparator, depth - 1, this.walk);
					} else {
						resolvedPath = useRealPaths ? resolvedPath : path;
						const filename = basename(resolvedPath);
						const directoryPath$1 = normalizePath(dirname(resolvedPath), this.state.options);
						resolvedPath = this.joinPath(filename, directoryPath$1);
						this.pushFile(resolvedPath, files, this.state.counts, filters);
					}
				});
			}
		}
		this.groupFiles(this.state.groups, directoryPath, files);
	};
};

//#endregion
//#region src/api/async.ts
function promise(root, options) {
	return new Promise((resolve$1, reject) => {
		callback(root, options, (err, output) => {
			if (err) return reject(err);
			resolve$1(output);
		});
	});
}
function callback(root, options, callback$1) {
	let walker = new Walker(root, options, callback$1);
	walker.start();
}

//#endregion
//#region src/api/sync.ts
function sync(root, options) {
	const walker = new Walker(root, options);
	return walker.start();
}

//#endregion
//#region src/builder/api-builder.ts
var APIBuilder = class {
	constructor(root, options) {
		this.root = root;
		this.options = options;
	}
	withPromise() {
		return promise(this.root, this.options);
	}
	withCallback(cb) {
		callback(this.root, this.options, cb);
	}
	sync() {
		return sync(this.root, this.options);
	}
};

//#endregion
//#region src/builder/index.ts
let pm = null;
/* c8 ignore next 6 */
try {
	__require.resolve("picomatch");
	pm = __require("picomatch");
} catch {}
var Builder = class {
	globCache = {};
	options = {
		maxDepth: Infinity,
		suppressErrors: true,
		pathSeparator: sep,
		filters: []
	};
	globFunction;
	constructor(options) {
		this.options = {
			...this.options,
			...options
		};
		this.globFunction = this.options.globFunction;
	}
	group() {
		this.options.group = true;
		return this;
	}
	withPathSeparator(separator) {
		this.options.pathSeparator = separator;
		return this;
	}
	withBasePath() {
		this.options.includeBasePath = true;
		return this;
	}
	withRelativePaths() {
		this.options.relativePaths = true;
		return this;
	}
	withDirs() {
		this.options.includeDirs = true;
		return this;
	}
	withMaxDepth(depth) {
		this.options.maxDepth = depth;
		return this;
	}
	withMaxFiles(limit) {
		this.options.maxFiles = limit;
		return this;
	}
	withFullPaths() {
		this.options.resolvePaths = true;
		this.options.includeBasePath = true;
		return this;
	}
	withErrors() {
		this.options.suppressErrors = false;
		return this;
	}
	withSymlinks({ resolvePaths = true } = {}) {
		this.options.resolveSymlinks = true;
		this.options.useRealPaths = resolvePaths;
		return this.withFullPaths();
	}
	withAbortSignal(signal) {
		this.options.signal = signal;
		return this;
	}
	normalize() {
		this.options.normalizePath = true;
		return this;
	}
	filter(predicate) {
		this.options.filters.push(predicate);
		return this;
	}
	onlyDirs() {
		this.options.excludeFiles = true;
		this.options.includeDirs = true;
		return this;
	}
	exclude(predicate) {
		this.options.exclude = predicate;
		return this;
	}
	onlyCounts() {
		this.options.onlyCounts = true;
		return this;
	}
	crawl(root) {
		return new APIBuilder(root || ".", this.options);
	}
	withGlobFunction(fn) {
		this.globFunction = fn;
		return this;
	}
	/**
	* @deprecated Pass options using the constructor instead:
	* ```ts
	* new fdir(options).crawl("/path/to/root");
	* ```
	* This method will be removed in v7.0
	*/
	/* c8 ignore next 4 */
	crawlWithOptions(root, options) {
		this.options = {
			...this.options,
			...options
		};
		return new APIBuilder(root || ".", this.options);
	}
	glob(...patterns) {
		if (this.globFunction) return this.globWithOptions(patterns);
		return this.globWithOptions(patterns, ...[{ dot: true }]);
	}
	globWithOptions(patterns, ...options) {
		const globFn = this.globFunction || pm;
		/* c8 ignore next 5 */
		if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
		var isMatch = this.globCache[patterns.join("\0")];
		if (!isMatch) {
			isMatch = globFn(patterns, ...options);
			this.globCache[patterns.join("\0")] = isMatch;
		}
		this.options.filters.push((path) => isMatch(path));
		return this;
	}
};

const isReadonlyArray = Array.isArray;
const isWin = process.platform === "win32";
const ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options = {}) {
  const patternsCount = patterns.length;
  const patternsParts = Array(patternsCount);
  const matchers = Array(patternsCount);
  const globstarEnabled = !options.noglobstar;
  for (let i = 0; i < patternsCount; i++) {
    const parts = splitPattern(patterns[i]);
    patternsParts[i] = parts;
    const partsCount = parts.length;
    const partMatchers = Array(partsCount);
    for (let j = 0; j < partsCount; j++) partMatchers[j] = picomatch(parts[j], options);
    matchers[i] = partMatchers;
  }
  return (input) => {
    const inputParts = input.split("/");
    if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return true;
    for (let i = 0; i < patterns.length; i++) {
      const patternParts = patternsParts[i];
      const matcher = matchers[i];
      const inputPatternCount = inputParts.length;
      const minParts = Math.min(inputPatternCount, patternParts.length);
      let j = 0;
      while (j < minParts) {
        const part = patternParts[j];
        if (part.includes("/")) return true;
        const match = matcher[j](inputParts[j]);
        if (!match) break;
        if (globstarEnabled && part === "**") return true;
        j++;
      }
      if (j === inputPatternCount) return true;
    }
    return false;
  };
}
const WIN32_ROOT_DIR = /^[A-Z]:\/$/i;
const isRoot = isWin ? (p) => WIN32_ROOT_DIR.test(p) : (p) => p === "/";
function buildFormat(cwd, root, absolute) {
  if (cwd === root || root.startsWith(`${cwd}/`)) {
    if (absolute) {
      const start = isRoot(cwd) ? cwd.length : cwd.length + 1;
      return (p, isDir) => p.slice(start, isDir ? -1 : void 0) || ".";
    }
    const prefix = root.slice(cwd.length + 1);
    if (prefix) return (p, isDir) => {
      if (p === ".") return prefix;
      const result = `${prefix}/${p}`;
      return isDir ? result.slice(0, -1) : result;
    };
    return (p, isDir) => isDir && p !== "." ? p.slice(0, -1) : p;
  }
  if (absolute) return (p) => posix.relative(cwd, p) || ".";
  return (p) => posix.relative(cwd, `${root}/${p}`) || ".";
}
function buildRelative(cwd, root) {
  if (root.startsWith(`${cwd}/`)) {
    const prefix = root.slice(cwd.length + 1);
    return (p) => `${prefix}/${p}`;
  }
  return (p) => {
    const result = posix.relative(cwd, `${root}/${p}`);
    if (p.endsWith("/") && result !== "") return `${result}/`;
    return result || ".";
  };
}
const splitPatternOptions = { parts: true };
function splitPattern(path$1) {
  var _result$parts;
  const result = picomatch.scan(path$1, splitPatternOptions);
  return ((_result$parts = result.parts) === null || _result$parts === void 0 ? void 0 : _result$parts.length) ? result.parts : [path$1];
}
const POSIX_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g;
const WIN32_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g;
const escapePosixPath = (path$1) => path$1.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&");
const escapeWin32Path = (path$1) => path$1.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&");
const escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options) {
  const scan = picomatch.scan(pattern);
  return scan.isGlob || scan.negated;
}
function log(...tasks) {
  console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
const PARENT_DIRECTORY = /^(\/?\.\.)+/;
const ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
const BACKSLASHES = /\\/g;
function normalizePattern(pattern, expandDirectories, cwd, props, isIgnore) {
  let result = pattern;
  if (pattern.endsWith("/")) result = pattern.slice(0, -1);
  if (!result.endsWith("*") && expandDirectories) result += "/**";
  const escapedCwd = escapePath(cwd);
  if (path.isAbsolute(result.replace(ESCAPING_BACKSLASHES, ""))) result = posix.relative(escapedCwd, result);
  else result = posix.normalize(result);
  const parentDirectoryMatch = PARENT_DIRECTORY.exec(result);
  const parts = splitPattern(result);
  if (parentDirectoryMatch === null || parentDirectoryMatch === void 0 ? void 0 : parentDirectoryMatch[0]) {
    const n = (parentDirectoryMatch[0].length + 1) / 3;
    let i = 0;
    const cwdParts = escapedCwd.split("/");
    while (i < n && parts[i + n] === cwdParts[cwdParts.length + i - n]) {
      result = result.slice(0, (n - i - 1) * 3) + result.slice((n - i) * 3 + parts[i + n].length + 1) || ".";
      i++;
    }
    const potentialRoot = posix.join(cwd, parentDirectoryMatch[0].slice(i * 3));
    if (!potentialRoot.startsWith(".") && props.root.length > potentialRoot.length) {
      props.root = potentialRoot;
      props.depthOffset = -n + i;
    }
  }
  if (!isIgnore && props.depthOffset >= 0) {
    var _props$commonPath;
    (_props$commonPath = props.commonPath) !== null && _props$commonPath !== void 0 || (props.commonPath = parts);
    const newCommonPath = [];
    const length = Math.min(props.commonPath.length, parts.length);
    for (let i = 0; i < length; i++) {
      const part = parts[i];
      if (part === "**" && !parts[i + 1]) {
        newCommonPath.pop();
        break;
      }
      if (part !== props.commonPath[i] || isDynamicPattern(part) || i === parts.length - 1) break;
      newCommonPath.push(part);
    }
    props.depthOffset = newCommonPath.length;
    props.commonPath = newCommonPath;
    props.root = newCommonPath.length > 0 ? posix.join(cwd, ...newCommonPath) : cwd;
  }
  return result;
}
function processPatterns({ patterns = ["**/*"], ignore = [], expandDirectories = true }, cwd, props) {
  if (typeof patterns === "string") patterns = [patterns];
  if (typeof ignore === "string") ignore = [ignore];
  const matchPatterns = [];
  const ignorePatterns = [];
  for (const pattern of ignore) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") ignorePatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, true));
  }
  for (const pattern of patterns) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") matchPatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, false));
    else if (pattern[1] !== "!" || pattern[2] === "(") ignorePatterns.push(normalizePattern(pattern.slice(1), expandDirectories, cwd, props, true));
  }
  return {
    match: matchPatterns,
    ignore: ignorePatterns
  };
}
function formatPaths(paths, relative) {
  for (let i = paths.length - 1; i >= 0; i--) {
    const path$1 = paths[i];
    paths[i] = relative(path$1);
  }
  return paths;
}
function normalizeCwd(cwd) {
  if (!cwd) return process.cwd().replace(BACKSLASHES, "/");
  if (cwd instanceof URL) return urlExports.fileURLToPath(cwd).replace(BACKSLASHES, "/");
  return path.resolve(cwd).replace(BACKSLASHES, "/");
}
function getCrawler(patterns, inputOptions = {}) {
  const options = process.env.TINYGLOBBY_DEBUG ? {
    ...inputOptions,
    debug: true
  } : inputOptions;
  const cwd = normalizeCwd(options.cwd);
  if (options.debug) log("globbing with:", {
    patterns,
    options,
    cwd
  });
  if (Array.isArray(patterns) && patterns.length === 0) return [{
    sync: () => [],
    withPromise: async () => []
  }, false];
  const props = {
    root: cwd,
    commonPath: null,
    depthOffset: 0
  };
  const processed = processPatterns({
    ...options,
    patterns
  }, cwd, props);
  if (options.debug) log("internal processing patterns:", processed);
  const matchOptions = {
    dot: options.dot,
    nobrace: options.braceExpansion === false,
    nocase: options.caseSensitiveMatch === false,
    noextglob: options.extglob === false,
    noglobstar: options.globstar === false,
    posix: true
  };
  const matcher = picomatch(processed.match, {
    ...matchOptions,
    ignore: processed.ignore
  });
  const ignore = picomatch(processed.ignore, matchOptions);
  const partialMatcher = getPartialMatcher(processed.match, matchOptions);
  const format = buildFormat(cwd, props.root, options.absolute);
  const formatExclude = options.absolute ? format : buildFormat(cwd, props.root, true);
  const fdirOptions = {
    filters: [options.debug ? (p, isDirectory) => {
      const path$1 = format(p, isDirectory);
      const matches = matcher(path$1);
      if (matches) log(`matched ${path$1}`);
      return matches;
    } : (p, isDirectory) => matcher(format(p, isDirectory))],
    exclude: options.debug ? (_, p) => {
      const relativePath = formatExclude(p, true);
      const skipped = relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
      if (skipped) log(`skipped ${p}`);
      else log(`crawling ${p}`);
      return skipped;
    } : (_, p) => {
      const relativePath = formatExclude(p, true);
      return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
    },
    fs: options.fs ? {
      readdir: options.fs.readdir || nativeFs__default.readdir,
      readdirSync: options.fs.readdirSync || nativeFs__default.readdirSync,
      realpath: options.fs.realpath || nativeFs__default.realpath,
      realpathSync: options.fs.realpathSync || nativeFs__default.realpathSync,
      stat: options.fs.stat || nativeFs__default.stat,
      statSync: options.fs.statSync || nativeFs__default.statSync
    } : void 0,
    pathSeparator: "/",
    relativePaths: true,
    resolveSymlinks: true,
    signal: options.signal
  };
  if (options.deep !== void 0) fdirOptions.maxDepth = Math.round(options.deep - props.depthOffset);
  if (options.absolute) {
    fdirOptions.relativePaths = false;
    fdirOptions.resolvePaths = true;
    fdirOptions.includeBasePath = true;
  }
  if (options.followSymbolicLinks === false) {
    fdirOptions.resolveSymlinks = false;
    fdirOptions.excludeSymlinks = true;
  }
  if (options.onlyDirectories) {
    fdirOptions.excludeFiles = true;
    fdirOptions.includeDirs = true;
  } else if (options.onlyFiles === false) fdirOptions.includeDirs = true;
  props.root = props.root.replace(BACKSLASHES, "");
  const root = props.root;
  if (options.debug) log("internal properties:", props);
  const relative = cwd !== root && !options.absolute && buildRelative(cwd, props.root);
  return [new Builder(fdirOptions).crawl(root), relative];
}
async function glob$1(patternsOrOptions, options) {
  if (patternsOrOptions && (options === null || options === void 0 ? void 0 : options.patterns)) throw new Error("Cannot pass patterns as both an argument and an option");
  const isModern = isReadonlyArray(patternsOrOptions) || typeof patternsOrOptions === "string";
  const opts = isModern ? options : patternsOrOptions;
  const patterns = isModern ? patternsOrOptions : patternsOrOptions.patterns;
  const [crawler, relative] = getCrawler(patterns, opts);
  if (!relative) return crawler.withPromise();
  return formatPaths(await crawler.withPromise(), relative);
}

function generateIdDefault({ entry, base, data }) {
  if (data.slug) {
    return data.slug;
  }
  const entryURL = new URL(encodeURI(entry), base);
  const { slug } = getContentEntryIdAndSlug({
    entry: entryURL,
    contentDir: base,
    collection: ""
  });
  return slug;
}
function checkPrefix(pattern, prefix) {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => p.startsWith(prefix));
  }
  return pattern.startsWith(prefix);
}
function glob(globOptions) {
  if (checkPrefix(globOptions.pattern, "../")) {
    throw new Error(
      "Glob patterns cannot start with `../`. Set the `base` option to a parent directory instead."
    );
  }
  if (checkPrefix(globOptions.pattern, "/")) {
    throw new Error(
      "Glob patterns cannot start with `/`. Set the `base` option to a parent directory or use a relative path instead."
    );
  }
  const generateId = globOptions?.generateId ?? generateIdDefault;
  const fileToIdMap = /* @__PURE__ */ new Map();
  return {
    name: "glob-loader",
    load: async ({ config, logger, watcher, parseData, store, generateDigest, entryTypes }) => {
      const renderFunctionByContentType = /* @__PURE__ */ new WeakMap();
      const untouchedEntries = new Set(store.keys());
      const isLegacy = globOptions._legacy;
      const emulateLegacyCollections = !config.legacy.collections;
      async function syncData(entry, base, entryType, oldId) {
        if (!entryType) {
          logger.warn(`No entry type found for ${entry}`);
          return;
        }
        const fileUrl = new URL(encodeURI(entry), base);
        const contents = await promises.readFile(fileUrl, "utf-8").catch((err) => {
          logger.error(`Error reading ${entry}: ${err.message}`);
          return;
        });
        if (!contents && contents !== "") {
          logger.warn(`No contents found for ${entry}`);
          return;
        }
        const { body, data } = await entryType.getEntryInfo({
          contents,
          fileUrl
        });
        const id = generateId({ entry, base, data });
        if (oldId && oldId !== id) {
          store.delete(oldId);
        }
        let legacyId;
        if (isLegacy) {
          const entryURL = new URL(encodeURI(entry), base);
          const legacyOptions = getContentEntryIdAndSlug({
            entry: entryURL,
            contentDir: base,
            collection: ""
          });
          legacyId = legacyOptions.id;
        }
        untouchedEntries.delete(id);
        const existingEntry = store.get(id);
        const digest = generateDigest(contents);
        const filePath2 = fileURLToPath(fileUrl);
        if (existingEntry && existingEntry.digest === digest && existingEntry.filePath) {
          if (existingEntry.deferredRender) {
            store.addModuleImport(existingEntry.filePath);
          }
          if (existingEntry.assetImports?.length) {
            store.addAssetImports(existingEntry.assetImports, existingEntry.filePath);
          }
          fileToIdMap.set(filePath2, id);
          return;
        }
        const relativePath2 = posixRelative(fileURLToPath(config.root), filePath2);
        const parsedData = await parseData({
          id,
          data,
          filePath: filePath2
        });
        if (entryType.getRenderFunction) {
          if (isLegacy && data.layout) {
            logger.error(
              `The Markdown "layout" field is not supported in content collections in Astro 5. Ignoring layout for ${JSON.stringify(entry)}. Enable "legacy.collections" if you need to use the layout field.`
            );
          }
          let render = renderFunctionByContentType.get(entryType);
          if (!render) {
            render = await entryType.getRenderFunction(config);
            renderFunctionByContentType.set(entryType, render);
          }
          let rendered = void 0;
          try {
            rendered = await render?.({
              id,
              data,
              body,
              filePath: filePath2,
              digest
            });
          } catch (error) {
            logger.error(`Error rendering ${entry}: ${error.message}`);
          }
          store.set({
            id,
            data: parsedData,
            body,
            filePath: relativePath2,
            digest,
            rendered,
            assetImports: rendered?.metadata?.imagePaths,
            legacyId
          });
        } else if ("contentModuleTypes" in entryType) {
          store.set({
            id,
            data: parsedData,
            body,
            filePath: relativePath2,
            digest,
            deferredRender: true,
            legacyId
          });
        } else {
          store.set({ id, data: parsedData, body, filePath: relativePath2, digest, legacyId });
        }
        fileToIdMap.set(filePath2, id);
      }
      const baseDir = globOptions.base ? new URL(globOptions.base, config.root) : config.root;
      if (!baseDir.pathname.endsWith("/")) {
        baseDir.pathname = `${baseDir.pathname}/`;
      }
      const filePath = fileURLToPath(baseDir);
      const relativePath = relative$1(fileURLToPath(config.root), filePath);
      const exists = existsSync(baseDir);
      if (!exists) {
        logger.warn(`The base directory "${fileURLToPath(baseDir)}" does not exist.`);
      }
      const files = await glob$1(globOptions.pattern, {
        cwd: fileURLToPath(baseDir),
        expandDirectories: false
      });
      if (exists && files.length === 0) {
        logger.warn(
          `No files found matching "${globOptions.pattern}" in directory "${relativePath}"`
        );
        return;
      }
      function configForFile(file) {
        const ext = file.split(".").at(-1);
        if (!ext) {
          logger.warn(`No extension found for ${file}`);
          return;
        }
        return entryTypes.get(`.${ext}`);
      }
      const limit = pLimit(10);
      const skippedFiles = [];
      const contentDir = new URL("content/", config.srcDir);
      function isInContentDir(file) {
        const fileUrl = new URL(file, baseDir);
        return fileUrl.href.startsWith(contentDir.href);
      }
      const configFiles = new Set(
        ["config.js", "config.ts", "config.mjs"].map((file) => new URL(file, contentDir).href)
      );
      function isConfigFile(file) {
        const fileUrl = new URL(file, baseDir);
        return configFiles.has(fileUrl.href);
      }
      await Promise.all(
        files.map((entry) => {
          if (isConfigFile(entry)) {
            return;
          }
          if (!emulateLegacyCollections && isInContentDir(entry)) {
            skippedFiles.push(entry);
            return;
          }
          return limit(async () => {
            const entryType = configForFile(entry);
            await syncData(entry, baseDir, entryType);
          });
        })
      );
      const skipCount = skippedFiles.length;
      if (skipCount > 0) {
        const patternList = Array.isArray(globOptions.pattern) ? globOptions.pattern.join(", ") : globOptions.pattern;
        logger.warn(
          `The glob() loader cannot be used for files in ${bold("src/content")} when legacy mode is enabled.`
        );
        if (skipCount > 10) {
          logger.warn(
            `Skipped ${green(skippedFiles.length)} files that matched ${green(patternList)}.`
          );
        } else {
          logger.warn(`Skipped the following files that matched ${green(patternList)}:`);
          skippedFiles.forEach((file) => logger.warn(`\u2022 ${green(file)}`));
        }
      }
      untouchedEntries.forEach((id) => store.delete(id));
      if (!watcher) {
        return;
      }
      watcher.add(filePath);
      const matchesGlob = (entry) => !entry.startsWith("../") && picomatch.isMatch(entry, globOptions.pattern);
      const basePath = fileURLToPath(baseDir);
      async function onChange(changedPath) {
        const entry = posixRelative(basePath, changedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const entryType = configForFile(changedPath);
        const baseUrl = pathToFileURL(basePath);
        const oldId = fileToIdMap.get(changedPath);
        await syncData(entry, baseUrl, entryType, oldId);
        logger.info(`Reloaded data from ${green(entry)}`);
      }
      watcher.on("change", onChange);
      watcher.on("add", onChange);
      watcher.on("unlink", async (deletedPath) => {
        const entry = posixRelative(basePath, deletedPath);
        if (!matchesGlob(entry)) {
          return;
        }
        const id = fileToIdMap.get(deletedPath);
        if (id) {
          store.delete(id);
          fileToIdMap.delete(deletedPath);
        }
      });
    }
  };
}

const entryTypeSchema = objectType({
  id: stringType({
    invalid_type_error: "Content entry `id` must be a string"
    // Default to empty string so we can validate properly in the loader
  })
}).passthrough();
unionType([
  arrayType(entryTypeSchema),
  recordType(
    stringType(),
    objectType({
      id: stringType({
        invalid_type_error: "Content entry `id` must be a string"
      }).optional()
    }).passthrough()
  )
]);
const collectionConfigParser = unionType([
  objectType({
    type: literalType("content").optional().default("content"),
    schema: anyType().optional()
  }),
  objectType({
    type: literalType("data"),
    schema: anyType().optional()
  }),
  objectType({
    type: literalType(CONTENT_LAYER_TYPE),
    schema: anyType().optional(),
    loader: unionType([
      functionType(),
      objectType({
        name: stringType(),
        load: functionType(
          tupleType(
            [
              objectType({
                collection: stringType(),
                store: anyType(),
                meta: anyType(),
                logger: anyType(),
                config: anyType(),
                entryTypes: anyType(),
                parseData: anyType(),
                generateDigest: functionType(tupleType([anyType()], stringType())),
                watcher: anyType().optional(),
                refreshContextData: recordType(unknownType()).optional()
              })
            ],
            unknownType()
          )
        ),
        schema: anyType().optional(),
        render: functionType(tupleType([anyType()], unknownType())).optional()
      })
    ]),
    /** deprecated */
    _legacy: booleanType().optional()
  })
]);
objectType({
  collections: recordType(collectionConfigParser)
});
function getContentEntryIdAndSlug({
  entry,
  contentDir,
  collection
}) {
  const relativePath = getRelativeEntryPath(entry, collection, contentDir);
  const withoutFileExt = relativePath.replace(new RegExp(path$1.extname(relativePath) + "$"), "");
  const rawSlugSegments = withoutFileExt.split(path$1.sep);
  const slug$1 = rawSlugSegments.map((segment) => slug(segment)).join("/").replace(/\/index$/, "");
  const res = {
    id: normalizePath$1(relativePath),
    slug: slug$1
  };
  return res;
}
function getRelativeEntryPath(entry, collection, contentDir) {
  const relativeToContent = path$1.relative(fileURLToPath(contentDir), fileURLToPath(entry));
  const relativeToCollection = path$1.relative(collection, relativeToContent);
  return relativeToCollection;
}
function posixifyPath(filePath) {
  return filePath.split(path$1.sep).join("/");
}
function posixRelative(from, to) {
  return posixifyPath(path$1.relative(from, to));
}

const docsExtensions = ["markdown", "mdown", "mkdn", "mkd", "mdwn", "md", "mdx"];
function docsLoader() {
  return {
    name: "starlight-docs-loader",
    load: createGlobLoadFn("docs")
  };
}
function createGlobLoadFn(collection) {
  return (context) => {
    const extensions = docsExtensions ;
    if (context.config.integrations.find(({ name }) => name === "@astrojs/markdoc")) {
      extensions.push("mdoc");
    }
    return glob({
      base: getCollectionPathFromRoot(collection, context.config),
      pattern: `**/[^_]*.{${extensions.join(",")}}`
    }).load(context);
  };
}

const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() })
};

export { collections };
