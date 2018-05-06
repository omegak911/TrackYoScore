const increaseNextLevelCap = (level, nextLevelEXP) => {
  let addNeededEXP = 0;
  if (level < 11) {
    addNeededEXP += 100;
  } else if (level < 21) {
    addNeededEXP += 200;
  } else if (level < 31) {
    addNeededEXP += 400;
  } else if (level < 41) {
    addNeededEXP += 600;
  } else if (level < 51) {
    addNeededEXP += 800;
  } else if (level < 61) {
    addNeededEXP += 1200;
  } else if (level < 71) {
    addNeededEXP += 1600;
  } else if (level < 81) {
    addNeededEXP += 2000;
  } else if (level < 91) {
    addNeededEXP += 2400;
  } else if (level < 100) {
    addNeededEXP += 2800;
  }

  return addNeededEXP
}

export default increaseNextLevelCap;