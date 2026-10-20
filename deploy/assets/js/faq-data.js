/**
 * BRIGHTLINGSEA ACADEMY — FAQ DATA
 * Frequently Asked Questions
 */

const FAQ_DATA = {
    categories: [
        { id: 'all', name: 'All Questions', icon: 'fas fa-question-circle' },
        { id: 'admissions', name: 'Admissions', icon: 'fas fa-user-graduate' },
        { id: 'academics', name: 'Academics', icon: 'fas fa-book' },
        { id: 'daily-life', name: 'Daily Life', icon: 'fas fa-home' },
        { id: 'results', name: 'Our School', icon: 'fas fa-school' }
    ],

    questions: [
        // === ADMISSIONS ===
        { category: 'admissions', question: 'What age must my child be to enrol?', answer: '<p>Children are admitted according to their level of readiness. We enrol from <strong>Nursery 1</strong> right through to <strong>JHS 3 (Basic 9)</strong>.</p><p><strong>Typical age brackets by level:</strong></p><ul><li>Nursery 1 &amp; 2: 2-4 years</li><li>KG 1 &amp; KG 2: 4-6 years</li><li>Basic 1-6 (Primary): 6-12 years</li><li>JHS 1-3 (Basic 7-9): 11-15 years</li></ul><p>Each child is considered individually, and our staff will advise the most suitable class placement after a short readiness assessment.</p>' },
        { category: 'admissions', question: 'What documents are required for admission?', answer: '<p>To apply for admission, please bring the following to the school office:</p><ol><li>Child\'s birth certificate (or a certified copy)</li><li>Two recent passport-sized photographs of the child</li><li>Report card or terminal report from the previous school (where applicable)</li><li>Parent or guardian ID (Ghana Card or passport)</li><li>A completed application form (available at the school office)</li></ol><p>Original documents are viewed and returned immediately. Our office team will guide you through the process step by step.</p>' },
        { category: 'admissions', question: 'How does the application process work?', answer: '<p>Our admission process is simple and welcoming:</p><ol><li><strong>Visit or contact the school</strong> — call in at the school office at QCM3+262, Kumasi, or reach us by phone or email.</li><li><strong>Complete the application form</strong> with the required documents.</li><li><strong>Meet the class teacher</strong> — a short, friendly assessment helps us place your child correctly.</li><li><strong>Confirmation</strong> — we confirm your child\'s place and class assignment.</li><li><strong>Start school</strong> — your child joins their class and is welcomed into the Brightlingsea family.</li></ol><p>Contact us through our <a href="contact.html">Contact page</a> for more information or to arrange a visit.</p>' },
        { category: 'admissions', question: 'Does it cost anything to attend?', answer: '<p>Brightlingsea Academy exists to bring hope and a brighter future to underprivileged children through <strong>quality education</strong>. Our pupils are provided for by the school and its supporters, and we do not publish a fee schedule on this website.</p><p>Every child at the school receives:</p><ul><li>Free education</li><li>Two nutritious meals every day</li><li>Healthy snacks through the week</li><li>Free school uniforms</li><li>Medical cards covering access to doctors and reduced-price prescriptions</li><li>Vaccinations and medical checks, including optician visits</li><li>Free transport to school on our school bus for children living further away</li><li>Home visits and support from our social worker</li></ul><p>For any question about enrolment, please <a href="contact.html">contact the school office</a> directly.</p>' },
        { category: 'admissions', question: 'Is there a boarding facility?', answer: '<p>Yes. In 2024 the Academy secured a building that accommodates our <strong>final-year pupils under our boarding system</strong>, along with residential accommodation for staff.</p><p>The boarding house gives our JHS 3 candidates a settled, supervised environment in the important months leading up to the BECE, and is part of why our pioneer cohort achieved such strong results.</p>' },

        // === ACADEMICS ===
        { category: 'academics', question: 'What curriculum does the school follow?', answer: '<p>We follow the <strong>Ghana Education Service (GES) curriculum</strong> across Nursery, Kindergarten, Primary and Junior High School.</p><p>Core subjects include English Language, Mathematics, Natural Science, Creative Arts, Ghanaian Language, History, Religious Education, Our World and Our People, French and ICT. As a private basic school we teach the full basic-education curriculum and prepare our pupils for the <strong>BECE</strong> at the end of JHS 3.</p>' },
        { category: 'academics', question: 'What levels and classes do you offer?', answer: '<p>We are a complete basic school, from Nursery through to Junior High School:</p><ul><li><strong>Nursery</strong> — Nursery 1 and Nursery 2</li><li><strong>Kindergarten</strong> — KG 1 and KG 2</li><li><strong>Primary</strong> — Basic 1 to Basic 6</li><li><strong>Junior High School</strong> — JHS 1 to JHS 3 (Basic 7-9)</li></ul><p>Around <strong>400+ pupils</strong> are enrolled across all levels.</p>' },
        { category: 'academics', question: 'How are students graded?', answer: '<p>We use the standard <strong>GES grading scale</strong> for class assessments and for the BECE:</p><ul><li><strong>A1 (Excellent):</strong> 90-100%</li><li><strong>B2 (Very Good):</strong> 80-89%</li><li><strong>B3 (Good):</strong> 70-79%</li><li><strong>C4-C6 (Credit):</strong> 50-69%</li><li><strong>D7-E8 (Pass):</strong> 40-49%</li><li><strong>F9 (Fail):</strong> Below 40%</li></ul><p>Pupils sit regular class tests, end-of-term examinations and projects, and parents receive a terminal report each term.</p>' },
        { category: 'academics', question: 'What is your BECE record?', answer: '<p>We are proud that our Academy has achieved a <strong>100% BECE pass rate</strong>.</p><p>In our most recent sitting, <strong>all 19 candidates qualified for placement</strong> with boarding status, and every one of them gained admission to their preferred programme of study at senior high school level.</p><p>This result is a true reflection of the hard work of our pupils, the dedication of our teachers, and the support of our families.</p>' },
        { category: 'academics', question: 'What is the ICT provision?', answer: '<p>ICT is taught as part of the curriculum. Following a grant, we equipped our ICT room with <strong>13 computers</strong>, and our pupils use them for computing, digital literacy and coding sessions.</p><p>We continue to work towards our goal of a fully equipped 60-seater ultramodern ICT laboratory as part of our ten-year development plan.</p>' },

        // === DAILY LIFE ===
        { category: 'daily-life', question: 'What time does school start and end?', answer: '<p>A typical school day runs from the morning assembly through to the close of lessons in the afternoon. Break and lunch times are built into the day, and pupils receive a hot meal at school.</p><p>For exact opening and closing times for each class, please check with the school office, as times are adjusted for the nursery and lower primary pupils.</p>' },
        { category: 'daily-life', question: 'What do pupils receive at school?', answer: '<p>Every child at Brightlingsea Academy receives:</p><ul><li><strong>Free education</strong></li><li><strong>Two nutritious meals a day</strong>, prepared in our school kitchen</li><li><strong>Healthy snacks</strong> throughout the week</li><li><strong>Free school uniforms</strong></li><li><strong>Medical cards</strong> covering access to doctors and reduced-price prescriptions</li><li><strong>Vaccinations and medical checks</strong>, including visits from opticians</li><li><strong>School bus transport</strong> for children living further away</li><li><strong>Home visits and support</strong> from our social worker, with food and items needed for school</li></ul><p>This support is central to our mission of bringing hope and changing lives.</p>' },
        { category: 'daily-life', question: 'Is there a school bus service?', answer: '<p>Yes. Our <strong>school bus transports children who live further away</strong> into school each day, making it easier for families in the surrounding communities to send their children to Brightlingsea Academy.</p><p>Please speak to the school office about routes and availability.</p>' },
        { category: 'daily-life', question: 'What is the school uniform policy?', answer: '<p>School uniforms are provided <strong>free of charge</strong> by the school. Pupils are expected to wear their full uniform to school each day and to keep it neat and presentable.</p><p>Our pupils also wear house colours on sports and inter-house competition days, as every pupil belongs to one of our five houses.</p>' },
        { category: 'daily-life', question: 'What clubs and activities are available?', answer: '<p>Learning at Brightlingsea goes well beyond the classroom. Pupils can take part in:</p><ul><li><strong>Air Force cadet corps</strong></li><li><strong>Robotics</strong></li><li><strong>Environmental Awareness Club</strong></li><li><strong>Writers &amp; Debaters</strong></li><li><strong>Art &amp; Culture</strong></li><li>Choir and orchestra</li><li>School farm and gardening</li><li>Sports and inter-house athletics</li></ul><p>Pupils also enjoy excursions to places such as Kakum National Park, the Cape Coast and Elmina castles, Lake Bosomtwe, Kumasi Zoo, Manhyia Palace and Barekese Dam.</p>' },

        // === OUR SCHOOL ===
        { category: 'results', question: 'What are the school houses?', answer: '<p>Every pupil belongs to one of our <strong>five houses</strong>, each named in honour of someone who has shaped the school:</p><ul><li><strong>Antwi-Agyei House</strong> (royal blue) — named for our Proprietor</li><li><strong>Beatrice Boadi House</strong> (yellow) — our Kids Welfare Coordinator</li><li><strong>Serwaa Akoto House</strong> (green)</li><li><strong>Jemma Collins House</strong> (orange)</li><li><strong>Steve William House</strong> (red)</li></ul><p>Houses compete throughout the year in athletics, quizzes, cultural displays, spelling bees and sports, building teamwork and school spirit.</p>' },
        { category: 'results', question: 'Where is the school located?', answer: '<p>Brightlingsea Academy is located at <strong>QCM3+262, Kumasi, in the Ashanti Region of Ghana</strong>.</p><p>The school was opened on <strong>9 October 2016</strong> in the community of Asennua, and has grown with the surrounding communities ever since.</p><p>See our <a href="campus.html">Campus &amp; Location page</a> for school views and directions.</p>' },
        { category: 'results', question: 'What is the school animal?', answer: '<p>Our resident school animal is a <strong>monkey</strong> — the only animal kept at the school. Curious and full of character, it is a familiar and much-loved part of daily life around our grounds, and a favourite talking point during nature lessons.</p>' },
        { category: 'results', question: 'What is the school motto?', answer: '<p>Our motto is <strong>“Let Your Light Shine”</strong>.</p><p>It reflects our belief that every child carries God-given potential, and that quality education is how that light is brought out for the benefit of the child, the family and the wider community.</p>' }
    ]
};

/**
 * Get questions for a category (or all)
 */
function getFAQByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return FAQ_DATA.questions;
    return FAQ_DATA.questions.filter(q => q.category === categoryId);
}

/**
 * Search FAQ questions
 */
function searchFAQ(query) {
    if (!query || !query.trim()) return FAQ_DATA.questions;
    const q = query.toLowerCase().trim();
    return FAQ_DATA.questions.filter(question =>
        question.question.toLowerCase().includes(q) ||
        question.answer.toLowerCase().includes(q) ||
        question.category.toLowerCase().includes(q)
    );
}
