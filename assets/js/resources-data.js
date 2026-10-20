/**
 * BRIGHTLINGSEA ACADEMY — RESOURCES DATA
 * Downloadable resources for parents
 */

const RESOURCES_DATA = {
    categories: [
        { id: 'all', name: 'All Resources', icon: 'fas fa-folder-open' },
        { id: 'academic', name: 'Academic', icon: 'fas fa-book' },
        { id: 'admissions', name: 'Admissions', icon: 'fas fa-user-graduate' },
        { id: 'exam', name: 'EXamination', icon: 'fas fa-chart-bar' },
        { id: 'handbook', name: 'Handbooks', icon: 'fas fa-file-alt' }
    ],

    resources: [
        // Academic
        { id: 1, category: 'academic', title: 'Academic Calendar 2024/2025', description: 'Complete academic calendar with all term dates, holidays, exam periods, and important school events for the 2024/2025 academic year.', file: 'assets/files/academic-calendar-2024-2025.pdf', fileSize: '2.4 MB', pages: 3, downloads: 342, featured: true },
        { id: 2, category: 'academic', title: 'Curriculum Overview 2024/2025', description: 'Overview of the subjects, topics, and learning objectives for each class level for the current academic year.', file: 'assets/files/curriculum-overview-2024-2025.pdf', fileSize: '1.8 MB', pages: 24, downloads: 215, featured: true },
        { id: 3, category: 'academic', title: 'Study Tips Guide for JHS Students', description: 'Practical study tips and techniques to help JHS students improve their learning, prepare for exams, and achieve better results.', file: 'assets/files/study-tips-jhs.pdf', fileSize: '890 KB', pages: 12, downloads: 187, featured: false },

        // Admissions
        { id: 4, category: 'admissions', title: 'Admissions Brochure 2024/2025', description: 'Complete admissions brochure with school history, programs, facilities, fees structure, and step-by-step application process.', file: 'assets/files/admissions-brochure-2024-2025.pdf', fileSize: '3.2 MB', pages: 18, downloads: 456, featured: true },
        { id: 5, category: 'admissions', title: 'Admission Application Form', description: 'The official application form for admission to Brightlingsea Academy. Download, complete, and submit with required documents.', file: 'assets/files/admission-application-form.pdf', fileSize: '560 KB', pages: 4, downloads: 623, featured: true },
        { id: 6, category: 'admissions', title: 'Fee Structure 2024/2025', description: 'Detailed fee structure for all levels including termly fees, optional fees, transport, meals, and payment plan information.', file: 'assets/files/fee-structure-2024-2025.pdf', fileSize: '1.2 MB', pages: 6, downloads: 389, featured: true },
        { id: 7, category: 'admissions', title: 'Admissions Checklist', description: 'A handy checklist of all documents and steps required for the admissions process. Print and use when preparing your application.', file: 'assets/files/admissions-checklist.pdf', fileSize: '280 KB', pages: 1, downloads: 567, featured: false },

        // Examination
        { id: 8, category: 'exam', title: 'BECE Preparation Guide', description: 'Comprehensive guide to help students prepare effectively for the Basic Education Certificate Examination, including study plans, subject tips, and exam techniques.', file: 'assets/files/becs-preparation-guide.pdf', fileSize: '1.5 MB', pages: 16, downloads: 278, featured: true },
        { id: 9, category: 'exam', title: 'How to Check Your Results Guide', description: 'Step-by-step guide to using our online Grade Checker to view your child\'s results, including how to find index numbers and use PINs.', file: 'assets/files/how-to-check-results.pdf', fileSize: '650 KB', pages: 8, downloads: 423, featured: false },
        { id: 10, category: 'exam', title: 'Results Day Guide for Parents', description: 'What to expect on results day, how to interpret grades, questions to ask teachers, and next steps for your child.', file: 'assets/files/results-day-guide.pdf', fileSize: '780 KB', pages: 6, downloads: 198, featured: false },

        // Handbooks
        { id: 11, category: 'handbook', title: 'Student Handbook 2024/2025', description: 'The complete student handbook covering school rules, uniform policy, daily schedule, behavior expectations, and student responsibilities.', file: 'assets/files/student-handbook-2024-2025.pdf', fileSize: '2.1 MB', pages: 32, downloads: 412, featured: true },
        { id: 12, category: 'handbook', title: 'Parent Handbook 2024/2025', description: 'Information for parents about school policies, communication, parent responsibilities, parent-teacher meetings, and how to support your child\'s learning.', file: 'assets/files/parent-handbook-2024-2025.pdf', fileSize: '1.7 MB', pages: 20, downloads: 298, featured: true },
        { id: 13, category: 'handbook', title: 'School Prospectus', description: 'The official school prospectus with information about our history, mission, vision, facilities, programs, staff, and achievements.', file: 'assets/files/school-prospectus.pdf', fileSize: '4.1 MB', pages: 28, downloads: 534, featured: true },

        // Extra
        { id: 14, category: 'academic', title: 'Homework Policy', description: 'Our school\'s policy on homework including guidelines by class level, parent responsibilities, and how homework supports learning.', file: 'assets/files/homework-policy.pdf', fileSize: '420 KB', pages: 4, downloads: 176, featured: false },
        { id: 15, category: 'handbook', title: 'Anti-Bullying Policy', description: 'Our zero-tolerance policy on bullying, including what constitutes bullying, reporting procedures, and our commitment to a safe learning environment.', file: 'assets/files/anti-bullying-policy.pdf', fileSize: '520 KB', pages: 5, downloads: 143, featured: false }
    ],

    categoryIcons: {
        academic: 'fas fa-book',
        admissions: 'fas fa-user-graduate',
        exam: 'fas fa-chart-bar',
        handbook: 'fas fa-file-alt'
    }
};

/**
 * Get resources by category
 */
function getResourcesByCategory(categoryId) {
    if (!categoryId || categoryId === 'all') return RESOURCES_DATA.resources;
    return RESOURCES_DATA.resources.filter(r => r.category === categoryId);
}

/**
 * Search resources
 */
function searchResources(query) {
    if (!query || !query.trim()) return RESOURCES_DATA.resources;
    const q = query.toLowerCase().trim();
    return RESOURCES_DATA.resources.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
}
