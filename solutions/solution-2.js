const fs = require('fs');

const initialArr = fs.readFileSync('../input/input-2.txt').toString().split(',').map(i => parseInt(i, 10));

for (let noun = 0; noun < 100; noun+=1) {
  for (let verb = 0; verb < 100; verb+=1) {
    const arr = [...initialArr];
    arr[1] = noun;
    arr[2] = verb;
    let index = 0;
    while(arr[index] !== 99) {
      const firstIndex = arr[index+1];
      const secondIndex = arr[index+2];
      const resultIndex = arr[index+3];
      if (arr[index] === 1) {
        arr[resultIndex] = arr[firstIndex] + arr[secondIndex];
      } else if (arr[index] === 2){
        arr[resultIndex] = arr[firstIndex] * arr[secondIndex];
      }
      index += 4;
    }
    if (arr[0] === 19690720) {
      console.log(`Verb is ${verb} and noun is ${noun} when value at index 0 is ${arr[0]}`)
    }
  }
}