-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 07, 2026 at 12:24 PM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_billing`
--
CREATE DATABASE IF NOT EXISTS `db_billing` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_billing`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `aname` varchar(100) NOT NULL,
  `apass` varchar(100) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`aid`, `aname`, `apass`) VALUES
(1, 'ADMIN', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

CREATE TABLE IF NOT EXISTS `tbl_customer` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  `city` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`cid`, `cname`, `address`, `city`, `contact`, `type`) VALUES
(1, 'Trispan', 'Mettur Dam', 'mettur', '9147483647', 'Customer'),
(2, 'Ravanan', 'salem', 'salem', '789856789', 'Supplier'),
(3, 'SAM', 'Salem', 'Salem', '9876543321', 'Customer'),
(4, 'Ram', 'Dubai', 'Dubai', '4564563456', 'Supplier'),
(5, 'Shang-Shi', 'China', 'Nanjing', '12345676543', 'Supplier'),
(6, 'Chan', 'China', 'Nanjing', '98765345678', 'Supplier'),
(7, 'Humfo', 'Salem', 'Attur', '98765456789', 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_invoice`
--

CREATE TABLE IF NOT EXISTS `tbl_invoice` (
  `iid` int(11) NOT NULL AUTO_INCREMENT,
  `ino` int(11) NOT NULL,
  `idate` date NOT NULL,
  `bcid` int(11) NOT NULL,
  `scid` int(11) NOT NULL,
  `itotal` double(10,2) NOT NULL,
  `ipaid` double(10,2) NOT NULL,
  `ipend` double(10,2) NOT NULL,
  `ipay` varchar(100) NOT NULL,
  PRIMARY KEY (`iid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `tbl_invoice`
--

INSERT INTO `tbl_invoice` (`iid`, `ino`, `idate`, `bcid`, `scid`, `itotal`, `ipaid`, `ipend`, `ipay`) VALUES
(1, 1, '2024-07-29', 3, 7, 10000.00, 8000.00, 2000.00, 'Credit'),
(2, 2, '2024-07-29', 3, 3, 10000.00, 8000.00, 2000.00, 'Credit'),
(3, 3, '2024-07-31', 1, 7, 57300.00, 50000.00, 7300.00, 'Credit'),
(4, 4, '2024-07-31', 7, 3, 19935.00, 19000.00, 935.00, 'Credit'),
(5, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(6, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(7, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(8, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(9, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(10, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(11, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(12, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(13, 13, '2024-08-09', 1, 3, 2100.00, 2100.00, 0.00, 'Cash'),
(14, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(15, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(16, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(17, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(18, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(19, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 0.00, 'cash'),
(20, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(21, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(22, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(23, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(24, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(25, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(26, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(27, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(28, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(29, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash'),
(30, 10, '2024-07-29', 3, 7, 30000.00, 30000.00, 10.00, 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_invoice_products`
--

CREATE TABLE IF NOT EXISTS `tbl_invoice_products` (
  `ipid` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `price` double(10,2) NOT NULL,
  `qty` int(11) NOT NULL,
  `rtotal` double(10,2) NOT NULL,
  PRIMARY KEY (`ipid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `tbl_invoice_products`
--

INSERT INTO `tbl_invoice_products` (`ipid`, `iid`, `pid`, `price`, `qty`, `rtotal`) VALUES
(4, 1, 1, 1000.00, 10, 10000.00),
(5, 2, 1, 1000.00, 10, 10000.00),
(6, 3, 1, 1000.00, 40, 40000.00),
(7, 3, 2, 45.00, 60, 2700.00),
(8, 3, 7, 100.00, 50, 5000.00),
(9, 3, 6, 800.00, 12, 9600.00),
(29, 4, 1, 1000.00, 1, 1000.00),
(30, 4, 1, 1000.00, 1, 1000.00),
(31, 4, 1, 1000.00, 1, 1000.00),
(32, 4, 1, 1000.00, 1, 1000.00),
(33, 4, 1, 1000.00, 1, 1000.00),
(34, 4, 1, 1000.00, 1, 1000.00),
(35, 4, 1, 1000.00, 1, 1000.00),
(36, 4, 1, 1000.00, 1, 1000.00),
(37, 4, 1, 1000.00, 1, 1000.00),
(38, 4, 1, 1000.00, 1, 1000.00),
(39, 4, 1, 1000.00, 1, 1000.00),
(40, 4, 2, 45.00, 1, 45.00),
(41, 4, 2, 45.00, 1, 45.00),
(42, 4, 2, 45.00, 1, 45.00),
(43, 4, 5, 7000.00, 1, 7000.00),
(44, 4, 6, 800.00, 1, 800.00),
(45, 4, 6, 800.00, 1, 800.00),
(46, 4, 7, 100.00, 1, 100.00),
(47, 4, 7, 100.00, 1, 100.00),
(48, 30, 1, 1000.00, 10, 10000.00),
(49, 30, 1, 1000.00, 10, 10000.00),
(50, 30, 1, 1000.00, 10, 10000.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE IF NOT EXISTS `tbl_products` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(100) NOT NULL,
  `rate` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`pid`, `pname`, `rate`, `code`) VALUES
(1, 'Cement', '1000', 'cem1'),
(2, 'Cable/wire', '45', 'cw123'),
(3, 'Notes-1', '88', 'note002'),
(5, 'Tables', '7000', 'tbl001'),
(6, 'Chairs', '800', 'hi102'),
(7, 'Pipes-5mm', '100', 'pipo');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase`
--

CREATE TABLE IF NOT EXISTS `tbl_purchase` (
  `phid` int(11) NOT NULL AUTO_INCREMENT,
  `phno` int(11) NOT NULL,
  `phdate` date NOT NULL,
  `bcid` int(11) NOT NULL,
  `phtotal` double(10,2) NOT NULL,
  `phpaid` double(10,2) NOT NULL,
  `phpend` double(10,2) NOT NULL,
  `phpay` varchar(100) NOT NULL,
  PRIMARY KEY (`phid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_purchase`
--

INSERT INTO `tbl_purchase` (`phid`, `phno`, `phdate`, `bcid`, `phtotal`, `phpaid`, `phpend`, `phpay`) VALUES
(1, 76856, '2024-07-29', 5, 756000.00, 706000.00, 50000.00, 'Credit'),
(2, 6868, '2024-07-29', 4, 9500.00, 9500.00, 0.00, 'Cash'),
(3, 8689, '2024-07-29', 2, 600.00, 600.00, 0.00, 'UPI');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_products`
--

CREATE TABLE IF NOT EXISTS `tbl_purchase_products` (
  `phpid` int(11) NOT NULL AUTO_INCREMENT,
  `phid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `phrate` double(10,2) NOT NULL,
  `qty` int(11) NOT NULL,
  `rtotal` double(10,2) NOT NULL,
  PRIMARY KEY (`phpid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `tbl_purchase_products`
--

INSERT INTO `tbl_purchase_products` (`phpid`, `phid`, `pid`, `phrate`, `qty`, `rtotal`) VALUES
(13, 2, 1, 950.00, 10, 9500.00),
(14, 3, 2, 60.00, 10, 600.00),
(15, 1, 1, 900.00, 100, 90000.00),
(16, 1, 2, 50.00, 100, 5000.00),
(17, 1, 3, 60.00, 100, 6000.00),
(18, 1, 5, 6000.00, 100, 600000.00),
(19, 1, 6, 500.00, 100, 50000.00),
(20, 1, 7, 50.00, 100, 5000.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock`
--

CREATE TABLE IF NOT EXISTS `tbl_stock` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `iid` int(11) NOT NULL,
  `phid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `date` date NOT NULL,
  `phrate` double(10,2) NOT NULL,
  `in_stock` int(11) NOT NULL,
  `out_stock` int(11) NOT NULL,
  `stype` varchar(100) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=68 ;

--
-- Dumping data for table `tbl_stock`
--

INSERT INTO `tbl_stock` (`sid`, `iid`, `phid`, `pid`, `date`, `phrate`, `in_stock`, `out_stock`, `stype`) VALUES
(14, 0, 2, 1, '2024-07-29', 950.00, 10, 0, 'Purchase'),
(15, 0, 3, 2, '2024-07-29', 60.00, 10, 0, 'Purchase'),
(16, 0, 1, 1, '2024-07-29', 900.00, 100, 0, 'Purchase'),
(17, 0, 1, 2, '2024-07-29', 50.00, 100, 0, 'Purchase'),
(18, 0, 1, 3, '2024-07-29', 60.00, 100, 0, 'Purchase'),
(19, 0, 1, 5, '2024-07-29', 6000.00, 100, 0, 'Purchase'),
(20, 0, 1, 6, '2024-07-29', 500.00, 100, 0, 'Purchase'),
(21, 0, 1, 7, '2024-07-29', 50.00, 100, 0, 'Purchase'),
(24, 1, 0, 1, '2024-07-29', 0.00, 0, 10, 'Invoice'),
(25, 2, 0, 1, '2024-07-29', 0.00, 0, 10, 'Invoice'),
(26, 3, 0, 1, '2024-07-31', 0.00, 0, 40, 'Invoice'),
(27, 3, 0, 2, '2024-07-31', 0.00, 0, 60, 'Invoice'),
(28, 3, 0, 7, '2024-07-31', 0.00, 0, 50, 'Invoice'),
(29, 3, 0, 6, '2024-07-31', 0.00, 0, 12, 'Invoice'),
(49, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(50, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(51, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(52, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(53, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(54, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(55, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(56, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(57, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(58, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(59, 4, 0, 1, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(60, 4, 0, 2, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(61, 4, 0, 2, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(62, 4, 0, 2, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(63, 4, 0, 5, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(64, 4, 0, 6, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(65, 4, 0, 6, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(66, 4, 0, 7, '2024-07-31', 0.00, 0, 1, 'Invoice'),
(67, 4, 0, 7, '2024-07-31', 0.00, 0, 1, 'Invoice');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
