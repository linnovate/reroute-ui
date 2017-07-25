'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_CONVERTER = exports.DEFAULT_CONVERTER = 'rgba_hex';
var converters = exports.converters = {
  rgba: function rgba(c) {
    return 'rgba(' + c.rgb.r + ', ' + c.rgb.g + ', ' + c.rgb.b + ', ' + c.rgb.a + ')';
  },
  rgb: function rgb(c) {
    return 'rgb(' + c.rgb.r + ', ' + c.rgb.g + ', ' + c.rgb.b + ')';
  },
  hex: function hex(c) {
    return c.hex;
  },

  rgba_rgb: function rgba_rgb(c) {
    return c.rgb.a === 1 ? converters.rgb(c) : converters.rgba(c);
  },
  rgba_hex: function rgba_hex(c) {
    return c.rgb.a === 1 ? converters.hex(c) : converters.rgba(c);
  }
};

exports.default = converters;