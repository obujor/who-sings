export const getPlayedQuizzes = () =>
  JSON.parse((localStorage.getItem('playedQuizzes') || '[]'))

export const savePlayedQuizzes = (playedQuizzes) =>
  localStorage.setItem('playedQuizzes', JSON.stringify(playedQuizzes))
