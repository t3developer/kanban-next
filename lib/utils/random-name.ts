
const adjectives = [
  "Sunny", "Brave", "Happy", "Clever", "Lucky", "Swift", "Calm", "Jolly", "Wise", "Fuzzy"
];
const animals = [
  "Otter", "Fox", "Lion", "Bear", "Wolf", "Hawk", "Panda", "Koala", "Tiger", "Rabbit"
];

export function randomReadableName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj}${animal}`;
}