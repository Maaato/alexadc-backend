export const RESPONSE_BUILDER_MESSAGES = {
    es: {
        LaunchRequestHandler: {
            success: {
                outputSpeech: "Bienvenido {value} a Alexa Discord Skill!",
                repromptSpeech: "{value}, puedes preguntarme lo que sea."
            }
        },
        CancelAndStopHandler: {
            success: {
                outputSpeech: "Hasta la proxima!",
            }
        },
        ErrorHandler: {
            success: {
                outputSpeech: "Ocurrió un error inesperado, ¿puedes repetir el comando otra vez?",
            }
        },
        PlaySongOnDiscordHandler: {
            success: {
                outputSpeech: "Reproduciendo {value} en discord!",
            },
            error: {
                outputSpeech: "Lo siento, no pude reproducir {value}",
            }
        }
    },
    en: {
        LaunchRequestHandler: {
            success: {
                outputSpeech: "Welcome {value} to Alexa Discord Skill !",
                repromptSpeech: "{value}, you can ask me anything."
            }
        },
        CancelAndStopHandler: {
            success: {
                outputSpeech: "See you next time!",
            }
        },
        ErrorHandler: {
            success: {
                outputSpeech: "An unexpected error occured, can you say your command again ?",
            }
        },
        PlaySongOnDiscordHandler: {
            success: {
                outputSpeech: "Playing {value} on Discord!",
            },
            error: {
                outputSpeech: "Sorry, I couldn't play {value}.",
            }
        }
    },
}