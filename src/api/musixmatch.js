export const fetchQuestion = () => {
  return new Promise((resolve, reject) => setTimeout(() => resolve({
    content: "love of my life love of my life love of my life love of my life",
    correctAnswer: 1,
    answers: [{
      answer: 'Pink'
    },{
      answer: 'Madonna'
    },{
      answer: 'Ligabue'
    }]
  }), 500));
}
