(function () {

    const Answers = {
        name: sessionStorage.getItem('name'),
        lastName: sessionStorage.getItem('lastName'),
        email: sessionStorage.getItem('email'),
        testId: sessionStorage.getItem('testId'),
        quiz: null,
        answers: null,
        answersResultsElement: null,
        answersFromUser: null,
        resultLink: null,
        init() {
            checkUserData();
            const that = this;
            that.getAnswers();
            that.getQuiz();

            document.getElementById('test-title').innerText = this.quiz.name;
            document.getElementById('person').innerText = `${this.name}  ${this.lastName}, ${this.email}`;

            this.answersResultsElement = document.getElementById('answers-results');

            this.answersFromUser = JSON.parse(sessionStorage.getItem('answers'));

            this.showQuestion();

            this.resultLink = document.getElementById('answers-link');
            this.resultLink.addEventListener('click', this.locationResults);

        },
        getAnswers() {
            if (this.testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + this.testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.answers = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        getQuiz() {
            if (this.testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + this.testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        showQuestion() {
            this.quiz.questions.forEach((question, index) => {
                const title = question.question;
                const answersId = this.answersFromUser.find(item => item.questionId === question.id);

                const titleElement = document.createElement('div');
                titleElement.className = "answers-result-title";
                titleElement.innerHTML = `<span>Вопрос ${index+1}:</span> ${title}`

                const answersOptions = document.createElement('div');
                answersOptions.className = "answers-result-items";

                this.answersResultsElement.appendChild(titleElement);
                this.answersResultsElement.appendChild(answersOptions);

                if(answersId.chosenAnswerId) {
                    question.answers.forEach(item => {
                        const answerElement = document.createElement('span');
                        answerElement.className = 'answers-result-item';
                        answerElement.innerText = item.answer;

                        if(item.id === answersId.chosenAnswerId) {
                            if (this.answers.includes(answersId.chosenAnswerId)) {
                                answerElement.classList.add('right');
                            } else {
                                answerElement.classList.add('wrong');
                            }
                        }

                        answersOptions.appendChild(answerElement);
                    });
                } else {
                    answersOptions.innerText = 'Вы не успели ответить на этот вопрос';
                }

            });
        },
        locationResults() {
            location.href = 'result.html';
        }

    }


    Answers.init();
})();