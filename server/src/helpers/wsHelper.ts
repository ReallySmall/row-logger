/**
 * Check if JSON is valid.
 */
export const isInvalidJson = (input: string) => {

   try {
      JSON.parse(input);
   } catch(error) {
      return error.message; // Is invalid 
   }

   return false; // Is valid 

}

/**
 * Create JSON string for ws message.
 */
export const createWsJson = (message: string, type: string) => {

  const object = {};

  object[type] = message;

  return JSON.stringify(object); 

}