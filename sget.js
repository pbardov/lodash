/* eslint-disable eqeqeq */
import isObject from "./isObject.js";
import castSPath from "./.internal/castSPath.js";
import getWalk from "./.internal/sgetWalk.js";

function sget(object, spathValue, defaultValue, pos = 0) {
  let current;
  let currentKey;
  let currentLevel;
  let newRoot;
  let newRootLevel;

  const mainSpath = castSPath(spathValue).slice(pos);
  const iterators = [[0, object, undefined, mainSpath]];
  while (iterators.length) {
    const [level, root, rootKey, spath, nr, nrk] = iterators.shift();
    current = root;
    currentKey = rootKey;
    currentLevel = level;

    if (level === 0) {
      newRoot = root;
      newRootLevel = level;
    }

    let nextRoot = nr;
    let nextRootKey = nrk;
    if (currentLevel === 1) {
      nextRoot = current;
      nextRootKey = currentKey;
      if (newRootLevel < 1) {
        newRoot = {};
        newRootLevel = 1;
      }
    }

    let bracket = spath.length ? spath[spath.length - 1][1] === "]" : false;
    let wrap = false;

    if (
      bracket &&
      currentLevel >= 1 &&
      nextRootKey &&
      nextRoot !== undefined &&
      newRoot[nextRootKey] === nextRoot
    ) {
      continue;
    }

    for (let npos = 0; npos < spath.length; npos += 1) {
      const [key, op, ...sub] = spath[npos];
      const workLevel = level + npos + 1;

      if (key === "" && (!op || op === "]") && level + npos === 0) {
        break;
      }

      if (wrap && currentKey) {
        current = { [currentKey]: current };
        currentLevel -= 1;
      }
      let [walk, nextLevel] = getWalk(current, key, currentLevel);
      current = undefined;
      currentLevel = undefined;
      currentKey = undefined;

      if (walk) {
        let nextKey;

        for (let [nextKey, next] of walk) {
          if (nextLevel === 1) {
            nextRoot = next;
            nextRootKey = nextKey;
            if (newRootLevel < 1) {
              newRoot = {};
              newRootLevel = 1;
            }
          }

          wrap = false;
          if (nextLevel === workLevel) {
            switch (op) {
              case ".":
                break;
              case "[": {
                const [, nextOp = "", ...nextSub] = spath[npos + 1] || [];
                next = sget(next, sub);
                break;
              }
              case "]": {
                bracket = true;
                const result = next;
                next = newRoot;
                nextKey = undefined;
                if (result) {
                  next[nextRootKey] = nextRoot;
                }
                nextLevel = 0;
                break;
              }
              case ":":
              case "!":
              case "?":
              default: {
                const right = spath
                  .slice(npos + 1)
                  .map(([k, o]) => `${k}${o !== "]" ? o : ""}`)
                  .join("");

                spath.splice(npos + 1);
                if (bracket) {
                  spath.push(["", "]"]);
                }

                if (op === ":") {
                  next = right ? next == right : !!next;
                }
                if (op === "!") {
                  next = right ? next != right : !next;
                }
                if (op === "?") {
                  next = next !== undefined;
                }

                nextLevel += 1;
                wrap = true;

                break;
              }
            }

            if (next !== undefined) {
              if (current === undefined) {
                current = next;
                currentKey = nextKey;
                currentLevel = nextLevel;
              } else {
                if (wrap && nextKey) {
                  next = { [nextKey]: next };
                  nextLevel -= 1;
                }
                const nextSpath = spath.slice(npos + 1);
                if (!nextSpath.length) {
                  nextSpath.push(["", ""]);
                }
                iterators.push([
                  nextLevel,
                  next,
                  nextKey,
                  nextSpath,
                  nextRoot,
                  nextRootKey,
                ]);
              }
            }
          }
        }
        if (current === undefined) {
          break;
        }
      } else {
        break;
      }
    }
    if (current !== undefined && !bracket) {
      break;
    }
  }

  return current !== undefined ? current : defaultValue;
}

export default sget;
