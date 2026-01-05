const quizData = [
    {
    question: "أين وُلد السيد المسيح ؟",
    options: ["أورشليم", "بيت لحم", "الناصرة", "مصر"],
    correct: "بيت لحم"
    },
    {
    question: "متى نحتفل بعيد الميلاد المجيد في الكنيسة القبطية ؟",
    options: ["25 ديسمبر", "19 كيهك", "6 يناير", "29 كيهك"],
    correct: "29 كيهك"
    },
    {
    question: "من هم الذين ظهر لهم الملاك أولاً ؟",
    options: ["المجوس", "الكهنة", "الرعاة", "التلاميذ"],
    correct: "الرعاة"
    },
    {
    question: "ماذا رأى المجوس في السماء ؟",
    options: ["سحابة", "نجمة الميلاد", "نيزك", "القمر"],
    correct: "نجمة الميلاد"
    },
    {
    question: "كم عدد هدايا المجوس ؟",
    options: ["1", "2", "3", "4"],
    correct: "3"
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
    const current = quizData[currentIndex];
    questionEl.innerText = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
    `;
    optionsEl.appendChild(label);
    });
}

nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
    alert("Please select an answer  !  رجاءاً اختر اجابة");
    return;
    }

    const userAnswer = selectedOption.value;
    if (userAnswer === quizData[currentIndex].correct) {
    score++;
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
    loadQuestion();
    } else {
    showResult();
    }
});

function copyCode() {
    const codeText = document.getElementById("secretCode").innerText;
    navigator.clipboard.writeText(codeText);
    showMessage("تم نسخ الكود");
}

function showMessage(msg) {
    let messageBox = document.getElementById("messageBox");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        messageBox.style.marginTop = "10px";
        messageBox.style.color = "green";
        messageBox.style.fontSize = "16px";
        resultEl.appendChild(messageBox);
    }

    messageBox.innerText = msg;

    setTimeout(() => {
        messageBox.innerText = "";
    }, 2000);
}

function reloadQuiz() {
    location.reload();
}

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";

    resultEl.innerHTML = "";

    if (score === quizData.length) {
        const code = "#102*1*5350001949176923#";

        resultEl.innerHTML = `
            <p>رائع إجاباتك كلها صحيحة</p>
            <p>مبروك ادخل الكود بسرعة</p>
            <p id="secretCode">${code}</p>
            <button onclick="copyCode()">نسخ الكود</button>
        `;
    } else {
        resultEl.innerHTML = `
            <p>للأسف نتيجتك ${score} من ${quizData.length}</p>
            <button onclick="reloadQuiz()">حاول مجدداً</button>
        `;
    }
}


loadQuestion();