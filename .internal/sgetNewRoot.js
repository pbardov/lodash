export default function getNewRoot(oldRoot) {
  let root = {};
  if (Array.isArray(oldRoot)) {
    root = [];
  }
  return root;
}
