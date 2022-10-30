import Constants from '../constants/alexa.constants'

export const getHandlerNameByIntentName = (intentName: string) => {
    return Constants.HANDLERS_NAMES_DICTIONARY[intentName];
}