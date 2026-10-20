/**
 * BRIGHTLINGSEA ACADEMY — BUILDING PROJECT DATA
 * School building projects showcase.
 *
 * Work is organised into GROUPS (phaseGroups). Each group holds its own
 * ordered list of phases, so the timeline reads as distinct workstreams
 * rather than one flat run of cards.
 */

const BUILDING_PROJECT_DATA = {
    mainProject: {
        name: "Phase 2 Expansion — New Classroom Wing",
        site: "Brightlingsea Academy, QCM3+262, Kumasi",
        started: "January 2026",
        target: "November 2026",
        description: "A two-storey classroom wing adding six new classrooms, a staff room, modern washrooms, rainwater harvesting and rooftop solar panels — built to welcome the growing 2026–27 intake.",
        phaseGroups: [
            {
                id: "wing",
                title: "Group 1 — Classroom Wing Expansion",
                subtitle: "Six new classrooms, a staff room and modern washrooms, inside the school grounds.",
                icon: "fas fa-school",
                phases: [
                    { id: "site-prep", title: "Site preparation & fencing", period: "Jan – Mar 2026", status: "done", note: "Site cleared, fenced and levelled." },
                    { id: "foundation", title: "Foundation & ground floor", period: "Mar – May 2026", status: "done", note: "Foundations cast, ground floor slab complete." },
                    { id: "structure", title: "First floor & roofing structure", period: "May – Aug 2026", status: "active", note: "Blockwork rising; roofing steel on order." },
                    { id: "finishing", title: "Roofing, wiring & interior finishing", period: "Aug – Oct 2026", status: "pending", note: "Starts once structure is signed off." },
                    { id: "handover", title: "Inspection & handover", period: "Nov 2026", status: "pending", note: "Final inspection before the new term." }
                ]
            },
            {
                id: "bridge",
                title: "Group 2 — The Community Bridge",
                subtitle: "A footbridge built for the neighbourhood — the school’s contribution to the community that supports it.",
                icon: "fas fa-bridge",
                phases: [
                    { id: "bridge-survey", title: "Community consultation & site survey", period: "Jan 2026", status: "done", note: "Elders, parents and the assembly agreed the crossing point and alignment." },
                    { id: "bridge-abutments", title: "Abutments & foundation piers", period: "Feb – Mar 2026", status: "done", note: "Piers founded on both banks and cured for strength." },
                    { id: "bridge-deck", title: "Deck construction & handrails", period: "Apr – Aug 2026", status: "active", note: "Deck slabs being placed; handrail steel ordered from a local fabricator." },
                    { id: "bridge-approach", title: "Approach ramps & lighting", period: "Aug – Sep 2026", status: "pending", note: "Ramps, steps and solar lighting so the crossing is safe after dark." },
                    { id: "bridge-handover", title: "Community handover", period: "Oct 2026", status: "pending", note: "Handed to the community with a written maintenance arrangement." }
                ]
            }
        ],
        features: [
            "6 new classrooms (30 pupils each)",
            "Staff room with offices",
            "Modern boys’ & girls’ washrooms",
            "Rainwater harvesting tanks",
            "Rooftop solar panels",
            "Wheelchair-accessible ramps"
        ]
    },
    otherProjects: [
        {
            name: "Library restock drive",
            status: "active",
            icon: "fas fa-book",
            description: "Target: 1,000 new BECE revision guides and storybooks by December 2026."
        },
        {
            name: "Sports court resurfacing",
            status: "planned",
            icon: "fas fa-basketball-ball",
            description: "New all-weather surface for the multi-purpose court, scheduled for the long vacation."
        },
        {
            name: "School garden expansion",
            status: "done",
            icon: "fas fa-seedling",
            description: "Two new vegetable beds completed by the Nature Club in June 2026."
        }
    ]
};
