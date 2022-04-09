import isObject from "../isObject.js";

const getWalk = (key, object, objectKey, level = 0, workLevel = 0) => {
  const ia = Array.isArray(object);
  const io = isObject(object);
  let walk;
  let nextLevel = level;
  if (workLevel === level) {
    walk = [[objectKey, object]];
  } else if (workLevel === level + 1) {
    nextLevel += 1;
    if (key) {
      walk = [[key, io ? object[key] : undefined]];
    } else if (ia) {
      walk = object.entries();
    } else if (io) {
      walk = Object.entries(object);
    } else {
      nextLevel = undefined;
    }
  }
  return [walk, nextLevel];
};

export default getWalk;
