let trackData = [
    {
        "name": "Cloud Infrastructure Progress ",
        "quests": [
            { name: 'Google Cloud Essentials', id: 23 },
            { name: ' Baseline: Infrastructure', id: 33 },
            { name: 'Networking in the Google Cloud', id: 31 },
            { name: 'Kubernetes in Google Cloud', id: 29 },
            { name: 'Cloud Engineering', id: 66 },
            { name: 'DevOps Essentials', id: 96 },
            { name: 'Security & Identity Fundamentals', id: 40 },
            { name: 'Understanding Your Google Cloud Costs', id: 90 },
            {
                name: 'Google Cloud Solutions I: Scaling Your Infrastructure ',
                id: 36
            },
            { name: 'Cloud Architecture', id: 24 }
        ],
        "skills": [
            { name: 'Create and Manage Cloud Resources', id: 120 },
            {
                name: 'Perform Foundational Infrastructure Tasks in Google Cloud',
                id: 118
            },
            { name: 'Build and Secure Networks in Google Cloud', id: 128 },
            { name: 'Deploy to Kubernetes in Google Cloud ', id: 116 },
            {
                name: 'Setup and Configure a Cloud Environment in Google Cloud',
                id: 119
            },
            { name: 'Implement DevOps in Google Cloud', id: 141 },
            { name: 'Ensure Access & Identity in Google Cloud', id: 150 },
            { name: 'Cloud Architecture: Design, Implement, and Manage ', id: 124 }
        ]
    },
    {
        "name": "Cloud-native Application Dev Progress",
        "quests": [
            { name: 'Google Developer Essentials', id: 86 },
            {
                name: 'OK Google: Build Interactive Apps with Google Assistant',
                id: 61
            },
            { name: 'Machine Learning APIs ', id: 32 },
            { name: 'Cloud Development ', id: 67 },
            { name: 'Cloud Logging ', id: 81 },
            { name: 'Website on Google Cloud', id: 125 },
            { name: 'Baseline: Deploy & Develop', id: 37 },
            { name: 'Exploring APIs', id: 54 },
            { name: 'IoT in the Google Cloud', id: 49 },
            { name: 'Workspace: Integrations', id: 51 }
        ],
        "skills": [
            { name: 'Build Interactive Apps with Google Assistant', id: 122 },
            { name: 'Integrate with Machine Learning APIs ', id: 136 },
            { name: 'Build a Website on Google Cloud', id: 115 }
        ]
    },
    {
        "name": " Big Data & ML Progress",
        "quests": [
            { name: 'Baseline: Data, ML, AI', id: 34 },
            { name: 'BigQuery Basics for Data Analysts ', id: 69 },
            { name: 'BigQuery for Machine Learning ', id: 71 },
            {
                name: 'NCAA® March Madness®: Bracketology with Google Cloud ',
                id: 58
            },
            { name: ' Applied Data: Blockchain', id: 101 },
            { name: 'Data Engineering', id: 25 },
            { name: 'Cloud SQL', id: 52 },
            { name: 'BigQuery for Data Warehousing', id: 68 },
            { name: 'Scientific Data Processing ', id: 28 },
            { name: 'Intro to ML: Language Processing', id: 82 }
        ],
        "skills": [
            {
                name: 'Perform Foundational Data, ML, and AI Tasks in Google Cloud',
                id: 117
            },
            { name: 'Insights from Data with BigQuery ', id: 123 },
            { name: 'Create ML Models with BigQuery ML ', id: 146 },
            { name: 'Engineer Data in Google Cloud ', id: 132 }
        ]
    }
]
let allQuests = [...trackData[0]["quests"], ...trackData[1]["quests"], ...trackData[2]["quests"]]

let allSkills = [...trackData[0]["skills"], ...trackData[1]["skills"], ...trackData[2]["skills"]]

module.exports = { trackData, allQuests, allSkills }
