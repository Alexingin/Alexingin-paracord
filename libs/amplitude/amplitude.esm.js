import { isBrowserEnv, prototypeJsFix } from '@amplitude/utils';
import md5 from 'blueimp-md5';
import queryString from 'query-string';
import UAParser from '@amplitude/ua-parser-js';
import { AnalyticsConnector } from '@amplitude/analytics-connector';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var Constants = {
  DEFAULT_INSTANCE: '$default_instance',
  API_VERSION: 2,
  MAX_STRING_LENGTH: 4096,
  MAX_PROPERTY_KEYS: 1000,
  IDENTIFY_EVENT: '$identify',
  GROUP_IDENTIFY_EVENT: '$groupidentify',
  EVENT_LOG_URL: 'api.amplitude.com',
  EVENT_LOG_EU_URL: 'api.eu.amplitude.com',
  DYNAMIC_CONFIG_URL: 'regionconfig.amplitude.com',
  DYNAMIC_CONFIG_EU_URL: 'regionconfig.eu.amplitude.com',
  // localStorageKeys
  LAST_EVENT_ID: 'amplitude_lastEventId',
  LAST_EVENT_TIME: 'amplitude_lastEventTime',
  LAST_IDENTIFY_ID: 'amplitude_lastIdentifyId',
  LAST_SEQUENCE_NUMBER: 'amplitude_lastSequenceNumber',
  SESSION_ID: 'amplitude_sessionId',
  // Used in cookie as well
  DEVICE_ID: 'amplitude_deviceId',
  OPT_OUT: 'amplitude_optOut',
  USER_ID: 'amplitude_userId',
  // indexes of properties in cookie v2 storage format
  DEVICE_ID_INDEX: 0,
  USER_ID_INDEX: 1,
  OPT_OUT_INDEX: 2,
  SESSION_ID_INDEX: 3,
  LAST_EVENT_TIME_INDEX: 4,
  EVENT_ID_INDEX: 5,
  IDENTIFY_ID_INDEX: 6,
  SEQUENCE_NUMBER_INDEX: 7,
  COOKIE_TEST_PREFIX: 'amp_cookie_test',
  COOKIE_PREFIX: 'amp',
  // Storage options
  STORAGE_DEFAULT: '',
  STORAGE_COOKIES: 'cookies',
  STORAGE_NONE: 'none',
  STORAGE_LOCAL: 'localStorage',
  STORAGE_SESSION: 'sessionStorage',
  // revenue keys
  REVENUE_EVENT: 'revenue_amount',
  REVENUE_PRODUCT_ID: '$productId',
  REVENUE_QUANTITY: '$quantity',
  REVENUE_PRICE: '$price',
  REVENUE_REVENUE_TYPE: '$revenueType',
  AMP_DEVICE_ID_PARAM: 'amp_device_id',
  // url param
  AMP_REFERRER_PARAM: 'amp_referrer',
  // url param for overwriting the document.refer

  REFERRER: 'referrer',
  REFERRING_DOMAIN: 'referring_domain',
  // UTM Params
  UTM_SOURCE: 'utm_source',
  UTM_MEDIUM: 'utm_medium',
  UTM_CAMPAIGN: 'utm_campaign',
  UTM_TERM: 'utm_term',
  UTM_CONTENT: 'utm_content',
  ATTRIBUTION_EVENT: '[Amplitude] Attribution Captured',
  TRANSPORT_HTTP: 'http',
  TRANSPORT_BEACON: 'beacon'
};

/*
 * UTF-8 encoder/decoder
 * http://www.webtoolkit.info/
 */
var UTF8 = {
  encode: function encode(s) {
    var utftext = '';
    for (var n = 0; n < s.length; n++) {
      var c = s.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode(c >> 6 | 192);
        utftext += String.fromCharCode(c & 63 | 128);
      } else {
        utftext += String.fromCharCode(c >> 12 | 224);
        utftext += String.fromCharCode(c >> 6 & 63 | 128);
        utftext += String.fromCharCode(c & 63 | 128);
      }
    }
    return utftext;
  },
  decode: function decode(utftext) {
    var s = '';
    var i = 0;
    var c = 0,
      c1 = 0,
      c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        s += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c1 = utftext.charCodeAt(i + 1);
        s += String.fromCharCode((c & 31) << 6 | c1 & 63);
        i += 2;
      } else {
        c1 = utftext.charCodeAt(i + 1);
        c2 = utftext.charCodeAt(i + 2);
        s += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
        i += 3;
      }
    }
    return s;
  }
};

/* global globalThis */
var GlobalScope = function () {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
}();

/*
 * Base64 encoder/decoder
 * http://www.webtoolkit.info/
 */
var Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function encode(input) {
    try {
      if (GlobalScope.btoa && GlobalScope.atob) {
        return GlobalScope.btoa(unescape(encodeURIComponent(input)));
      }
    } catch (e) {
      //log(e);
    }
    return Base64._encode(input);
  },
  _encode: function _encode(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = UTF8.encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = (chr1 & 3) << 4 | chr2 >> 4;
      enc3 = (chr2 & 15) << 2 | chr3 >> 6;
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
    }
    return output;
  },
  decode: function decode(input) {
    try {
      if (GlobalScope.btoa && GlobalScope.atob) {
        return decodeURIComponent(escape(GlobalScope.atob(input)));
      }
    } catch (e) {
      //log(e);
    }
    return Base64._decode(input);
  },
  _decode: function _decode(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9+/=]/g, '');
    while (i < input.length) {
      enc1 = Base64._keyStr.indexOf(input.charAt(i++));
      enc2 = Base64._keyStr.indexOf(input.charAt(i++));
      enc3 = Base64._keyStr.indexOf(input.charAt(i++));
      enc4 = Base64._keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = UTF8.decode(output);
    return output;
  }
};

/**
 * toString ref.
 * @private
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 * @private
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

function type (val) {
  switch (toString.call(val)) {
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object Error]':
      return 'error';
  }
  if (val === null) {
    return 'null';
  }
  if (val === undefined) {
    return 'undefined';
  }
  if (val !== val) {
    return 'nan';
  }
  if (val && val.nodeType === 1) {
    return 'element';
  }
  if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(val)) {
    return 'buffer';
  }
  val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
  return _typeof(val);
}

var logLevels = {
  DISABLE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3
};
var logLevel = logLevels.WARN;
var setLogLevel = function setLogLevel(logLevelName) {
  if (Object.prototype.hasOwnProperty.call(logLevels, logLevelName)) {
    logLevel = logLevels[logLevelName];
  }
};
var getLogLevel = function getLogLevel() {
  return logLevel;
};
var log = {
  error: function error(s) {
    if (logLevel >= logLevels.ERROR) {
      _log(s);
    }
  },
  warn: function warn(s) {
    if (logLevel >= logLevels.WARN) {
      _log(s);
    }
  },
  info: function info(s) {
    if (logLevel >= logLevels.INFO) {
      _log(s);
    }
  }
};
var _log = function _log(s) {
  try {
    console.log('[Amplitude] ' + s);
  } catch (e) {
    // console logging not available
  }
};
var isEmptyString = function isEmptyString(str) {
  return !str || str.length === 0;
};
var sessionStorageEnabled = function sessionStorageEnabled() {
  try {
    if (GlobalScope.sessionStorage) {
      return true;
    }
  } catch (e) {
    // sessionStorage disabled
  }
  return false;
};

// truncate string values in event and user properties so that request size does not get too large
var truncate = function truncate(value) {
  if (type(value) === 'array') {
    for (var i = 0; i < value.length; i++) {
      value[i] = truncate(value[i]);
    }
  } else if (type(value) === 'object') {
    for (var key in value) {
      if (key in value) {
        value[key] = truncate(value[key]);
      }
    }
  } else {
    value = _truncateValue(value);
  }
  return value;
};
var _truncateValue = function _truncateValue(value) {
  if (type(value) === 'string') {
    return value.length > Constants.MAX_STRING_LENGTH ? value.substring(0, Constants.MAX_STRING_LENGTH) : value;
  }
  return value;
};
var validateInput = function validateInput(input, name, expectedType) {
  if (type(input) !== expectedType) {
    log.error('Invalid ' + name + ' input type. Expected ' + expectedType + ' but received ' + type(input));
    return false;
  }
  return true;
};
var validateDeviceId = function validateDeviceId(deviceId) {
  if (!validateInput(deviceId, 'deviceId', 'string')) {
    return false;
  }
  if (deviceId.indexOf('.') >= 0) {
    log.error("Device IDs may not contain '.' characters. Value will be ignored: \"".concat(deviceId, "\""));
    return false;
  }
  return true;
};
var validateTransport = function validateTransport(transport) {
  if (!validateInput(transport, 'transport', 'string')) {
    return false;
  }
  if (transport !== Constants.TRANSPORT_HTTP && transport !== Constants.TRANSPORT_BEACON) {
    log.error("transport value must be one of '".concat(Constants.TRANSPORT_BEACON, "' or '").concat(Constants.TRANSPORT_HTTP, "'"));
    return false;
  }
  if (transport !== Constants.TRANSPORT_HTTP && typeof navigator !== 'undefined' && !navigator.sendBeacon) {
    log.error("browser does not support sendBeacon, so transport must be HTTP");
    return false;
  }
  return true;
};

// do some basic sanitization and type checking, also catch property dicts with more than 1000 key/value pairs
var validateProperties = function validateProperties(properties) {
  var propsType = type(properties);
  if (propsType !== 'object') {
    log.error('Error: invalid properties format. Expecting Javascript object, received ' + propsType + ', ignoring');
    return {};
  }
  if (Object.keys(properties).length > Constants.MAX_PROPERTY_KEYS) {
    log.error('Error: too many properties (more than 1000), ignoring');
    return {};
  }
  var copy = {}; // create a copy with all of the valid properties
  for (var property in properties) {
    if (!Object.prototype.hasOwnProperty.call(properties, property)) {
      continue;
    }

    // validate key
    var key = property;
    var keyType = type(key);
    if (keyType !== 'string') {
      key = String(key);
      log.warn('WARNING: Non-string property key, received type ' + keyType + ', coercing to string "' + key + '"');
    }

    // validate value
    var value = validatePropertyValue(key, properties[property]);
    if (value === null) {
      continue;
    }
    copy[key] = value;
  }
  return copy;
};
var invalidValueTypes = ['nan', 'function', 'arguments', 'regexp', 'element'];
var validatePropertyValue = function validatePropertyValue(key, value) {
  var valueType = type(value);
  if (invalidValueTypes.indexOf(valueType) !== -1) {
    log.warn('WARNING: Property key "' + key + '" with invalid value type ' + valueType + ', ignoring');
    value = null;
  } else if (valueType === 'undefined') {
    value = null;
  } else if (valueType === 'error') {
    value = String(value);
    log.warn('WARNING: Property key "' + key + '" with value type error, coercing to ' + value);
  } else if (valueType === 'array') {
    // check for nested arrays or objects
    var arrayCopy = [];
    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var elemType = type(element);
      if (elemType === 'array') {
        log.warn('WARNING: Cannot have ' + elemType + ' nested in an array property value, skipping');
        continue;
      } else if (elemType === 'object') {
        arrayCopy.push(validateProperties(element));
      } else {
        arrayCopy.push(validatePropertyValue(key, element));
      }
    }
    value = arrayCopy;
  } else if (valueType === 'object') {
    value = validateProperties(value);
  }
  return value;
};
var validateGroups = function validateGroups(groups) {
  var groupsType = type(groups);
  if (groupsType !== 'object') {
    log.error('Error: invalid groups format. Expecting Javascript object, received ' + groupsType + ', ignoring');
    return {};
  }
  var copy = {}; // create a copy with all of the valid properties
  for (var group in groups) {
    if (!Object.prototype.hasOwnProperty.call(groups, group)) {
      continue;
    }

    // validate key
    var key = group;
    var keyType = type(key);
    if (keyType !== 'string') {
      key = String(key);
      log.warn('WARNING: Non-string groupType, received type ' + keyType + ', coercing to string "' + key + '"');
    }

    // validate value
    var value = validateGroupName(key, groups[group]);
    if (value === null) {
      continue;
    }
    copy[key] = value;
  }
  return copy;
};
var validateGroupName = function validateGroupName(key, groupName) {
  var groupNameType = type(groupName);
  if (groupNameType === 'string') {
    return groupName;
  }
  if (groupNameType === 'date' || groupNameType === 'number' || groupNameType === 'boolean') {
    groupName = String(groupName);
    log.warn('WARNING: Non-string groupName, received type ' + groupNameType + ', coercing to string "' + groupName + '"');
    return groupName;
  }
  if (groupNameType === 'array') {
    // check for nested arrays or objects
    var arrayCopy = [];
    for (var i = 0; i < groupName.length; i++) {
      var element = groupName[i];
      var elemType = type(element);
      if (elemType === 'array' || elemType === 'object') {
        log.warn('WARNING: Skipping nested ' + elemType + ' in array groupName');
        continue;
      } else if (elemType === 'string') {
        arrayCopy.push(element);
      } else if (elemType === 'date' || elemType === 'number' || elemType === 'boolean') {
        element = String(element);
        log.warn('WARNING: Non-string groupName, received type ' + elemType + ', coercing to string "' + element + '"');
        arrayCopy.push(element);
      }
    }
    return arrayCopy;
  }
  log.warn('WARNING: Non-string groupName, received type ' + groupNameType + '. Please use strings or array of strings for groupName');
};

// parses the value of a url param (for example ?gclid=1234&...)
var getQueryParam = function getQueryParam(name, query) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(query);
  return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var isWebWorkerEnvironment = function isWebWorkerEnvironment() {
  return typeof WorkerGlobalScope !== 'undefined';
};
var validateSessionId = function validateSessionId(sessionId) {
  if (validateInput(sessionId, 'sessionId', 'number') && new Date(sessionId).getTime() > 0) {
    return true;
  }
  log.error("sessionId value must in milliseconds since epoch (Unix Timestamp)");
  return false;
};
var getLocation = function getLocation() {
  return GlobalScope.location;
};
var getHost = function getHost(url) {
  var defaultHostname = GlobalScope.location ? GlobalScope.location.hostname : '';
  if (url) {
    if (typeof document !== 'undefined') {
      var a = document.createElement('a');
      a.href = url;
      return a.hostname || defaultHostname;
    }
    if (typeof URL === 'function') {
      var u = new URL(url);
      return u.hostname || defaultHostname;
    }
  }
  return defaultHostname;
};
var utils = {
  setLogLevel: setLogLevel,
  getLogLevel: getLogLevel,
  logLevels: logLevels,
  log: log,
  isEmptyString: isEmptyString,
  isWebWorkerEnvironment: isWebWorkerEnvironment,
  getQueryParam: getQueryParam,
  sessionStorageEnabled: sessionStorageEnabled,
  truncate: truncate,
  validateGroups: validateGroups,
  validateInput: validateInput,
  validateProperties: validateProperties,
  validateDeviceId: validateDeviceId,
  validateTransport: validateTransport,
  validateSessionId: validateSessionId,
  getLocation: getLocation,
  getHost: getHost
};

var get$1 = function get(name) {
  try {
    var ca = document.cookie.split(';');
    var value = null;
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(name) === 0) {
        value = c.substring(name.length, c.length);
        break;
      }
    }
    return value;
  } catch (e) {
    return null;
  }
};
var getAll = function getAll(name) {
  try {
    var cookieArray = document.cookie.split(';').map(function (c) {
      return c.trimStart();
    });
    var values = [];
    var _iterator = _createForOfIteratorHelper(cookieArray),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cookie = _step.value;
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
          values.push(cookie.substring(name.length));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return values;
  } catch (e) {
    return [];
  }
};
var set$1 = function set(name, value, opts) {
  var expires = value !== null ? opts.expirationDays : -1;
  if (expires) {
    var date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    expires = date;
  }
  var str = name + '=' + value;
  if (expires) {
    str += '; expires=' + expires.toUTCString();
  }
  str += '; path=/';
  if (opts.domain) {
    str += '; domain=' + opts.domain;
  }
  if (opts.secure) {
    str += '; Secure';
  }
  if (opts.sameSite) {
    str += '; SameSite=' + opts.sameSite;
  }
  document.cookie = str;
};
var getLastEventTime = function getLastEventTime() {
  var cookie = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var strValue = cookie.split('.')[Constants.LAST_EVENT_TIME_INDEX];
  var parsedValue;
  if (strValue) {
    parsedValue = parseInt(strValue, 32);
  }
  if (parsedValue) {
    return parsedValue;
  } else {
    utils.log.warn("unable to parse malformed cookie: ".concat(cookie));
    return 0;
  }
};
var sortByEventTime = function sortByEventTime(cookies) {
  return _toConsumableArray(cookies).sort(function (c1, c2) {
    var t1 = getLastEventTime(c1);
    var t2 = getLastEventTime(c2);
    // sort c1 first if its last event time is more recent
    // i.e its event time integer is larger that c2's
    return t2 - t1;
  });
};

// test that cookies are enabled - navigator.cookiesEnabled yields false positives in IE, need to test directly
var areCookiesEnabled = function areCookiesEnabled() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cookieName = Constants.COOKIE_TEST_PREFIX;
  if (typeof document === 'undefined') {
    return false;
  }
  var _areCookiesEnabled = false;
  try {
    var uid = String(Date.now());
    set$1(cookieName, uid, opts);
    utils.log.info("Testing if cookies available");
    _areCookiesEnabled = get$1(cookieName + '=') === uid;
  } catch (e) {
    utils.log.warn("Error thrown when checking for cookies. Reason: \"".concat(e, "\""));
  } finally {
    utils.log.info("Cleaning up cookies availability test");
    set$1(cookieName, null, opts);
  }
  return _areCookiesEnabled;
};
var baseCookie = {
  set: set$1,
  get: get$1,
  getAll: getAll,
  getLastEventTime: getLastEventTime,
  sortByEventTime: sortByEventTime,
  areCookiesEnabled: areCookiesEnabled
};

// A URL safe variation on the the list of Base64 characters
var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
var base64Id = function base64Id() {
  var str = '';
  for (var i = 0; i < 22; ++i) {
    str += base64Chars.charAt(Math.floor(Math.random() * 64));
  }
  return str;
};

// Utility that finds top level domain to write to
var topDomain = function topDomain(url) {
  var host = utils.getHost(url);
  var parts = host.split('.');
  var levels = [];
  var cname = '_tldtest_' + base64Id();
  if (utils.isWebWorkerEnvironment()) return '';
  for (var i = parts.length - 2; i >= 0; --i) {
    levels.push(parts.slice(i).join('.'));
  }
  for (var _i = 0; _i < levels.length; ++_i) {
    var domain = levels[_i];
    var opts = {
      domain: '.' + domain
    };
    baseCookie.set(cname, 1, opts);
    if (baseCookie.get(cname)) {
      baseCookie.set(cname, null, opts);
      return domain;
    }
  }
  return '';
};

/*
 * Cookie data
 */
var _options = {
  expirationDays: undefined,
  domain: undefined
};
var reset = function reset() {
  _options = {
    expirationDays: undefined,
    domain: undefined
  };
};
var options = function options(opts) {
  if (arguments.length === 0) {
    return _options;
  }
  opts = opts || {};
  _options.expirationDays = opts.expirationDays;
  _options.secure = opts.secure;
  _options.sameSite = opts.sameSite;
  var domain = !utils.isEmptyString(opts.domain) ? opts.domain : '.' + topDomain(utils.getLocation().href);
  var token = Math.random();
  _options.domain = domain;
  set('amplitude_test', token);
  var stored = get('amplitude_test');
  if (!stored || stored !== token) {
    domain = null;
  }
  remove('amplitude_test');
  _options.domain = domain;
  return _options;
};
var _domainSpecific = function _domainSpecific(name) {
  // differentiate between cookies on different domains
  var suffix = '';
  if (_options.domain) {
    suffix = _options.domain.charAt(0) === '.' ? _options.domain.substring(1) : _options.domain;
  }
  return name + suffix;
};
var get = function get(name) {
  var nameEq = _domainSpecific(name) + '=';
  var value = baseCookie.get(nameEq);
  try {
    if (value) {
      return JSON.parse(Base64.decode(value));
    }
  } catch (e) {
    return null;
  }
  return null;
};
var set = function set(name, value) {
  try {
    baseCookie.set(_domainSpecific(name), Base64.encode(JSON.stringify(value)), _options);
    return true;
  } catch (e) {
    return false;
  }
};
var setRaw = function setRaw(name, value) {
  try {
    baseCookie.set(_domainSpecific(name), value, _options);
    return true;
  } catch (e) {
    return false;
  }
};
var getRaw = function getRaw(name) {
  var nameEq = _domainSpecific(name) + '=';
  return baseCookie.get(nameEq);
};
var remove = function remove(name) {
  try {
    baseCookie.set(_domainSpecific(name), null, _options);
    return true;
  } catch (e) {
    return false;
  }
};
var Cookie = {
  reset: reset,
  options: options,
  get: get,
  set: set,
  remove: remove,
  setRaw: setRaw,
  getRaw: getRaw
};

var WorkerStorage = /*#__PURE__*/function () {
  function WorkerStorage() {
    _classCallCheck(this, WorkerStorage);
    this.map = new Map();
    this.length = 0;
  }
  _createClass(WorkerStorage, [{
    key: "key",
    value: function key(index) {
      var keys = Array.from(this.map.keys());
      var key = keys[index];
      return this.map.get(key);
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      return this.map.get(key);
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      if (!this.map.has(key)) {
        this.length += 1;
      }
      this.map.set(key, value);
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      if (this.map.has(key)) {
        this.length -= 1;
        this.map["delete"](key);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.map.clear();
      this.length = 0;
    }
  }]);
  return WorkerStorage;
}();

/*
 * Implement localStorage to support Firefox 2-3 and IE 5-7
 */
var localStorage;
{
  // test that Window.localStorage is available and works
  var windowLocalStorageAvailable = function windowLocalStorageAvailable() {
    var uid = new Date();
    var result;
    try {
      GlobalScope.localStorage.setItem(uid, uid);
      result = GlobalScope.localStorage.getItem(uid) === String(uid);
      GlobalScope.localStorage.removeItem(uid);
      return result;
    } catch (e) {
      // localStorage not available
    }
    return false;
  };
  if (windowLocalStorageAvailable()) {
    localStorage = GlobalScope.localStorage;
  } else if (typeof GlobalScope !== 'undefined' && GlobalScope.globalStorage) {
    // Firefox 2-3 use globalStorage
    // See https://developer.mozilla.org/en/dom/storage#globalStorage
    try {
      localStorage = GlobalScope.globalStorage[GlobalScope.location.hostname];
    } catch (e) {
      // Something bad happened...
    }
  } else if (typeof document !== 'undefined') {
    // IE 5-7 use userData
    // See http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
    var div = document.createElement('div'),
      attrKey = 'localStorage';
    div.style.display = 'none';
    document.getElementsByTagName('head')[0].appendChild(div);
    if (div.addBehavior) {
      div.addBehavior('#default#userdata');
      localStorage = {
        length: 0,
        setItem: function setItem(k, v) {
          div.load(attrKey);
          if (!div.getAttribute(k)) {
            this.length++;
          }
          div.setAttribute(k, v);
          div.save(attrKey);
        },
        getItem: function getItem(k) {
          div.load(attrKey);
          return div.getAttribute(k);
        },
        removeItem: function removeItem(k) {
          div.load(attrKey);
          if (div.getAttribute(k)) {
            this.length--;
          }
          div.removeAttribute(k);
          div.save(attrKey);
        },
        clear: function clear() {
          div.load(attrKey);
          var i = 0;
          var attr;
          while (attr = div.XMLDocument.documentElement.attributes[i++]) {
            div.removeAttribute(attr.name);
          }
          div.save(attrKey);
          this.length = 0;
        },
        key: function key(k) {
          div.load(attrKey);
          return div.XMLDocument.documentElement.attributes[k];
        }
      };
      div.load(attrKey);
      localStorage.length = div.XMLDocument.documentElement.attributes.length;
    }
  } else if (utils.isWebWorkerEnvironment()) {
    // Web worker
    localStorage = new WorkerStorage();
  }
  if (!localStorage) {
    /* eslint-disable no-unused-vars */
    localStorage = {
      length: 0,
      setItem: function setItem(k, v) {},
      getItem: function getItem(k) {},
      removeItem: function removeItem(k) {},
      clear: function clear() {},
      key: function key(k) {}
    };
    /* eslint-enable no-unused-vars */
  }
}

var localStorage$1 = localStorage;

/*
 * Abstraction layer for cookie storage.
 * Uses cookie if available, otherwise fallback to localstorage.
 */
var cookieStorage = function cookieStorage() {
  this.storage = null;
};
cookieStorage.prototype.getStorage = function (disableCookies) {
  if (this.storage !== null) {
    return this.storage;
  }
  if (!disableCookies && baseCookie.areCookiesEnabled()) {
    this.storage = Cookie;
  } else {
    // if cookies disabled, fallback to localstorage
    // note: localstorage does not persist across subdomains
    var keyPrefix = 'amp_cookiestore_';
    this.storage = {
      _options: {
        expirationDays: undefined,
        domain: undefined,
        secure: false
      },
      reset: function reset() {
        this._options = {
          expirationDays: undefined,
          domain: undefined,
          secure: false
        };
      },
      options: function options(opts) {
        if (arguments.length === 0) {
          return this._options;
        }
        opts = opts || {};
        this._options.expirationDays = opts.expirationDays || this._options.expirationDays;
        // localStorage is specific to subdomains
        this._options.domain = opts.domain || this._options.domain || GlobalScope && GlobalScope.location && GlobalScope.location.hostname;
        return this._options.secure = opts.secure || false;
      },
      get: function get(name) {
        try {
          return JSON.parse(localStorage$1.getItem(keyPrefix + name));
        } catch (e) {} /* eslint-disable-line no-empty */
        return null;
      },
      set: function set(name, value) {
        try {
          localStorage$1.setItem(keyPrefix + name, JSON.stringify(value));
          return true;
        } catch (e) {} /* eslint-disable-line no-empty */
        return false;
      },
      remove: function remove(name) {
        try {
          localStorage$1.removeItem(keyPrefix + name);
        } catch (e) {
          return false;
        }
      }
    };
  }
  return this.storage;
};

var _storageOptionExists;
var storageOptionExists = (_storageOptionExists = {}, _defineProperty(_storageOptionExists, Constants.STORAGE_COOKIES, true), _defineProperty(_storageOptionExists, Constants.STORAGE_NONE, true), _defineProperty(_storageOptionExists, Constants.STORAGE_LOCAL, true), _defineProperty(_storageOptionExists, Constants.STORAGE_SESSION, true), _storageOptionExists);

/**
 * MetadataStorage involves SDK data persistance
 * storage priority: cookies -> localStorage -> in memory
 * This priority can be overriden by setting the storage options.
 * if in localStorage, unable track users between subdomains
 * if in memory, then memory can't be shared between different tabs
 */
var MetadataStorage = /*#__PURE__*/function () {
  function MetadataStorage(_ref) {
    var storageKey = _ref.storageKey,
      disableCookies = _ref.disableCookies,
      domain = _ref.domain,
      secure = _ref.secure,
      sameSite = _ref.sameSite,
      expirationDays = _ref.expirationDays,
      storage = _ref.storage;
    _classCallCheck(this, MetadataStorage);
    this.storageKey = storageKey;
    this.domain = domain;
    this.secure = secure;
    this.sameSite = sameSite;
    this.expirationDays = expirationDays;
    this.cookieDomain = '';
    var loc = utils.getLocation() ? utils.getLocation().href : undefined;
    var writableTopDomain = !disableCookies ? topDomain(loc) : '';
    this.cookieDomain = domain || (writableTopDomain ? '.' + writableTopDomain : null);
    if (storageOptionExists[storage]) {
      this.storage = storage;
    } else {
      var disableCookieStorage = disableCookies || !baseCookie.areCookiesEnabled({
        domain: this.cookieDomain,
        secure: this.secure,
        sameSite: this.sameSite,
        expirationDays: this.expirationDays
      });
      if (disableCookieStorage) {
        this.storage = Constants.STORAGE_LOCAL;
      } else {
        this.storage = Constants.STORAGE_COOKIES;
      }
    }
  }
  _createClass(MetadataStorage, [{
    key: "getCookieStorageKey",
    value: function getCookieStorageKey() {
      if (!this.domain) {
        return this.storageKey;
      }
      var suffix = this.domain.charAt(0) === '.' ? this.domain.substring(1) : this.domain;
      return "".concat(this.storageKey).concat(suffix ? "_".concat(suffix) : '');
    }

    /*
     * Data is saved as delimited values rather than JSO to minimize cookie space
     * Should not change order of the items
     */
  }, {
    key: "save",
    value: function save(_ref2) {
      var deviceId = _ref2.deviceId,
        userId = _ref2.userId,
        optOut = _ref2.optOut,
        sessionId = _ref2.sessionId,
        lastEventTime = _ref2.lastEventTime,
        eventId = _ref2.eventId,
        identifyId = _ref2.identifyId,
        sequenceNumber = _ref2.sequenceNumber;
      if (this.storage === Constants.STORAGE_NONE) {
        return;
      }
      var value = [deviceId, Base64.encode(userId || ''),
      // used to convert not unicode to alphanumeric since cookies only use alphanumeric
      optOut ? '1' : '', sessionId ? sessionId.toString(32) : '0',
      // generated when instantiated, timestamp (but re-uses session id in cookie if not expired) @TODO clients may want custom session id
      lastEventTime ? lastEventTime.toString(32) : '0',
      // last time an event was set
      eventId ? eventId.toString(32) : '0', identifyId ? identifyId.toString(32) : '0', sequenceNumber ? sequenceNumber.toString(32) : '0'].join('.');
      switch (this.storage) {
        case Constants.STORAGE_SESSION:
          if (GlobalScope.sessionStorage) {
            GlobalScope.sessionStorage.setItem(this.storageKey, value);
          }
          break;
        case Constants.STORAGE_LOCAL:
          localStorage$1.setItem(this.storageKey, value);
          break;
        case Constants.STORAGE_COOKIES:
          this.saveCookie(value);
          break;
      }
    }
  }, {
    key: "saveCookie",
    value: function saveCookie(value) {
      baseCookie.set(this.getCookieStorageKey(), value, {
        domain: this.cookieDomain,
        secure: this.secure,
        sameSite: this.sameSite,
        expirationDays: this.expirationDays
      });
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;
      var str;
      if (this.storage === Constants.STORAGE_COOKIES) {
        var cookieKey = this.getCookieStorageKey() + '=';
        var allCookies = baseCookie.getAll(cookieKey);
        if (allCookies.length === 0 || allCookies.length === 1) {
          str = allCookies[0];
        } else {
          // dedup cookies by deleting them all and restoring
          // the one with the most recent event time
          var latestCookie = baseCookie.sortByEventTime(allCookies)[0];
          allCookies.forEach(function () {
            return baseCookie.set(_this.getCookieStorageKey(), null, {});
          });
          this.saveCookie(latestCookie);
          str = baseCookie.get(cookieKey);
        }
      }
      if (!str) {
        str = localStorage$1.getItem(this.storageKey);
      }
      if (!str) {
        try {
          str = GlobalScope.sessionStorage && GlobalScope.sessionStorage.getItem(this.storageKey);
        } catch (e) {
          utils.log.info("window.sessionStorage unavailable. Reason: \"".concat(e, "\""));
        }
      }
      if (!str) {
        return null;
      }
      var values = str.split('.');
      var userId = null;
      if (values[Constants.USER_ID_INDEX]) {
        try {
          userId = Base64.decode(values[Constants.USER_ID_INDEX]);
        } catch (e) {
          userId = null;
        }
      }
      return {
        deviceId: values[Constants.DEVICE_ID_INDEX],
        userId: userId,
        optOut: values[Constants.OPT_OUT_INDEX] === '1',
        sessionId: parseInt(values[Constants.SESSION_ID_INDEX], 32),
        lastEventTime: parseInt(values[Constants.LAST_EVENT_TIME_INDEX], 32),
        eventId: parseInt(values[Constants.EVENT_ID_INDEX], 32),
        identifyId: parseInt(values[Constants.IDENTIFY_ID_INDEX], 32),
        sequenceNumber: parseInt(values[Constants.SEQUENCE_NUMBER_INDEX], 32)
      };
    }

    /**
     * Clears any saved metadata storage
     * @constructor AmplitudeClient
     * @public
     * @return {boolean} True if metadata was cleared, false if none existed
     */
  }, {
    key: "clear",
    value: function clear() {
      var str;
      if (this.storage === Constants.STORAGE_COOKIES) {
        str = baseCookie.get(this.getCookieStorageKey() + '=');
        baseCookie.set(this.getCookieStorageKey(), null, {
          domain: this.cookieDomain,
          secure: this.secure,
          sameSite: this.sameSite,
          expirationDays: 0
        });
      }
      if (!str) {
        str = localStorage$1.getItem(this.storageKey);
        localStorage$1.clear();
      }
      if (!str) {
        try {
          str = GlobalScope.sessionStorage && GlobalScope.sessionStorage.getItem(this.storageKey);
          GlobalScope.sessionStorage.clear();
        } catch (e) {
          utils.log.info("window.sessionStorage unavailable. Reason: \"".concat(e, "\""));
        }
      }
      return !!str;
    }
  }]);
  return MetadataStorage;
}();

var getUtmData = function getUtmData(rawCookie, query) {
  // Translate the utmz cookie format into url query string format.
  var cookie = rawCookie ? '?' + rawCookie.split('.').slice(-1)[0].replace(/\|/g, '&') : '';
  var fetchParam = function fetchParam(queryName, query, cookieName, cookie) {
    return utils.getQueryParam(queryName, query) || utils.getQueryParam(cookieName, cookie);
  };
  var utmSource = fetchParam(Constants.UTM_SOURCE, query, 'utmcsr', cookie);
  var utmMedium = fetchParam(Constants.UTM_MEDIUM, query, 'utmcmd', cookie);
  var utmCampaign = fetchParam(Constants.UTM_CAMPAIGN, query, 'utmccn', cookie);
  var utmTerm = fetchParam(Constants.UTM_TERM, query, 'utmctr', cookie);
  var utmContent = fetchParam(Constants.UTM_CONTENT, query, 'utmcct', cookie);
  var utmData = {};
  var addIfNotNull = function addIfNotNull(key, value) {
    if (!utils.isEmptyString(value)) {
      utmData[key] = value;
    }
  };
  addIfNotNull(Constants.UTM_SOURCE, utmSource);
  addIfNotNull(Constants.UTM_MEDIUM, utmMedium);
  addIfNotNull(Constants.UTM_CAMPAIGN, utmCampaign);
  addIfNotNull(Constants.UTM_TERM, utmTerm);
  addIfNotNull(Constants.UTM_CONTENT, utmContent);
  return utmData;
};

/*
 * Wrapper for a user properties JSON object that supports operations.
 * Note: if a user property is used in multiple operations on the same Identify object,
 * only the first operation will be saved, and the rest will be ignored.
 */

var AMP_OP_ADD = '$add';
var AMP_OP_APPEND = '$append';
var AMP_OP_CLEAR_ALL = '$clearAll';
var AMP_OP_PREPEND = '$prepend';
var AMP_OP_SET = '$set';
var AMP_OP_SET_ONCE = '$setOnce';
var AMP_OP_UNSET = '$unset';
var AMP_OP_PREINSERT = '$preInsert';
var AMP_OP_POSTINSERT = '$postInsert';
var AMP_OP_REMOVE = '$remove';

/**
 * Identify API - instance constructor. Identify objects are a wrapper for user property operations.
 * Each method adds a user property operation to the Identify object, and returns the same Identify object,
 * allowing you to chain multiple method calls together.
 * Note: if the same user property is used in multiple operations on a single Identify object,
 * only the first operation on that property will be saved, and the rest will be ignored.
 * @constructor Identify
 * @public
 * @example var identify = new amplitude.Identify();
 */
var Identify = function Identify() {
  this.userPropertiesOperations = {};
  this.properties = []; // keep track of keys that have been added
};

/**
 * Increment a user property by a given value (can also be negative to decrement).
 * If the user property does not have a value set yet, it will be initialized to 0 before being incremented.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string} value - The amount by which to increment the user property. Allows numbers as strings (ex: '123').
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().add('karma', 1).add('friends', 1);
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.add = function (property, value) {
  if (type(value) === 'number' || type(value) === 'string') {
    this._addOperation(AMP_OP_ADD, property, value);
  } else {
    utils.log.error('Unsupported type for value: ' + type(value) + ', expecting number or string');
  }
  return this;
};

/**
 * Append a value or values to a user property.
 * If the user property does not have a value set yet,
 * it will be initialized to an empty list before the new values are appended.
 * If the user property has an existing value and it is not a list,
 * the existing value will be converted into a list with the new values appended.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string|list|object} value - A value or values to append.
 * Values can be numbers, strings, lists, or object (key:value dict will be flattened).
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().append('ab-tests', 'new-user-tests');
 * identify.append('some_list', [1, 2, 3, 4, 'values']);
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.append = function (property, value) {
  this._addOperation(AMP_OP_APPEND, property, value);
  return this;
};

/**
 * Clear all user properties for the current user.
 * SDK user should instead call amplitude.clearUserProperties() instead of using this.
 * $clearAll needs to be sent on its own Identify object. If there are already other operations, then don't add $clearAll.
 * If $clearAll already in an Identify object, don't allow other operations to be added.
 * @private
 */
Identify.prototype.clearAll = function () {
  if (Object.keys(this.userPropertiesOperations).length > 0) {
    if (!Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, AMP_OP_CLEAR_ALL)) {
      utils.log.error('Need to send $clearAll on its own Identify object without any other operations, skipping $clearAll');
    }
    return this;
  }
  this.userPropertiesOperations[AMP_OP_CLEAR_ALL] = '-';
  return this;
};

/**
 * Prepend a value or values to a user property.
 * Prepend means inserting the value or values at the front of a list.
 * If the user property does not have a value set yet,
 * it will be initialized to an empty list before the new values are prepended.
 * If the user property has an existing value and it is not a list,
 * the existing value will be converted into a list with the new values prepended.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string|list|object} value - A value or values to prepend.
 * Values can be numbers, strings, lists, or object (key:value dict will be flattened).
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().prepend('ab-tests', 'new-user-tests');
 * identify.prepend('some_list', [1, 2, 3, 4, 'values']);
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.prepend = function (property, value) {
  this._addOperation(AMP_OP_PREPEND, property, value);
  return this;
};

/**
 * Sets the value of a given user property. If a value already exists, it will be overwriten with the new value.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string|list|boolean|object} value - A value or values to set.
 * Values can be numbers, strings, lists, or object (key:value dict will be flattened).
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().set('user_type', 'beta');
 * identify.set('name', {'first': 'John', 'last': 'Doe'}); // dict is flattened and becomes name.first: John, name.last: Doe
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.set = function (property, value) {
  this._addOperation(AMP_OP_SET, property, value);
  return this;
};

/**
 * Sets the value of a given user property only once. Subsequent setOnce operations on that user property will be ignored;
 * however, that user property can still be modified through any of the other operations.
 * Useful for capturing properties such as 'initial_signup_date', 'initial_referrer', etc.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string|list|boolean|object} value - A value or values to set once.
 * Values can be numbers, strings, lists, or object (key:value dict will be flattened).
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().setOnce('sign_up_date', '2016-04-01');
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.setOnce = function (property, value) {
  this._addOperation(AMP_OP_SET_ONCE, property, value);
  return this;
};

/**
 * Unset and remove a user property. This user property will no longer show up in a user's profile.
 * @public
 * @param {string} property - The user property key.
 * @return {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 * @example var identify = new amplitude.Identify().unset('user_type').unset('age');
 * amplitude.identify(identify); // send the Identify call
 */
Identify.prototype.unset = function (property) {
  this._addOperation(AMP_OP_UNSET, property, '-');
  return this;
};

/**
 * Preinsert a value or values to a user property, if it does not exist in the user property already.
 * Preinsert means inserting the value or values to the beginning of the specified user property.
 * If the item already exists in the user property, it will be a no-op.
 * @public
 * @param {string} property - The user property key.
 * @param {number|string|list|object} value - A value or values to insert.
 * @returns {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 */
Identify.prototype.preInsert = function (property, value) {
  this._addOperation(AMP_OP_PREINSERT, property, value);
  return this;
};

/**
 * Postinsert a value or values to a user property, if it does not exist in the user property already.
 * Postinsert means inserting the value or values to the beginning of the specified user property.
 * If the item already exists in the user property, it will be a no-op.
 * @param {string} property - The user property key.
 * @param {number|string|list|object} value - A value or values to insert.
 * @returns {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 */
Identify.prototype.postInsert = function (property, value) {
  this._addOperation(AMP_OP_POSTINSERT, property, value);
  return this;
};

/**
 * Remove a value or values to a user property, if it does exist in the user property.
 * If the item does not exist in the user property, it will be a no-op.
 * @param {string} property - The user property key.
 * @param {number|string|list|object} value - A value or values to remove.
 * @returns {Identify} Returns the same Identify object, allowing you to chain multiple method calls together.
 */
Identify.prototype.remove = function (property, value) {
  this._addOperation(AMP_OP_REMOVE, property, value);
  return this;
};

/**
 * Helper function that adds operation to the Identify's object
 * Handle's filtering of duplicate user property keys, and filtering for clearAll.
 * @private
 */
Identify.prototype._addOperation = function (operation, property, value) {
  // check that the identify doesn't already contain a clearAll
  if (Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, AMP_OP_CLEAR_ALL)) {
    utils.log.error('This identify already contains a $clearAll operation, skipping operation ' + operation);
    return;
  }

  // check that property wasn't already used in this Identify
  if (this.properties.indexOf(property) !== -1) {
    utils.log.error('User property "' + property + '" already used in this identify, skipping operation ' + operation);
    return;
  }
  if (!Object.prototype.hasOwnProperty.call(this.userPropertiesOperations, operation)) {
    this.userPropertiesOperations[operation] = {};
  }
  this.userPropertiesOperations[operation][property] = value;
  this.properties.push(property);
};

/*
 * Simple AJAX request object
 */
var Request = function Request(url, data, headers) {
  this.url = url;
  this.data = data || {};
  this.headers = headers;
};
var CORS_HEADER = 'Cross-Origin-Resource-Policy';
function setHeaders(xhr, headers) {
  for (var header in headers) {
    if (header === CORS_HEADER && !headers[header]) {
      continue;
    }
    xhr.setRequestHeader(header, headers[header]);
  }
}
Request.prototype.send = function (callback) {
  var isIE = GlobalScope.XDomainRequest ? true : false;
  if (isIE) {
    var xdr = new GlobalScope.XDomainRequest();
    xdr.open('POST', this.url, true);
    xdr.onload = function () {
      callback(200, xdr.responseText);
    };
    xdr.onerror = function () {
      // status code not available from xdr, try string matching on responseText
      if (xdr.responseText === 'Request Entity Too Large') {
        callback(413, xdr.responseText);
      } else {
        callback(500, xdr.responseText);
      }
    };
    xdr.ontimeout = function () {};
    xdr.onprogress = function () {};
    xdr.send(queryString.stringify(this.data));
  } else if (typeof XMLHttpRequest !== 'undefined') {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.status, xhr.responseText);
      }
    };
    setHeaders(xhr, this.headers);
    xhr.send(queryString.stringify(this.data));
  } else {
    var responseStatus = undefined;
    fetch(this.url, {
      method: 'POST',
      headers: this.headers,
      body: queryString.stringify(this.data)
    }).then(function (response) {
      responseStatus = response.status;
      return response.text();
    }).then(function (responseText) {
      callback(responseStatus, responseText);
    });
  }
  //log('sent request to ' + this.url + ' with data ' + decodeURIComponent(queryString(this.data)));
};

/**
 * Revenue API - instance constructor. Wrapper for logging Revenue data. Revenue objects get passed to amplitude.logRevenueV2 to send to Amplitude servers.
 * Each method updates a revenue property in the Revenue object, and returns the same Revenue object,
 * allowing you to chain multiple method calls together.
 *
 * Note: price is a required field to log revenue events.
 * If quantity is not specified then defaults to 1.
 * @constructor Revenue
 * @public
 * @example var revenue = new amplitude.Revenue();
 */
var Revenue = function Revenue() {
  // required fields
  this._price = null;

  // optional fields
  this._productId = null;
  this._quantity = 1;
  this._revenueType = null;
  this._properties = null;
};

/**
 * Set a value for the product identifer.
 * @public
 * @param {string} productId - The value for the product identifier. Empty and invalid strings are ignored.
 * @return {Revenue} Returns the same Revenue object, allowing you to chain multiple method calls together.
 * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99);
 * amplitude.logRevenueV2(revenue);
 */
Revenue.prototype.setProductId = function setProductId(productId) {
  if (type(productId) !== 'string') {
    utils.log.error('Unsupported type for productId: ' + type(productId) + ', expecting string');
  } else if (utils.isEmptyString(productId)) {
    utils.log.error('Invalid empty productId');
  } else {
    this._productId = productId;
  }
  return this;
};

/**
 * Set a value for the quantity. Note revenue amount is calculated as price * quantity.
 * @public
 * @param {number} quantity - Integer value for the quantity. If not set, quantity defaults to 1.
 * @return {Revenue} Returns the same Revenue object, allowing you to chain multiple method calls together.
 * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99).setQuantity(5);
 * amplitude.logRevenueV2(revenue);
 */
Revenue.prototype.setQuantity = function setQuantity(quantity) {
  if (type(quantity) !== 'number') {
    utils.log.error('Unsupported type for quantity: ' + type(quantity) + ', expecting number');
  } else {
    this._quantity = parseInt(quantity);
  }
  return this;
};

/**
 * Set a value for the price. This field is required for all revenue being logged.
 *
 * Note: revenue amount is calculated as price * quantity.
 * @public
 * @param {number} price - Double value for the quantity.
 * @return {Revenue} Returns the same Revenue object, allowing you to chain multiple method calls together.
 * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99);
 * amplitude.logRevenueV2(revenue);
 */
Revenue.prototype.setPrice = function setPrice(price) {
  if (type(price) !== 'number') {
    utils.log.error('Unsupported type for price: ' + type(price) + ', expecting number');
  } else {
    this._price = price;
  }
  return this;
};

/**
 * Set a value for the revenueType (for example purchase, cost, tax, refund, etc).
 * @public
 * @param {string} revenueType - RevenueType to designate.
 * @return {Revenue} Returns the same Revenue object, allowing you to chain multiple method calls together.
 * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99).setRevenueType('purchase');
 * amplitude.logRevenueV2(revenue);
 */
Revenue.prototype.setRevenueType = function setRevenueType(revenueType) {
  if (type(revenueType) !== 'string') {
    utils.log.error('Unsupported type for revenueType: ' + type(revenueType) + ', expecting string');
  } else {
    this._revenueType = revenueType;
  }
  return this;
};

/**
 * Set event properties for the revenue event.
 * @public
 * @param {object} eventProperties - Revenue event properties to set.
 * @return {Revenue} Returns the same Revenue object, allowing you to chain multiple method calls together.
 * @example var event_properties = {'city': 'San Francisco'};
 * var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99).setEventProperties(event_properties);
 * amplitude.logRevenueV2(revenue);
 */
Revenue.prototype.setEventProperties = function setEventProperties(eventProperties) {
  if (type(eventProperties) !== 'object') {
    utils.log.error('Unsupported type for eventProperties: ' + type(eventProperties) + ', expecting object');
  } else {
    this._properties = utils.validateProperties(eventProperties);
  }
  return this;
};

/**
 * @private
 */
Revenue.prototype._isValidRevenue = function _isValidRevenue() {
  if (type(this._price) !== 'number') {
    utils.log.error('Invalid revenue, need to set price field');
    return false;
  }
  return true;
};

/**
 * @private
 */
Revenue.prototype._toJSONObject = function _toJSONObject() {
  var obj = type(this._properties) === 'object' ? this._properties : {};
  if (this._productId !== null) {
    obj[Constants.REVENUE_PRODUCT_ID] = this._productId;
  }
  if (this._quantity !== null) {
    obj[Constants.REVENUE_QUANTITY] = this._quantity;
  }
  if (this._price !== null) {
    obj[Constants.REVENUE_PRICE] = this._price;
  }
  if (this._revenueType !== null) {
    obj[Constants.REVENUE_REVENUE_TYPE] = this._revenueType;
  }
  return obj;
};

/**
 * Source: [jed's gist]{@link https://gist.github.com/982883}.
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f, and
 * y is replaced with a random hexadecimal digit from 8 to b.
 * Used to generate UUIDs for deviceIds.
 * @private
 */
var uuid = function uuid(a) {
  return a // if the placeholder was passed, return
  ?
  // a random number from 0 to 15
  (a ^
  // unless b is 8,
  Math.random() *
  // in which case
  16 >>
  // a random number from
  a / 4
  // 8 to 11
  ).toString(16) // in hexadecimal
  :
  // or otherwise a concatenated string:
  ([1e7] +
  // 10000000 +
  -1e3 +
  // -1000 +
  -4e3 +
  // -4000 +
  -8e3 +
  // -80000000 +
  -1e11
  // -100000000000,
  ).replace(
  // replacing
  /[018]/g,
  // zeroes, ones, and eights with
  uuid // random hex digits
  );
};

var getLanguage = function getLanguage() {
  return typeof navigator !== 'undefined' && (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage) || '';
};
var language = {
  getLanguage: getLanguage
};

/**
 * AmplitudeServerZone is for Data Residency and handling server zone related properties.
 * The server zones now are US and EU.
 *
 * For usage like sending data to Amplitude's EU servers, you need to configure the serverZone during nitializing.
 */
var AmplitudeServerZone = {
  US: 'US',
  EU: 'EU'
};
var getEventLogApi = function getEventLogApi(serverZone) {
  var eventLogUrl = Constants.EVENT_LOG_URL;
  switch (serverZone) {
    case AmplitudeServerZone.EU:
      eventLogUrl = Constants.EVENT_LOG_EU_URL;
      break;
    case AmplitudeServerZone.US:
      eventLogUrl = Constants.EVENT_LOG_URL;
      break;
  }
  return eventLogUrl;
};
var getDynamicConfigApi = function getDynamicConfigApi(serverZone) {
  var dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
  switch (serverZone) {
    case AmplitudeServerZone.EU:
      dynamicConfigUrl = Constants.DYNAMIC_CONFIG_EU_URL;
      break;
    case AmplitudeServerZone.US:
      dynamicConfigUrl = Constants.DYNAMIC_CONFIG_URL;
      break;
  }
  return dynamicConfigUrl;
};

var version = "8.21.9";

/**
 * Options used when initializing Amplitude
 * @typedef {Object} Options
 * @property {string} [apiEndpoint=`api.amplitude.com`] - Endpoint to send amplitude event requests to.
 * @property {boolean} [batchEvents=`false`] -  If `true`, then events are batched together and uploaded only when the number of unsent events is greater than or equal to eventUploadThreshold or after eventUploadPeriodMillis milliseconds have passed since the first unsent event was logged.
 * @property {number} [cookieExpiration=`365`] - The number of days after which the Amplitude cookie will expire. 12 months is for GDPR compliance.
 * @property {string} [cookieName=`amplitude_id`] - *DEPRECATED*
 * @property {string} [sameSiteCookie='None'] -  Sets the SameSite flag on the amplitude cookie. Decides cookie privacy policy.
 * @property {boolean} [cookieForceUpgrade=`false`] - Forces pre-v6.0.0 instances to adopt post-v6.0.0 compat cookie formats.
 * @property {boolean} [deferInitialization=`null`] -  If `true`, disables the core functionality of the sdk, including saving a cookie and all logging, until explicitly enabled. To enable tracking, please call `amplitude.getInstance().enableTracking()` *Note: This will not affect users who already have an amplitude cookie. The decision to track events is determined by whether or not a user has an amplitude analytics cookie. If the `cookieExpiration</code> is manually defined to be a short lifespan, you may need to run `amplitude.getInstance().enableTracking()` upon the cookie expiring or upon logging in.*
 * @property {boolean} [disableCookies=`false`] -  Disable Ampllitude cookies altogether.
 * @property {string} [deviceId=A randomly generated UUID.] -  The custom Device ID to set. *Note: This is not recommended unless you know what you are doing (e.g. you have your own system for tracking user devices).*
 * @property {boolean} [deviceIdFromUrlParam=`false`] -  If `true`, then the SDK will parse Device ID values from the URL parameter amp_device_id if available. Device IDs defined in the configuration options during init will take priority over Device IDs from URL parameters.
 * @property {string} [domain=The top domain of the current page's URL. ('https://amplitude.com')] -  Set a custom domain for the Amplitude cookie. To include subdomains, add a preceding period, eg: `.amplitude.com`.
 * @property {number} [eventUploadPeriodMillis=`30000` (30 sec)] -  Amount of time in milliseconds that the SDK waits before uploading events if batchEvents is true.
 * @property {number} [eventUploadThreshold=`30`] -  Minimum number of events to batch together per request if batchEvents is true.
 * @property {boolean} [forceHttps=`true`] -  If `true`, the events will always be uploaded to HTTPS endpoint. Otherwise, it will use the embedding site's protocol.
 * @property {boolean} [includeFbclid=`false`] -  If `true`, captures the fbclid URL parameter as well as the user's initial_fbclid via a setOnce operation.
 * @property {boolean} [includeGclid=`false`] -  If `true`, captures the gclid URL parameter as well as the user's initial_gclid via a setOnce operation.
 * @property {boolean} [includeReferrer=`false`] -  If `true`, captures the referrer and referring_domain for each session, as well as the user's initial_referrer and initial_referring_domain via a setOnce operation.
 * @property {boolean} [includeUtm=`false`] -  If `true`, finds UTM parameters in the query string or the _utmz cookie, parses, and includes them as user properties on all events uploaded. This also captures initial UTM parameters for each session via a setOnce operation.
 * @property {Object} [ingestionMetadata] Ingestion metadata
 * @property {string} [ingestionMetadata.sourceName] source name in ingestion metadata, e.g. "ampli"
 * @property {string} [ingestionMetadata.sourceVersion] source version in ingestion metadata, e.g. "1.0.0"
 * @property {string} [language=The language determined by the browser] -  Custom language to set.
 * @property {Object} [library=`{ name: 'amplitude-js', version: packageJsonVersion }`] -  Values for the library version
 * @property {string} [logLevel=`WARN`] -  Level of logs to be printed in the developer console. Valid values are 'DISABLE', 'ERROR', 'WARN', 'INFO'. To learn more about the different options, see below.
 * @property {boolean} [logAttributionCapturedEvent=`false`] - If `true`, the SDK will log an Amplitude event anytime new attribution values are captured from the user. **Note: These events count towards your event volume.** Event name being logged: [Amplitude] Attribution Captured. Event Properties that can be logged: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrer`, `referring_domain`, `gclid`, `fbclid`. For UTM properties to be logged, `includeUtm` must be set to `true`. For the `referrer` and `referring_domain` properties to be logged, `includeReferrer` must be set to `true`. For the `gclid` property to be logged, `includeGclid` must be set to `true`. For the `fbclid` property to be logged, `includeFbclid` must be set to `true`.
 * @property {boolean} [optOut=`false`] -  Whether or not to disable tracking for the current user.
 * @property {function} [onError=`() => {}`] - Function to call on error.
 * @property {function} [onExitPage=`() => {}`] - Function called when the user exits the browser. Useful logging on page exit.
 * @property {Object} [plan] Tracking plan properties
 * @property {string} [plan.branch] The tracking plan branch name e.g. "main"
 * @property {string} [plan.source] The tracking plan source e.g. "web"
 * @property {string} [plan.version] The tracking plan version e.g. "1", "15"
 * @property {string} [plan.versionId] The tracking plan version Id e.g. "9ec23ba0-275f-468f-80d1-66b88bff9529"
 * @property {string} [platform=`Web`] -  Platform device is running on. Defaults to `Web` (browser, including mobile browsers).
 * @property {number} [savedMaxCount=`1000`] -  Maximum number of events to save in localStorage. If more events are logged while offline, then old events are removed.
 * @property {boolean} [saveEvents=`true`] -  If `true`, saves events to localStorage and removes them upon successful upload. *Note: Without saving events, events may be lost if the user navigates to another page before the events are uploaded.*
 * @property {boolean} [saveParamsReferrerOncePerSession=`true`] -  If `true`, then includeGclid, includeFbclid, includeReferrer, and includeUtm will only track their respective properties once per session. New values that come in during the middle of the user's session will be ignored. Set to false to always capture new values.
 * @property {boolean} [secureCookie=`false`] -  If `true`, the amplitude cookie will be set with the Secure flag.
 * @property {number} [sessionTimeout=`30*60*1000` (30 min)] -  The time between logged events before a new session starts in milliseconds.
 * @property {string[]} [storage=`''`] - Sets storage strategy.  Options are 'cookies', 'localStorage', 'sessionStorage', or `none`. Will override `disableCookies` option
 * @property {Object} [trackingOptions=`{ city: true, country: true, carrier: true, device_manufacturer: true, device_model: true, dma: true, ip_address: true, language: true, os_name: true, os_version: true, platform: true, region: true, version_name: true}`] - Type of data associated with a user.
 * @property {string} [transport=`http`] - Network transport mechanism used to send events. Options are 'http' and 'beacon'.
 * @property {boolean} [unsetParamsReferrerOnNewSession=`false`] -  If `false`, the existing `referrer` and `utm_parameter` values will be carried through each new session. If set to `true`, the `referrer` and `utm_parameter` user properties, which include `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`, will be set to `null` upon instantiating a new session. Note: This only works if `includeReferrer` or `includeUtm` is set to `true`.
 * @property {string} [unsentKey=`amplitude_unsent`] - localStorage key that stores unsent events.
 * @property {string} [unsentIdentifyKey=`amplitude_unsent_identify`] - localStorage key that stores unsent identifies.
 * @property {number} [uploadBatchSize=`100`] -  The maximum number of events to send to the server per request.
 * @property {Object} [headers=`{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }`] - Headers attached to an event(s) upload network request. Custom header properties are merged with this object.
 * @property {string} [serverZone] - For server zone related configuration, used for server api endpoint and dynamic configuration.
 * @property {boolean} [useDynamicConfig] - Enable dynamic configuration to find best server url for user.
 * @property {boolean} [serverZoneBasedApi] - To update api endpoint with serverZone change or not. For data residency, recommend to enable it unless using own proxy server.
 * @property {number} [sessionId=`null`] - The custom Session ID for the current session. *Note: This is not recommended unless you know what you are doing because the Session ID of a session is utilized for all session metrics in Amplitude.
 * @property {string} [partnerId=`null`] - The partner id value
 */
var DEFAULT_OPTIONS = {
  apiEndpoint: Constants.EVENT_LOG_URL,
  batchEvents: false,
  cookieExpiration: 365,
  // 12 months is for GDPR compliance
  cookieName: 'amplitude_id',
  // this is a deprecated option
  sameSiteCookie: 'Lax',
  // cookie privacy policy
  cookieForceUpgrade: false,
  deferInitialization: false,
  disableCookies: false,
  // this is a deprecated option
  deviceIdFromUrlParam: false,
  domain: '',
  eventUploadPeriodMillis: 30 * 1000,
  // 30s
  eventUploadThreshold: 30,
  forceHttps: true,
  includeFbclid: false,
  includeGclid: false,
  includeReferrer: false,
  includeUtm: false,
  ingestionMetadata: {
    sourceName: '',
    sourceVersion: ''
  },
  language: language.getLanguage(),
  library: {
    name: 'amplitude-js',
    version: version
  },
  logLevel: 'WARN',
  logAttributionCapturedEvent: false,
  optOut: false,
  onError: function onError() {},
  onExitPage: function onExitPage() {},
  onNewSessionStart: function onNewSessionStart() {},
  plan: {
    branch: '',
    source: '',
    version: '',
    versionId: ''
  },
  platform: 'Web',
  savedMaxCount: 1000,
  saveEvents: true,
  saveParamsReferrerOncePerSession: true,
  secureCookie: false,
  sessionTimeout: 30 * 60 * 1000,
  storage: Constants.STORAGE_DEFAULT,
  trackingOptions: {
    city: true,
    country: true,
    carrier: true,
    device_manufacturer: true,
    device_model: true,
    dma: true,
    ip_address: true,
    language: true,
    os_name: true,
    os_version: true,
    platform: true,
    region: true,
    version_name: true
  },
  transport: Constants.TRANSPORT_HTTP,
  unsetParamsReferrerOnNewSession: false,
  unsentKey: 'amplitude_unsent',
  unsentIdentifyKey: 'amplitude_unsent_identify',
  uploadBatchSize: 100,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cross-Origin-Resource-Policy': 'cross-origin'
  },
  serverZone: AmplitudeServerZone.US,
  useDynamicConfig: false,
  serverZoneBasedApi: false,
  sessionId: null,
  partnerId: ''
};

/**
 * Dynamic Configuration
 * Find the best server url automatically based on app users' geo location.
 */
var ConfigManager = /*#__PURE__*/function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
    if (!ConfigManager.instance) {
      this.ingestionEndpoint = Constants.EVENT_LOG_URL;
      ConfigManager.instance = this;
    }
    return ConfigManager.instance;
  }
  _createClass(ConfigManager, [{
    key: "refresh",
    value: function refresh(serverZone, forceHttps, callback) {
      var protocol = 'https';
      if (!forceHttps && 'https:' !== GlobalScope.location.protocol) {
        protocol = 'http';
      }
      var dynamicConfigUrl = protocol + '://' + getDynamicConfigApi(serverZone);
      var self = this;
      var isIE = GlobalScope.XDomainRequest ? true : false;
      if (isIE) {
        var xdr = new GlobalScope.XDomainRequest();
        xdr.open('GET', dynamicConfigUrl, true);
        xdr.onload = function () {
          var response = JSON.parse(xdr.responseText);
          self.ingestionEndpoint = response['ingestionEndpoint'];
          if (callback) {
            callback();
          }
        };
        xdr.onerror = function () {};
        xdr.ontimeout = function () {};
        xdr.onprogress = function () {};
        xdr.send();
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', dynamicConfigUrl, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            self.ingestionEndpoint = response['ingestionEndpoint'];
            if (callback) {
              callback();
            }
          }
        };
        xhr.send();
      }
    }
  }]);
  return ConfigManager;
}();
var instance$1 = new ConfigManager();

/**
 * AmplitudeClient SDK API - instance constructor.
 * The Amplitude class handles creation of client instances, all you need to do is call amplitude.getInstance()
 * @constructor AmplitudeClient
 * @public
 * @example var amplitudeClient = new AmplitudeClient();
 */
var AmplitudeClient = function AmplitudeClient(instanceName) {
  if (!isBrowserEnv() && !utils.isWebWorkerEnvironment()) {
    utils.log.warn('amplitude-js will not work in a non-browser environment. If you are planning to add Amplitude to a node environment, please use @amplitude/node');
  }
  this._instanceName = utils.isEmptyString(instanceName) ? Constants.DEFAULT_INSTANCE : instanceName.toLowerCase();
  this._unsentEvents = [];
  this._unsentIdentifys = [];
  this.options = _objectSpread2(_objectSpread2({}, DEFAULT_OPTIONS), {}, {
    headers: _objectSpread2({}, DEFAULT_OPTIONS.headers),
    ingestionMetadata: _objectSpread2({}, DEFAULT_OPTIONS.ingestionMetadata),
    library: _objectSpread2({}, DEFAULT_OPTIONS.library),
    plan: _objectSpread2({}, DEFAULT_OPTIONS.plan),
    trackingOptions: _objectSpread2({}, DEFAULT_OPTIONS.trackingOptions)
  });
  this._q = []; // queue for proxied functions before script load
  this._sending = false;
  this._updateScheduled = false;
  this._onInitCallbacks = [];
  this._onNewSessionStartCallbacks = [];

  // event meta data
  this._eventId = 0;
  this._identifyId = 0;
  this._lastEventTime = null;
  this._newSession = false;
  // sequence used for by frontend for prioritizing event send retries
  this._sequenceNumber = 0;
  this._sessionId = null;
  this._isInitialized = false;

  // used to integrate with experiment SDK (client-side exposure tracking & real-time user properties)
  this._connector = null;
  this._userAgent = typeof navigator !== 'undefined' && navigator && navigator.userAgent || null;
  this._ua = new UAParser(this._userAgent).getResult();
};
AmplitudeClient.prototype.Identify = Identify;
AmplitudeClient.prototype.Revenue = Revenue;

/**
 * Initializes the Amplitude Javascript SDK with your apiKey and any optional configurations.
 * This is required before any other methods can be called.
 * @public
 * @param {string} apiKey - The API key for your app.
 * @param {string} opt_userId - (optional) An identifier for this user.
 * @param {object} opt_config - (optional) Configuration options.
 * See [options.js](https://amplitude.github.io/Amplitude-JavaScript/Options) for a list of options and default values.
 * @param {function} opt_callback - (optional) Provide a callback function to run after initialization is complete.
 * @example amplitudeClient.init('API_KEY', 'USER_ID', {includeReferrer: true, includeUtm: true}, function() { alert('init complete'); });
 */
AmplitudeClient.prototype.init = function init(apiKey, opt_userId, opt_config, opt_callback) {
  var _this = this;
  if (type(apiKey) !== 'string' || utils.isEmptyString(apiKey)) {
    utils.log.error('Invalid apiKey. Please re-initialize with a valid apiKey');
    return;
  }
  try {
    // used to integrate with experiment SDK (client-side exposure tracking & real-time user properties)
    this._connector = AnalyticsConnector.getInstance(this._instanceName);
    _parseConfig(this.options, opt_config);
    if ((isBrowserEnv() || utils.isWebWorkerEnvironment()) && GlobalScope.Prototype !== undefined && Array.prototype.toJSON) {
      prototypeJsFix();
      utils.log.warn('Prototype.js injected Array.prototype.toJSON. Deleting Array.prototype.toJSON to prevent double-stringify');
    }
    if (this.options.cookieName !== DEFAULT_OPTIONS.cookieName) {
      utils.log.warn('The cookieName option is deprecated. We will be ignoring it for newer cookies');
    }
    if (this.options.serverZoneBasedApi) {
      this.options.apiEndpoint = getEventLogApi(this.options.serverZone);
    }
    this._refreshDynamicConfig();
    this.options.apiKey = apiKey;
    this._storageSuffix = '_' + apiKey + (this._instanceName === Constants.DEFAULT_INSTANCE ? '' : '_' + this._instanceName);
    this._storageSuffixV5 = apiKey.slice(0, 6);
    this._oldCookiename = this.options.cookieName + this._storageSuffix;
    this._unsentKey = this.options.unsentKey + this._storageSuffix;
    this._unsentIdentifyKey = this.options.unsentIdentifyKey + this._storageSuffix;
    this._cookieName = Constants.COOKIE_PREFIX + '_' + this._storageSuffixV5;
    this.cookieStorage = new cookieStorage().getStorage(this.options.disableCookies);
    this.cookieStorage.options({
      expirationDays: this.options.cookieExpiration,
      domain: this.options.domain,
      secure: this.options.secureCookie,
      sameSite: this.options.sameSiteCookie
    });
    this._metadataStorage = new MetadataStorage({
      storageKey: this._cookieName,
      disableCookies: this.options.disableCookies,
      expirationDays: this.options.cookieExpiration,
      domain: this.options.domain,
      secure: this.options.secureCookie,
      sameSite: this.options.sameSiteCookie,
      storage: this.options.storage
    });
    var hasOldCookie = !!this.cookieStorage.get(this._oldCookiename);
    var hasNewCookie = !!this._metadataStorage.load();
    this._useOldCookie = !hasNewCookie && hasOldCookie && !this.options.cookieForceUpgrade;
    var hasCookie = hasNewCookie || hasOldCookie;
    if (this.options.deferInitialization && !hasCookie) {
      this._deferInitialization(apiKey, opt_userId, opt_config, opt_callback);
      return;
    }
    this.options.domain = this.cookieStorage.options().domain;
    if (type(this.options.logLevel) === 'string') {
      utils.setLogLevel(this.options.logLevel);
    }
    var trackingOptions = _generateApiPropertiesTrackingConfig(this);
    this._apiPropertiesTrackingOptions = Object.keys(trackingOptions).length > 0 ? {
      tracking_options: trackingOptions
    } : {};
    if (this.options.cookieForceUpgrade && hasOldCookie) {
      if (!hasNewCookie) {
        _upgradeCookieData(this);
      }
      this.cookieStorage.remove(this._oldCookiename);
    }
    _loadCookieData(this);
    this._pendingReadStorage = true;
    var initFromStorage = function initFromStorage(storedDeviceId) {
      if (opt_config && opt_config.deviceId && !utils.validateDeviceId(opt_config.deviceId)) {
        utils.log.error("Invalid device ID rejected. Randomly generated UUID will be used instead of \"".concat(opt_config.deviceId, "\""));
        delete opt_config.deviceId;
      }
      _this.options.deviceId = _this._getInitialDeviceId(opt_config && opt_config.deviceId, storedDeviceId);
      _this.options.userId = type(opt_userId) === 'string' && !utils.isEmptyString(opt_userId) && opt_userId || type(opt_userId) === 'number' && opt_userId.toString() || _this.options.userId || null;
      var now = new Date().getTime();
      var startNewSession = !_this._sessionId || !_this._lastEventTime || now - _this._lastEventTime > _this.options.sessionTimeout || _this.options.sessionId;
      if (startNewSession) {
        if (_this.options.unsetParamsReferrerOnNewSession) {
          _this._unsetUTMParams();
        }
        _this._newSession = true;
        _this._sessionId = _this.options.sessionId || now;
        // reset this.options.sessionId to avoid re-usage
        // use instance.getSessionId() to get session id
        _this.options.sessionId = undefined;

        // only capture UTM params and referrer if new session
        if (_this.options.saveParamsReferrerOncePerSession) {
          _this._trackParamsAndReferrer();
        }
      }
      if (!_this.options.saveParamsReferrerOncePerSession) {
        _this._trackParamsAndReferrer();
      }

      // load unsent events and identifies before any attempt to log new ones
      if (_this.options.saveEvents) {
        _validateUnsentEventQueue(_this._unsentEvents);
        _validateUnsentEventQueue(_this._unsentIdentifys);
      }
      _this._lastEventTime = now;
      _saveCookieData(_this);
      _this._pendingReadStorage = false;
      _this._sendEventsIfReady(); // try sending unsent events

      for (var i = 0; i < _this._onInitCallbacks.length; i++) {
        _this._onInitCallbacks[i](_this);
      }
      _this._onInitCallbacks = [];
      _this._isInitialized = true;
      if (startNewSession) {
        _this._runNewSessionStartCallbacks();
      }
    };
    if (this.options.saveEvents) {
      this._unsentEvents = this._loadSavedUnsentEvents(this.options.unsentKey).map(function (event) {
        return {
          event: event
        };
      }).concat(this._unsentEvents);
      this._unsentIdentifys = this._loadSavedUnsentEvents(this.options.unsentIdentifyKey).map(function (event) {
        return {
          event: event
        };
      }).concat(this._unsentIdentifys);
    }
    if (opt_config && opt_config.onNewSessionStart) {
      this.onNewSessionStart(this.options.onNewSessionStart);
    }
    initFromStorage();
    this.runQueuedFunctions();
    if (type(opt_callback) === 'function') {
      opt_callback(this);
    }
    var onExitPage = this.options.onExitPage;
    if (type(onExitPage) === 'function' && GlobalScope.addEventListener) {
      if (!this.pageHandlersAdded) {
        this.pageHandlersAdded = true;
        var handleVisibilityChange = function handleVisibilityChange() {
          var prevTransport = _this.options.transport;
          _this.setTransport(Constants.TRANSPORT_BEACON);
          onExitPage();
          _this.setTransport(prevTransport);
        };

        // Monitoring just page exits because that is the most requested feature for now
        // "If you're specifically trying to detect page unload events, the pagehide event is the best option."
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event
        GlobalScope.addEventListener('pagehide', function () {
          handleVisibilityChange();
        }, false);
      }
    }

    // Sets an event receiver to receive and forward exposure events from the experiment SDK.
    this._connector.eventBridge.setEventReceiver(function (event) {
      _this._logEvent(event.eventType, event.eventProperties, event.userProperties);
    });

    // Set the user ID and device ID in the core identity store to enable fetching variants.
    var editor = this._connector.identityStore.editIdentity();
    if (this.options.deviceId) {
      editor.setDeviceId(this.options.deviceId);
    }
    if (this.options.userId) {
      editor.setUserId(this.options.userId);
    }
    editor.commit();
  } catch (err) {
    utils.log.error(err);
    if (opt_config && type(opt_config.onError) === 'function') {
      opt_config.onError(err);
    }
  }
};
AmplitudeClient.prototype._runNewSessionStartCallbacks = function () {
  for (var i = 0; i < this._onNewSessionStartCallbacks.length; i++) {
    this._onNewSessionStartCallbacks[i](this);
  }
};
AmplitudeClient.prototype.deleteLowerLevelDomainCookies = function () {
  var host = utils.getHost();
  var cookieHost = this.options.domain && this.options.domain[0] === '.' ? this.options.domain.slice(1) : this.options.domain;
  if (!cookieHost || !utils.isWebWorkerEnvironment()) {
    return;
  }
  if (host !== cookieHost) {
    if (new RegExp(cookieHost + '$').test(host)) {
      var hostParts = host.split('.');
      var cookieHostParts = cookieHost.split('.');
      for (var i = hostParts.length; i > cookieHostParts.length; --i) {
        var deleteDomain = hostParts.slice(hostParts.length - i).join('.');
        baseCookie.set(this._cookieName, null, {
          domain: '.' + deleteDomain
        });
      }
      baseCookie.set(this._cookieName, null, {});
    }
  }
};
AmplitudeClient.prototype._getInitialDeviceId = function (configDeviceId, storedDeviceId) {
  if (configDeviceId) {
    return configDeviceId;
  }
  if (this.options.deviceIdFromUrlParam) {
    var deviceIdFromUrlParam = this._getDeviceIdFromUrlParam(this._getUrlParams());
    if (deviceIdFromUrlParam) {
      return deviceIdFromUrlParam;
    }
  }
  if (this.options.deviceId) {
    return this.options.deviceId;
  }
  if (storedDeviceId) {
    return storedDeviceId;
  }
  return base64Id();
};

// validate properties for unsent events
var _validateUnsentEventQueue = function _validateUnsentEventQueue(queue) {
  for (var i = 0; i < queue.length; i++) {
    var userProperties = queue[i].event.user_properties;
    var eventProperties = queue[i].event.event_properties;
    var groups = queue[i].event.groups;
    queue[i].event.user_properties = utils.validateProperties(userProperties);
    queue[i].event.event_properties = utils.validateProperties(eventProperties);
    queue[i].event.groups = utils.validateGroups(groups);
  }
};

/**
 * @private
 */
AmplitudeClient.prototype._trackParamsAndReferrer = function _trackParamsAndReferrer() {
  var utmProperties;
  var referrerProperties;
  var gclidProperties;
  var fbclidProperties;
  if (this.options.includeUtm) {
    utmProperties = this._initUtmData();
  }
  if (this.options.includeReferrer) {
    referrerProperties = this._saveReferrer(this._getReferrer());
  }
  if (this.options.includeGclid) {
    gclidProperties = this._saveGclid(this._getUrlParams());
  }
  if (this.options.includeFbclid) {
    fbclidProperties = this._saveFbclid(this._getUrlParams());
  }
  if (this.options.logAttributionCapturedEvent) {
    var attributionProperties = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, utmProperties), referrerProperties), gclidProperties), fbclidProperties);
    if (Object.keys(attributionProperties).length > 0) {
      this.logEvent(Constants.ATTRIBUTION_EVENT, attributionProperties);
    }
  }
};

/**
 * Parse and validate user specified config values and overwrite existing option value
 * DEFAULT_OPTIONS provides list of all config keys that are modifiable, as well as expected types for values
 * @private
 */
var _parseConfig = function _parseConfig(options, config) {
  if (type(config) !== 'object') {
    return;
  }

  // Add exception in headers
  var freeFormObjectKeys = new Set(['headers']);
  var zeroAllowedKeys = new Set(['eventUploadPeriodMillis']);

  // validates config value is defined, is the correct type, and some additional value sanity checks
  var parseValidateAndLoad = function parseValidateAndLoad(key) {
    if (!Object.prototype.hasOwnProperty.call(options, key)) {
      return; // skip bogus config values
    }

    var inputValue = config[key];
    var expectedType = type(options[key]);
    if (key === 'transport' && !utils.validateTransport(inputValue)) {
      return;
    } else if (key === 'sessionId' && inputValue !== null) {
      options[key] = utils.validateSessionId(inputValue) ? inputValue : null;
      return;
    } else if (!utils.validateInput(inputValue, key + ' option', expectedType)) {
      return;
    }
    if (expectedType === 'boolean') {
      options[key] = !!inputValue;
    } else if (expectedType === 'string' && !utils.isEmptyString(inputValue) || expectedType === 'number' && (inputValue > 0 || inputValue === 0 && zeroAllowedKeys.has(key)) || expectedType === 'function') {
      options[key] = inputValue;
    } else if (expectedType === 'object') {
      _parseConfig(options[key], inputValue);
    }
  };
  for (var key in config) {
    if (freeFormObjectKeys.has(key)) {
      options[key] = _objectSpread2(_objectSpread2({}, options[key]), config[key]);
    } else if (Object.prototype.hasOwnProperty.call(config, key)) {
      parseValidateAndLoad(key);
    }
  }
};

/**
 * Run functions queued up by proxy loading snippet
 * @private
 */
AmplitudeClient.prototype.runQueuedFunctions = function () {
  var queue = this._q;
  this._q = [];
  for (var i = 0; i < queue.length; i++) {
    var fn = this[queue[i][0]];
    if (type(fn) === 'function') {
      fn.apply(this, queue[i].slice(1));
    }
  }
};

/**
 * Check that the apiKey is set before calling a function. Logs a warning message if not set.
 * @private
 */
AmplitudeClient.prototype._apiKeySet = function _apiKeySet(methodName) {
  if (utils.isEmptyString(this.options.apiKey)) {
    utils.log.error('Invalid apiKey. Please set a valid apiKey with init() before calling ' + methodName);
    return false;
  }
  return true;
};

/**
 * Load saved events from localStorage. JSON deserializes event array. Handles case where string is corrupted.
 * @private
 */
AmplitudeClient.prototype._loadSavedUnsentEvents = function _loadSavedUnsentEvents(unsentKey) {
  var savedUnsentEventsString = this._getFromStorage(localStorage$1, unsentKey);
  var unsentEvents = this._parseSavedUnsentEventsString(savedUnsentEventsString, unsentKey);
  this._setInStorage(localStorage$1, unsentKey, JSON.stringify(unsentEvents));
  return unsentEvents;
};

/**
 * Load saved events from localStorage. JSON deserializes event array. Handles case where string is corrupted.
 * @private
 */
AmplitudeClient.prototype._parseSavedUnsentEventsString = function _parseSavedUnsentEventsString(savedUnsentEventsString, unsentKey) {
  if (utils.isEmptyString(savedUnsentEventsString)) {
    return []; // new app, does not have any saved events
  }

  if (type(savedUnsentEventsString) === 'string') {
    try {
      var events = JSON.parse(savedUnsentEventsString);
      if (type(events) === 'array') {
        // handle case where JSON dumping of unsent events is corrupted
        return events;
      }
    } catch (e) {} /* eslint-disable-line no-empty */
  }

  utils.log.error('Unable to load ' + unsentKey + ' events. Restart with a new empty queue.');
  return [];
};

/**
 * Returns true if a new session was created during initialization, otherwise false.
 * @public
 * @return {boolean} Whether a new session was created during initialization.
 */
AmplitudeClient.prototype.isNewSession = function isNewSession() {
  return this._newSession;
};

/**
 * Add callbacks to call after init. Useful for users who load Amplitude through a snippet.
 * @public
 */
AmplitudeClient.prototype.onInit = function onInit(callback) {
  if (this._isInitialized) {
    callback(this);
  } else {
    this._onInitCallbacks.push(callback);
  }
};

/**
 * Add callbacks to call after new session start.
 * @public
 */
AmplitudeClient.prototype.onNewSessionStart = function onNewSessionStart(callback) {
  this._onNewSessionStartCallbacks.push(callback);
};

/**
 * Returns the id of the current session.
 * @public
 * @return {number} Id of the current session.
 */
AmplitudeClient.prototype.getSessionId = function getSessionId() {
  return this._sessionId;
};

/**
 * Increments the eventId and returns it.
 * @private
 */
AmplitudeClient.prototype.nextEventId = function nextEventId() {
  this._eventId++;
  return this._eventId;
};

/**
 * Increments the identifyId and returns it.
 * @private
 */
AmplitudeClient.prototype.nextIdentifyId = function nextIdentifyId() {
  this._identifyId++;
  return this._identifyId;
};

/**
 * Increments the sequenceNumber and returns it.
 * @private
 */
AmplitudeClient.prototype.nextSequenceNumber = function nextSequenceNumber() {
  this._sequenceNumber++;
  return this._sequenceNumber;
};

/**
 * Returns the total count of unsent events and identifys
 * @private
 */
AmplitudeClient.prototype._unsentCount = function _unsentCount() {
  return this._unsentEvents.length + this._unsentIdentifys.length;
};

/**
 * Send events if ready. Returns true if events are sent.
 * @private
 */
AmplitudeClient.prototype._sendEventsIfReady = function _sendEventsIfReady() {
  if (this._unsentCount() === 0) {
    return false;
  }

  // if batching disabled, send any unsent events immediately
  if (!this.options.batchEvents) {
    this.sendEvents();
    return true;
  }

  // if batching enabled, check if min threshold met for batch size
  if (this._unsentCount() >= this.options.eventUploadThreshold) {
    this.sendEvents();
    return true;
  }

  // if beacon transport is activated, send events immediately
  // because there is no way to retry them later
  if (this.options.transport === Constants.TRANSPORT_BEACON) {
    this.sendEvents();
    return true;
  }

  // otherwise schedule an upload after 30s
  if (!this._updateScheduled) {
    // make sure we only schedule 1 upload
    this._updateScheduled = true;
    setTimeout(function () {
      this._updateScheduled = false;
      this.sendEvents();
    }.bind(this), this.options.eventUploadPeriodMillis);
  }
  return false; // an upload was scheduled, no events were uploaded
};

/**
 * Clears any stored events and metadata. Storage is then re-created on next event sending.
 * @public
 * @return {boolean} True if metadata was cleared, false if none existed
 */
AmplitudeClient.prototype.clearStorage = function clearStorage() {
  return this._metadataStorage.clear();
};

/**
 * Helper function to fetch values from storage
 * Storage argument allows for localStoraoge and sessionStoraoge
 * @private
 */
AmplitudeClient.prototype._getFromStorage = function _getFromStorage(storage, key) {
  return storage.getItem(key + this._storageSuffix);
};

/**
 * Helper function to set values in storage
 * Storage argument allows for localStoraoge and sessionStoraoge
 * @private
 */
AmplitudeClient.prototype._setInStorage = function _setInStorage(storage, key, value) {
  storage.setItem(key + this._storageSuffix, value);
};

/**
 * Fetches deviceId, userId, event meta data from amplitude cookie
 * @private
 */
var _loadCookieData = function _loadCookieData(scope) {
  if (!scope._useOldCookie) {
    var props = scope._metadataStorage.load();
    if (type(props) === 'object') {
      _loadCookieDataProps(scope, props);
    }
    return;
  }
  var cookieData = scope.cookieStorage.get(scope._oldCookiename);
  if (type(cookieData) === 'object') {
    _loadCookieDataProps(scope, cookieData);
    return;
  }
};
var _upgradeCookieData = function _upgradeCookieData(scope) {
  var cookieData = scope.cookieStorage.get(scope._oldCookiename);
  if (type(cookieData) === 'object') {
    _loadCookieDataProps(scope, cookieData);
    _saveCookieData(scope);
  }
};
var _loadCookieDataProps = function _loadCookieDataProps(scope, cookieData) {
  if (cookieData.deviceId) {
    scope.options.deviceId = cookieData.deviceId;
  }
  if (cookieData.userId) {
    scope.options.userId = cookieData.userId;
  }
  if (cookieData.optOut !== null && cookieData.optOut !== undefined) {
    // Do not clobber config opt out value if cookieData has optOut as false
    if (cookieData.optOut !== false) {
      scope.options.optOut = cookieData.optOut;
    }
  }
  if (cookieData.sessionId) {
    scope._sessionId = parseInt(cookieData.sessionId, 10);
  }
  if (cookieData.lastEventTime) {
    scope._lastEventTime = parseInt(cookieData.lastEventTime, 10);
  }
  if (cookieData.eventId) {
    scope._eventId = parseInt(cookieData.eventId, 10);
  }
  if (cookieData.identifyId) {
    scope._identifyId = parseInt(cookieData.identifyId, 10);
  }
  if (cookieData.sequenceNumber) {
    scope._sequenceNumber = parseInt(cookieData.sequenceNumber, 10);
  }
};

/**
 * Saves deviceId, userId, event meta data to amplitude cookie
 * @private
 */
var _saveCookieData = function _saveCookieData(scope) {
  var cookieData = {
    deviceId: scope.options.deviceId,
    userId: scope.options.userId,
    optOut: scope.options.optOut,
    sessionId: scope._sessionId,
    lastEventTime: scope._lastEventTime,
    eventId: scope._eventId,
    identifyId: scope._identifyId,
    sequenceNumber: scope._sequenceNumber
  };
  if (scope._useOldCookie) {
    scope.cookieStorage.set(scope.options.cookieName + scope._storageSuffix, cookieData);
  } else {
    scope._metadataStorage.save(cookieData);
  }
};

/**
 * Parse the utm properties out of cookies and query for adding to user properties.
 * @private
 */
AmplitudeClient.prototype._initUtmData = function _initUtmData(queryParams, cookieParams) {
  queryParams = queryParams || this._getUrlParams();
  cookieParams = cookieParams || this.cookieStorage.get('__utmz');
  var utmProperties = getUtmData(cookieParams, queryParams);
  _sendParamsReferrerUserProperties(this, utmProperties);
  return utmProperties;
};

/**
 * Unset the utm params from the Amplitude instance and update the identify.
 * @private
 */
AmplitudeClient.prototype._unsetUTMParams = function _unsetUTMParams() {
  var identify = new Identify();
  identify.unset(Constants.REFERRER);
  identify.unset(Constants.REFERRING_DOMAIN);
  identify.unset(Constants.UTM_SOURCE);
  identify.unset(Constants.UTM_MEDIUM);
  identify.unset(Constants.UTM_CAMPAIGN);
  identify.unset(Constants.UTM_TERM);
  identify.unset(Constants.UTM_CONTENT);
  this.identify(identify);
};

/**
 * The calling function should determine when it is appropriate to send these user properties. This function
 * will no longer contain any session storage checking logic.
 * @private
 */
var _sendParamsReferrerUserProperties = function _sendParamsReferrerUserProperties(scope, userProperties) {
  if (type(userProperties) !== 'object' || Object.keys(userProperties).length === 0) {
    return;
  }

  // setOnce the initial user properties
  var identify = new Identify();
  for (var key in userProperties) {
    if (Object.prototype.hasOwnProperty.call(userProperties, key)) {
      identify.setOnce('initial_' + key, userProperties[key]);
      identify.set(key, userProperties[key]);
    }
  }
  scope.identify(identify);
};

/**
 * @private
 */
AmplitudeClient.prototype._getReferrer = function _getReferrer() {
  var urlRefer = this._getReferrerFromUrlParam(this._getUrlParams());
  if (urlRefer) return urlRefer;else return typeof document !== 'undefined' ? document.referrer : '';
};

/**
 * @private
 */
AmplitudeClient.prototype._getUrlParams = function _getUrlParams() {
  return GlobalScope.location.search;
};

/**
 * Try to fetch Google Gclid from url params.
 * @private
 */
AmplitudeClient.prototype._saveGclid = function _saveGclid(urlParams) {
  var gclid = utils.getQueryParam('gclid', urlParams);
  if (utils.isEmptyString(gclid)) {
    return;
  }
  var gclidProperties = {
    gclid: gclid
  };
  _sendParamsReferrerUserProperties(this, gclidProperties);
  return gclidProperties;
};

/**
 * Try to fetch Facebook Fbclid from url params.
 * @private
 */
AmplitudeClient.prototype._saveFbclid = function _saveFbclid(urlParams) {
  var fbclid = utils.getQueryParam('fbclid', urlParams);
  if (utils.isEmptyString(fbclid)) {
    return;
  }
  var fbclidProperties = {
    fbclid: fbclid
  };
  _sendParamsReferrerUserProperties(this, fbclidProperties);
  return fbclidProperties;
};

/**
 * Try to fetch Amplitude device id from url params.
 * @private
 */
AmplitudeClient.prototype._getDeviceIdFromUrlParam = function _getDeviceIdFromUrlParam(urlParams) {
  return utils.getQueryParam(Constants.AMP_DEVICE_ID_PARAM, urlParams);
};

/**
 * Try to fetch referrer from url params.
 * @private
 */
AmplitudeClient.prototype._getReferrerFromUrlParam = function _getReferrerFromUrlParam(urlParams) {
  return utils.getQueryParam(Constants.AMP_REFERRER_PARAM, urlParams);
};

/**
 * Parse the domain from referrer info
 * @private
 */
AmplitudeClient.prototype._getReferringDomain = function _getReferringDomain(referrer) {
  if (utils.isEmptyString(referrer)) {
    return null;
  }
  var parts = referrer.split('/');
  if (parts.length >= 3) {
    return parts[2];
  }
  return null;
};

/**
 * Fetch the referrer information, parse the domain and send.
 * Since user properties are propagated on the server, only send once per session, don't need to send with every event
 * @private
 */
AmplitudeClient.prototype._saveReferrer = function _saveReferrer(referrer) {
  if (utils.isEmptyString(referrer)) {
    return;
  }
  var referrerInfo = {
    referrer: referrer,
    referring_domain: this._getReferringDomain(referrer)
  };
  _sendParamsReferrerUserProperties(this, referrerInfo);
  return referrerInfo;
};

/**
 * Saves unsent events and identifies to localStorage. JSON stringifies event queues before saving.
 * Note: this is called automatically every time events are logged, unless you explicitly set option saveEvents to false.
 * @private
 */
AmplitudeClient.prototype.saveEvents = function saveEvents() {
  try {
    var serializedUnsentEvents = JSON.stringify(this._unsentEvents.map(function (_ref) {
      var event = _ref.event;
      return event;
    }));
    this._setInStorage(localStorage$1, this.options.unsentKey, serializedUnsentEvents);
  } catch (e) {} /* eslint-disable-line no-empty */

  try {
    var serializedIdentifys = JSON.stringify(this._unsentIdentifys.map(function (unsentIdentify) {
      return unsentIdentify.event;
    }));
    this._setInStorage(localStorage$1, this.options.unsentIdentifyKey, serializedIdentifys);
  } catch (e) {} /* eslint-disable-line no-empty */
};

/**
 * Sets a customer domain for the amplitude cookie. Useful if you want to support cross-subdomain tracking.
 * @public
 * @param {string} domain to set.
 * @example amplitudeClient.setDomain('.amplitude.com');
 */
AmplitudeClient.prototype.setDomain = function setDomain(domain) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setDomain'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!utils.validateInput(domain, 'domain', 'string')) {
    return;
  }
  try {
    this.cookieStorage.options({
      expirationDays: this.options.cookieExpiration,
      secure: this.options.secureCookie,
      domain: domain,
      sameSite: this.options.sameSiteCookie
    });
    this.options.domain = this.cookieStorage.options().domain;
    _loadCookieData(this);
    _saveCookieData(this);
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets an identifier for the current user.
 * @public
 * @param {string} userId - identifier to set. Can be null.
 * @param {boolean} startNewSession - (optional) if start a new session or not
 * @example amplitudeClient.setUserId('joe@gmail.com');
 */
AmplitudeClient.prototype.setUserId = function setUserId(userId) {
  var startNewSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!utils.validateInput(startNewSession, 'startNewSession', 'boolean')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setUserId'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.userId = userId !== undefined && userId !== null && '' + userId || null;
    if (startNewSession) {
      if (this.options.unsetParamsReferrerOnNewSession) {
        this._unsetUTMParams();
      }
      this._newSession = true;
      this._sessionId = new Date().getTime();
      this._runNewSessionStartCallbacks();

      // only capture UTM params and referrer if new session
      if (this.options.saveParamsReferrerOncePerSession) {
        this._trackParamsAndReferrer();
      }
    }
    _saveCookieData(this);

    // Update core identity store to propagate new user info
    // to experiment SDK and trigger a fetch if the ID has changed.
    if (this._connector) {
      this._connector.identityStore.editIdentity().setUserId(this.options.userId).commit();
    }
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Add user to a group or groups. You need to specify a groupType and groupName(s).
 *
 * For example you can group people by their organization.
 * In that case, groupType is "orgId" and groupName would be the actual ID(s).
 * groupName can be a string or an array of strings to indicate a user in multiple gruups.
 * You can also call setGroup multiple times with different groupTypes to track multiple types of groups (up to 5 per app).
 *
 * Note: this will also set groupType: groupName as a user property.
 * See the [advanced topics article](https://developers.amplitude.com/docs/javascript#user-groups) for more information.
 * @public
 * @param {string} groupType - the group type (ex: orgId)
 * @param {string|list} groupName - the name of the group (ex: 15), or a list of names of the groups
 * @example amplitudeClient.setGroup('orgId', 15); // this adds the current user to orgId 15.
 */
AmplitudeClient.prototype.setGroup = function (groupType, groupName) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setGroup'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('setGroup()') || !utils.validateInput(groupType, 'groupType', 'string') || utils.isEmptyString(groupType)) {
    return;
  }
  var groups = {};
  groups[groupType] = groupName;
  var identify = new Identify().set(groupType, groupName);
  this._logEvent(Constants.IDENTIFY_EVENT, null, null, identify.userPropertiesOperations, groups, null, null, null);
};

/**
 * Sets whether to opt current user out of tracking.
 * @public
 * @param {boolean} enable - if true then no events will be logged or sent.
 * @example: amplitude.setOptOut(true);
 */
AmplitudeClient.prototype.setOptOut = function setOptOut(enable) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setOptOut'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!utils.validateInput(enable, 'enable', 'boolean')) {
    return;
  }
  try {
    this.options.optOut = enable;
    _saveCookieData(this);
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Set a custom Session ID for the current session.
 * Note: This is not recommended unless you know what you are doing because the Session ID of a session is utilized for all session metrics in Amplitude.
 * The Session ID to set for the current session must be in milliseconds since epoch (Unix Timestamp).
 * @public
 * @param {int} sessionId to set.
 * @example amplitudeClient.setSessionId(1622158968000);
 */
AmplitudeClient.prototype.setSessionId = function setSessionId(sessionId) {
  if (!utils.validateInput(sessionId, 'sessionId', 'number')) {
    return;
  }
  try {
    this._sessionId = sessionId;
    _saveCookieData(this);
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets the current Unix timestamp as the new Session ID for the instance.
 * @public
 * @example amplitudeClient.resetSessionId();
 */
AmplitudeClient.prototype.resetSessionId = function resetSessionId() {
  this.setSessionId(new Date().getTime());
};

/**
 * Regenerates a new random deviceId for current user. Note: this is not recommended unless you know what you
 * are doing. This can be used in conjunction with `setUserId(null)` to anonymize users after they log out.
 * With a null userId and a completely new deviceId, the current user would appear as a brand new user in dashboard.
 * This uses src/uuid.js to regenerate the deviceId.
 * @public
 */
AmplitudeClient.prototype.regenerateDeviceId = function regenerateDeviceId() {
  if (this._shouldDeferCall()) {
    return this._q.push(['regenerateDeviceId'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  this.setDeviceId(base64Id());
};

/**
 * Sets a custom deviceId for current user. **Values may not have `.` inside them**
 * Note: this is not recommended unless you know what you are doing (like if you have your own system for managing deviceIds).
 * Make sure the deviceId you set is sufficiently unique
 * (we recommend something like a UUID - see src/uuid.js for an example of how to generate) to prevent conflicts with other devices in our system.
 * @public
 * @param {string} deviceId - custom deviceId for current user.
 * @example amplitudeClient.setDeviceId('45f0954f-eb79-4463-ac8a-233a6f45a8f0');
 */
AmplitudeClient.prototype.setDeviceId = function setDeviceId(deviceId) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setDeviceId'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!utils.validateDeviceId(deviceId)) {
    return;
  }
  try {
    if (!utils.isEmptyString(deviceId)) {
      this.options.deviceId = '' + deviceId;
      _saveCookieData(this);

      // Update core identity store to propagate new user info
      // to experiment SDK and trigger a fetch if the ID has changed.
      if (this._connector) {
        this._connector.identityStore.editIdentity().setDeviceId(this.options.deviceId).commit();
      }
    }
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets the network transport type for events. Typically used to set to 'beacon'
 * on an end-of-lifecycle event handler such as `onpagehide` or `onvisibilitychange`
 * @public
 * @param {string} transport - transport mechanism to use for events. Must be one of `http` or `beacon`.
 * @example amplitudeClient.setTransport('beacon');
 */
AmplitudeClient.prototype.setTransport = function setTransport(transport) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setTransport'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!utils.validateTransport(transport)) {
    return;
  }
  this.options.transport = transport;
};

/**
 * Sets user properties for the current user.
 * @public
 * @param {object} - object with string keys and values for the user properties to set.
 * @param {boolean} - DEPRECATED opt_replace: in earlier versions of the JS SDK the user properties object was kept in
 * memory and replace = true would replace the object in memory. Now the properties are no longer stored in memory, so replace is deprecated.
 * @example amplitudeClient.setUserProperties({'gender': 'female', 'sign_up_complete': true})
 */
AmplitudeClient.prototype.setUserProperties = function setUserProperties(userProperties) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setUserProperties'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('setUserProperties()') || !utils.validateInput(userProperties, 'userProperties', 'object')) {
    return;
  }
  // sanitize the userProperties dict before converting into identify
  var sanitized = utils.truncate(utils.validateProperties(userProperties));
  if (Object.keys(sanitized).length === 0) {
    return;
  }

  // convert userProperties into an identify call
  var identify = new Identify();
  for (var property in sanitized) {
    if (Object.prototype.hasOwnProperty.call(sanitized, property)) {
      identify.set(property, sanitized[property]);
    }
  }
  this.identify(identify);
};

/**
 * Clear all of the user properties for the current user. Note: clearing user properties is irreversible!
 * @public
 * @example amplitudeClient.clearUserProperties();
 */
AmplitudeClient.prototype.clearUserProperties = function clearUserProperties() {
  if (this._shouldDeferCall()) {
    return this._q.push(['clearUserProperties'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('clearUserProperties()')) {
    return;
  }
  var identify = new Identify();
  identify.clearAll();
  this.identify(identify);
};

/**
 * Applies the proxied functions on the proxied object to an instance of the real object.
 * Used to convert proxied Identify and Revenue objects.
 * @private
 */
var _convertProxyObjectToRealObject = function _convertProxyObjectToRealObject(instance, proxy) {
  for (var i = 0; i < proxy._q.length; i++) {
    var fn = instance[proxy._q[i][0]];
    if (type(fn) === 'function') {
      fn.apply(instance, proxy._q[i].slice(1));
    }
  }
  return instance;
};

/**
 * Send an identify call containing user property operations to Amplitude servers.
 * See the [Identify](https://amplitude.github.io/Amplitude-JavaScript/Identify/)
 * reference page for more information on the Identify API and user property operations.
 * @param {Identify} identify_obj - the Identify object containing the user property operations to send.
 * @param {Amplitude~eventCallback} opt_callback - (optional) callback function to run when the identify event has been sent.
 * Note: the server response code and response body from the identify event upload are passed to the callback function.
 * @param {Amplitude~eventCallback} opt_error_callback - (optional) a callback function to run after the event logging
 * fails. The failure can be from the request being malformed or from a network failure
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @example
 * var identify = new amplitude.Identify().set('colors', ['rose', 'gold']).add('karma', 1).setOnce('sign_up_date', '2016-03-31');
 * amplitude.identify(identify);
 */
AmplitudeClient.prototype.identify = function (identify_obj, opt_callback, opt_error_callback, outOfSession) {
  if (this._shouldDeferCall()) {
    return this._q.push(['identify'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('identify()')) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'API key is not set'
    });
    return;
  }

  // if identify input is a proxied object created by the async loading snippet, convert it into an identify object
  if (type(identify_obj) === 'object' && Object.prototype.hasOwnProperty.call(identify_obj, '_q')) {
    identify_obj = _convertProxyObjectToRealObject(new Identify(), identify_obj);
  }
  if (identify_obj instanceof Identify) {
    // only send if there are operations
    if (Object.keys(identify_obj.userPropertiesOperations).length > 0) {
      return this._logEvent(Constants.IDENTIFY_EVENT, null, null, identify_obj.userPropertiesOperations, null, null, null, opt_callback, opt_error_callback, outOfSession);
    } else {
      _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
        reason: 'No user property operations'
      });
    }
  } else {
    utils.log.error('Invalid identify input type. Expected Identify object but saw ' + type(identify_obj));
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid identify input type'
    });
  }
};
AmplitudeClient.prototype.groupIdentify = function (group_type, group_name, identify_obj, opt_callback, opt_error_callback, outOfSession) {
  if (this._shouldDeferCall()) {
    return this._q.push(['groupIdentify'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('groupIdentify()')) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'API key is not set'
    });
    return;
  }
  if (!utils.validateInput(group_type, 'group_type', 'string') || utils.isEmptyString(group_type)) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid group type'
    });
    return;
  }
  if (group_name === null || group_name === undefined) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid group name'
    });
    return;
  }

  // if identify input is a proxied object created by the async loading snippet, convert it into an identify object
  if (type(identify_obj) === 'object' && Object.prototype.hasOwnProperty.call(identify_obj, '_q')) {
    identify_obj = _convertProxyObjectToRealObject(new Identify(), identify_obj);
  }
  if (identify_obj instanceof Identify) {
    // only send if there are operations
    if (Object.keys(identify_obj.userPropertiesOperations).length > 0) {
      return this._logEvent(Constants.GROUP_IDENTIFY_EVENT, null, null, null, _defineProperty({}, group_type, group_name), identify_obj.userPropertiesOperations, null, opt_callback, opt_error_callback, outOfSession);
    } else {
      _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
        reason: 'No group property operations'
      });
    }
  } else {
    utils.log.error('Invalid identify input type. Expected Identify object but saw ' + type(identify_obj));
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid identify input type'
    });
  }
};

/**
 * Set a versionName for your application.
 * @public
 * @param {string} versionName - The version to set for your application.
 * @example amplitudeClient.setVersionName('1.12.3');
 */
AmplitudeClient.prototype.setVersionName = function setVersionName(versionName) {
  if (this._shouldDeferCall()) {
    return this._q.push(['setVersionName'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!utils.validateInput(versionName, 'versionName', 'string')) {
    return;
  }
  this.options.versionName = versionName;
};

/**
 * Private logEvent method. Keeps apiProperties from being publicly exposed.
 * @private
 */
AmplitudeClient.prototype._logEvent = function _logEvent(eventType, eventProperties, apiProperties, userProperties, groups, groupProperties, timestamp, callback, errorCallback, outOfSession) {
  _loadCookieData(this); // reload cookie before each log event to sync event meta-data between windows and tabs

  if (!eventType) {
    _logErrorsWithCallbacks(callback, errorCallback, 0, 'No request sent', {
      reason: 'Missing eventType'
    });
    return;
  }
  if (this.options.optOut) {
    _logErrorsWithCallbacks(callback, errorCallback, 0, 'No request sent', {
      reason: 'optOut is set to true'
    });
    return;
  }
  try {
    var eventId;
    if (eventType === Constants.IDENTIFY_EVENT || eventType === Constants.GROUP_IDENTIFY_EVENT) {
      eventId = this.nextIdentifyId();
    } else {
      eventId = this.nextEventId();
    }
    var sequenceNumber = this.nextSequenceNumber();
    var eventTime = type(timestamp) === 'number' ? timestamp : new Date().getTime();
    if (outOfSession) {
      this._sessionId = -1;
    } else if (!this._sessionId || !this._lastEventTime || eventTime - this._lastEventTime > this.options.sessionTimeout) {
      this._sessionId = eventTime;
      this._runNewSessionStartCallbacks();
    }
    this._lastEventTime = eventTime;
    _saveCookieData(this);
    var osName = this._ua.browser.name;
    var osVersion = this._ua.browser.major;
    var deviceModel = this._ua.device.model || this._ua.os.name;
    var deviceVendor = this._ua.device.vendor;
    userProperties = userProperties || {};
    var trackingOptions = _objectSpread2({}, this._apiPropertiesTrackingOptions);
    apiProperties = _objectSpread2(_objectSpread2({}, apiProperties || {}), trackingOptions);
    eventProperties = eventProperties || {};
    groups = groups || {};
    groupProperties = groupProperties || {};
    var event = {
      device_id: this.options.deviceId,
      user_id: this.options.userId,
      timestamp: eventTime,
      event_id: eventId,
      session_id: this._sessionId || -1,
      event_type: eventType,
      version_name: this.options.versionName || null,
      platform: _shouldTrackField(this, 'platform') ? this.options.platform : null,
      os_name: _shouldTrackField(this, 'os_name') ? osName || null : null,
      os_version: _shouldTrackField(this, 'os_version') ? osVersion || null : null,
      device_model: _shouldTrackField(this, 'device_model') ? deviceModel || null : null,
      device_manufacturer: _shouldTrackField(this, 'device_manufacturer') ? deviceVendor || null : null,
      language: _shouldTrackField(this, 'language') ? this.options.language : null,
      api_properties: apiProperties,
      event_properties: utils.truncate(utils.validateProperties(eventProperties)),
      user_properties: utils.truncate(utils.validateProperties(userProperties)),
      uuid: uuid(),
      library: this.options.library,
      sequence_number: sequenceNumber,
      // for ordering events and identifys
      groups: utils.truncate(utils.validateGroups(groups)),
      group_properties: utils.truncate(utils.validateProperties(groupProperties)),
      user_agent: this._userAgent,
      partner_id: this.options.partnerId || null
    };
    if (_isObservePlanSet(this)) {
      event.plan = {
        branch: this.options.plan.branch || undefined,
        source: this.options.plan.source || undefined,
        version: this.options.plan.version || undefined,
        versionId: this.options.plan.versionId || undefined
      };
    }
    if (_isIngestionMetadataSet(this)) {
      event.ingestion_metadata = {
        source_name: this.options.ingestionMetadata.sourceName || undefined,
        source_version: this.options.ingestionMetadata.sourceVersion || undefined
      };
    }
    if (eventType === Constants.IDENTIFY_EVENT || eventType === Constants.GROUP_IDENTIFY_EVENT) {
      this._unsentIdentifys.push({
        event: event,
        callback: callback,
        errorCallback: errorCallback
      });
      this._limitEventsQueued(this._unsentIdentifys);
    } else {
      this._unsentEvents.push({
        event: event,
        callback: callback,
        errorCallback: errorCallback
      });
      this._limitEventsQueued(this._unsentEvents);
    }
    if (this.options.saveEvents) {
      this.saveEvents();
    }
    this._sendEventsIfReady();

    // In the case of an identify event, update the core user store so the experiment SDK can fetch new variants and
    // utilize user properties in real time.
    if (eventType === Constants.IDENTIFY_EVENT && this._connector) {
      this._connector.identityStore.editIdentity().updateUserProperties(utils.truncate(utils.validateProperties(userProperties))).commit();
    }
    return eventId;
  } catch (e) {
    utils.log.error(e);
  }
};
var _isObservePlanSet = function _isObservePlanSet(scope) {
  return scope.options.plan && (scope.options.plan.source || scope.options.plan.branch || scope.options.plan.version || scope.options.plan.versionId);
};
var _isIngestionMetadataSet = function _isIngestionMetadataSet(scope) {
  return scope.options.ingestionMetadata && (scope.options.ingestionMetadata.sourceName || scope.options.ingestionMetadata.sourceVersion);
};
var _shouldTrackField = function _shouldTrackField(scope, field) {
  return !!scope.options.trackingOptions[field];
};
var _generateApiPropertiesTrackingConfig = function _generateApiPropertiesTrackingConfig(scope) {
  // to limit size of config payload, only send fields that have been disabled
  var fields = ['city', 'country', 'dma', 'ip_address', 'region'];
  var config = {};
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    if (!_shouldTrackField(scope, field)) {
      config[field] = false;
    }
  }
  return config;
};

/**
 * Remove old events from the beginning of the array if too many have accumulated. Default limit is 1000 events.
 * @private
 */
AmplitudeClient.prototype._limitEventsQueued = function _limitEventsQueued(queue) {
  if (queue.length > this.options.savedMaxCount) {
    var deletedEvents = queue.splice(0, queue.length - this.options.savedMaxCount);
    deletedEvents.forEach(function (event) {
      _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, 'No request sent', {
        reason: 'Event dropped because options.savedMaxCount exceeded. User may be offline or have a content blocker'
      });
    });
  }
};

/**
 * This is the callback for logEvent and identify calls. It gets called after the event/identify is uploaded,
 * and the server response code and response body from the upload request are passed to the callback function.
 * @callback Amplitude~eventCallback
 * @param {number} responseCode - Server response code for the event / identify upload request.
 * @param {string} responseBody - Server response body for the event / identify upload request.
 * @param {object} details - (optional) Additional information associated with sending event.
 */

/**
 * Log an event with eventType and eventProperties
 * @public
 * @param {string} eventType - name of event
 * @param {object} eventProperties - (optional) an object with string keys and values for the event properties.
 * @param {Amplitude~eventCallback} opt_callback - (optional) a callback function to run after the event is logged.
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @param {Amplitude~eventCallback} opt_error_callback - (optional) a callback function to run after the event logging
 * fails. The failure can be from the request being malformed or from a network failure
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @param {boolean} outOfSession - (optional) if this event is out of session or not
 * @example amplitudeClient.logEvent('Clicked Homepage Button', {'finished_flow': false, 'clicks': 15});
 */
AmplitudeClient.prototype.logEvent = function logEvent(eventType, eventProperties, opt_callback, opt_error_callback) {
  var outOfSession = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (this._shouldDeferCall()) {
    return this._q.push(['logEvent'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  return this.logEventWithTimestamp(eventType, eventProperties, null, opt_callback, opt_error_callback, outOfSession);
};

/**
 * Log an event with eventType and eventProperties and a custom timestamp
 * @public
 * @param {string} eventType - name of event
 * @param {object} eventProperties - (optional) an object with string keys and values for the event properties.
 * @param {number} timestamp - (optional) the custom timestamp as milliseconds since epoch.
 * @param {Amplitude~eventCallback} opt_callback - (optional) a callback function to run after the event is logged.
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @param {Amplitude~eventCallback} opt_error_callback - (optional) a callback function to run after the event logging
 * fails. The failure can be from the request being malformed or from a network failure
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @param {boolean} outOfSession - (optional) if out of the sessioin or not
 * @example amplitudeClient.logEventWithTimestamp('Clicked Homepage Button', {'finished_flow': false, 'clicks': 15}, Date.now());
 */
AmplitudeClient.prototype.logEventWithTimestamp = function logEvent(eventType, eventProperties, timestamp, opt_callback, opt_error_callback) {
  var outOfSession = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (this._shouldDeferCall()) {
    return this._q.push(['logEventWithTimestamp'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('logEvent()')) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'API key not set'
    });
    return -1;
  }
  if (!utils.validateInput(eventType, 'eventType', 'string')) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid type for eventType'
    });
    return -1;
  }
  if (utils.isEmptyString(eventType)) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Missing eventType'
    });
    return -1;
  }
  if (!utils.validateInput(outOfSession, 'outOfSession', 'boolean')) {
    _logErrorsWithCallbacks(opt_callback, opt_error_callback, 0, 'No request sent', {
      reason: 'Invalid outOfSession value'
    });
  }
  return this._logEvent(eventType, eventProperties, null, null, null, null, timestamp, opt_callback, opt_error_callback, outOfSession);
};

/**
 * Log an event with eventType, eventProperties, and groups. Use this to set event-level groups.
 * Note: the group(s) set only apply for the specific event type being logged and does not persist on the user
 * (unless you explicitly set it with setGroup).
 *
 * See the [advanced topics article](https://developers.amplitude.com/docs/javascript#user-groups) for more information
 * about groups and Count by Distinct on the Amplitude platform.
 * @public
 * @param {string} eventType - name of event
 * @param {object} eventProperties - (optional) an object with string keys and values for the event properties.
 * @param {object} groups - (optional) an object with string groupType: groupName values for the event being logged.
 * groupName can be a string or an array of strings.
 * @param {Amplitude~eventCallback} opt_callback - (optional) a callback function to run after the event is logged.
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @param {Amplitude~eventCallback} opt_error_callback - (optional) a callback function to run after the event logging
 * fails. The failure can be from the request being malformed or from a network failure
 * Note: the server response code and response body from the event upload are passed to the callback function.
 * @example amplitudeClient.logEventWithGroups('Clicked Button', null, {'orgId': 24});
 */
AmplitudeClient.prototype.logEventWithGroups = function (eventType, eventProperties, groups, opt_callback, opt_error_callback) {
  var outOfSession = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (this._shouldDeferCall()) {
    return this._q.push(['logEventWithGroups'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('logEventWithGroups()')) {
    _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, 'No request sent', {
      reason: 'API key not set'
    });
    return -1;
  }
  if (!utils.validateInput(eventType, 'eventType', 'string')) {
    _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, 'No request sent', {
      reason: 'Invalid type for eventType'
    });
    return -1;
  }
  if (!utils.validateInput(outOfSession, 'outOfSession', 'boolean')) {
    _logErrorsWithCallbacks(event.callback, event.errorCallback, 0, 'No request sent', {
      reason: 'Invalid outOfSession value'
    });
  }
  return this._logEvent(eventType, eventProperties, null, null, groups, null, null, opt_callback, opt_error_callback, outOfSession);
};

/**
 * Test that n is a number or a numeric value.
 * @private
 */
var _isNumber = function _isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

/**
 * Handles errors that are sent to both callbacks
 * @private
 */
var _logErrorsWithCallbacks = function _logErrorsWithCallbacks(opt_callback, opt_error_callback, status, response, details) {
  if (type(opt_callback) === 'function') {
    opt_callback(status, response, details);
  }
  if (type(opt_error_callback) === 'function') {
    opt_error_callback(status, response, details);
  }
};

/**
 * Log revenue with Revenue interface. The new revenue interface allows for more revenue fields like
 * revenueType and event properties.
 *
 * See the [Revenue](https://amplitude.github.io/Amplitude-JavaScript/Revenue/)
 * reference page for more information on the Revenue interface and logging revenue.
 * @public
 * @param {Revenue} revenue_obj - the revenue object containing the revenue data being logged.
 * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99);
 * amplitude.logRevenueV2(revenue);
 */
AmplitudeClient.prototype.logRevenueV2 = function logRevenueV2(revenue_obj) {
  if (this._shouldDeferCall()) {
    return this._q.push(['logRevenueV2'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  if (!this._apiKeySet('logRevenueV2()')) {
    return;
  }

  // if revenue input is a proxied object created by the async loading snippet, convert it into an revenue object
  if (type(revenue_obj) === 'object' && Object.prototype.hasOwnProperty.call(revenue_obj, '_q')) {
    revenue_obj = _convertProxyObjectToRealObject(new Revenue(), revenue_obj);
  }
  if (revenue_obj instanceof Revenue) {
    // only send if revenue is valid
    if (revenue_obj && revenue_obj._isValidRevenue()) {
      return this.logEvent(Constants.REVENUE_EVENT, revenue_obj._toJSONObject());
    }
  } else {
    utils.log.error('Invalid revenue input type. Expected Revenue object but saw ' + type(revenue_obj));
  }
};
{
  /**
   * Log revenue event with a price, quantity, and product identifier. DEPRECATED - use logRevenueV2
   * @public
   * @deprecated
   * @param {number} price - price of revenue event
   * @param {number} quantity - (optional) quantity of products in revenue event. If no quantity specified default to 1.
   * @param {string} product - (optional) product identifier
   * @example amplitudeClient.logRevenue(3.99, 1, 'product_1234');
   */
  AmplitudeClient.prototype.logRevenue = function logRevenue(price, quantity, product) {
    if (this._shouldDeferCall()) {
      return this._q.push(['logRevenue'].concat(Array.prototype.slice.call(arguments, 0)));
    }

    // Test that the parameters are of the right type.
    if (!this._apiKeySet('logRevenue()') || !_isNumber(price) || quantity !== undefined && !_isNumber(quantity)) {
      // utils.log('Price and quantity arguments to logRevenue must be numbers');
      return -1;
    }
    return this._logEvent(Constants.REVENUE_EVENT, {}, {
      productId: product,
      special: 'revenue_amount',
      quantity: quantity || 1,
      price: price
    }, null, null, null, null, null);
  };
}

/**
 * Calls error callback on unsent events
 * @private
 */
AmplitudeClient.prototype._logErrorsOnEvents = function _logErrorsOnEvents(maxEventId, maxIdentifyId, status, response) {
  var queues = ['_unsentEvents', '_unsentIdentifys'];
  for (var j = 0; j < queues.length; j++) {
    var queue = queues[j];
    var maxId = queue === '_unsentEvents' ? maxEventId : maxIdentifyId;
    for (var i = 0; i < this[queue].length || 0; i++) {
      var unsentEvent = this[queue][i];
      if (unsentEvent.event.event_id <= maxId) {
        if (unsentEvent.errorCallback) {
          unsentEvent.errorCallback(status, response);
        }
      }
    }
  }
};

/**
 * Remove events in storage with event ids up to and including maxEventId.
 * @private
 */
AmplitudeClient.prototype.removeEvents = function removeEvents(maxEventId, maxIdentifyId, status, response) {
  _removeEvents(this, '_unsentEvents', maxEventId, status, response);
  _removeEvents(this, '_unsentIdentifys', maxIdentifyId, status, response);
};

/**
 * Helper function to remove events up to maxId from a single queue.
 * Does a true filter in case events get out of order or old events are removed.
 * @private
 */
var _removeEvents = function _removeEvents(scope, eventQueue, maxId, status, response) {
  if (maxId < 0) {
    return;
  }
  var filteredEvents = [];
  for (var i = 0; i < scope[eventQueue].length || 0; i++) {
    var unsentEvent = scope[eventQueue][i];
    if (unsentEvent.event.event_id > maxId) {
      filteredEvents.push(unsentEvent);
    } else {
      if (unsentEvent.callback) {
        unsentEvent.callback(status, response);
      }
    }
  }
  scope[eventQueue] = filteredEvents;
};

/**
 * Send unsent events. Note: this is called automatically after events are logged if option batchEvents is false.
 * If batchEvents is true, then events are only sent when batch criterias are met.
 * @private
 */
AmplitudeClient.prototype.sendEvents = function sendEvents() {
  if (!this._apiKeySet('sendEvents()')) {
    this.removeEvents(Infinity, Infinity, 0, 'No request sent', {
      reason: 'API key not set'
    });
    return;
  }
  if (this.options.optOut) {
    this.removeEvents(Infinity, Infinity, 0, 'No request sent', {
      reason: 'Opt out is set to true'
    });
    return;
  }

  // How is it possible to get into this state?
  if (this._unsentCount() === 0) {
    return;
  }

  // We only make one request at a time. sendEvents will be invoked again once
  // the last request completes.
  // beacon data is sent synchronously, so don't pause for it
  if (this.options.transport !== Constants.TRANSPORT_BEACON) {
    if (this._sending) {
      return;
    }
    this._sending = true;
  }
  var protocol = this.options.forceHttps ? 'https' : 'https:' === GlobalScope.location.protocol ? 'https' : 'http';
  var url = protocol + '://' + this.options.apiEndpoint;

  // fetch events to send
  var numEvents = Math.min(this._unsentCount(), this.options.uploadBatchSize);
  var mergedEvents = this._mergeEventsAndIdentifys(numEvents);
  var maxEventId = mergedEvents.maxEventId;
  var maxIdentifyId = mergedEvents.maxIdentifyId;
  var events = JSON.stringify(mergedEvents.eventsToSend.map(function (_ref2) {
    var event = _ref2.event;
    return event;
  }));
  var uploadTime = new Date().getTime();
  var data = {
    client: this.options.apiKey,
    e: events,
    v: Constants.API_VERSION,
    upload_time: uploadTime,
    checksum: md5(Constants.API_VERSION + this.options.apiKey + events + uploadTime)
  };
  if (this.options.transport === Constants.TRANSPORT_BEACON && typeof navigator !== 'undefined') {
    var success = navigator.sendBeacon(url, new URLSearchParams(data));
    if (success) {
      this.removeEvents(maxEventId, maxIdentifyId, 200, 'success');
      if (this.options.saveEvents) {
        this.saveEvents();
      }
    } else {
      this._logErrorsOnEvents(maxEventId, maxIdentifyId, 0, '');
    }
    return;
  }
  var scope = this;
  try {
    new Request(url, data, this.options.headers).send(function (status, response) {
      scope._sending = false;
      try {
        if (status === 200) {
          scope.removeEvents(maxEventId, maxIdentifyId, status, response);

          // Update the event cache after the removal of sent events.
          if (scope.options.saveEvents) {
            scope.saveEvents();
          }

          // Send more events if any queued during previous send.
          scope._sendEventsIfReady();

          // handle payload too large
        } else {
          scope._logErrorsOnEvents(maxEventId, maxIdentifyId, status, response);
          if (status === 413) {
            // utils.log('request too large');
            // Can't even get this one massive event through. Drop it, even if it is an identify.
            if (scope.options.uploadBatchSize === 1) {
              scope.removeEvents(maxEventId, maxIdentifyId, status, response);
            }

            // The server complained about the length of the request. Backoff and try again.
            scope.options.uploadBatchSize = Math.ceil(numEvents / 2);
            scope.sendEvents();
          }
        }
        // else {
        //  all the events are still queued, and will be retried when the next
        //  event is sent In the interest of debugging, it would be nice to have
        //  something like an event emitter for a better debugging experince
        //  here.
        // }
      } catch (e) {
        // utils.log.error('failed upload');
      }
    });
  } catch (e) {
    var status = 0,
      response = 'Request failed to send';
    utils.log.error(response);
    scope._logErrorsOnEvents(maxEventId, maxIdentifyId, status, response);
    scope.removeEvents(maxEventId, maxIdentifyId, status, response, {
      reason: e.message
    });
  }
};

/**
 * Merge unsent events and identifys together in sequential order based on their sequence number, for uploading.
 * Identifys given higher priority than Events. Also earlier sequence given priority
 * @private
 */
AmplitudeClient.prototype._mergeEventsAndIdentifys = function _mergeEventsAndIdentifys(numEvents) {
  // coalesce events from both queues
  var eventsToSend = [];
  var eventIndex = 0;
  var maxEventId = -1;
  var identifyIndex = 0;
  var maxIdentifyId = -1;
  while (eventsToSend.length < numEvents) {
    var unsentEvent = void 0;
    var noIdentifys = identifyIndex >= this._unsentIdentifys.length;
    var noEvents = eventIndex >= this._unsentEvents.length;

    // case 0: no events or identifys left
    // note this should not happen, this means we have less events and identifys than expected
    if (noEvents && noIdentifys) {
      utils.log.error('Merging Events and Identifys, less events and identifys than expected');
      break;
    }

    // case 1: no identifys - grab from events
    else if (noIdentifys) {
      unsentEvent = this._unsentEvents[eventIndex++];
      maxEventId = unsentEvent.event.event_id;

      // case 2: no events - grab from identifys
    } else if (noEvents) {
      unsentEvent = this._unsentIdentifys[identifyIndex++];
      maxIdentifyId = unsentEvent.event.event_id;

      // case 3: need to compare sequence numbers
    } else {
      // events logged before v2.5.0 won't have a sequence number, put those first
      if (!('sequence_number' in this._unsentEvents[eventIndex].event) || this._unsentEvents[eventIndex].event.sequence_number < this._unsentIdentifys[identifyIndex].event.sequence_number) {
        unsentEvent = this._unsentEvents[eventIndex++];
        maxEventId = unsentEvent.event.event_id;
      } else {
        unsentEvent = this._unsentIdentifys[identifyIndex++];
        maxIdentifyId = unsentEvent.event.event_id;
      }
    }
    eventsToSend.push(unsentEvent);
  }
  return {
    eventsToSend: eventsToSend,
    maxEventId: maxEventId,
    maxIdentifyId: maxIdentifyId
  };
};
{
  /**
   * Set global user properties. Note this is deprecated, and we recommend using setUserProperties
   * @public
   * @deprecated
   */
  AmplitudeClient.prototype.setGlobalUserProperties = function setGlobalUserProperties(userProperties) {
    this.setUserProperties(userProperties);
  };
}

/**
 * Get the current version of Amplitude's Javascript SDK.
 * @public
 * @returns {number} version number
 * @example var amplitudeVersion = amplitude.__VERSION__;
 */
AmplitudeClient.prototype.__VERSION__ = function getVersion() {
  return this.options.library.version;
};

/**
 * Sets the library name and version. Default is `amplitude-js` and the version defined in package.json. Used if you're building another library on top of amplitude-js and want a custom data source value
 * @public
 * @param {string} name - Custom library name
 * @param {string} version - Custom library version
 */
AmplitudeClient.prototype.setLibrary = function setLibrary(name, version) {
  if (name !== null && typeof name !== 'undefined') {
    this.options.library.name = name;
  }
  if (version !== null && typeof version !== 'undefined') {
    this.options.library.version = version;
  }
};

/**
 * Determines whether or not to push call to this._q or invoke it
 * @private
 */
AmplitudeClient.prototype._shouldDeferCall = function _shouldDeferCall() {
  return this._pendingReadStorage || this._initializationDeferred;
};

/**
 * Defers Initialization by putting all functions into storage until users
 * have accepted terms for tracking
 * @private
 */
AmplitudeClient.prototype._deferInitialization = function _deferInitialization() {
  this._initializationDeferred = true;
  this._q.push(['init'].concat(Array.prototype.slice.call(arguments, 0)));
};

/**
 * Enable tracking via logging events and dropping a cookie
 * Intended to be used with the deferInitialization configuration flag
 * This will drop a cookie and reset initialization deferred
 * @public
 */
AmplitudeClient.prototype.enableTracking = function enableTracking() {
  // This will call init (which drops the cookie) and will run any pending tasks
  this._initializationDeferred = false;
  _saveCookieData(this);
  this.runQueuedFunctions();
};

/**
 * Find best server url if choose to enable dynamic configuration.
 */
AmplitudeClient.prototype._refreshDynamicConfig = function _refreshDynamicConfig() {
  if (this.options.useDynamicConfig) {
    instance$1.refresh(this.options.serverZone, this.options.forceHttps, function () {
      this.options.apiEndpoint = instance$1.ingestionEndpoint;
    }.bind(this));
  }
};

/**
 * Returns the deviceId value.
 * @public
 * @return {string} Id of current device.
 */
AmplitudeClient.prototype.getDeviceId = function getDeviceId() {
  return this.options.deviceId;
};

/**
 * Returns the userId.
 * @public
 * @return {string} Id of current user.
 */
AmplitudeClient.prototype.getUserId = function getUserId() {
  return this.options.userId;
};

/**
 * Set a custom session expiration time.
 * @public
 * @param {number} timeInMillis - session expireation time in milliseconds.
 */
AmplitudeClient.prototype.setMinTimeBetweenSessionsMillis = function setMinTimeBetweenSessionsMillis(timeInMillis) {
  if (!utils.validateInput(timeInMillis, 'timeInMillis', 'number')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setMinTimeBetweenSessionsMillis'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.sessionTimeout = timeInMillis;
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets minimum number of events to batch together per request if batchEvents is true.
 * @public
 * @param {number} eventUploadThreshold - The number of the event upload threshold. Default value is 30.
 * @example amplitudeClient.setEventUploadThreshold(10);
 */
AmplitudeClient.prototype.setEventUploadThreshold = function setEventUploadThreshold(eventUploadThreshold) {
  if (!utils.validateInput(eventUploadThreshold, 'eventUploadThreshold', 'number')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setEventUploadThreshold'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.eventUploadThreshold = eventUploadThreshold;
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Dynamically adjust server URL
 * @public
 * @param {bool} useDynamicConfig - if enable dynamic config or not.
 * @example amplitudeClient.setUseDynamicConfig(true);
 */
AmplitudeClient.prototype.setUseDynamicConfig = function setUseDynamicConfig(useDynamicConfig) {
  if (!utils.validateInput(useDynamicConfig, 'useDynamicConfig', 'boolean')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setUseDynamicConfig'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.useDynamicConfig = useDynamicConfig;
    this._refreshDynamicConfig();
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets the server zone, used for server api endpoint and dynamic configuration.
 * @public
 * @param {string} serverZone - the server zone value. AmplitudeServerZone.US or AmplitudeServerZone.EU.
 * @param {bool} serverZoneBasedApi - (optional) update api endpoint with serverZone change or not. For data residency, recommend to enable it unless using own proxy server.
 * @example amplitudeClient.setServerZone(AmplitudeServerZone.EU, true);
 */
AmplitudeClient.prototype.setServerZone = function setServerZone(serverZone) {
  var serverZoneBasedApi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (serverZone !== AmplitudeServerZone.EU && serverZone !== AmplitudeServerZone.US || !utils.validateInput(serverZoneBasedApi, 'serverZoneBasedApi', 'boolean')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setServerZone'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.serverZone = serverZone;
    this.options.serverZoneBasedApi = serverZoneBasedApi;
    if (serverZoneBasedApi) {
      this.options.apiEndpoint = getEventLogApi(this.options.serverZone);
    }
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Sets the server URL for the request.
 * @public
 * @param {string} serverUrl - The value of the server URL.
 * @example amplitudeClient.setServerUrl('api.amplitude.com');
 */
AmplitudeClient.prototype.setServerUrl = function setServerUrl(serverUrl) {
  if (!utils.validateInput(serverUrl, 'serverUrl', 'string')) {
    return;
  }
  if (this._shouldDeferCall()) {
    return this._q.push(['setServerUrl'].concat(Array.prototype.slice.call(arguments, 0)));
  }
  try {
    this.options.apiEndpoint = serverUrl;
  } catch (e) {
    utils.log.error(e);
  }
};

/**
 * Deprecated legacy API of the Amplitude JS SDK - instance manager.
 *
 * Wraps around the current [AmplitudeClient](https://amplitude.github.io/Amplitude-JavaScript/) which provides more features
 * Function calls directly on amplitude have been deprecated. Please call methods on the default shared instance: amplitude.getInstance() instead.
 *
 * See the [3.0.0 changelog](https://github.com/amplitude/Amplitude-JavaScript/blob/ed405afb5f06d5cf5b72539a5d09179abcf7e1fe/README.md#300-update-and-logging-events-to-multiple-amplitude-apps) for more information about this change.
 * @constructor Amplitude
 * @public
 * @deprecated
 * @example var amplitude = new Amplitude();
 */
var Amplitude = function Amplitude() {
  this.options = _objectSpread2({}, DEFAULT_OPTIONS);
  this._q = [];
  this._instances = {}; // mapping of instance names to instances
};

Amplitude.prototype.Identify = Identify;
Amplitude.prototype.Revenue = Revenue;
Amplitude.prototype.getInstance = function getInstance(instance) {
  instance = utils.isEmptyString(instance) ? Constants.DEFAULT_INSTANCE : instance.toLowerCase();
  var client = this._instances[instance];
  if (client === undefined) {
    client = new AmplitudeClient(instance);
    this._instances[instance] = client;
  }
  return client;
};
{
  /**
   * Initializes the Amplitude Javascript SDK with your apiKey and any optional configurations.
   * This is required before any other methods can be called.
   * @public
   * @param {string} apiKey - The API key for your app.
   * @param {string} opt_userId - (optional) An identifier for this user.
   * @param {object} opt_config - (optional) Configuration options.
   * See [options.js](https://github.com/amplitude/Amplitude-JavaScript/blob/master/src/options.js#L14) for list of options and default values.
   * @param {function} opt_callback - (optional) Provide a callback function to run after initialization is complete.
   * @deprecated Please use amplitude.getInstance().init(apiKey, opt_userId, opt_config, opt_callback);
   * @example amplitude.init('API_KEY', 'USER_ID', {includeReferrer: true, includeUtm: true}, function() { alert('init complete'); });
   */
  Amplitude.prototype.init = function init(apiKey, opt_userId, opt_config, opt_callback) {
    this.getInstance().init(apiKey, opt_userId, opt_config, function (instance) {
      // make options such as deviceId available for callback functions
      this.options = instance.options;
      if (type(opt_callback) === 'function') {
        opt_callback(instance);
      }
    }.bind(this));
  };

  /**
   * Returns true if a new session was created during initialization, otherwise false.
   * @public
   * @return {boolean} Whether a new session was created during initialization.
   * @deprecated Please use amplitude.getInstance().isNewSession();
   */
  Amplitude.prototype.isNewSession = function isNewSession() {
    return this.getInstance().isNewSession();
  };

  /**
   * Returns the id of the current session.
   * @public
   * @return {number} Id of the current session.
   * @deprecated Please use amplitude.getInstance().getSessionId();
   */
  Amplitude.prototype.getSessionId = function getSessionId() {
    return this.getInstance().getSessionId();
  };

  /**
   * Increments the eventId and returns it.
   * @private
   */
  Amplitude.prototype.nextEventId = function nextEventId() {
    return this.getInstance().nextEventId();
  };

  /**
   * Increments the identifyId and returns it.
   * @private
   */
  Amplitude.prototype.nextIdentifyId = function nextIdentifyId() {
    return this.getInstance().nextIdentifyId();
  };

  /**
   * Increments the sequenceNumber and returns it.
   * @private
   */
  Amplitude.prototype.nextSequenceNumber = function nextSequenceNumber() {
    return this.getInstance().nextSequenceNumber();
  };

  /**
   * Saves unsent events and identifies to localStorage. JSON stringifies event queues before saving.
   * Note: this is called automatically every time events are logged, unless you explicitly set option saveEvents to false.
   * @private
   */
  Amplitude.prototype.saveEvents = function saveEvents() {
    this.getInstance().saveEvents();
  };

  /**
   * Sets a customer domain for the amplitude cookie. Useful if you want to support cross-subdomain tracking.
   * @public
   * @param {string} domain to set.
   * @deprecated Please use amplitude.getInstance().setDomain(domain);
   * @example amplitude.setDomain('.amplitude.com');
   */
  Amplitude.prototype.setDomain = function setDomain(domain) {
    this.getInstance().setDomain(domain);
  };

  /**
   * Sets an identifier for the current user.
   * @public
   * @param {string} userId - identifier to set. Can be null.
   * @deprecated Please use amplitude.getInstance().setUserId(userId);
   * @example amplitude.setUserId('joe@gmail.com');
   */
  Amplitude.prototype.setUserId = function setUserId(userId) {
    this.getInstance().setUserId(userId);
  };

  /**
   * Add user to a group or groups. You need to specify a groupType and groupName(s).
   * For example you can group people by their organization.
   * In that case groupType is "orgId" and groupName would be the actual ID(s).
   * groupName can be a string or an array of strings to indicate a user in multiple gruups.
   * You can also call setGroup multiple times with different groupTypes to track multiple types of groups (up to 5 per app).
   * Note: this will also set groupType: groupName as a user property.
   * See the [advanced topics article](https://developers.amplitude.com/docs/javascript#user-groups) for more information.
   * @public
   * @param {string} groupType - the group type (ex: orgId)
   * @param {string|list} groupName - the name of the group (ex: 15), or a list of names of the groups
   * @deprecated Please use amplitude.getInstance().setGroup(groupType, groupName);
   * @example amplitude.setGroup('orgId', 15); // this adds the current user to orgId 15.
   */
  Amplitude.prototype.setGroup = function (groupType, groupName) {
    this.getInstance().setGroup(groupType, groupName);
  };

  /**
   * Sets whether to opt current user out of tracking.
   * @public
   * @param {boolean} enable - if true then no events will be logged or sent.
   * @deprecated Please use amplitude.getInstance().setOptOut(enable);
   * @example: amplitude.setOptOut(true);
   */
  Amplitude.prototype.setOptOut = function setOptOut(enable) {
    this.getInstance().setOptOut(enable);
  };

  /**
   * Regenerates a new random deviceId for current user. Note: this is not recommended unless you know what you
   * are doing. This can be used in conjunction with `setUserId(null)` to anonymize users after they log out.
   * With a null userId and a completely new deviceId, the current user would appear as a brand new user in dashboard.
   * This uses src/uuid.js to regenerate the deviceId.
   * @public
   * @deprecated Please use amplitude.getInstance().regenerateDeviceId();
   */
  Amplitude.prototype.regenerateDeviceId = function regenerateDeviceId() {
    this.getInstance().regenerateDeviceId();
  };

  /**
   * Sets a custom deviceId for current user. Note: this is not recommended unless you know what you are doing
   * (like if you have your own system for managing deviceIds).
   *
   * Make sure the deviceId you set is sufficiently unique
   * (we recommend something like a UUID - see src/uuid.js for an example of how to generate) to prevent conflicts with other devices in our system.
   * @public
   * @param {string} deviceId - custom deviceId for current user.
   * @deprecated Please use amplitude.getInstance().setDeviceId(deviceId);
   * @example amplitude.setDeviceId('45f0954f-eb79-4463-ac8a-233a6f45a8f0');
   */
  Amplitude.prototype.setDeviceId = function setDeviceId(deviceId) {
    this.getInstance().setDeviceId(deviceId);
  };

  /**
   * Sets user properties for the current user.
   * @public
   * @param {object} userProperties - object with string keys and values for the user properties to set.
   * @param {boolean} opt_replace - Deprecated. In earlier versions of the JS SDK the user properties object was kept in
   * memory and replace = true would replace the object in memory. Now the properties are no longer stored in memory, so replace is deprecated.
   * @deprecated Please use amplitude.getInstance().setUserProperties(userProperties);
   * @example amplitude.setUserProperties({'gender': 'female', 'sign_up_complete': true})
   */
  Amplitude.prototype.setUserProperties = function setUserProperties(userProperties) {
    this.getInstance().setUserProperties(userProperties);
  };

  /**
   * Clear all of the user properties for the current user. Note: clearing user properties is irreversible!
   * @public
   * @deprecated Please use amplitude.getInstance().clearUserProperties();
   * @example amplitude.clearUserProperties();
   */
  Amplitude.prototype.clearUserProperties = function clearUserProperties() {
    this.getInstance().clearUserProperties();
  };

  /**
   * Send an identify call containing user property operations to Amplitude servers.
   * See the [Identify](https://amplitude.github.io/Amplitude-JavaScript/Identify/)
   * reference page for more information on the Identify API and user property operations.
   * @param {Identify} identify_obj - the Identify object containing the user property operations to send.
   * @param {Amplitude~eventCallback} opt_callback - (optional) callback function to run when the identify event has been sent.
   * Note: the server response code and response body from the identify event upload are passed to the callback function.
   * @deprecated Please use amplitude.getInstance().identify(identify);
   * @example
   * var identify = new amplitude.Identify().set('colors', ['rose', 'gold']).add('karma', 1).setOnce('sign_up_date', '2016-03-31');
   * amplitude.identify(identify);
   */
  Amplitude.prototype.identify = function (identify_obj, opt_callback) {
    this.getInstance().identify(identify_obj, opt_callback);
  };

  /**
   * Set a versionName for your application.
   * @public
   * @param {string} versionName - The version to set for your application.
   * @deprecated Please use amplitude.getInstance().setVersionName(versionName);
   * @example amplitude.setVersionName('1.12.3');
   */
  Amplitude.prototype.setVersionName = function setVersionName(versionName) {
    this.getInstance().setVersionName(versionName);
  };

  /**
   * This is the callback for logEvent and identify calls. It gets called after the event/identify is uploaded,
   * and the server response code and response body from the upload request are passed to the callback function.
   * @callback Amplitude~eventCallback
   * @param {number} responseCode - Server response code for the event / identify upload request.
   * @param {string} responseBody - Server response body for the event / identify upload request.
   */

  /**
   * Log an event with eventType and eventProperties
   * @public
   * @param {string} eventType - name of event
   * @param {object} eventProperties - (optional) an object with string keys and values for the event properties.
   * @param {Amplitude~eventCallback} opt_callback - (optional) a callback function to run after the event is logged.
   * Note: the server response code and response body from the event upload are passed to the callback function.
   * @deprecated Please use amplitude.getInstance().logEvent(eventType, eventProperties, opt_callback);
   * @example amplitude.logEvent('Clicked Homepage Button', {'finished_flow': false, 'clicks': 15});
   */
  Amplitude.prototype.logEvent = function logEvent(eventType, eventProperties, opt_callback) {
    return this.getInstance().logEvent(eventType, eventProperties, opt_callback);
  };

  /**
   * Log an event with eventType, eventProperties, and groups. Use this to set event-level groups.
   *
   * Note: the group(s) set only apply for the specific event type being logged and does not persist on the user
   * (unless you explicitly set it with setGroup).
   *
   * See the [advanced topics article](https://developers.amplitude.com/docs/javascript#user-groups) for more information
   * about groups and Count by Distinct on the Amplitude platform.
   * @public
   * @param {string} eventType - name of event
   * @param {object} eventProperties - (optional) an object with string keys and values for the event properties.
   * @param {object} groups - (optional) an object with string groupType: groupName values for the event being logged.
   * groupName can be a string or an array of strings.
   * @param {Amplitude~eventCallback} opt_callback - (optional) a callback function to run after the event is logged.
   * Note: the server response code and response body from the event upload are passed to the callback function.
   * @deprecated Please use amplitude.getInstance().logEventWithGroups(eventType, eventProperties, groups, opt_callback);
   * @example amplitude.logEventWithGroups('Clicked Button', null, {'orgId': 24});
   */
  Amplitude.prototype.logEventWithGroups = function (eventType, eventProperties, groups, opt_callback) {
    return this.getInstance().logEventWithGroups(eventType, eventProperties, groups, opt_callback);
  };

  /**
   * Log revenue with Revenue interface. The new revenue interface allows for more revenue fields like
   * revenueType and event properties.
   *
   * See the [Revenue](https://amplitude.github.io/Amplitude-JavaScript/Revenue/)
   * reference page for more information on the Revenue interface and logging revenue.
   * @public
   * @param {Revenue} revenue_obj - the revenue object containing the revenue data being logged.
   * @deprecated Please use amplitude.getInstance().logRevenueV2(revenue_obj);
   * @example var revenue = new amplitude.Revenue().setProductId('productIdentifier').setPrice(10.99);
   * amplitude.logRevenueV2(revenue);
   */
  Amplitude.prototype.logRevenueV2 = function logRevenueV2(revenue_obj) {
    return this.getInstance().logRevenueV2(revenue_obj);
  };

  /**
   * Log revenue event with a price, quantity, and product identifier.
   * @public
   * @param {number} price - price of revenue event
   * @param {number} quantity - (optional) quantity of products in revenue event. If no quantity specified default to 1.
   * @param {string} product - (optional) product identifier
   * @deprecated Please use amplitude.getInstance().logRevenueV2(revenue_obj);
   * @example amplitude.logRevenue(3.99, 1, 'product_1234');
   */
  Amplitude.prototype.logRevenue = function logRevenue(price, quantity, product) {
    return this.getInstance().logRevenue(price, quantity, product);
  };

  /**
   * Remove events in storage with event ids up to and including maxEventId.
   * @private
   */
  Amplitude.prototype.removeEvents = function removeEvents(maxEventId, maxIdentifyId) {
    this.getInstance().removeEvents(maxEventId, maxIdentifyId);
  };

  /**
   * Send unsent events. Note: this is called automatically after events are logged if option batchEvents is false.
   * If batchEvents is true, then events are only sent when batch criterias are met.
   * @private
   * @param {Amplitude~eventCallback} callback - (optional) callback to run after events are sent.
   * Note the server response code and response body are passed to the callback as input arguments.
   */
  Amplitude.prototype.sendEvents = function sendEvents(callback) {
    this.getInstance().sendEvents(callback);
  };

  /**
   * Set global user properties.
   * @public
   * @deprecated Please use amplitudeClient.setUserProperties
   */
  Amplitude.prototype.setGlobalUserProperties = function setGlobalUserProperties(userProperties) {
    this.getInstance().setUserProperties(userProperties);
  };
}

/**
 * Get the current version of Amplitude's Javascript SDK.
 * @public
 * @returns {number} version number
 * @example var amplitudeVersion = amplitude.__VERSION__;
 */
Amplitude.prototype.__VERSION__ = version;

// Entry point
var old = typeof GlobalScope !== 'undefined' && GlobalScope.amplitude || {};
var newInstance = new Amplitude();
newInstance._q = old._q || [];

/**
 * Instantiates Amplitude object and runs all queued function logged by stubbed methods provided by snippets
 * Event queue allows async loading of SDK to not blocking client's app
 */
for (var instance in old._iq) {
  // migrate each instance's queue
  if (Object.prototype.hasOwnProperty.call(old._iq, instance)) {
    newInstance.getInstance(instance)._q = old._iq[instance]._q || [];
  }
}

export { newInstance as default };
