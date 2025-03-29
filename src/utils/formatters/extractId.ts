export const extractId = (value: number | { id: number }): number => {
    return typeof value === "object" && value !== null ? value.id : value;
};

/**
 * Extracts IDs from an array of objects with id property
 * @param values Array of objects with id property or array of numbers
 * @returns Array of extracted IDs
 */
export const extractIds = <T extends { id: number }>(values: (number | T)[]): number[] => {
    return values.map(item => typeof item === "object" && item !== null ? item.id : item);
};

/**
 * Transforms array attributes by extracting IDs if needed
 * @param data The data object to transform
 * @param arrayAttributes Array of attribute names that should be transformed
 * @returns Transformed data object
 */
type ObjectWithId = { id: any };

export const transformArrayAttributes = <T extends Record<string, any>>(
  data: T,
  arrayAttributes: string[]
): T => {
  // Create a new object with the same type as data
  const result: Record<string, any> = { ...data };
  
  arrayAttributes.forEach(attr => {
    // Safely check if the property exists and is an array
    if (Object.prototype.hasOwnProperty.call(result, attr) && 
        Array.isArray(result[attr])) {
      const arrayValue = result[attr];
      
      // Check if array contains objects with id property
      if (arrayValue.length > 0 && 
          typeof arrayValue[0] === 'object' && 
          arrayValue[0] !== null && 
          'id' in arrayValue[0]) {
        result[attr] = arrayValue.map((item: ObjectWithId) => item.id);
      }
    }
  });
  
  return result as T;
};