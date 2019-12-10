export default function checkDifference(object1, object2) {
  delete object1.visible;

  for (const item in object1) {
    if (object1[item] !== object2[item]) {
      return false;
    }
  }
  return true;
}
