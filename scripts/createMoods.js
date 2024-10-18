import axios from 'axios';

// Credentials for the new user
const newUserCredentials = {
  email: "tom10@tom.tom",
  password: "Moodlyreact1",
  userId: 13
};

// URLs for the API
const API_URL = 'http://10.38.165.227:1337/api/moods';
const LOGIN_URL = 'http://10.38.165.227:1337/api/auth/local';

// Token for authentication
let STRAPI_TOKEN = '';

// New moods to be created for tom3@tom.tom
const newMoods = [
    'Neutre', 'Triste', 'Heureux', 'En colère', 'Neutre',
    'Très heureux', 'Triste', 'Heureux', 'Très heureux', 'Neutre',
    'En colère', 'Heureux', 'Neutre', 'Très heureux', 'Triste',
    'En colère', 'Heureux', 'Très heureux', 'En colère', 'Neutre',
    'Triste', 'Très heureux', 'En colère', 'Heureux', 'Très heureux',
    'En colère', 'Triste', 'Neutre', 'Heureux', 'En colère'
];

// Manually added dates from September 19, 2024, to October 18, 2024
const manualDates = [
  '2024-09-19', '2024-09-20', '2024-09-21', '2024-09-22', '2024-09-23',
  '2024-09-24', '2024-09-25', '2024-09-26', '2024-09-27', '2024-09-28',
  '2024-09-29', '2024-09-30', '2024-10-01', '2024-10-02', '2024-10-03',
  '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07', '2024-10-08',
  '2024-10-09', '2024-10-10', '2024-10-11', '2024-10-12', '2024-10-13',
  '2024-10-14', '2024-10-15', '2024-10-16', '2024-10-17', '2024-10-18'
];

// Function to log in and retrieve JWT token
const loginAndGetToken = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, {
      identifier: email,
      password: password,
    });
    STRAPI_TOKEN = response.data.jwt;
    console.log("Utilisateur connecté, Token reçu : ", STRAPI_TOKEN);
  } catch (error) {
    console.error("Erreur lors de la connexion", error.response ? error.response.data : error.message);
  }
};

// Function to create a mood for the new user
const createMood = async (userId, moodValue, moodDate) => {
  try {
    const response = await axios.post(API_URL, {
      data: {
        Humeur: moodValue, // Mood text value
        Date: moodDate,  // Date from the manual dates
        users_permissions_user: userId // Assign to the new user
      },
    }, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
    });
    console.log(`Mood créé pour user ID ${userId} : ${moodValue} à la date ${moodDate}`);
  } catch (error) {
    console.error('Erreur lors de la création du mood', error.response ? error.response.data : error.message);
  }
};

// Main function to execute the mood creation process
const createMoodsForNewUser = async () => {
  // Log in with tom3@tom.tom to create the new moods
  await loginAndGetToken(newUserCredentials.email, newUserCredentials.password);

  // Create moods for tom3@tom.tom using the manual dates and new mood values
  for (let i = 0; i < newMoods.length; i++) {
    await createMood(newUserCredentials.userId, newMoods[i], manualDates[i]);
  }
};

// Execute the process
createMoodsForNewUser();
