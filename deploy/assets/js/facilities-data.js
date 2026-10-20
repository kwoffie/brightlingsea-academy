/**
 * BRIGHTLINGSEA ACADEMY — FACILITIES DATA
 * Campus facilities plus the school animal spotlight.
 * Photo fields marked "TODO" are placeholders for real school photos.
 */

const FACILITIES_DATA = {
    schoolAnimal: {
        name: "Okute",
        species: "Monkey",
        breed: "Resident school animal",
        photo: "assets/images/gallery/campus/monkey.jpg",
        livesAt: "Around the school grounds and gardens",
        caretaker: "The school community",
        bio: "Okute the monkey is the resident school animal of Brightlingsea Academy. Curious and full of character, it is a familiar and much-loved part of daily life on our grounds.",
        funFacts: [
            "Okute is the only animal kept at the school.",
            "Pupils enjoy watching it move around the grounds and gardens.",
            "It is a favourite talking point during nature lessons."
        ]
    },
    stats: [
        { icon: "fas fa-door-open", value: "28", label: "Classrooms" },
        { icon: "fas fa-utensils", value: "2", label: "Meals served daily" },
        { icon: "fas fa-seedling", value: "1", label: "School garden" },
        { icon: "fas fa-users", value: "400+", label: "Pupils enrolled" }
    ],
    facilities: [
        {
            id: "computer-lab",
            name: "ICT / Computer Laboratory",
            icon: "fas fa-laptop-code",
            color: "#3498db",
            photo: "assets/images/gallery/campus/ict-lab.jpg",
            description: "Where pupils learn computing, coding and digital literacy — building the skills they need for the modern world.",
            specs: ["Desktop computers", "Pupil workstations", "Coding & digital literacy"]
        },
        {
            id: "cafeteria",
            name: "School Cafeteria",
            icon: "fas fa-utensils",
            color: "#27ae60",
            photo: "assets/images/gallery/campus/kids-eating.jpg",
            description: "Serving hot breakfast and lunch daily, prepared in the school kitchen under strict hygiene supervision.",
            specs: ["Breakfast & lunch", "200 seats", "Hygiene certified kitchen"],
            video: "assets/video/School-Feeding-Video.mp4",
            videoTitle: "Student Feeding Programme"
        },
        {
            id: "garden",
            name: "School Garden & Animal Corner",
            icon: "fas fa-seedling",
            color: "#2ecc71",
            photo: "assets/images/gallery/campus/agriculture.jpg",
            description: "Vegetable beds tended by pupils plus the animal corner where our resident monkey lives — the heart of our nature programme.",
            specs: ["Vegetable beds", "Animal corner", "Nature Club HQ"]
        }
    ]
};
