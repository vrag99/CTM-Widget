

export function removeConsecutiveDuplicates<T>(arr:T[]) {
    if (arr.length === 0) return []; // Return empty array if input array is empty
  
    const result = [arr[0]]; // Initialize result array with the first element
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
        result.push(arr[i]); // Push element to result if it's different from previous element
      }
    }
  
    return result;
  }