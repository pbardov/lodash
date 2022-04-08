import isObject from "../isObject.js";

const getWalk = (object, key, level = 0) => {
  const ia = Array.isArray(object);
  const io = isObject(object);
  let walk;
  let nextLevel = level;
  if (key) {
    nextLevel += 1;
    walk = [[key, io ? object[key] : undefined]];
  } else if (ia) {
    nextLevel += 1;
    walk = object.entries();
  } else if (io) {
    nextLevel += 1;
    walk = Object.entries(object);
  }
  return [walk, nextLevel];
};

export default getWalk;
