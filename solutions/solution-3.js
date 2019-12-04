const fs = require('fs');

const [firstLine, secondLine] = fs.readFileSync('../input/input-3.txt').toString().split('\n').map(line => line.split(','));

const findAxisLimits = lineData => {
  let xAxisUpper = 0, xAxisLower = 0, yAxisLower = 0, yAxisUpper = 0, xAxisCurrent = 0, yAxisCurrent = 0;
  lineData.forEach(line => {
    const direction = line[0];
    const value = parseInt(line.substring(1), 10);
    switch(direction) {
      case 'R': {
        xAxisCurrent += value;
        if (xAxisCurrent > xAxisUpper) {
          xAxisUpper = xAxisCurrent;
        }
        break;
      }
      case 'L': {
        xAxisCurrent -= value;
        if (xAxisCurrent < xAxisLower) {
          xAxisLower = xAxisCurrent;
        }
        break;
      }
      case 'U': {
        yAxisCurrent += value;
        if (yAxisCurrent > yAxisUpper) {
          yAxisUpper = yAxisCurrent;
        }
        break;
      }
      case 'D': {
        // console.log('Before', yAxisCurrent);
        yAxisCurrent -= value;
        // console.log('after', yAxisCurrent);
        if (yAxisCurrent < yAxisLower) {
          yAxisLower = yAxisCurrent;
        }
        // console.log('yAxisLower', yAxisLower);
        break;
      }
      default: {
        break;
      }
    }
  });
  console.log('Current values', xAxisCurrent, yAxisCurrent);
  console.log("X Axis limits", xAxisLower, xAxisUpper);
  console.log("Y Axis limits", yAxisLower, yAxisUpper);
  return {
    xAxisLower,
    xAxisUpper,
    yAxisLower,
    yAxisUpper
  }
}

const mergeLimits = ({
    xAxisLower: lineOneXAxisLower,
    xAxisUpper: lineOneXAxisUpper,
    yAxisLower: lineOneYAxisLower,
    yAxisUpper: lineOneYAxisUpper
  }, 
  {
    xAxisLower: lineTwoXAxisLower,
    xAxisUpper: lineTwoXAxisUpper,
    yAxisLower: lineTwoYAxisLower,
    yAxisUpper: lineTwoYAxisUpper
}) => ({
  xAxisLower: Math.min(lineOneXAxisLower, lineTwoXAxisLower),
  xAxisUpper: Math.max(lineOneXAxisUpper, lineTwoXAxisUpper),
  yAxisLower: Math.min(lineOneYAxisLower, lineTwoYAxisLower),
  yAxisUpper: Math.max(lineOneYAxisUpper, lineTwoYAxisUpper),
});

// const firstPath = ['R8','U5','L5','D3'];

const convertLimitsToArrayParameters = ({
  xAxisLower,
  xAxisUpper,
  yAxisLower,
  yAxisUpper
}) => ({
  xAxisStartIndex: xAxisLower === 0 ? 0 : -(xAxisLower),
  yAxisStartIndex: yAxisLower === 0 ? 0 : -(yAxisLower),
  xAxisLength: xAxisUpper + (-xAxisLower) + 1,
  yAxisLength: yAxisUpper + (-yAxisLower) + 1
});
// const firstPath = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
// const secondPath = ['U62','R66','U55','R34','D71','R55','D58','R83'];
const firstPath = ['R8','U5','L5','D3'];
const secondPath = ['U7','R6','D4','L4'];
const matrixLimits = mergeLimits(findAxisLimits(firstPath), findAxisLimits(secondPath));
const arrayParameters = convertLimitsToArrayParameters(matrixLimits);
console.log('Matrix Limits', matrixLimits);
console.log('arrayParameters', arrayParameters);
let { xAxisStartIndex: xAxisCurrent, yAxisStartIndex: yAxisCurrent } = arrayParameters;
const matrix = new Array(arrayParameters.yAxisLength).fill(undefined).map(arr => new Array(arrayParameters.xAxisLength).fill(0));

const changeMatrix = () => {
  matrix[yAxisCurrent][xAxisCurrent] = matrix[yAxisCurrent][xAxisCurrent] === 0 ? 1 : 2;
}
const directionFunction = direction => {
  switch(direction) {
    case 'R': {
      xAxisCurrent +=1;
      return () => {
        changeMatrix();
        xAxisCurrent += 1;
      }
    }
    case 'L': {
      xAxisCurrent -= 1;
      return () => {
        changeMatrix();
        xAxisCurrent -= 1;
      }
    }
    case 'U': {
      yAxisCurrent += 1;
      return () => {
        changeMatrix();
        yAxisCurrent += 1;
      }
    }
    case 'D': {
      yAxisCurrent -= 1;
      return () => {
        changeMatrix();
        yAxisCurrent -= 1;
      }
    }
    default: {
      break;
    }
  }
};
console.log('Is matrix the same', matrix[0] === matrix[1]);
const traverseMatrix = lineData => {
  lineData.forEach(line => {
    console.log("At line", line);
    const direction = line[0];
    const func = directionFunction(direction);
    const length = parseInt(line.substring(1), 10);
    let counter = 0;
    while (counter !== length) {
      console.log(`length of line is ${length} & counter currently is ${counter}`);
      func();
      console.log("Matrix after change", matrix);
      counter += 1;
    }
  });
}
console.log("Before traversing", matrix);
traverseMatrix(firstPath);
console.log("After traversing", matrix);


