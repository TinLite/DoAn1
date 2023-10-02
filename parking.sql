-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2023 at 04:26 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking`
--

-- --------------------------------------------------------

--
-- Table structure for table `bai`
--

CREATE TABLE `bai` (
  `Mabai` varchar(10) NOT NULL,
  `Tenbai` varchar(20) DEFAULT NULL,
  `Vitri` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gui`
--

CREATE TABLE `gui` (
  `Phieu` varchar(10) DEFAULT NULL,
  `Soxe` varchar(6) DEFAULT NULL,
  `Thoigianvao` timestamp NULL DEFAULT NULL,
  `Thoigianra` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `phieuxe`
--

CREATE TABLE `phieuxe` (
  `Phieu` varchar(10) NOT NULL,
  `Mabai` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `xe`
--

CREATE TABLE `xe` (
  `Soxe` varchar(6) NOT NULL,
  `Mauxe` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bai`
--
ALTER TABLE `bai`
  ADD PRIMARY KEY (`Mabai`);

--
-- Indexes for table `gui`
--
ALTER TABLE `gui`
  ADD KEY `FK_Xe` (`Soxe`),
  ADD KEY `FK_phieu` (`Phieu`);

--
-- Indexes for table `phieuxe`
--
ALTER TABLE `phieuxe`
  ADD PRIMARY KEY (`Phieu`),
  ADD KEY `FK_Bai` (`Mabai`);

--
-- Indexes for table `xe`
--
ALTER TABLE `xe`
  ADD PRIMARY KEY (`Soxe`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gui`
--
ALTER TABLE `gui`
  ADD CONSTRAINT `FK_Xe` FOREIGN KEY (`Soxe`) REFERENCES `xe` (`Soxe`),
  ADD CONSTRAINT `FK_phieu` FOREIGN KEY (`Phieu`) REFERENCES `phieuxe` (`Phieu`);

--
-- Constraints for table `phieuxe`
--
ALTER TABLE `phieuxe`
  ADD CONSTRAINT `FK_Bai` FOREIGN KEY (`Mabai`) REFERENCES `bai` (`Mabai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
