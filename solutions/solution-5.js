const fs = require('fs');


const arr = fs.readFileSync('../input/input-5.txt').toString().split(',').map(i => parseInt(i, 10));
const input = 5; // INPUT FOR THE PROGRAM
let index = 0;

while(arr[index] !== 99) {
  const parameterMode = [];
  let parameterIndex = 0;
  const firstInstruction = arr[index].toString();
  let opCode;
  if (firstInstruction.length <= 2) {
    opCode = parseInt(firstInstruction, 10);
  } else {
    opCode = parseInt(firstInstruction.substring(firstInstruction.length - 2));
    let codes = parseInt(firstInstruction.substring(0, firstInstruction.length - 2), 10);
    while(codes > 0) {
      parameterMode[parameterIndex] = codes % 10;
      codes = parseInt(codes / 10, 10);
      parameterIndex += 1;
    }
  }
  switch(opCode) {
    case 1: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      const secondValue = parameterMode[1] ? arr[index+2] : arr[arr[index+2]];
      arr[arr[index + 3]] = firstValue + secondValue;
      index += 4;
      break;
    }
    case 2: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      const secondValue = parameterMode[1] ? arr[index+2] : arr[arr[index+2]];
      arr[arr[index + 3]] = firstValue * secondValue;
      index += 4;
      break;
    }
    case 3: {
      arr[arr[index + 1]] = input;
      index += 2;
      break;
    }
    case 4: {
      console.log("OUTPUT", parameterMode[0] ? arr[index + 1] : arr[arr[index + 1]]);
      index += 2;
      break;
    }
    case 5: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      if (firstValue !== 0) {
        index = parameterMode[1] ? arr[index + 2] : arr[arr[index + 2]];
      } else {
        index += 3;
      }
      break;
    }
    case 6: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      if (firstValue === 0) {
        index = parameterMode[1] ? arr[index + 2] : arr[arr[index + 2]];
      }
      else {
        index += 3;
      }
      break;
    }
    case 7: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      const secondValue = parameterMode[1] ? arr[index+2] : arr[arr[index+2]];
      if (firstValue < secondValue) {
        arr[arr[index + 3]] = 1;
      } else {
        arr[arr[index + 3]] = 0;
      }
      index += 4;
      break;
    }
    case 8: {
      const firstValue = parameterMode[0] ? arr[index+1] : arr[arr[index+1]];
      const secondValue = parameterMode[1] ? arr[index+2] : arr[arr[index+2]];
      if (firstValue === secondValue) {
        arr[arr[index + 3]] = 1;
      } else {
        arr[arr[index + 3]] = 0;
      }
      index += 4;
      break;
    }

    default : {
      break;
    }
  }
}