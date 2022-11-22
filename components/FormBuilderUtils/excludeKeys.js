import _extends from "./_extends";

export default function excludeKeys(obj, keys) {
  if (!keys) return _extends({}, obj);
  const keysHash = keys.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {});
  return Object.keys(obj).reduce(
    (acc, curr) =>
      keysHash[curr]
        ? acc
        : _extends({}, acc, {
            [curr]: obj[curr],
          }),
    {}
  );
}
