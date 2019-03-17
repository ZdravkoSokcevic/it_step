-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 25, 2019 at 08:35 PM
-- Server version: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_step`
--

-- --------------------------------------------------------

--
-- Table structure for table `allowance`
--

CREATE TABLE `allowance` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `email`, `password`, `picture`) VALUES
(2, 'pperic123', 'pperic@gmail.com', '$2y$10$OfybfgHVwEMkLrmKiILPveEMuShRs.Z1G9bcpjenk.0O/WqJ7TBOu', '../assets/pictures/1.jpeg'),
(4, 'pavle123', 'paja@gmail.com', '$2y$10$BKJllO1njCpa8AzLs7VdDu9PYMhzl1yBojAR/VaetMYik3nI1YzYK', '../assets/pictures/4.png');

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `type` enum('working','free') NOT NULL,
  `description` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `calendar_worker`
--

CREATE TABLE `calendar_worker` (
  `id` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `id_calendar` int(11) NOT NULL,
  `came` datetime NOT NULL,
  `go_out` datetime DEFAULT NULL,
  `start_working` datetime DEFAULT NULL,
  `end_working` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `day`
--

CREATE TABLE `day` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `holiday` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `day_off`
--

CREATE TABLE `day_off` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `errand`
--

CREATE TABLE `errand` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `go_time` datetime NOT NULL,
  `back_time` datetime NOT NULL,
  `country` varchar(50) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `overwork`
--

CREATE TABLE `overwork` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `id_worker` int(11) DEFAULT NULL,
  `picture` blob,
  `reason` enum('sluzbeno putovanje','redovna nabavka','isplata honorara predavacima','reprezentacija','vanredno') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('refund','errand','day_off','allowance','overwork','other') NOT NULL,
  `decision_date` date DEFAULT NULL,
  `third_person` int(11) DEFAULT NULL,
  `decision` tinyint(1) DEFAULT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `day_off` int(11) DEFAULT NULL,
  `overwork` int(11) DEFAULT NULL,
  `vacation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `day_off`, `overwork`, `vacation`) VALUES
(2, NULL, NULL, NULL),
(3, NULL, NULL, NULL),
(4, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

CREATE TABLE `worker` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `id_manager` int(11) DEFAULT NULL,
  `type` enum('admin','worker','manager') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `worker`
--

INSERT INTO `worker` (`id`, `first_name`, `last_name`, `id_manager`, `type`) VALUES
(2, 'pera', 'peric', NULL, 'manager'),
(3, 'pavle', 'vukovic', 2, 'worker'),
(4, 'pavle', 'vukovic', 2, 'worker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allowance`
--
ALTER TABLE `allowance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendar_worker`
--
ALTER TABLE `calendar_worker`
  ADD KEY `calendar_worker_calendar_foreign` (`id_calendar`),
  ADD KEY `calendar_worker_worker_foreign` (`id_worker`);

--
-- Indexes for table `day`
--
ALTER TABLE `day`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `day_off`
--
ALTER TABLE `day_off`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`);

--
-- Indexes for table `errand`
--
ALTER TABLE `errand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `errand_request_foreign` (`request_id`),
  ADD KEY `errand_worker_foreign` (`worker_id`);

--
-- Indexes for table `overwork`
--
ALTER TABLE `overwork`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refund_request_foreign` (`request_id`),
  ADD KEY `refund_worker_foreign` (`id_worker`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_worker_foreign` (`worker_id`),
  ADD KEY `third_part_person` (`third_person`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD UNIQUE KEY `worker_id` (`id`);

--
-- Indexes for table `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_manager_foreign` (`id_manager`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allowance`
--
ALTER TABLE `allowance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `day`
--
ALTER TABLE `day`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `day_off`
--
ALTER TABLE `day_off`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `errand`
--
ALTER TABLE `errand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `overwork`
--
ALTER TABLE `overwork`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `worker`
--
ALTER TABLE `worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `allowance`
--
ALTER TABLE `allowance`
  ADD CONSTRAINT `allowance_request_foreign` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `supplier_id` FOREIGN KEY (`id`) REFERENCES `worker` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `calendar_worker`
--
ALTER TABLE `calendar_worker`
  ADD CONSTRAINT `calendar_worker_calendar_foreign` FOREIGN KEY (`id_calendar`) REFERENCES `calendar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calendar_worker_worker_foreign` FOREIGN KEY (`id_worker`) REFERENCES `worker` (`id`);

--
-- Constraints for table `day_off`
--
ALTER TABLE `day_off`
  ADD CONSTRAINT `dayoff_request_foreign` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `errand`
--
ALTER TABLE `errand`
  ADD CONSTRAINT `errand_request_foreign` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `errand_worker_foreign` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `overwork`
--
ALTER TABLE `overwork`
  ADD CONSTRAINT `overwork_request_foreign` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `refund`
--
ALTER TABLE `refund`
  ADD CONSTRAINT `refund_request_foreign` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `refund_worker_foreign` FOREIGN KEY (`id_worker`) REFERENCES `worker` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_worker_foreign` FOREIGN KEY (`worker_id`) REFERENCES `worker` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `third_part_person` FOREIGN KEY (`third_person`) REFERENCES `worker` (`id`);

--
-- Constraints for table `status`
--
ALTER TABLE `status`
  ADD CONSTRAINT `status_worker_foreign` FOREIGN KEY (`id`) REFERENCES `worker` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `supplier_manager_foreign` FOREIGN KEY (`id_manager`) REFERENCES `worker` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
