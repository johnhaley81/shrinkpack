// public
module.exports = recurse;

// implementation
function recurse (value, handler, key) {
  if (isObject(value)) {
    if (isRootNode(value, key)) {
      stepInto(value.dependencies, handler);
    } else if (isPackage(value, key)) {
      handler(key, value);
      stepInto(value, handler);
    } else if (isDependencyMap(value, key)) {
      stepInto(value, handler);
    }
  }
}

function isRootNode (value, key) {
  return !key;
}

function isPackage (value, key) {
  return key !== 'dependencies';
}

function isDependencyMap (value, key) {
  return key === 'dependencies';
}

function stepInto (value, handler) {
  for (var key in value) {
    recurse(value[key], handler, key);
  }
}

function isObject (value) {
  return !!value && (value.constructor === Object);
}
