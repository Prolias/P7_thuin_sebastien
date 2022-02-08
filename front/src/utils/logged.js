exports.isLogged = () => {
    return !!localStorage.getItem('token')
}