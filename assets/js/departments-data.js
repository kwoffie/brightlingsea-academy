/**
 * BRIGHTLINGSEA ACADEMY — ACADEMIC DEPARTMENTS DATA
 * Details for each academic department
 */

const DEPARTMENTS_DATA = {
    departments: [
        {
            id: "english",
            name: "English Language & Literature",
            icon: "fas fa-book-open",
            color: "#0056A3",
            description: "Our English department fosters a love for reading, writing, and effective communication. Students develop critical thinking, creative writing, and oratory skills through engaging lessons, debates, and literary analysis.",
            curriculum: [
                { level: "JHS 1", topics: "Reading comprehension, essay writing, poetry, grammar, oral expression" },
                { level: "JHS 2", topics: "Advanced essay writing, précis writing, literary analysis, public speaking" },
                { level: "JHS 3", topics: "Essay technique, BECE preparation, literature appreciation, drama" }
            ],
            achievements: [
                "92% of students score A1-C6 in BECE English",
                "Students consistently win district essay writing competitions",
                "School debate team won regional championship 3 consecutive years"
            ],
            staff: [
                { name: "Miss Abena Serwaa Owusu", role: "Head of English Department", email: "abena.owusu@brightlingseaacademy.edu.gh" },
                { name: "Mrs. Gifty Owens", role: "Class Teacher (P6 Gold)", email: "gifty.owens@brightlingseaacademy.edu.gh" }
            ],
            projects: "Students produce a school magazine, creative writing portfolios, poetry anthologies, and participate in national writing competitions.",
            facilities: "Well-equipped English room with class readers, dictionaries, and a small library corner for extensive reading."
        },
        {
            id: "mathematics",
            name: "Mathematics",
            icon: "fas fa-square-root-variable",
            color: "#FF6B35",
            description: "The Mathematics department builds strong numerical, logical, and problem-solving skills. We focus on both core mathematical concepts and real-world applications, preparing students thoroughly for BECE and beyond.",
            curriculum: [
                { level: "JHS 1", topics: "Number theory, algebra basics, geometry, statistics, graph work" },
                { level: "JHS 2", topics: "Advanced algebra, trigonometry, transformations, probability, mensuration" },
                { level: "JHS 3", topics: "BECE core syllabus, algebraic manipulation, loci, constructions, revision" }
            ],
            achievements: [
                "95% of students score A1-C6 in BECE Mathematics",
                "12 students placed in top 1% nationally in 2024 BECE",
                "School mathematics team won district competition for 5 consecutive years"
            ],
            staff: [
                { name: "Mr. Kwame Boateng", role: "Head of Mathematics Department", email: "kwame.boateng@brightlingseaacademy.edu.gh" },
                { name: "Mrs. Akosua Serwaa Osei", role: "Deputy Head (Academics)", email: "deputy.academics@brightlingseaacademy.edu.gh" }
            ],
            projects: "Students work on mathematics projects including data analysis of real-world problems, geometry construction portfolios, and participation in national mathematics competitions.",
            facilities: "Mathematics classrooms with whiteboards, geometry sets, calculators, and a resource corner with past BECE questions and revision guides."
        },
        {
            id: "science",
            name: "Science",
            icon: "fas fa-flask",
            color: "#28a745",
            description: "The Science department covers Integrated Science and Chemistry, with a strong emphasis on practical work. Students conduct experiments, learn scientific method, and participate in science fairs and innovation challenges.",
            curriculum: [
                { level: "JHS 1", topics: "Biology (living things, ecosystems), Chemistry (matter, mixtures), Physics (energy, motion)" },
                { level: "JHS 2", topics: "Advanced biology, chemical reactions, human body systems, electricity, forces" },
                { level: "JHS 3", topics: "BECE science practicals, detailed biology, chemistry of acids/bases, physics of light/sound" }
            ],
            achievements: [
                "Science Club won 3 consecutive district inter-school science fairs (2022-2024)",
                "Students won awards at national science competitions",
                "School science project won national recognition in 2024"
            ],
            staff: [
                { name: "Mrs. Adwoa Mensah", role: "Head of Science Department", email: "adwoa.mensah@brightlingseaacademy.edu.gh" },
                { name: "Mr. Emmanuel Agyei", role: "Senior Science Teacher", email: "emmanuel.agyei@brightlingseaacademy.edu.gh" }
            ],
            projects: "Annual science fair, science club experiments, environmental projects, and student-led research presentations.",
            facilities: "Well-equipped science laboratory with apparatus for biology, chemistry, and physics practicals. Separate storage for chemicals and safety equipment."
        },
        {
            id: "social-studies",
            name: "Social Studies & Ghanaian Languages",
            icon: "fas fa-globe-africa",
            color: "#6f42c1",
            description: "The Social Studies department builds citizenship, cultural awareness, and critical understanding of society. Students study economics, geography, history, and Ghanaian languages, developing a well-rounded understanding of their environment and heritage.",
            curriculum: [
                { level: "JHS 1", topics: "Our environment, map work, Ghanaian culture, basic economics, local history" },
                { level: "JHS 2", topics: "West African geography, economic activities, governance, conflict resolution, Ghanaian language basics" },
                { level: "JHS 3", topics: "BECE social studies syllabus, population studies, trade, citizenship, Ghanaian language proficiency" }
            ],
            achievements: [
                "Students consistently perform well in BECE Social Studies (94% pass rate)",
                "School debate team coached by department wins regional championships",
                "Students participate in national essay competitions on Ghanaian history and culture"
            ],
            staff: [
                { name: "Miss Akua Asante", role: "Head of Social Studies & Ghanaian Languages", email: "akua.asante@brightlingseaacademy.edu.gh" }
            ],
            projects: "Field trips to historical sites, environmental surveys, community service projects, and Ghanaian language cultural presentations.",
            facilities: "Resource-rich classrooms with maps, charts, Ghanaian language materials, and access to internet for research."
        },
        {
            id: "creative-arts",
            name: "Creative Arts",
            icon: "fas fa-palette",
            color: "#E91E63",
            description: "The Creative Arts department nurtures creativity through visual arts, music, and drama. Students express themselves freely, learn artistic techniques, and showcase their talents at school events and competitions.",
            curriculum: [
                { level: "JHS 1", topics: "Drawing, painting, basic music theory, creative movement, craft" },
                { level: "JHS 2", topics: "Still life, color theory, choir, drama skills, art history" },
                { level: "JHS 3", topics: "Advanced techniques, composition, performance, portfolio development" }
            ],
            achievements: [
                "School choir performed at National Theatre for 3 consecutive years",
                "Students won district-level art competitions for 3 consecutive years",
                "Drama club produces annual plays that win regional praise"
            ],
            staff: [
                { name: "Kwesi Ofori", role: "Creative Arts Teacher", email: "kwesi.ofori@brightlingseaacademy.edu.gh" }
            ],
            projects: "Annual art exhibition, school choir performances, drama productions, cultural festival participation, and preparation of BECE creative arts portfolios.",
            facilities: "Art room with easels, painting supplies, music room with instruments, and a performance area for drama rehearsals."
        },
        {
            id: "technology",
            name: "Technology & ICT",
            icon: "fas fa-laptop-code",
            color: "#3498db",
            description: "The Technology and ICT department equips students with digital skills essential for the future. Students learn computing, programming, and digital literacy, preparing them for higher education and careers in technology.",
            curriculum: [
                { level: "JHS 1", topics: "Computer basics, word processing, internet safety, introduction to programming" },
                { level: "JHS 2", topics: "Spreadsheets, databases, web design basics, advanced programming (Python)" },
                { level: "JHS 3", topics: "BECE ICT syllabus, app development, networking basics, data analysis" }
            ],
            achievements: [
                "Coding Club won 2nd place in National Schools Coding Challenge 2024",
                "Students built 5 school websites for various clubs",
                "ICT department produces well-prepared candidates for BECE ICT"
            ],
            staff: [
                { name: "Mr. Bernard Owusu", role: "ICT Teacher", email: "bernard.owusu@brightlingseaacademy.edu.gh" }
            ],
            projects: "Coding club, web development projects, programming competitions, robotics exploration, and digital literacy campaigns.",
            facilities: "Computer laboratory with 30 desktop computers, internet access, projector, and a server. Students also have access to tablets for group work."
        },
        {
            id: "languages",
            name: "French Language",
            icon: "fas fa-language",
            color: "#E6C200",
            description: "The French department introduces students to the French language and Francophone culture. Through interactive lessons, cultural exchanges, and immersion activities, students develop conversational and written French skills.",
            curriculum: [
                { level: "JHS 1", topics: "Greetings, introductions, basic vocabulary, simple conversations, numbers, colours" },
                { level: "JHS 2", topics: "Daily routines, family, food, hobbies, past tense introduction, cultural readings" },
                { level: "JHS 3", topics: "BECE French preparation, advanced vocabulary, writing exercises, DELF Junior preparation" }
            ],
            achievements: [
                "Re-established exchange partnerships with schools in Senegal and Cote d'Ivoire",
                "Students participate in DELF Junior certification (optional, advanced students)",
                "French club actively organizes cultural events and francophone movie nights"
            ],
            staff: [
                { name: "Mrs. Linda Asante", role: "French Teacher", email: "linda.asante@brightlingseaacademy.edu.gh" }
            ],
            projects: "Annual French cultural exchange, Francophonie day celebrations, pen-pal program with partner schools in West Africa, and French drama/skits.",
            facilities: "French classroom with cultural materials, Francophone books, audio-visual equipment, and display of French-speaking countries."
        }
    ]
};
