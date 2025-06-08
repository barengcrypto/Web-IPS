// Data kuis untuk setiap kelas
const quizData = {
    kelas7: [
        {
            question: "Apa yang dimaksud dengan ruang dalam konteks geografi?",
            options: [
                "Tempat untuk menyimpan barang",
                "Tempat di permukaan bumi yang meliputi daratan, lautan, dan udara",
                "Ruangan dalam gedung",
                "Area kosong"
            ],
            correct: 1
        },
        {
            question: "Manakah yang bukan merupakan komponen ruang?",
            options: [
                "Litosfer",
                "Hidrosfer",
                "Termosfer",
                "Biosfer"
            ],
            correct: 2
        },
        {
            question: "Sumber daya alam yang dapat diperbarui adalah...",
            options: [
                "Minyak bumi",
                "Batu bara",
                "Air",
                "Gas alam"
            ],
            correct: 2
        }
    ],
    kelas8: [
        {
            question: "Apa yang dimaksud dengan interaksi sosial?",
            options: [
                "Hubungan satu arah antar individu",
                "Hubungan timbal balik antara individu atau kelompok",
                "Komunikasi dalam media sosial",
                "Pertemuan formal"
            ],
            correct: 1
        },
        {
            question: "Berikut ini yang merupakan kegiatan ekonomi adalah...",
            options: [
                "Tidur",
                "Bermain game",
                "Produksi barang",
                "Menonton TV"
            ],
            correct: 2
        },
        {
            question: "Faktor internal perubahan sosial budaya adalah...",
            options: [
                "Pengaruh budaya lain",
                "Bencana alam",
                "Penemuan baru",
                "Perang"
            ],
            correct: 2
        }
    ],
    kelas9: [
        {
            question: "Pegunungan tertinggi di Asia adalah...",
            options: [
                "Pegunungan Himalaya",
                "Pegunungan Alpen",
                "Pegunungan Ural",
                "Pegunungan Atlas"
            ],
            correct: 0
        },
        {
            question: "Apa yang dimaksud dengan perdagangan internasional?",
            options: [
                "Perdagangan antar provinsi",
                "Perdagangan dalam satu negara",
                "Perdagangan antar negara",
                "Perdagangan dalam kota"
            ],
            correct: 2
        },
        {
            question: "Dampak positif globalisasi adalah...",
            options: [
                "Lunturnya budaya lokal",
                "Kemudahan akses informasi",
                "Ketergantungan teknologi",
                "Kesenjangan digital"
            ],
            correct: 1
        }
    ]
};

let currentQuestion = 0;
let score = 0;
let currentClass = '';

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Quiz Functions
function startQuiz(kelas) {
    currentClass = kelas;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const currentQuizData = quizData[currentClass][currentQuestion];

    if (currentQuestion < quizData[currentClass].length) {
        const questionHTML = `
            <div class="quiz-question">
                <h4 class="mb-4">Pertanyaan ${currentQuestion + 1} dari ${quizData[currentClass].length}</h4>
                <p class="lead mb-4">${currentQuizData.question}</p>
                <div class="quiz-options">
                    ${currentQuizData.options.map((option, index) => `
                        <div class="quiz-option mb-3" onclick="checkAnswer(${index})">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        quizContainer.innerHTML = questionHTML;
    } else {
        showResult();
    }
}

function checkAnswer(answer) {
    const currentQuizData = quizData[currentClass][currentQuestion];
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (answer === currentQuizData.correct) {
        options[answer].classList.add('correct');
        score++;
    } else {
        options[answer].classList.add('incorrect');
        options[currentQuizData.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    const percentage = (score / quizData[currentClass].length) * 100;
    let message = '';

    if (percentage >= 80) {
        message = 'Luar biasa! Kamu menguasai materi dengan sangat baik!';
    } else if (percentage >= 60) {
        message = 'Bagus! Terus belajar untuk hasil yang lebih baik!';
    } else {
        message = 'Jangan menyerah! Coba lagi dan pelajari materinya dengan teliti!';
    }

    const resultHTML = `
        <div class="text-center">
            <h3 class="mb-4">Hasil Kuis</h3>
            <p class="display-4 mb-3">${score} / ${quizData[currentClass].length}</p>
            <p class="lead mb-4">${message}</p>
            <div class="row justify-content-center g-3">
                <div class="col-md-6">
                    <button class="btn btn-primary w-100" onclick="startQuiz('${currentClass}')">Coba Lagi</button>
                </div>
                <div class="col-md-6">
                    <a href="../index.html#kuis" class="btn btn-outline-primary w-100">Kembali ke Menu</a>
                </div>
            </div>
        </div>
    `;
    quizContainer.innerHTML = resultHTML;
}

// Navbar Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
        }
    });
});

// Handle material links
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all material links
    const materialLinks = document.querySelectorAll('a[href^="materi/"]');
    materialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the href attribute
            const href = this.getAttribute('href');
            // Navigate to the page
            window.location.href = href;
        });
    });
});

// Function to navigate to material pages
function navigateToMaterial(grade) {
    const path = `materi/kelas${grade}.html`;
    window.location.href = path;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to navbar items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Quiz functionality
function startQuiz(level) {
    const quizContainer = document.getElementById('quiz-container');
    const questions = getQuestions(level);
    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const question = questions[currentQuestion];
        
        let html = `
            <div class="quiz-question mb-4">
                <h4 class="mb-3">${question.question}</h4>
                <div class="options">
        `;
        
        question.options.forEach((option, index) => {
            html += `
                <div class="quiz-option mb-3" onclick="selectOption(this, ${index === question.correct})">
                    <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
                    ${option}
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div class="quiz-progress">
                <p>Pertanyaan ${currentQuestion + 1} dari ${questions.length}</p>
                <div class="progress mb-3">
                    <div class="progress-bar" style="width: ${(currentQuestion + 1) / questions.length * 100}%"></div>
                </div>
            </div>
        `;

        quizContainer.innerHTML = html;
    }

    function showResult() {
        const percentage = (score / questions.length) * 100;
        let message = '';
        
        if (percentage >= 80) {
            message = 'Luar biasa! Kamu menguasai materi dengan sangat baik!';
        } else if (percentage >= 60) {
            message = 'Bagus! Terus tingkatkan pemahamanmu!';
        } else {
            message = 'Jangan menyerah! Coba lagi dan pelajari materinya kembali.';
        }

        quizContainer.innerHTML = `
            <div class="text-center">
                <h3 class="mb-4">Hasil Kuis</h3>
                <div class="score-circle mb-4">
                    <h1>${percentage}%</h1>
                    <p>Skor Anda</p>
                </div>
                <p class="mb-4">${message}</p>
                <p class="mb-4">Anda menjawab benar ${score} dari ${questions.length} pertanyaan.</p>
                <button class="btn btn-primary" onclick="location.reload()">Coba Lagi</button>
            </div>
        `;
    }

    window.selectOption = function(element, isCorrect) {
        // Disable all options
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.style.pointerEvents = 'none');

        // Show correct/incorrect
        element.classList.add(isCorrect ? 'correct' : 'incorrect');
        
        if (isCorrect) score++;

        // Wait and show next question
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    };

    showQuestion();
}

function getQuestions(level) {
    const questions = {
        kelas7: [
            {
                question: "Apa yang dimaksud dengan interaksi antarruang?",
                options: [
                    "Hubungan sosial antarmanusia",
                    "Hubungan timbal balik antara wilayah satu dengan lainnya",
                    "Perpindahan penduduk antarkota",
                    "Pertukaran budaya antarnegara"
                ],
                correct: 1
            },
            {
                question: "Manakah yang termasuk sumber daya alam yang dapat diperbaharui?",
                options: [
                    "Minyak bumi",
                    "Batu bara",
                    "Hutan",
                    "Emas"
                ],
                correct: 2
            },
            {
                question: "Apa faktor utama yang mempengaruhi pertumbuhan penduduk?",
                options: [
                    "Cuaca",
                    "Kelahiran dan kematian",
                    "Teknologi",
                    "Ekonomi"
                ],
                correct: 1
            }
        ],
        kelas8: [
            {
                question: "Apa yang dimaksud dengan mobilitas sosial?",
                options: [
                    "Perpindahan tempat tinggal",
                    "Perubahan status sosial seseorang",
                    "Perubahan pekerjaan",
                    "Perpindahan sekolah"
                ],
                correct: 1
            },
            {
                question: "Manakah yang merupakan contoh interaksi sosial asosiatif?",
                options: [
                    "Konflik",
                    "Persaingan",
                    "Kerjasama",
                    "Pertentangan"
                ],
                correct: 2
            },
            {
                question: "Apa yang dimaksud dengan pluralitas?",
                options: [
                    "Perbedaan pendapat",
                    "Keberagaman dalam masyarakat",
                    "Perpecahan kelompok",
                    "Persatuan bangsa"
                ],
                correct: 1
            }
        ],
        kelas9: [
            {
                question: "Apa yang dimaksud dengan perdagangan internasional?",
                options: [
                    "Perdagangan antar provinsi",
                    "Perdagangan dalam satu negara",
                    "Perdagangan antar negara",
                    "Perdagangan dalam kota"
                ],
                correct: 2
            },
            {
                question: "Manakah yang merupakan dampak positif globalisasi?",
                options: [
                    "Hilangnya budaya lokal",
                    "Kemudahan akses informasi",
                    "Ketergantungan teknologi",
                    "Konsumerisme"
                ],
                correct: 1
            },
            {
                question: "Apa fungsi utama uang dalam perekonomian?",
                options: [
                    "Alat tukar",
                    "Hiasan",
                    "Koleksi",
                    "Simpanan"
                ],
                correct: 0
            }
        ]
    };

    return questions[level] || [];
} 