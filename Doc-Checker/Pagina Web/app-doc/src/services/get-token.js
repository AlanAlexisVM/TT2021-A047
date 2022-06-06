import { getMessaging, getToken } from 'firebase/messaging'
import {app} from '../firebase'

export const messaging = getMessaging(app)

// vapid key es el par clave de la aplicacion
getToken(messaging, { vapidKey: 'BMbg7t98Kg8jqI-OUfFtjtVQVy1CnM7nWCw-qcWWT155QsdPB4MpDO6AJ1tf_yJ3BxuY2akYgrJb1VUWLQa8GLY' })
    .then((currentToken) => {
        if (currentToken) {
            const token = currentToken
            // Send the token to your server and update the UI if necessary
            console.log('Tu token es: ', token)
        } else {
            // Show permission request UI
            console.log('Token no disponible. Se requieren permisos para generar token.')
            // ...
        }
    }).catch((err) => {
        console.log('Un error inesperado ha ocurrido solicitando el token. ', err)
    })
