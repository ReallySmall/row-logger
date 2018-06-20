/**
 * Check if ws message is valid JSON and is compatible structure.
 */
export const parseWsMessage = (messageJSON: string): any => {

  let parsedObject = undefined;

   try {
      parsedObject = JSON.parse(messageJSON);
   } catch(error) {
      return undefined;
   }

   if(!parsedObject.hasOwnProperty('type') || !parsedObject.hasOwnProperty('payload') || !parsedObject.hasOwnProperty('error')){
     return undefined;
   }

   return parsedObject;

};

/**
 * Create JSON string for ws message.
 */
export const createWsMessage = (type: WebsocketMessageType, payload: WebsocketMessage, error: boolean): string => {

  const message = {};

  message['type'] = type;
  message['payload'] = payload;
  message['error'] = error;

  return JSON.stringify(message);

};

/**
 * Handle ws message error
 */
export const handleWsError = (error: Error): void => {

  if(error){
    console.log(error);
  }

};