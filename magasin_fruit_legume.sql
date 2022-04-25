-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 09 mars 2022 à 15:52
-- Version du serveur :  5.7.34
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `magasin_fruit_legume`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `cp` int(11) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `ville` varchar(30) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `Statut` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`client_id`, `nom`, `prenom`, `cp`, `adresse`, `ville`, `mail`, `telephone`, `Statut`) VALUES
(1, 'Ali', 'Salah', 13000, '5 rue de l\'Esplanade', 'Marseille', 'alisalah@outlook.fr', '0638293940', 'Particulier'),
(2, 'Jeanne', 'Céline', 59000, '18 rue de l\'oasis', 'Lille', 'jeanneceline59@gmail.com', '0738492648', 'Restauration'),
(3, 'Michel', 'Laurent', 77000, '4 rue Sausure', 'Paris', 'micheldelore@outlook.fr', '0636472984', 'Particulier');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `commande_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `fournisseur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`commande_id`, `date`, `utilisateur_id`, `fournisseur_id`) VALUES
(1, '2022-03-17', 1, 1),
(2, '2022-03-31', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

CREATE TABLE `commande_produit` (
  `produit_id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `quantitekg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`produit_id`, `commande_id`, `quantitekg`) VALUES
(1, 1, 20),
(2, 1, 20),
(3, 2, 40);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `fournisseur_id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `cp` varchar(7) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`fournisseur_id`, `nom`, `telephone`, `mail`, `cp`, `adresse`, `ville`) VALUES
(1, 'Legume du Nord', '0673829374', 'legumedunord@outlook.fr', '59000', '2 allée des Blanchemanches', 'Lille'),
(2, 'Metro', '0619228352', 'metro@outlook.fr', '77000', '2 boulevard de Larue', 'Paris'),
(3, 'Bio Renaissance', '0629304715', 'biorenaissance@outlook.fr', '13004', '4 rue Lacroix', 'Marseille');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `produit_id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `type` varchar(20) NOT NULL,
  `quantitekg` float NOT NULL,
  `pachatkg` float NOT NULL,
  `pventekg` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`produit_id`, `nom`, `type`, `quantitekg`, `pachatkg`, `pventekg`) VALUES
(1, 'Pomme de terre', 'Légume', 100, 1.71, 1.9),
(2, 'Tomate', 'Fruit', 100, 1.29, 1.4),
(3, 'Carotte', 'Légume', 32, 1.72, 1.92);

-- --------------------------------------------------------

--
-- Structure de la table `produit_vente`
--

CREATE TABLE `produit_vente` (
  `produit_id` int(11) NOT NULL,
  `vente_id` int(11) NOT NULL,
  `quantitekg` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit_vente`
--

INSERT INTO `produit_vente` (`produit_id`, `vente_id`, `quantitekg`) VALUES
(1, 1, 5),
(2, 3, 10),
(3, 3, 10),
(1, 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `nom` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`role_id`, `nom`) VALUES
(1, 'Manager'),
(2, 'Vendeur');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `utilisateur_id` int(11) NOT NULL,
  `login` varchar(30) NOT NULL,
  `mdp` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `telephone` varchar(10) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateur_id`, `login`, `mdp`, `nom`, `prenom`, `telephone`, `role_id`) VALUES
(1, 'SaliElenaBioMarket', 'salielena2202.', 'Elena', 'Sali', '0654873579', 1),
(2, 'JeanNicheBioMarket', 'jeanniche8710?', 'Niche', 'Jean', '0637985421', 2),
(3, 'MichelleBaskierBioMarket', 'michellebaskier2751@', 'Baskier', 'Michelle', '0624938265', 2),
(4, 'StevenDetouBioMarket', 'stevendetou0238*', 'Detou', 'Steven', '0628394037', 1);

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `vente_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `statut` varchar(20) NOT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `vente`
--

INSERT INTO `vente` (`vente_id`, `date`, `statut`, `utilisateur_id`, `client_id`) VALUES
(1, '2022-04-02', 'Payée', 2, 1),
(2, '2022-04-13', 'Payée', 3, 3),
(3, '2022-04-30', 'Non payée', 2, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`commande_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `fournisseur_id` (`fournisseur_id`);

--
-- Index pour la table `commande_produit`
--
ALTER TABLE `commande_produit`
  ADD KEY `produit_id` (`produit_id`),
  ADD KEY `commande_id` (`commande_id`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`fournisseur_id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`produit_id`);

--
-- Index pour la table `produit_vente`
--
ALTER TABLE `produit_vente`
  ADD KEY `produit_id` (`produit_id`),
  ADD KEY `vente_id` (`vente_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`utilisateur_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`vente_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `utilisateur_id_2` (`utilisateur_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `commande_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `fournisseur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `produit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `utilisateur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `vente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseur` (`fournisseur_id`);

--
-- Contraintes pour la table `commande_produit`
--
ALTER TABLE `commande_produit`
  ADD CONSTRAINT `commande_produit_ibfk_1` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`commande_id`),
  ADD CONSTRAINT `commande_produit_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`produit_id`);

--
-- Contraintes pour la table `produit_vente`
--
ALTER TABLE `produit_vente`
  ADD CONSTRAINT `produit_vente_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`produit_id`),
  ADD CONSTRAINT `produit_vente_ibfk_2` FOREIGN KEY (`vente_id`) REFERENCES `vente` (`vente_id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

--
-- Contraintes pour la table `vente`
--
ALTER TABLE `vente`
  ADD CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `vente_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
