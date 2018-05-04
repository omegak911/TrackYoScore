const increaseNextLevelCap = (nextLevelEXP) => {

  if (level < 11) {
    nextLevelEXP += 100;
  } else if (level < 21) {
    nextLevelEXP += 200;
  } else if (level < 31) {
    nextLevelEXP += 400;
  } else if (level < 41) {
    nextLevelEXP += 600;
  } else if (level < 51) {
    nextLevelEXP += 800;
  } else if (level < 61) {
    nextLevelEXP += 1200;
  } else if (level < 71) {
    nextLevelEXP += 1600;
  } else if (level < 81) {
    nextLevelEXP += 2000;
  } else if (level < 91) {
    nextLevelEXP += 2400;
  } else if (level < 100) {
    nextLevelEXP += 2800;
  }

  return nextLevelEXP
}

export default increaseNextLevelCap;