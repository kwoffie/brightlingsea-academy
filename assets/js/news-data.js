/**
 * BRIGHTLINGSEA ACADEMY — NEWS & ANNOUNCEMENTS DATA
 * School news, events, and announcements blog
 */

const NEWS_DATA = {
    categories: [
        { id: 'all', name: 'All News', icon: 'fas fa-newspaper' },
        { id: 'academics', name: 'Academics', icon: 'fas fa-book-open' },
        { id: 'events', name: 'Events', icon: 'fas fa-calendar-alt' },
        { id: 'sports', name: 'Sports', icon: 'fas fa-running' },
        { id: 'achievements', name: 'Achievements', icon: 'fas fa-trophy' },
        { id: 'notices', name: 'Notices', icon: 'fas fa-bullhorn' }
    ],

    categoryColors: {
        academics: 'var(--blue)',
        events: 'var(--orange)',
        sports: 'var(--green, #28a745)',
        achievements: 'var(--yellow-dark, #E6C200)',
        notices: '#E91E63'
    },

    posts: [
        {
            id: 1,
            category: 'achievements',
            title: 'BECE Results: 100% Pass Rate Achieved!',
            excerpt: 'Our JHS 3 students once again excelled in the Basic Education Certificate Examination, achieving an outstanding 100% pass rate.',
            content: `<p>Brightlingsea Academy is proud to announce that our 2024 BECE candidates achieved a <strong>100% pass rate</strong>, with results showing consistent improvement across all subjects.</p><p><strong>Key highlights:</strong></p><ul><li><strong>15 students</strong> achieved 1st Division (aggregate 6-12)</li><li><strong>20 students</strong> achieved 2nd Division (aggregate 13-20)</li><li><strong>18 students</strong> achieved 3rd Division (aggregate 21-27)</li><li><strong>Top performer:</strong> Aggregate 6 — one of the best in the district</li><li><strong>Mathematics:</strong> 95% scored A1-C6</li><li><strong>English Language:</strong> 92% scored A1-C6</li><li><strong>Integrated Science:</strong> 94% scored A1-C6</li></ul><p>The school's commitment to academic excellence continues to produce excellent results year after year. We congratulate all our candidates, teachers, and parents for this remarkable achievement.</p>`,
            date: '2024-08-20',
            author: 'Dr. Samuel Kofi Mensah',
            authorRole: 'Headmaster',
            image: null,
            featured: true,
            readTime: '3 min read'
        },
        {
            id: 2,
            category: 'events',
            title: 'Annual Speech and Prize-Giving Day 2024',
            excerpt: 'Our annual Speech and Prize-Giving Day was a grand celebration of academic excellence, talent, and community spirit.',
            content: `<p>The 2024 Speech and Prize-Giving Day was held on Saturday, 14th September 2024, at the school assembly hall. The event was attended by parents, guardians, staff, students, and dignitaries from the Ghana Education Service.</p><p><strong>Program highlights:</strong></p><ul><li>Opening prayer and national anthem</li><li>Welcome address by the Headmaster</li><li>Prize giving ceremony for academic and non-academic excellence</li><li>Cultural performance by the school choir</li><li>Keynote address by the Guest of Honor</li><li>Vote of thanks by the PTA Chairman</li></ul><p><strong>Prize winners included:</strong></p><ul><li>Overall Best Student: Akosua Mensah (Aggregate 6)</li><li>Best in Mathematics: Kwame Boateng</li><li>Best in English Language: Ama Serwaa</li><li>Best in Science: Adwoa Mensah</li><li>Best in Creative Arts: Kwesi Ofori</li><li>Best Sports Person: Samuel Badu</li></ul>`,
            date: '2024-09-14',
            author: 'Admin',
            authorRole: 'Communications',
            image: null,
            featured: true,
            readTime: '4 min read'
        },
        {
            id: 3,
            category: 'sports',
            title: 'District Sports Championship: champions again!',
            excerpt: 'Our athletics team defended their title at the 2024 District Sports Championship, winning 3 gold medals.',
            content: `<p>Brightlingsea Academy's athletes once again proved they are the best in the district at the inter-schools sports competition held at the Adanwomase Senior High School field.</p><p><strong>Results:</strong></p><ul><li><strong>Gold Medal:</strong> 200m Sprint — Samuel Badu (JHS 3)</li><li><strong>Gold Medal:</strong> 4x100m Relay Team</li><li><strong>Gold Medal:</strong> Long Jump — Ama Serwaa</li><li>Silver Medal: 100m Sprint — Kwame Boateng</li><li>Silver Medal: Shot Put — Adwoa Mensah</li><li>Bronze Medal: High Jump — Samuel Asante</li></ul><p>The team was trained by Mr. Samuel Badu, our Physical Education teacher and National Coach certified instructor.</p><p>This is our <strong>third consecutive year</strong> winning the District Sports Championship trophy.</p>`,
            date: '2024-04-15',
            author: 'Samuel Badu',
            authorRole: 'Physical Education Teacher',
            image: null,
            featured: false,
            readTime: '2 min read'
        },
        {
            id: 4,
            category: 'academics',
            title: 'Science Fair 2024: Students Shine with Innovative Projects',
            excerpt: 'Our annual science fair showcased incredible student projects, with the winning entry earning a scholarship.',
            content: `<p>The 2024 Brightlingsea Academy Science Fair was held on Thursday, 26th September 2024, in the school's science laboratory. Over 30 student projects were presented, covering topics from renewable energy to artificial intelligence.</p><p><strong>Winning projects:</strong></p><ul><li><strong>1st Place (Gold):</strong> "Smart Irrigation System using IoT" by Ama Serwaa Mensah and Kwame Boateng (JHS 3) — Won a scholarship to the National Science and Technology University</li><li><strong>2nd Place (Silver):</strong> "Solar-Powered Water Purifier" by Akosua Owusu and Adwoa Mensah (JHS 2)</li><li><strong>3rd Place (Bronze):</strong> "AI-Powered Traffic Control System" by Kwasi Owusu (JHS 3)</li></ul><p>The event was judged by a panel of scientists from the University of Ghana and Ghana Atomic Energy Commission.</p><p>Mrs. Adwoa Mensah, Head of Science Department, noted: "The quality of projects this year was exceptional. Our students are thinking about real-world problems and developing practical solutions."</p>`,
            date: '2024-09-26',
            author: 'Adwoa Mensah',
            authorRole: 'Head of Science',
            image: null,
            featured: false,
            readTime: '5 min read'
        },
        {
            id: 5,
            category: 'academics',
            title: 'New Coding Club Launches Successfully',
            excerpt: 'The ICT department has launched a new Coding Club, and students are already building amazing projects.',
            content: `<p>The Brightlingsea Academy Coding Club was launched in October 2024, led by Mr. Bernard Owusu, our ICT teacher. The club meets every Wednesday after school and currently has 25 active members from JHS 1 to JHS 3.</p><p><strong>What students are learning:</strong></p><ul><li>Python programming (beginner to advanced)</li><li>Web development (HTML, CSS, JavaScript)</li><li>App development basics</li><li>Game development with Scratch</li><li>Robotics and IoT basics</li></ul><p><strong>Club achievements so far:</strong></p><ul><li>Built 5 school websites for various clubs</li><li>Created 3 mobile apps for school events</li><li>Participated in the National Schools Coding Challenge 2024</li><li>Won 2nd place at the National Competition!</li></ul><p>The club plans to expand to 40 members by next term and is exploring partnerships with tech companies for mentorship.</p>`,
            date: '2024-10-15',
            author: 'Bernard Owusu',
            authorRole: 'ICT Teacher',
            image: null,
            featured: false,
            readTime: '3 min read'
        },
        {
            id: 6,
            category: 'notices',
            title: 'Important: 2024/2025 Academic Calendar Released',
            excerpt: 'The official academic calendar for the 2024/2025 school year is now available. Please review the term dates and important events.',
            content: `<p>The <strong>2024/2025 Academic Calendar</strong> has been released and is now available for download from our Resources page.</p><p><strong>Key dates:</strong></p><ul><li><strong>First Term:</strong> September 9, 2024 — December 20, 2024</li><li><strong>Mid-Term Break:</strong> October 14-18, 2024</li><li><strong>Christmas Break:</strong> December 23, 2024 — January 5, 2025</li><li><strong>Second Term:</strong> January 6, 2025 — April 4, 2025</li><li><strong>Easter Break:</strong> April 7-18, 2025</li><li><strong>Third Term:</strong> April 21, 2025 — July 25, 2025</li><li><strong>Speech & Prize-Giving Day:</strong> Saturday, September 13, 2025</li></ul><p><strong>Important reminders:</strong></p><ul><li>Term 1 fees must be paid by September 20, 2024</li><li>PTA meeting: October 25, 2024</li><li>Parents' day: November 22, 2024</li><li>BECE registration deadline: March 31, 2025</li></ul>`,
            date: '2024-08-25',
            author: 'Admin',
            authorRole: 'Administration',
            image: null,
            featured: true,
            readTime: '2 min read',
            isNotice: true
        },
        {
            id: 7,
            category: 'academics',
            title: 'French Exchange Program Returns',
            excerpt: 'Our French department has re-established exchange partnerships with schools in Senegal and Cote d\'Ivoire.',
            content: `<p>After a 3-year hiatus due to the pandemic, Brightlingsea Academy's French Exchange Program has officially resumed, with partnerships renewed with schools in Dakar, Senegal and Abidjan, Cote d'Ivoire.</p><p><strong>Program details:</strong></p><ul><li><strong>Participants:</strong> 15 JHS 3 students selected through application</li><li><strong>Duration:</strong> 2 weeks in February 2025</li><li><strong>Host schools:</strong> Lycee Blaise Senghor (Dakar) and Lycee Sainte-Marie (Abidjan)</li><li><strong>Activities:</strong> Classroom immersion, cultural visits, home stays, language workshops</li></ul><p>Mrs. Linda Asante, French teacher, says: "This exchange program is a life-changing experience for our students. They gain fluency, cultural understanding, and lifelong friendships."</p><p>The program fee is GHS 3,500 per student, with financial aid available for qualifying families.</p>`,
            date: '2024-10-01',
            author: 'Linda Asante',
            authorRole: 'French Teacher',
            image: null,
            featured: false,
            readTime: '3 min read'
        },
        {
            id: 8,
            category: 'sports',
            title: 'Inter-School Debate Championship: We Won!',
            excerpt: 'Our debate team won the regional finals, bringing home the trophy for the third consecutive year.',
            content: `<p>Brightlingsea Academy's debate team represented the school with distinction in the 2024 inter-schools debate competition.</p><p><strong>Team members:</strong></p><ul><li>Akosua Owusu — Prime Minister (1st speaker)</li><li>Abena Serwaa — Leader of Opposition</li><li>Kwasi Boateng — Deputy Prime Minister</li><li>Adwoa Mensah — Deputy Leader of Opposition</li></ul><p>The team defeated 12 other schools in the preliminary rounds and faced stiff competition in the finals. The topic was "This house believes that technology is doing more harm than good to African education."</p><p>Coach Akua Asante, Head of Social Studies, said: "The team showed incredible preparation, strategy, and confidence. This is our 3rd title in a row."</p><p>The team will now represent the region at the National Debates Championship in January 2025.</p>`,
            date: '2024-11-08',
            author: 'Akua Asante',
            authorRole: 'Head of Social Studies',
            image: null,
            featured: false,
            readTime: '3 min read'
        },
        {
            id: 9,
            category: 'notices',
            title: 'Anticipate Our Next Big Program',
            excerpt: 'The latest program has concluded. Viewers should anticipate exciting new programs and events coming soon to Brightlingsea Academy.',
            content: `<p>The latest program has officially come to a close, and we thank everyone who took part and supported it.</p><p>Viewers should anticipate exciting new programs, events, and announcements coming soon to Brightlingsea Academy. We are already working on our next initiative and will share full details right here.</p><p>To be the first to know, follow our page and check back regularly for updates.</p>`,
            date: '2026-10-19',
            author: 'Admin',
            authorRole: 'Communications',
            image: null,
            featured: true,
            readTime: '1 min read',
            isNotice: true
        }
    ]
};

/**
 * Get posts by category
 */
function getNewsByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return NEWS_DATA.posts;
    return NEWS_DATA.posts.filter(p => p.category === categoryId);
}

/**
 * Get featured posts
 */
function getFeaturedPosts() {
    return NEWS_DATA.posts.filter(p => p.featured);
}

/**
 * Search posts
 */
function searchNews(query) {
    if (!query || !query.trim()) return NEWS_DATA.posts;
    const q = query.toLowerCase().trim();
    return NEWS_DATA.posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
}
