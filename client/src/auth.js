// Simple auth helper to store JWT and user in localStorage and interact with backend
const API = 'http://localhost:3000'

const authenticate = (data, cb) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        // notify other parts of the app that auth changed
        try { window.dispatchEvent(new Event('authChange')) } catch (e) { }
    }
    cb()
}

const isAuthenticated = () => {
    if (typeof window == 'undefined') return false
    if (localStorage.getItem('jwt'))
        return JSON.parse(localStorage.getItem('jwt'))
    else
        return false
}

const signout = (cb) => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt')
    try { window.dispatchEvent(new Event('authChange')) } catch (e) { }
    // notify server (clear cookie if used)
    fetch(`${API}/auth/signout`, { method: 'GET' })
        .then(response => {
            cb()
        })
        .catch(err => {
            console.error('Signout error', err)
            cb()
        })
}

export default { authenticate, isAuthenticated, signout }
