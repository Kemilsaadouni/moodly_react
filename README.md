# Moodly React

Moodly est une application de gestion de l'humeur pour les employés, permettant aux utilisateurs de partager leurs humeurs quotidiennes et aux managers de suivre les tendances de l'humeur au sein de l'équipe. Ce projet est construit avec Vite(React), utilise Capacitor pour l'intégration mobile et l'API de STRAPI pour gérer le back-end.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API](#api)
- [Contributions](#contributions)
- [Auteurs](#auteurs)
- [License](#license)

## Fonctionnalités

- Authentification des utilisateurs via Strapi.
- Partage de l'humeur quotidienne par les employés.
- Affichage de graphiques des tendances d'humeur pour les managers.
- Intégration de Capacitor pour une expérience mobile fluide.

## Technologies utilisées

- **React** - pour la construction de l'interface utilisateur.
- **Vite** - pour le bundling et le développement rapide.
- **Capacitor** - pour l'intégration mobile.
- **Axios** - pour les requêtes HTTP vers l'API.
- **Strapi** - comme backend pour la gestion des utilisateurs et des humeurs.

## Installation

### Pré-installation de Strapi

1. Créez un projet Strapi:
Vous trouvez toutes les informations d'installations et de lancement de votre projet [ici](https://docs.strapi.io/dev-docs/installation/cli)

2. Connectez vous sur Strapi avec vos identifiants

3. Définissez 2 rôle d'utilisateur:
- employee
- manager

4. Créé une collection la collection Mood:
- énumération des "Humeur" avec comme valeurs disponibles "Très heureux", "Heureux", "Neutre", "Triste", "En colère"
- la "Date" de publication du mood
- une relation "users_permissions_user" telle que "User has many Moods"

### Pour installer Moodly, suivez ces étapes :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/moodly_react.git
   cd moodly_react
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Build le projet :
   ```bash
   npm run build
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

5. Vérifiez que CapacitorJS est installé:
    ```bash
    npx cap --version
    ```

6. Si Capacitor n'est pas installé, vous pouvez l'installer en utilisant :
    ```bash
    npm install @capacitor/core @capacitor/cli
    ```

7. Ajoutez les platformes IOS et Android:
    ```bash
    npx cap add android
    npx cap add ios
    ```

8. Synchronisez les fichiers avec Capacitor :
    ```bash
    npx cap sync
    ```

9. Télécharger un émulateur :
Télécharger un émulateur tel que [Xcode](https://apps.apple.com/fr/app/xcode/id497799835?mt=12) pour mac et [Android Studio](https://developer.android.com/studio?hl=fr) pour windows

10. Ouvrez le projet dans Xcode par exemple:
    ```bash
    npx cap open ios
    ```

11. Exécutez l'application
Dans Xcode, sélectionnez votre appareil ou un simulateur et cliquez sur le bouton "Run" (ou "Exécuter"). Cela lancera votre application sur l'appareil ou le simulateur sélectionné.

## Utilisation

- Ouvrez l'application dans votre navigateur ou sur un appareil mobile.
- Connectez-vous avec vos identifiants créés sur Strapi.
- Sélectionnez votre humeur quotidienne pour les employés.
- Pour les managers, visualisez les graphiques des tendances d'humeur.
