// parse in either YAML or JSON
function parse(text) {
  if (!text) return {};
  return JSON.parse(text);
}

// stringify in either YAML or JSON
function stringify(obj) {
  if (!obj) return "{}";
  return JSON.stringify(obj);
}

export { parse, stringify };
