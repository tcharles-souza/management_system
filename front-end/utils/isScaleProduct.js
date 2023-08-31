const BARCODE_LENGTH = 13;

export const isScaleProduct = (value, isScale) => !!isScale
 && !Number.isNaN(Number(value))
 && value.length === BARCODE_LENGTH;
