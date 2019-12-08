export default function checkDifference(array1, array2) {
  delete array1.visible;

  for (let item in array1) {
    // eslint-disable-next-line
    if (array1[item] != array2[item]) {
      return false;
    }
  }
  return true;
}
