(function () {
    const Result = {
        answersButton: null,
        init() {
            this.answersButton = document.getElementById('result-answers');

            document.getElementById('result-score').innerText = `${sessionStorage.getItem('score')}/${sessionStorage.getItem('total')}`;

            this.answersButton.addEventListener('click', this.locationAnswers);
        },
        locationAnswers() {
            location.href = 'answers.html';
        }
    }

    Result.init();
})();