export const convertUnitsToHierarchy = (
  totalUnits: number,
  totalBoxes: number,
  unitsPerBox: number,
  boxesPerPallet: number
) => {
  const box = Math.floor(totalUnits / unitsPerBox);
  const remainingUnits = (totalUnits % unitsPerBox); 
  const totalBoxRemainingUnits = totalBoxes + box;
  const pallets = Math.floor(totalBoxRemainingUnits / boxesPerPallet);
  const remainingBoxes = totalBoxRemainingUnits % boxesPerPallet;
  return {
    pallets,
    boxes: remainingBoxes,
    units: remainingUnits
  };
}; 