const fs = require('fs');

var text = fs.readFileSync('./input/input-1.txt');
const textByLine = text.toString().split("\n");
const calc = number => parseInt(number/3, 10) - 2
const fuelRequired = textByLine.reduce((sum, mass) => {
  let fuelForModule = calc(mass);
  let temp = fuelForModule;
  while(temp > 8) {
    temp = calc(temp);
    fuelForModule+=temp;
  }
  return sum + fuelForModule;
}, 0);
console.log('fuelRequired', fuelRequired);