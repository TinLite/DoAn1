-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2023 at 06:05 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
  `Mabai` int(11) NOT NULL,
  `Tenbai` varchar(50) DEFAULT NULL,
  `Vitri` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gui`
--

CREATE TABLE `gui` (
  `ID` int(11) NOT NULL,
  `Phieu` int(11) DEFAULT NULL,
  `Soxe` char(10) DEFAULT NULL,
  `Thoigianvao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Thoigianra` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phieuxe`
--

CREATE TABLE `phieuxe` (
  `Phieu` int(11) NOT NULL,
  `Mabai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `xe`
--

CREATE TABLE `xe` (
  `Soxe` char(10) NOT NULL,
  `Mauxe` varchar(20) DEFAULT NULL,
  `Hinhanh` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Phieu` (`Phieu`),
  ADD KEY `Soxe` (`Soxe`);

--
-- Indexes for table `phieuxe`
--
ALTER TABLE `phieuxe`
  ADD PRIMARY KEY (`Phieu`),
  ADD KEY `Mabai` (`Mabai`);

--
-- Indexes for table `xe`
--
ALTER TABLE `xe`
  ADD PRIMARY KEY (`Soxe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bai`
--
ALTER TABLE `bai`
  MODIFY `Mabai` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gui`
--
ALTER TABLE `gui`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phieuxe`
--
ALTER TABLE `phieuxe`
  MODIFY `Phieu` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gui`
--
ALTER TABLE `gui`
  ADD CONSTRAINT `gui_ibfk_1` FOREIGN KEY (`Phieu`) REFERENCES `phieuxe` (`Phieu`),
  ADD CONSTRAINT `gui_ibfk_2` FOREIGN KEY (`Soxe`) REFERENCES `xe` (`Soxe`);

--
-- Constraints for table `phieuxe`
--
ALTER TABLE `phieuxe`
  ADD CONSTRAINT `phieuxe_ibfk_1` FOREIGN KEY (`Mabai`) REFERENCES `bai` (`Mabai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
