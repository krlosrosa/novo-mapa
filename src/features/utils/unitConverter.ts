type UnitConversionResult = {
  boxes: number;
  units: number;
};

export default function convertSaleUnits(
  sale: number,
  unitOfMeasure: string
): UnitConversionResult {
  if (unitOfMeasure === "UN" || unitOfMeasure === "CJ") {
    return { units: sale, boxes: 0 };
  } else {
    return { units: 0, boxes: sale };
  }
} 