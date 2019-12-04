const arr = [];

const checkCondition = number => {
  let adjacentFlag = false;
  let exitCondition = false;
  let adjacentNumber;
  
  const str = number.toString();
  let i = 0;
  while(i < str.length) {
    const val = str[i];
    const nextVal = str[i+1];
    if (i !== str.length - 1) {
      if (adjacentFlag && nextVal === val && adjacentNumber === nextVal) {
        adjacentFlag = false;
      } else if (!adjacentFlag && nextVal === val && adjacentNumber === undefined) {
        adjacentFlag = true;
        adjacentNumber = val;
      }
      if (nextVal !== val) {
        adjacentNumber = undefined;
      }
      if (parseInt(val, 10) > parseInt(nextVal, 10)) {
        exitCondition = true;
        break;
      }
    }
    i+=1;
  }
  
  if (!exitCondition && adjacentFlag) {
   return number;
  }
  return false
}
for (let number = 146810; number <= 612564; number+=1) {
  const returnValue = checkCondition(number);
  if (returnValue) {
    arr.push(returnValue);
  }
}



console.log(arr.length);

