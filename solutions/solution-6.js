const fs = require('fs');


const orbitDetails = fs.readFileSync('../input/input-6.txt').toString().split('\n');

const allPlanets = [];
const orbitData = {};

orbitDetails.forEach((orbit) => {
  const [first, second] = orbit.split(')');
  if (!allPlanets.includes(first)) {
    allPlanets.push(first);
  }
  if (!allPlanets.includes(second)) {
    allPlanets.push(second);
  }
  if (!orbitData[first]) {
    orbitData[first] = { orbittedBy: [second], orbitting:  null }
  } else {
    orbitData[first].orbittedBy.push(second);
  }
  if (!orbitData[second]) {
    orbitData[second] = { orbittedBy: [], orbitting: first };
  } else {
    orbitData[second].orbitting = first;
  }
});


const recursiveFunc = (planet, number = 0) => {
  const planetData = orbitData[planet];
  if (planetData.numberOfOrbits === undefined) {
    if (planetData.orbitting === null) {
      planetData.numberOfOrbits = 0;
      return 0;
    } else {
      let planetPointer = planetData.orbitting;
      if (orbitData[planetPointer].numberOfOrbits === undefined) {
        planetData.numberOfOrbits = recursiveFunc(planetPointer, number) + 1;
        return planetData.numberOfOrbits;
      } else {
        planetData.numberOfOrbits = orbitData[planetPointer].numberOfOrbits + 1;
        return planetData.numberOfOrbits;
      }
    }
  }
  return planetData.numberOfOrbits;
};

allPlanets.forEach(planet => {
  const distance = recursiveFunc(planet);
  sumOfOrbits += distance;
});

const calculateOrbitChange = (first, second) => {
  const firstPath = [], secondPath = [];
  let current = first;
  while (orbitData[current].orbitting !== null) {
    firstPath.push(orbitData[current].orbitting);
    current = orbitData[current].orbitting;
  }
  current = second;
  while (orbitData[current].orbitting !== null) {
    secondPath.push(orbitData[current].orbitting);
    current = orbitData[current].orbitting;
  }
  const intersection = firstPath.find(planet => secondPath.includes(planet));
  return firstPath.indexOf(intersection) + secondPath.indexOf(intersection);
}

console.log(calculateOrbitChange('YOU', 'SAN'));