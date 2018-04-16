/**
 * Check if JSON is valid.
 */
export const isInvalidJson = (input: string): boolean => {

   try {
      JSON.parse(input);
   } catch(error) {
      return error.message; // Is invalid
   }

   return false; // Is valid

};

/**
 * Create JSON string for ws message.
 */
export const createWsJson = (message: WebsocketMessage, type: WebsocketMessageType): string => {

  const object = {};

  object[type] = message;

  return JSON.stringify(object);

};

/**
 * Handle ws message error
 */
export const handleWsError = (error: Error): void => {

  if(error){
    console.log(error);
  }

};