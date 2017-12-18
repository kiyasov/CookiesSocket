
import Cookies from 'universal-cookie';

export default function universalCookieMiddleware(socket) {
    return new Cookies(socket.request.headers.cookie || '', {
        onSet(name, value, options) {
            if (!socket.request.cookie || socket.request.headersSent) {
                return;
            }

            const expressOpt = { ...options };
            if (expressOpt.maxAge) {
                expressOpt.maxAge = options.maxAge * 1000;
            }

            socket.request.cookie(name, value, expressOpt);
        },
        onRemove(name, options) {
            if (!socket.request.clearCookie || socket.request.headersSent) {
                return;
            }

            socket.request.clearCookie(name, options);
        }
    });
}
