/**
 * BRIGHTLINGSEA ACADEMY — TESTIMONIALS DATA
 * Student success stories and parent feedback
 */

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "Akosua Mensah",
        category: "BECE Excellence",
        year: "2024 BECE Graduate",
        current: "Presbyterian Girls' Secondary School (PGSS)",
        image: null,
        quote: "Brightlingsea Academy prepared me so well for the BECE. The teachers never gave up on me, especially in Mathematics and Science. I scored A1 in both subjects and I'm now in the Science class at PGSS. Thank you for believing in me!",
        achievement: "Scored aggregate 8 (BECE 2024) — Top 2% nationally"
    },
    {
        id: 2,
        name: "Kwame Asante",
        category: "Student Success",
        year: "2023 BECE Graduate",
        current: "Senior High School",
        image: null,
        quote: "The creative arts program at Brightlingsea trained me to be confident and express myself. At the National Arts competition, I represented our school and won the regional prize. The teachers here don't just teach — they inspire.",
        achievement: "Regional Best Artist Award 2023, now studying Arts at senior high school"
    },
    {
        id: 3,
        name: "Mrs. Janet Adomako",
        category: "Parent Feedback",
        year: "Parent of JHS 3 student",
        current: "Proud parent",
        image: null,
        quote: "As a parent, I've seen my child grow from a shy Nursery toddler to a confident JHS 3 student ready for secondary school. The staff genuinely care about every child. The regular parent-teacher meetings and the online grade checker give me peace of mind. I wouldn't trust any other school with my children.",
        achievement: "Two children graduated from Brightlingsea, both with distinction"
    },
    {
        id: 4,
        name: "Samuel Boateng",
        category: "Academic Achievement",
        year: "2024 BECE Graduate",
        current: "St. Augustine's College",
        image: null,
        quote: "The ICT and coding club opened my eyes to technology. I learned Python, built my first website, and even won 2nd place in the National Schools Coding Challenge. Now I'm studying Computer Science at St. Augustine's. The foundation Brightlingsea gave me was invaluable.",
        achievement: "2nd place, National Schools Coding Challenge 2024"
    },
    {
        id: 5,
        name: "Abena Owusu",
        category: "Sports Achievement",
        year: "2024 BECE Graduate",
        current: "Women's Army Senior High School",
        image: null,
        quote: "I joined the athletics team in JHS 1 and by JHS 3 I was captain. Our team won District Sports Championship twice under Mr. Badu's coaching. The discipline and teamwork I learned on the track have helped me in the classroom too. I scored 13 in BECE and I'm now pursuing sports and academics at WASS.",
        achievement: "Gold medal in 200m — District Sports Championship 2023 & 2024"
    },
    {
        id: 6,
        name: "Mr. Kwesi Ofori",
        category: "Teacher Perspective",
        year: "Creative Arts Teacher (10 years)",
        current: "Brightlingsea Academy Staff",
        image: null,
        quote: "Teaching at Brightlingsea is a calling, not just a job. Every year I see students discover talents they didn't know they had — whether in art, music, or drama. Our annual cultural festival showcases what our students can achieve when given the freedom to be creative. I'm proud to be part of this school.",
        achievement: "School choir performed at the National Theatre for 3 consecutive years"
    }
];

/**
 * Get testimonials by category
 */
function getTestimonials(category) {
    if (!category || category === 'all') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter(t => t.category === category);
}

/**
 * Get featured / random testimonials
 */
function getRandomTestimonials(count = 3) {
    const shuffled = [...TESTIMONIALS_DATA].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
