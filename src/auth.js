export function isAuthenticated()
{
    return (
        getToken() != null ?
            true
        :
            false
    )
}

export default isAuthenticated;

export const setToken = token =>  localStorage.setItem('token', token)

export function getToken() {
    return localStorage.getItem('token');
}

export function deleteToken()
{
    localStorage.removeItem('token');
}