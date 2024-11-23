-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 23 nov. 2024 à 11:44
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `todolist`
--

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `created_at`, `updated_at`, `completed`) VALUES
(2, 'Rédiger le rapport', 'Compléter le rapport final pour le projet', '2024-11-15 16:16:44', '2024-11-22 15:25:07', 0),
(3, 'Réviser les cours', 'Étudier le chapitre 4 des algorithmes', '2024-11-15 16:16:44', '2024-11-15 23:42:52', 0),
(56, 'Installer un IDE', 'Télécharger et installer Visual Studio Code sur l’ordinateur.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(57, 'Créer un dépôt Git', 'Initialiser un dépôt Git local pour le projet.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(58, 'Apprendre les commandes Git', 'Prendre des notes sur les commandes Git de base comme clone, commit et push.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(60, 'Créer une page HTML', 'Écrire une page d’accueil simple avec un titre et un paragraphe.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(61, 'Ajouter un style CSS', 'Mettre à jour la page HTML avec des couleurs et des marges.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(62, 'Télécharger un framework', 'Installer Bootstrap via un CDN pour styliser le projet.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(63, 'Créer un script JavaScript', 'Ajouter un bouton avec un message d’alerte lors du clic.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(64, 'Organiser les fichiers du projet', 'Créer des dossiers pour le HTML, CSS et JavaScript.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0),
(65, 'Écrire un plan du projet', 'Lister les fonctionnalités de base et leur ordre de réalisation.', '2024-11-23 10:37:09', '2024-11-23 10:37:09', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
