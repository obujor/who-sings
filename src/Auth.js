export const getLoggedUser = () =>
  localStorage.getItem('username')

export const login = (username) =>
  localStorage.setItem('username', username)

export const logout = () =>
  localStorage.removeItem('username')
