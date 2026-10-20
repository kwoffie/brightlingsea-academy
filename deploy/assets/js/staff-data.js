/**
 * BRIGHTLINGSEA ACADEMY — STAFF DIRECTORY DATA
 * Staff members are categorized by role with department assignments.
 */

const STAFF_DATA = {
  headOfSchool: {
    id: 1,
    name: "Dr. Samuel Kofi Mensah",
    title: "Headmaster",
    department: "Leadership",
    qualification: "PhD Education (University of Ghana), M.Ed (KNUST)",
    yearsAtSchool: 7,
    yearsExperience: 22,
    bio: "Dr. Mensah has been leading Brightlingsea Academy since 2018 with a vision of holistic education that combines academic excellence with character development. Under his leadership, the school achieved a 98% pass rate in the 2024 BECE, with 12 students placing in the top 1% nationally.",
    quote: "Education is not the filling of a vessel, but the kindling of a flame.",
    email: "headmaster@brightlingseaacademy.edu.gh",
    phone: "+233 20 123 4567",
    photo: null,
    isAdmin: true
  },

  departmentHeads: [
    {
      id: 2,
      name: "Mrs. Akosua Serwaa Osei",
      title: "Deputy Head (Academics)",
      department: "Leadership",
      subject: "Curriculum & Mathematics",
      qualification: "M.Ed (University of Cape Coast), B.Ed (UG)",
      yearsAtSchool: 8,
      bio: "Mrs. Osei oversees all academic programs and student performance tracking. She specializes in Mathematics and curriculum development, having introduced the school's current assessment framework.",
      email: "deputy.academics@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4567",
      photo: null
    },
    {
      id: 3,
      name: "Mr. Kwame Asante",
      title: "Deputy Head (Administration)",
      department: "Leadership",
      subject: "Operations & Student Welfare",
      qualification: "LLB (University of London), MBA (KNUST Business School)",
      yearsAtSchool: 6,
      bio: "Mr. Asante manages school operations, discipline, and student welfare. He coordinates all extracurricular programs and inter-school competitions.",
      email: "deputy.admin@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4567",
      photo: null
    }
  ],

  teachingStaff: [
    {
      id: 4,
      name: "Miss Abena Serwaa Owusu",
      title: "Head of English Department",
      department: "English Language",
      subject: "English Language & Literature",
      qualification: "MA English (UG), B.Ed (UCC)",
      yearsAtSchool: 5,
      bio: "Miss Owusu has transformed the English department with innovative teaching methods. Her students consistently score in the top 10% in BECE English.",
      email: "abena.owusu@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 5,
      name: "Mr. Kwame Boateng",
      title: "Head of Mathematics Department",
      department: "Mathematics",
      subject: "Core & Elective Mathematics",
      qualification: "BSc Mathematics (KNUST), PGCE (Cambridge)",
      yearsAtSchool: 9,
      bio: "Mr. Boateng has been teaching Mathematics for over 15 years. His results are consistently among the best in the region, with 95% of his students scoring A1-C5 in BECE.",
      email: "kwame.boateng@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 6,
      name: "Mrs. Adwoa Mensah",
      title: "Head of Science Department",
      department: "Science",
      subject: "Integrated Science & Chemistry",
      qualification: "MSc Chemistry (UG), BSc (KNUST)",
      yearsAtSchool: 7,
      bio: "Mrs. Mensah leads the Science department and coordinates the school's Science Club, which has won 3 consecutive inter-school science fairs.",
      email: "adwoa.mensah@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 7,
      name: "Mr. Emmanuel Agyei",
      title: "Senior Science Teacher",
      department: "Science",
      subject: "Physics & Further Mathematics",
      qualification: "BSc Physics (UG), PGCE (UCC)",
      yearsAtSchool: 4,
      bio: "Mr. Agyei brings real-world applications into the classroom. He leads the school's robotics club and has won multiple innovation competitions.",
      email: "emmanuel.agyei@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 8,
      name: "Miss Akua Asante",
      title: "Head of Social Studies & Ghanaian Languages",
      department: "Social Studies",
      subject: "Social Studies, Economics, Ghanaian Language",
      qualification: "BA Social Studies (UG), B.Ed (UCC)",
      yearsAtSchool: 6,
      bio: "Miss Asante teaches with a passion for current affairs and civic education. She organizes the school's debate club which consistently reaches regional finals.",
      email: "akua.asante@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 9,
      name: "Kwesi Ofori",
      title: "Creative Arts Teacher",
      department: "Creative Arts",
      subject: "Visual Arts & Creative Arts",
      qualification: "BA Fine Arts (GSA), Dip in Music (NMTC)",
      yearsAtSchool: 10,
      bio: "Mr. Ofori directs the school choir and art club. His students have won district-level art competitions for 3 consecutive years, and the choir has performed at the National Theatre.",
      email: "kwesi.ofori@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 10,
      name: "Mr. Bernard Owusu",
      title: "ICT Teacher",
      department: "Technology",
      subject: "Computing & ICT",
      qualification: "BSc Computer Science (KNUST), Cert in Digital Education",
      yearsAtSchool: 3,
      bio: "Mr. Owusu introduced computer programming to the curriculum and leads the school's coding club. His students won 2nd place in the 2024 National Schools Coding Challenge.",
      email: "bernard.owusu@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 11,
      name: "Mrs. Linda Asante",
      title: "French Teacher",
      department: "Languages",
      subject: "French Language",
      qualification: "Dip French Language (Alliance Française), DELF B2",
      yearsAtSchool: 5,
      bio: "Mrs. Asante teaches French with cultural immersion methods. She organizes annual exchanges with partner schools in Senegal and Cote d'Ivoire.",
      email: "linda.asante@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 12,
      name: "Mrs. Patricia Agyeman",
      title: "Guidance & Counselling Teacher",
      department: "Student Support",
      subject: "Career Guidance & Counselling",
      qualification: "MA Counselling Psychology (UG), Cert in Career Guidance",
      yearsAtSchool: 8,
      bio: 'Mrs. Agyeman provides academic and career counselling to students and coordinates the school\'s peer mentoring program. She also leads parent-teacher conferences.',
      email: "patricia.agyeman@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 13,
      name: "Mr. Samuel Badu",
      title: "Physical Education Teacher",
      department: "Physical Education",
      subject: "PE & Games",
      qualification: "BSc Sports Science (UG), National Coach Cert",
      yearsAtSchool: 6,
      bio: "Mr. Badu trains the school's athletics and football teams. Under his guidance, the school won the District Sports Championship in 2023 and 2024.",
      email: "samuel.badu@brightlingseaacademy.edu.gh",
      photo: null
    },
    {
      id: 14,
      name: "Mrs. Gifty Owens",
      title: "Class Teacher (P6 Gold)",
      department: "Teaching",
      subject: "Classroom Teaching & Pastoral Care",
      qualification: "B.Ed (UCC), PGCE (Cambridge)",
      yearsAtSchool: 4,
      bio: "Mrs. Owens teaches P6 Gold and mentors new teachers. Her class achieved a 100% pass rate in the 2024 internal assessments.",
      email: "gifty.owens@brightlingseaacademy.edu.gh",
      photo: null
    }
  ],

  adminStaff: [
    {
      id: 15,
      name: "Mrs. Janet Adomako",
      title: "Admissions Officer",
      department: "Administration",
      qualification: "BA Administration (UG), Dip in Marketing",
      yearsAtSchool: 5,
      bio: "Mrs. Adomako manages all admissions processes, parent inquiries, and enrollment. She is the first point of contact for prospective families.",
      email: "admissions@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4567",
      photo: null
    },
    {
      id: 16,
      name: "Mr. Kwesi Peprah",
      title: "Accounts Officer",
      department: "Finance",
      qualification: "BCom Accounting (KNUST), ACCA Part III",
      yearsAtSchool: 3,
      bio: "Mr. Peprah manages school finances, fee collection, and financial reporting. He ensures transparent and efficient financial operations.",
      email: "accounts@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4568",
      photo: null
    },
    {
      id: 17,
      name: "Mrs. Sarah Osei",
      title: "Administrative Assistant",
      department: "Administration",
      qualification: "HND Secretarial Studies (KNIT)",
      yearsAtSchool: 7,
      bio: "Mrs. Osei handles correspondence, record-keeping, and supports all departments with administrative tasks. She is known for her warm and helpful demeanor.",
      email: "info@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4569",
      photo: null
    }
  ],

  supportStaff: [
    {
      id: 18,
      name: "Mr. Isaac Ofori",
      title: "Matron",
      department: "Student Welfare",
      qualification: "Cert in Childcare Management",
      yearsAtSchool: 10,
      bio: "Mr. Ofori oversees student welfare, uniform distribution, and maintains discipline. He is a father-figure to many students and ensures their well-being.",
      email: "matron@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4570",
      photo: null
    },
    {
      id: 19,
      name: "Mrs. Salomey Badu",
      title: "School Cook & Nutritionist",
      department: "Meals & Nutrition",
      qualification: "Cert in Food Preparation & Nutrition",
      yearsAtSchool: 8,
      bio: "Mrs. Badu prepares nutritious meals for over 500 students daily. She follows strict hygiene protocols and accommodates dietary restrictions.",
      email: "kitchen@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4571",
      photo: null
    },
    {
      id: 20,
      name: "Mr. Kwame Agyenim",
      title: "Security Officer",
      department: "Security",
      qualification: "Cert in Security Management (Ghana Police Service)",
      yearsAtSchool: 6,
      bio: "Mr. Agyenim ensures the safety and security of the school campus 24/7. He coordinates with local authorities and maintains emergency protocols.",
      email: "security@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4572",
      photo: null
    },
    {
      id: 21,
      name: "Mr. Prince Ansah",
      title: "Grounds & Maintenance Supervisor",
      department: "Facilities",
      qualification: "ND Building Technology (KNUST)",
      yearsAtSchool: 5,
      bio: "Mr. Ansah leads the maintenance team responsible for the school's buildings, grounds, and infrastructure. He ensures all facilities are safe and well-maintained.",
      email: "maintenance@brightlingseaacademy.edu.gh",
      phone: "+233 20 123 4573",
      photo: null
    }
  ],

  departments: [
    "Leadership",
    "English Language",
    "Mathematics",
    "Science",
    "Social Studies",
    "Creative Arts",
    "Technology",
    "Languages",
    "Student Support",
    "Physical Education",
    "Teaching",
    "Administration",
    "Finance",
    "Student Welfare",
    "Meals & Nutrition",
    "Security",
    "Facilities"
  ],

  departmentColors: {
    "Leadership": "blue",
    "English Language": "orange",
    "Mathematics": "yellow",
    "Science": "green",
    "Social Studies": "purple",
    "Creative Arts": "pink",
    "Technology": "teal",
    "Languages": "indigo",
    "Student Support": "red",
    "Physical Education": "lime",
    "Teaching": "blue",
    "Administration": "orange",
    "Finance": "emerald",
    "Student Welfare": "amber",
    "Meals & Nutrition": "rose",
    "Security": "gray",
    "Facilities": "slate"
  }
};

/**
 * Get initials from a full name for avatar display
 */
function getInitials(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

/**
 * Generate avatar HTML - fallback when no photo is provided
 */
function generateAvatarHTML(name, size = 'md') {
  const initials = getInitials(name);
  const sizeClass = size === 'lg' ? 'staff-avatar-lg' : size === 'sm' ? 'staff-avatar-sm' : 'staff-avatar-md';
  return `<div class="${sizeClass} staff-avatar-fallback">${initials}</div>`;
}

/**
 * Get all staff as a flat list with role metadata
 */
function getAllStaff() {
  const allStaff = [];
  
  if (STAFF_DATA.headOfSchool) {
    allStaff.push({ ...STAFF_DATA.headOfSchool, role: 'Head of School', roleOrder: 1 });
  }
  
  STAFF_DATA.departmentHeads.forEach(staff => {
    allStaff.push({ ...staff, role: 'Department Head', roleOrder: 2 });
  });
  
  STAFF_DATA.teachingStaff.forEach(staff => {
    allStaff.push({ ...staff, role: 'Teaching Staff', roleOrder: 3 });
  });
  
  STAFF_DATA.adminStaff.forEach(staff => {
    allStaff.push({ ...staff, role: 'Administrative Staff', roleOrder: 4 });
  });
  
  STAFF_DATA.supportStaff.forEach(staff => {
    allStaff.push({ ...staff, role: 'Support Staff', roleOrder: 5 });
  });
  
  return allStaff;
}

/**
 * Filter staff by department
 */
function getStaffByDepartment(department) {
  if (department === 'All' || !department) return getAllStaff();
  return getAllStaff().filter(staff => staff.department === department);
}

/**
 * Get staff by role category
 */
function getStaffByRole(role) {
  const all = getAllStaff();
  return all.filter(staff => staff.role === role);
}
