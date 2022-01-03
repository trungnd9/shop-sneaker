-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 03, 2022 lúc 03:43 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `z_sneaker`
--

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `customermoney`
-- (See below for the actual view)
--
CREATE TABLE `customermoney` (
`id` int(11)
,`CONCAT(customers.first_name,' ',customers.last_name)` varchar(511)
,`orderId` int(11)
,`order_id` int(11)
,`COUNT(order_id)` bigint(21)
,`Tổng tiền` double
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `credit_limit` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `sales_rep_employee_number` int(11) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `address`, `city`, `country`, `credit_limit`, `first_name`, `last_name`, `phone_number`, `postal_code`, `sales_rep_employee_number`, `state`, `user_id`) VALUES
(5, 'cg', 'Hanoi', 'Vietnam', 0, 'Nguyen', 'Linh', '0456456456', '100000', 0, '', NULL),
(7, 'hn', 'Hanoi', 'Vietnam', 0, 'Le', 'Nhung', '456456456', '100000', 0, '', NULL),
(9, 'hn', 'Hanoi', 'Vietnam', 0, 'Nguyen', 'Ngoc', '0456789567', '100000', 0, '', NULL),
(10, 'hn', 'Hanoi', 'Vietnam', 0, 'Nguyen', 'Tuan', '89888888', '100000', 0, '', NULL),
(11, 'hn', 'Hanoi', 'Vietnam', 0, 'Nguyen', 'Ngoc', '456789567', '100000', 0, '', NULL),
(103, '54, rue Royale', 'Nantes', 'France', 21000, 'Carine', 'Schmitt', '40.32.2555', '44000', 1370, 'null', NULL),
(112, '8489 Strong St.', 'Las Vegas', 'USA', 71800, 'Jean', 'King', '7025551838', '83030', 1166, 'NV', NULL),
(114, '636 St Kilda Road', 'Melbourne', 'Australia', 117300, 'Peter', 'Ferguson', '03 9520 4555', '3004', 1611, 'Victoria', NULL),
(119, '67, rue des Cinquante Otages', 'Nantes', 'France', 118200, 'Janine', 'Labrune', '40.67.8555', '44000', 1370, 'null', NULL),
(121, 'Erling Skakkes gate 78', 'Stavern', 'Norway', 81700, 'Jonas', 'Bergulfsen', '07-98 9555', '4110', 1504, 'null', NULL),
(124, '5677 Strong St.', 'San Rafael', 'USA', 210500, 'Susan', 'Nelson', '4155551450', '97562', 1165, 'CA', NULL),
(125, 'ul. Filtrowa 68', 'Warszawa', 'Poland', 0, 'Zbyszek', 'Piestrzeniewicz', '(26) 642-7555', '01-012', 0, 'null', NULL),
(128, 'Lyonerstr. 34', 'Frankfurt', 'Germany', 59700, 'Roland', 'Keitel', '+49 69 66 90 2555', '60528', 1504, 'null', NULL),
(129, '5557 North Pendale Street', 'San Francisco', 'USA', 64600, 'Julie', 'Murphy', '6505555787', '94217', 1165, 'CA', NULL),
(131, '897 Long Airport Avenue', 'NYC', 'USA', 114900, 'Kwai', 'Lee', '2125557818', '10022', 1323, 'NY', NULL),
(141, 'C/ Moralzarzal, 86', 'Madrid', 'Spain', 227600, 'Diego', 'Freyre', '(91) 555 94 44', '28034', 1370, 'null', NULL),
(144, 'Berguvsvägen 8', 'Luleå', 'Sweden', 53100, 'Christina', 'Berglund', '0921-12 3555', 'S-958 22', 1504, 'null', NULL),
(145, 'Vinbæltet 34', 'Kobenhavn', 'Denmark', 83400, 'Jytte', 'Petersen', '31 12 3555', '1734', 1401, 'null', NULL),
(146, '2, rue du Commerce', 'Lyon', 'France', 123900, 'Mary', 'Saveley', '78.32.5555', '69004', 1337, 'null', NULL),
(148, 'Bronz Sok.', 'Singapore', 'Singapore', 103800, 'Eric', 'Natividad', '+65 221 7555', '79903', 1621, 'null', NULL),
(151, '4092 Furth Circle', 'NYC', 'USA', 138500, 'Jeff', 'Young', '2125557413', '10022', 1286, 'NY', NULL),
(157, '7586 Pompton St.', 'Allentown', 'USA', 100600, 'Kelvin', 'Leong', '2155551555', '70267', 1216, 'PA', NULL),
(161, '9408 Furth Circle', 'Burlingame', 'USA', 84600, 'Juri', 'Hashimoto', '6505556809', '94217', 1165, 'CA', NULL),
(166, '106 Linden Road Sandown', 'Singapore', 'Singapore', 97900, 'Wendy', 'Victorino', '+65 224 1555', '69045', 1612, 'null', NULL),
(167, 'Brehmen St. 121', 'Bergen', 'Norway', 96800, 'Veysel', 'Oeztan', '+47 2267 3215', 'N 5804', 1504, 'null', NULL),
(168, '149 Spinnaker Dr.', 'New Haven', 'USA', 0, 'Keith', 'Franco', '2035557845', '97823', 1286, 'CT', NULL),
(169, 'Estrada da saúde n. 58', 'Lisboa', 'Portugal', 0, 'Isabel', 'de Castro', '(1) 356-5555', '1756', 0, 'null', NULL),
(171, '184, chaussée de Tournai', 'Lille', 'France', 82900, 'Martine', 'Rancé', '20.16.1555', '59000', 1370, 'null', NULL),
(172, '265, boulevard Charonne', 'Paris', 'France', 84300, 'Marie', 'Bertrand', '(1) 42.34.2555', '75012', 1337, 'null', NULL),
(173, '4658 Baden Av.', 'Cambridge', 'USA', 43400, 'Jerry', 'Tseng', '6175555555', '51247', 1188, 'MA', NULL),
(175, '25593 South Bay Ln.', 'Bridgewater', 'USA', 84300, 'Julie', 'King', '2035552570', '97562', 1323, 'CT', NULL),
(177, '1-6-20 Dojima', 'Kita-ku', 'Japan', 81200, 'Mory', 'Kentary', '+81 06 6342 5555', '530-0003', 1621, 'Osaka', NULL),
(181, '2678 Kingston Rd.', 'NYC', 'USA', 76400, 'Michael', 'Frick', '2125551500', '10022', 1286, 'NY', NULL),
(186, 'Keskuskatu 45', 'Helsinki', 'Finland', 96500, 'Matti', 'Karttunen', '90-224 8555', '21240', 1501, 'null', NULL),
(187, 'Fauntleroy Circus', 'Manchester', 'UK', 136800, 'Rachel', 'Ashworth', '(171) 555-1555', 'EC2 5NT', 1501, 'null', NULL),
(189, '25 Maiden Lane', 'Dublin', 'Ireland', 69400, 'Dean', 'Cassidy', '+353 1862 1555', '2', 1504, 'null', NULL),
(198, '16780 Pompton St.', 'Brickhaven', 'USA', 23000, 'Leslie', 'Taylor', '6175558428', '58339', 1216, 'MA', NULL),
(201, '12, Berkeley Gardens Blvd', 'Liverpool', 'UK', 92700, 'Elizabeth', 'Devon', '(171) 555-2282', 'WX1 6LT', 1501, 'null', NULL),
(202, '1900 Oak St.', 'Vancouver', 'Canada', 90300, 'Yoshi', 'Tamuri', '(604) 555-3392', 'V3F 2K1', 1323, 'BC', NULL),
(204, '7635 Spinnaker Dr.', 'Brickhaven', 'USA', 68700, 'Miguel', 'Barajas', '6175557555', '58339', 1188, 'MA', NULL),
(205, '78934 Hillside Dr.', 'Pasadena', 'USA', 90700, 'Julie', 'Young', '6265557265', '90003', 1166, 'CA', NULL),
(206, 'Suntec Tower Three', 'Singapore', 'Singapore', 0, 'Brydey', 'Walker', '+612 9411 1555', '38988', 0, 'null', NULL),
(209, '24, place Kléber', 'Strasbourg', 'France', 53800, 'Frédérique', 'Citeaux', '88.60.1555', '67000', 1370, 'null', NULL),
(211, 'Bank of China Tower', 'Central Hong Kong', 'Hong Kong', 58600, 'Mike', 'Gao', '+852 2251 1555', 'null', 1621, 'null', NULL),
(216, 'Rambla de Cataluña, 23', 'Barcelona', 'Spain', 60300, 'Eduardo', 'Saavedra', '(93) 203 4555', '8022', 1702, 'null', NULL),
(219, '4097 Douglas Av.', 'Glendale', 'USA', 11000, 'Mary', 'Young', '3105552373', '92561', 1166, 'CA', NULL),
(223, 'Taucherstraße 10', 'Cunewalde', 'Germany', 0, 'Horst', 'Kloss', '0372-555188', '1307', 0, 'null', NULL),
(227, 'Smagsloget 45', 'Århus', 'Denmark', 120800, 'Palle', 'Ibsen', '86 21 3555', '8200', 1401, 'null', NULL),
(233, '43 rue St. Laurent', 'Montréal', 'Canada', 48700, 'Jean', 'Fresnière', '(514) 555-8054', 'H1J 1C3', 1286, 'Québec', NULL),
(237, 'Gran Vía, 1', 'Madrid', 'Spain', 0, 'Alejandra', 'Camino', '(91) 745 6555', '28001', 0, 'null', NULL),
(239, '361 Furth Circle', 'San Diego', 'USA', 105000, 'Valarie', 'Thompson', '7605558146', '91217', 1166, 'CA', NULL),
(240, 'Garden House', 'Cowes', 'UK', 93900, 'Helen', 'Bennett', '(198) 555-8888', 'PO31 7PJ', 1501, 'Isle of Wight', NULL),
(242, '1 rue Alsace-Lorraine', 'Toulouse', 'France', 61100, 'Annette', 'Roulet', '61.77.6555', '31000', 1370, 'null', NULL),
(247, 'Magazinweg 7', 'Frankfurt', 'Germany', 0, 'Renate', 'Messner', '069-0555984', '60528', 0, 'null', NULL),
(249, 'Via Monte Bianco 34', 'Torino', 'Italy', 113000, 'Paolo', 'Accorti', '011-4988555', '10100', 1401, 'null', NULL),
(250, '27 rue du Colonel Pierre Avia', 'Paris', 'France', 68100, 'Daniel', 'Da Silva', '+33 1 46 62 7555', '75508', 1337, 'null', NULL),
(256, '67, avenue de l\'Europe', 'Versailles', 'France', 77900, 'Daniel', 'Tonini', '30.59.8555', '78000', 1370, 'null', NULL),
(259, 'Mehrheimerstr. 369', 'Köln', 'Germany', 120400, 'Henriette', 'Pfalzheim', '0221-5554327', '50739', 1504, 'null', NULL),
(260, '23 Tsawassen Blvd.', 'Tsawassen', 'Canada', 89600, 'Elizabeth', 'Lincoln', '(604) 555-4555', 'T2F 8M4', 1323, 'BC', NULL),
(273, 'Berliner Platz 43', 'München', 'Germany', 0, 'Peter', 'Franken', '089-0877555', '80805', 0, 'null', NULL),
(276, '201 Miller Street', 'North Sydney', 'Australia', 107800, 'Anna', 'O\'Hara', '02 9936 8555', '2060', 1611, 'NSW', NULL),
(278, 'Via Ludovico il Moro 22', 'Bergamo', 'Italy', 119600, 'Giovanni', 'Rovelli', '035-640555', '24100', 1401, 'null', NULL),
(282, 'Monitor Money Building', 'Chatswood', 'Australia', 93300, 'Adrian', 'Huxley', '+61 2 9495 8555', '2067', 1611, 'NSW', NULL),
(286, '39323 Spinnaker Dr.', 'Cambridge', 'USA', 123700, 'Marta', 'Hernandez', '6175558555', '51247', 1216, 'MA', NULL),
(293, 'Rte des Arsenaux 41', 'Fribourg', 'Switzerland', 0, 'Ed', 'Harrison', '+41 26 425 50 01', '1700', 0, 'null', NULL),
(298, 'Grenzacherweg 237', 'Genève', 'Switzerland', 141300, 'Mihael', 'Holz', '0897-034555', '1203', 1702, 'null', NULL),
(299, 'Drammensveien 126A', 'Oslo', 'Norway', 95100, 'Jan', 'Klaeboe', '+47 2212 1555', 'N 0106', 1504, 'null', NULL),
(303, 'Kingsfordweg 151', 'Amsterdam', 'Netherlands', 0, 'Bradley', 'Schuyler', '+31 20 491 9555', '1043 GR', 0, 'null', NULL),
(307, 'Obere Str. 57', 'Berlin', 'Germany', 0, 'Mel', 'Andersen', '030-0074555', '12209', 0, 'null', NULL),
(311, 'Torikatu 38', 'Oulu', 'Finland', 90500, 'Pirkko', 'Koskitalo', '981-443655', '90110', 1501, 'null', NULL),
(314, 'Rue Joseph-Bens 532', 'Bruxelles', 'Belgium', 79900, 'Catherine', 'Dewey', '(02) 5554 67', 'B-1180', 1401, 'null', NULL),
(319, '3758 North Pendale Street', 'White Plains', 'USA', 102700, 'Steve', 'Frick', '9145554562', '24067', 1323, 'NY', NULL),
(320, '4575 Hillside Dr.', 'New Bedford', 'USA', 94500, 'Wing', 'Huang', '5085559555', '50553', 1188, 'MA', NULL),
(321, '7734 Strong St.', 'San Francisco', 'USA', 105000, 'Julie', 'Brown', '6505551386', '94217', 1165, 'CA', NULL),
(323, '162-164 Grafton Road', 'Auckland', 'New Zealand', 88000, 'Mike', 'Graham', '+64 9 312 5555', 'null', 1612, 'null', NULL),
(324, '35 King George', 'London', 'UK', 77000, 'Ann', 'Brown', '(171) 555-0297', 'WX3 6FW', 1501, 'null', NULL),
(328, '7476 Moss Rd.', 'Newark', 'USA', 43000, 'William', 'Brown', '2015559350', '94019', 1323, 'NJ', NULL),
(333, '31 Duncan St. West End', 'South Brisbane', 'Australia', 51600, 'Ben', 'Calaghan', '61-7-3844-6555', '4101', 1611, 'Queensland', NULL),
(334, 'Software Engineering Center', 'Espoo', 'Finland', 98800, 'Kalle', 'Suominen', '+358 9 8045 555', 'FIN-02271', 1501, 'null', NULL),
(335, 'Maubelstr. 90', 'Brandenburg', 'Germany', 0, 'Philip', 'Cramer', '0555-09555', '14776', 0, 'null', NULL),
(339, '782 First Street', 'Philadelphia', 'USA', 81100, 'Francisca', 'Cervantes', '2155554695', '71270', 1188, 'PA', NULL),
(344, 'Merchants House', 'Madrid', 'Spain', 59600, 'Jesus', 'Fernandez', '+34 913 728 555', '28023', 1702, 'null', NULL),
(347, '6047 Douglas Av.', 'Los Angeles', 'USA', 57700, 'Brian', 'Chandler', '2155554369', '91003', 1166, 'CA', NULL),
(348, '8 Johnstown Road', 'Cork', 'Ireland', 0, 'Patricia', 'McKenna', '2967 555', 'null', 0, 'Co. Cork', NULL),
(350, '12, rue des Bouchers', 'Marseille', 'France', 65000, 'Laurence', 'Lebihan', '91.24.4555', '13008', 1337, 'null', NULL),
(353, '59 rue de l\'Abbaye', 'Reims', 'France', 81100, 'Paul', 'Henriot', '26.47.1555', '51100', 1337, 'null', NULL),
(356, '1250 Pretorius Street', 'Hatfield', 'South Africa', 0, 'Armand', 'Kuger', '+27 21 550 3555', '28', 0, 'Pretoria', NULL),
(357, '199 Great North Road', 'Auckland', 'New Zealand', 77700, 'Wales', 'MacKinlay', '64-9-3763555', 'null', 1612, 'null', NULL),
(361, 'Luisenstr. 48', 'Münster', 'Germany', 0, 'Karin', 'Josephs', '0251-555259', '44087', 0, 'null', NULL),
(362, '8616 Spinnaker Dr.', 'Boston', 'USA', 41900, 'Juri', 'Yoshido', '6175559555', '51003', 1216, 'MA', NULL),
(363, '2304 Long Airport Avenue', 'Nashua', 'USA', 114200, 'Dorothy', 'Young', '6035558647', '62005', 1216, 'NH', NULL),
(369, 'Jardim das rosas n. 32', 'Lisboa', 'Portugal', 0, 'Lino', 'Rodriguez', '(1) 354-2555', '1675', 0, 'null', NULL),
(376, 'Hauptstr. 29', 'Bern', 'Switzerland', 0, 'Braun', 'Urs', '0452-076555', '3012', 1702, 'null', NULL),
(381, 'Boulevard Tirou, 255', 'Charleroi', 'Belgium', 23500, 'Pascale', 'Cartrain', '(071) 23 67 2555', 'B-6000', 1401, 'null', NULL),
(382, 'Geislweg 14', 'Salzburg', 'Austria', 71700, 'Georg', 'Pipps', '6562-9555', '5020', 1401, 'null', NULL),
(385, '15 McCallum Street', 'Makati City', 'Philippines', 81500, 'Arnold', 'Cruz', '+63 2 555 3587', '1227 MM', 1621, 'null', NULL),
(386, 'Strada Provinciale 124', 'Reggio Emilia', 'Italy', 121400, 'Maurizio', 'Moroni', '0522-556555', '42100', 1401, 'null', NULL),
(398, '2-2-8 Roppongi', 'Minato-ku', 'Japan', 94400, 'Akiko', 'Shimamura', '+81 3 3584 0555', '106-0032', 1621, 'Tokyo', NULL),
(406, '25, rue Lauriston', 'Paris', 'France', 95000, 'Dominique', 'Perrier', '(1) 47.55.6555', '75016', 1337, 'null', NULL),
(409, 'Adenauerallee 900', 'Stuttgart', 'Germany', 0, 'Rita', 'Müller', '0711-555361', '70563', 0, 'null', NULL),
(412, '101 Lambton Quay', 'Wellington', 'New Zealand', 86800, 'Sarah', 'McRoy', '04 499 9555', 'null', 1612, 'null', NULL),
(415, 'Hansastr. 15', 'Munich', 'Germany', 77000, 'Michael', 'Donnermeyer', '+49 89 61 08 9555', '80686', 1504, 'null', NULL),
(424, '5905 Pompton St.', 'NYC', 'USA', 67500, 'Maria', 'Hernandez', '2125558493', '10022', 1286, 'NY', NULL),
(443, 'Heerstr. 22', 'Leipzig', 'Germany', 0, 'Alexander', 'Feuer', '0342-555176', '4179', 0, 'null', NULL),
(447, '2440 Pompton St.', 'Glendale', 'USA', 49700, 'Dan', 'Lewis', '2035554407', '97561', 1323, 'CT', NULL),
(448, 'Åkergatan 24', 'Bräcke', 'Sweden', 116400, 'Martha', 'Larsson', '0695-34 6555', 'S-844 67', 1504, 'null', NULL),
(450, '3086 Ingle Ln.', 'San Jose', 'USA', 77600, 'Sue', 'Frick', '4085553659', '94217', 1165, 'CA', NULL),
(452, 'Kirchgasse 6', 'Graz', 'Austria', 45300, 'Roland', 'Mendel', '7675-3555', '8010', 1401, 'null', NULL),
(455, '567 North Pendale Street', 'New Haven', 'USA', 95400, 'Leslie', 'Murphy', '2035559545', '97823', 1286, 'CT', NULL),
(456, '5290 North Pendale Street', 'NYC', 'USA', 39800, 'Yu', 'Choi', '2125551957', '10022', 1286, 'NY', NULL),
(458, 'C/ Araquil, 67', 'Madrid', 'Spain', 104600, 'Martín', 'Sommer', '(91) 555 22 82', '28023', 1702, 'null', NULL),
(459, 'Walserweg 21', 'Aachen', 'Germany', 0, 'Sven', 'Ottlieb', '0241-039123', '52066', 0, 'null', NULL),
(462, '1785 First Street', 'New Bedford', 'USA', 85800, 'Violeta', 'Benitez', '5085552555', '50553', 1216, 'MA', NULL),
(465, 'c/ Gobelas, 19-1 Urb. La Florida', 'Madrid', 'Spain', 0, 'Carmen', 'Anton', '+34 913 728555', '28023', 0, 'null', NULL),
(471, '7 Allen Street', 'Glen Waverly', 'Australia', 60300, 'Sean', 'Clenahan', '61-9-3844-6555', '3150', 1611, 'Victoria', NULL),
(473, '20093 Cologno Monzese', 'Milan', 'Italy', 34800, 'Franco', 'Ricotti', '+39 022515555', 'null', 1401, 'null', NULL),
(475, '3675 Furth Circle', 'Burbank', 'USA', 55400, 'Steve', 'Thompson', '3105553722', '94019', 1166, 'CA', NULL),
(477, 'Forsterstr. 57', 'Mannheim', 'Germany', 0, 'Hanna', 'Moos', '0621-08555', '68306', 0, 'null', NULL),
(480, '2 Pobedy Square', 'Saint Petersburg', 'Russia', 0, 'Alexander', 'Semenov', '+7 812 293 0521', '196143', 0, 'null', NULL),
(481, '3 Hagalim Blv.', 'Herzlia', 'Israel', 0, 'Raanan', 'Altagar,G M', '+ 972 9 959 8555', '47625', 0, 'null', NULL),
(484, 'C/ Romero, 33', 'Sevilla', 'Spain', 65700, 'José Pedro', 'Roel', '(95) 555 82 82', '41101', 1702, 'null', NULL),
(486, '11328 Douglas Av.', 'Philadelphia', 'USA', 72600, 'Rosa', 'Salazar', '2155559857', '71270', 1323, 'PA', NULL),
(487, '2793 Furth Circle', 'Brisbane', 'USA', 60300, 'Sue', 'Taylor', '4155554312', '94217', 1165, 'CA', NULL),
(489, '120 Hanover Sq.', 'London', 'UK', 43300, 'Thomas', 'Smith', '(171) 555-7555', 'WA1 1DP', 1501, 'null', NULL),
(495, '6251 Ingle Ln.', 'Boston', 'USA', 85100, 'Valarie', 'Franco', '6175552555', '51003', 1188, 'MA', NULL),
(509, 'Cầu Giấy - Hà Nội', 'Hanoi', 'Vietnam', 1000, 'Tran', 'Binh', '012121212', '100000', 1, 'Hanoi', 10),
(510, 'hn', 'Hanoi', '', 0, 'Tran', 'Trang', '0898989899', '', 0, '', 11),
(511, '', '', '', 0, 'Nguyen', 'Tuan', '0145645645', '', 0, '', 12),
(517, NULL, NULL, NULL, 0, 'Nguyen', 'Trung', '0789789789', NULL, 0, NULL, 18);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `extension` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `office_code` int(11) NOT NULL,
  `report_to` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `employees`
--

INSERT INTO `employees` (`id`, `email`, `extension`, `first_name`, `job_title`, `last_name`, `office_code`, `report_to`, `user_id`) VALUES
(1, 'nam@gmail.com', '', 'Nam', 'Manager', 'Nguyen Van', 0, 0, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `territory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `required_date` datetime NOT NULL,
  `shipped_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `comments`, `order_date`, `required_date`, `shipped_date`, `status`, `customer_id`) VALUES
(1, '', '2021-10-10 00:00:00', '2021-11-18 07:00:00', NULL, 'open', 509),
(2, '', '2021-09-01 00:00:00', '2021-11-18 07:00:00', NULL, 'open', 509),
(7, '', '2021-10-01 00:00:00', '2021-11-18 07:00:00', NULL, 'open', 510),
(14, '', '2021-11-19 15:29:29', '2021-11-19 07:00:00', NULL, 'open', 9),
(16, '', '2021-11-19 16:09:27', '2021-11-19 07:00:00', NULL, 'open', 10),
(17, '', '2021-11-19 16:27:06', '2021-11-19 07:00:00', NULL, 'open', 7),
(20, '', '2021-11-19 21:47:47', '2021-11-19 07:00:00', NULL, 'open', 11),
(27, '', '2021-11-20 18:10:07', '2021-11-20 07:00:00', NULL, 'open', 10),
(33, '', '2021-11-21 16:15:18', '2021-11-21 07:00:00', NULL, 'open', 11),
(35, '', '2021-11-21 16:29:14', '2021-11-21 07:00:00', NULL, 'open', 10),
(37, '', '2021-11-21 16:29:35', '2021-11-21 07:00:00', NULL, 'open', 10),
(38, '', '2021-12-05 11:16:26', '2021-12-06 07:00:00', NULL, 'open', 157),
(39, '', '2021-12-05 17:43:10', '2021-12-05 07:00:00', NULL, 'open', 7),
(41, NULL, '2021-12-05 21:11:55', '2021-12-06 07:00:00', NULL, 'open', 129),
(50, NULL, '2021-12-12 23:54:41', '2021-12-14 07:00:00', NULL, 'open', 510),
(51, NULL, '2021-12-13 00:00:03', '2021-12-14 07:00:00', NULL, 'open', 510),
(52, NULL, '2021-12-19 00:09:49', '2021-12-20 07:00:00', NULL, 'open', 511),
(53, NULL, '2021-12-19 08:27:37', '2021-12-21 07:00:00', NULL, 'open', 511),
(54, NULL, '2021-12-19 08:53:38', '2021-12-22 07:00:00', NULL, 'open', 511),
(55, NULL, '2021-12-19 08:59:23', '2021-12-20 07:00:00', NULL, 'open', 511),
(56, NULL, '2021-12-19 09:53:10', '2021-12-22 07:00:00', NULL, 'open', 511),
(57, NULL, '2021-12-19 10:06:38', '2021-12-20 07:00:00', NULL, 'open', 511),
(58, NULL, '2021-12-22 20:55:56', '2021-09-12 07:00:00', NULL, 'open', 510),
(59, NULL, '2021-12-22 20:56:42', '2021-12-24 07:00:00', NULL, 'open', 510),
(60, NULL, '2021-12-22 21:18:52', '2021-12-23 07:00:00', NULL, 'open', 510),
(61, NULL, '2021-12-23 21:00:27', '2021-12-24 07:00:00', NULL, 'open', 510),
(62, NULL, '2021-12-24 00:16:24', '2021-12-25 07:00:00', NULL, 'open', 511),
(63, NULL, '2021-12-24 00:33:32', '2021-12-25 07:00:00', NULL, 'open', 511),
(64, NULL, '2021-12-24 00:43:19', '2021-12-25 07:00:00', NULL, 'open', 511),
(65, NULL, '2021-12-24 00:46:22', '2021-12-25 07:00:00', NULL, 'open', 511),
(66, NULL, '2021-12-24 00:47:09', '2021-12-23 07:00:00', NULL, 'open', 511),
(67, NULL, '2022-01-01 20:58:16', '2022-01-02 07:00:00', NULL, 'open', 509),
(68, NULL, '2022-01-01 22:21:51', '2022-01-02 07:00:00', NULL, 'open', 517),
(69, NULL, '2022-01-01 23:21:44', '2022-01-02 07:00:00', NULL, 'open', 517),
(70, NULL, '2022-01-02 10:58:03', '2022-01-03 07:00:00', NULL, 'open', 517),
(71, NULL, '2022-01-02 11:18:47', '2022-01-03 07:00:00', NULL, 'open', 509);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `price_each` double NOT NULL,
  `quantity_order` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `price_each`, `quantity_order`, `order_id`, `product_id`) VALUES
(1, 6950000, 1, 1, 3),
(2, 3500000, 1, 1, 4),
(3, 7350000, 20, 2, 14),
(7, 1800000, 4, 7, 6),
(8, 2085000, 3, 7, 3),
(9, 6000000, 2, 7, 1),
(55, 1890000, 1, 50, 2),
(57, 1450000, 1, 51, 10),
(58, 6950000, 1, 52, 3),
(59, 3500000, 1, 53, 4),
(60, 5000000, 1, 54, 5),
(61, 3000000, 1, 55, 9),
(62, 1890000, 1, 56, 2),
(63, 1890000, 1, 57, 2),
(64, 3000000, 1, 58, 1),
(65, 3500000, 1, 59, 4),
(66, 3500000, 1, 59, 4),
(67, 3000000, 1, 60, 1),
(68, 1890000, 3, 61, 2),
(69, 1890000, 3, 61, 2),
(70, 3000000, 1, 62, 9),
(71, 6950000, 1, 63, 3),
(72, 5000000, 1, 64, 5),
(73, 3500000, 1, 65, 4),
(74, 3000000, 2, 66, 9),
(75, 2450000, 1, 67, 15),
(76, 5000000, 2, 67, 5),
(77, 4500000, 1, 68, 6),
(78, 2000000, 1, 69, 7),
(79, 2700000, 1, 70, 22),
(80, 1750000, 1, 71, 25);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `ammount` double NOT NULL,
  `check_number` varchar(255) NOT NULL,
  `payment_date` datetime NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `buy_price` decimal(19,2) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `product_color` varchar(255) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_size` varchar(255) DEFAULT NULL,
  `product_vendor` varchar(255) DEFAULT NULL,
  `quantity_in_stock` int(11) DEFAULT NULL,
  `product_line_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `buy_price`, `product_code`, `product_color`, `product_description`, `product_name`, `product_size`, `product_vendor`, `quantity_in_stock`, `product_line_id`) VALUES
(1, '3000000.00', 'MLBBOSTON', '', 'MLB Big Ball Chunky chính là “hot item” đến từ MLB Korea – hãng thời trang tại Hàn Quốc. Hãng này chuyên thiết kế và sản xuất tất cả từ quần áo, váy cho đến những phụ kiện như mũ, túi, tất,…. Tất cả đều lấy cảm hứng từ logo của những đội bóng thuộc MLB.', 'Giày Sneaker MLB Big Ball Chunky P Boston Red Sox 43I', '', 'MLB', 0, 1),
(2, '1890000.00', 'DASFV3723', '', 'Giày Sneaker Adidas Superstar FV3723 được làm từ chất liệu cao cấp giúp sản phẩm có độ bền cao và nâng niu từng bước chân của bạn. Kiểu dáng giày trẻ trung, năng động với thiết kế kiểu dáng đơn giản, cổ thấp thời trang. Giày Sneaker Adidas với đế giày bằn', 'Giày Sneaker Adidas Superstar FV3723 - Cloud White', '', 'Adidas', 6, 1),
(3, '6950000.00', 'JODDAN-MID', 'Mid White Shadow', 'Một đôi giày MID-TOP có màu sắc đặc biệt kết hợp hài hòa giữa đen, trắng và xám với nhau đã tạo lên 1 cú nổ lớn trong giới mê sneaker', 'Giày Sneaker Nike Jordan 1 Mid 554724-073', '36,37,38,39,40,41,42,43', 'Nike', 20, 3),
(4, '3500000.00', 'X9000l4', 'Black', 'Mô tả sản phẩm đang được cập nhật', 'Giày Sneaker Adidas X9000l4 \"Triple Black\" Fw8386', '36,37,38,39,40,41,42,43', 'Adidas', 20, 1),
(5, '5000000.00', 'FW4832', 'Xanh Navy', 'Với thiết kế thanh thoát và hiện đại, đôi giày Day Jogger này là sự kết hợp giữa mẫu giày chạy đua 		biểu tượng của thập niên 80 với phong cách giày chạy địa hình ngoài trời. Thân giày bằng vải dệt 			kim ôm chân kết hợp với đế giữa có đệm đàn hồi.', 'Giày Sneaker Adidas Day Jogger Nam \"Collegiate Navy\" Fw4832', '36,37,38,39,40,41,42,43', 'Adidas', 10, 1),
(6, '4500000.00', 'Yeezy350V2 ', 'Clay', 'Giày Sneaker Nam Nữ Adidas Yeezy 350 v2 Mono \"Clay\" GW2870 - Hàng Chính Hãng', 'Giày Sneaker Nam Nữ Adidas Yeezy 350 V2 Mono \"Clay\"  ', '36,37,38,39,40,41,42,43', 'Adidas', 20, 1),
(7, '2000000.00', 'Ee7242', 'Black', 'Adidas Yung-96', 'Giày Sneaker Adidas Yung-96 Chasm Trail “Legend Ink” Ee7242', '36,37,38,39,40', 'Adidas', 30, 1),
(8, '4500000.00', 'DJ4342', 'Mismatched', 'Nội dung đang được cập nhật...', 'Giày Sneaker Nike Jordan Low Dj4342-400 W \"Mismatched\" ', '36,37,38,39,40,41,42,43', 'Nike', 20, 1),
(9, '3000000.00', 'CD3002', 'Nâu', 'Nội dung đang được cập nhật...', 'Giày Bóng Rổ Nike Jordan Zer0.3 Pf Cd3002-200 \"Why Not?\"', '36,37,38,39,40,41,42,43', 'Nike', 20, 2),
(10, '1450000.00', 'CW5591', 'White', 'Nội dung đang được cập nhật...', 'Giày Sneaker Nike Court Vision W \"Hologram\" Cw5591-100 ', '36,37,38,39,40', 'Nike', 20, 1),
(11, '3200000.00', 'DJ852542', 'South Beach', 'Lối phối màu vẫn được giữ nguyên vẹn với Black Toe, logo Swoosh màu đỏ nổi bật cùng với Jumpman quen thuộc. Chất liệu da Tumble leather có độ mềm cao hơn, được phủ bóng bằng lớp chống bụi bẩn và chống nước nên việc vệ sinh cũng tương đối dễ dàng.', 'Giày Sneaker Nam Nike Air Jordan 1 Mid \"South Beach\" ', '36,37,38,39,40,41,42,43', 'Nike', 20, 2),
(12, '1400000.00', '32SHP', 'Black', 'MLB Playball Chunky Like Boston Red Sox là một Model bắt mắt nằm trong dòng sản phẩm MLB PLAYBALL CHUNKY . Đôi giày được thiết kế ưu tiên cho sự đơn giản nhưng không thiếu đi những đường nét tinh tế và mạnh mẽ cần có.', 'Giày Mlb Playball Origins New York Yankees 32shp1111-50l', '36,37,38,39,40,41,42,43', 'MLB', 5, 1),
(13, '2400000.00', '32SHC', 'White', 'Giày Sneaker Thời Trang Nam Nữ Mlb Big Ball Chunky A 32SHCD111-07I \"LA-Block\"  - Hàng Chính Hãng', 'Giày Sneaker Thời Trang Nam Nữ Mlb Big Ball Chunky A 32shcd111-07i \"La-Block\"', '36,37,38,39,40,41,42,43', 'MLB', 20, 1),
(14, '2450000.00', '32SHL', 'Hồng nhạt', 'MLB Big Ball Chunky Like Boston Red Sox là một Model bắt mắt nằm trong dòng sản phẩm MLB PLAYBALL CHUNKY . Đôi giày được thiết kế ưu tiên cho sự đơn giản nhưng không thiếu đi những đường nét tinh tế và mạnh mẽ cần có.', 'Giày Sneaker Mlb Big Ball Chunky Like Boston Red Sox 32shcl111-43p', '36,37,38,39,40,41,42,43', 'MLB', 12, 1),
(15, '2450000.00', '32SHN', 'Nâu Trắng', 'MLB Big Ball Chunky Gloves New York Yankees là một Model bắt mắt nằm trong dòng sản phẩm MLB PLAYBALL CHUNKY . Đôi giày được thiết kế ưu tiên cho sự đơn giản nhưng không thiếu đi những đường nét tinh tế và mạnh mẽ cần có.', 'Giày Sneaker Mlb Big Ball Chunky Gloves New York Yankees 32shcp111-50i ', '36,37,38,39,40,41,42,43', 'MLB', 10, 1),
(22, '2700000.00', 'H025909', 'White', 'Đôi giày Puma RS-X Radiance với thiết kế form thể thao phóng đại, đi chắc chắn, êm ái, và vô cùng tiện lợi.', 'Giày Thể Thao Puma RS-X Radiance', '', 'Puma', 1, 1),
(23, '1560000.00', 'h017471', 'White', 'Giày được làm từ chất liệu da lộn cao cấp mềm nhẹ dễ vệ sinh. Phần đế giày đàn hồi tốt, êm ái mang lại cảm giác thoải mái ngay cả khi bạn vận động nhiều.', 'Giày Thể Thao Puma Easy Rider', NULL, 'Puma', 5, 2),
(24, '1900000.00', 'H022532', 'Black', 'Giày làm từ chất liệu da cao cấp , form giày chuẩn đẹp từng đường kim mũi chỉ.', 'Giày Thể Thao Puma Roma X Godfather Louis', NULL, 'Puma', 10, 1),
(25, '1750000.00', 'H036099', 'Green', 'Phần trên của Giày Puma Ferrari R-Cat Màu Xanh Lá được làm từ chất liệu da cao cấp. Phần đế giày Puma được làm từ cao su lưu hóa với độ bền cao, hạn chế trơn trượt trong mọi hoàn cảnh thời tiết.', 'Giày Thể Thao Puma Ferrari R-Cat ', NULL, 'Puma', 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_img`
--

CREATE TABLE `product_img` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product_img`
--

INSERT INTO `product_img` (`id`, `url`, `product_id`) VALUES
(1, 'assets/img/product/mlb/boston/boston.jpg', 1),
(2, 'assets/img/product/adidas/superstar/superstar.jpg', 2),
(3, 'assets/img/product/nike/joddan/jodan.jpg', 3),
(4, 'assets/img/product/mlb/boston/boston1.jpg', 1),
(5, 'assets/img/product/mlb/boston/boston2.jpg', 1),
(6, 'assets/img/product/mlb/boston/boston3.jpg', 1),
(7, 'assets/img/product/mlb/boston/boston4.jpg', 1),
(8, 'assets/img/product/mlb/boston/boston5.jpg', 1),
(9, 'assets/img/product/mlb/boston/boston6.jpg', 1),
(10, 'assets/img/product/adidas/superstar/superstar1.jpg', 2),
(11, 'assets/img/product/adidas/superstar/superstar2.jpg', 2),
(12, 'assets/img/product/adidas/superstar/superstar3.jpg', 2),
(13, 'assets/img/product/adidas/superstar/superstar4.jpg', 2),
(14, 'assets/img/product/adidas/superstar/superstar5.jpg', 2),
(15, 'assets/img/product/adidas/superstar/superstar6.jpg', 2),
(16, 'assets/img/product/nike/joddan/jodan1.jpg', 3),
(17, 'assets/img/product/nike/joddan/jodan2.jpg', 3),
(18, 'assets/img/product/nike/joddan/jodan3.jpg', 3),
(19, 'assets/img/product/nike/joddan/jodan4.jpg', 3),
(20, 'assets/img/product/nike/joddan/jodan5.jpg', 3),
(21, 'assets/img/product/nike/joddan/jodan6.jpg', 3),
(22, 'assets/img/product/adidas/x9000I4/x9000I4.jpg', 4),
(23, 'assets/img/product/adidas/x9000I4/x9000I4-01.jpg', 4),
(24, 'assets/img/product/adidas/x9000I4/x9000I4-02.jpg', 4),
(25, 'assets/img/product/adidas/x9000I4/x9000I4-03.jpg', 4),
(26, 'assets/img/product/adidas/x9000I4/x9000I4-04.jpg', 4),
(27, 'assets/img/product/adidas/x9000I4/x9000I4-05.jpg', 4),
(28, 'assets/img/product/adidas/x9000I4/x9000I4-06.jpg', 4),
(29, 'assets/img/product/adidas/FW4832/fw4832.jpg', 5),
(30, 'assets/img/product/adidas/FW4832/fw4832-01.jpg', 5),
(31, 'assets/img/product/adidas/FW4832/fw4832-02.jpg', 5),
(32, 'assets/img/product/adidas/FW4832/fw4832-03.jpg', 5),
(33, 'assets/img/product/adidas/FW4832/fw4832-04.jpg', 5),
(34, 'assets/img/product/adidas/FW4832/fw4832-05.jpg', 5),
(35, 'assets/img/product/adidas/FW4832/fw4832-06.jpg', 5),
(36, 'assets/img/product/adidas/yeezy350/yeezy350.jpg', 6),
(37, 'assets/img/product/adidas/yeezy350/yeezy350-01.jpg', 6),
(38, 'assets/img/product/adidas/yeezy350/yeezy350-02.jpg', 6),
(39, 'assets/img/product/adidas/yeezy350/yeezy350-03.jpg', 6),
(40, 'assets/img/product/adidas/yeezy350/yeezy350-04.jpg', 6),
(41, 'assets/img/product/adidas/yeezy350/yeezy350-05.jpg', 6),
(42, 'assets/img/product/adidas/yeezy350/yeezy350-06.jpg', 6),
(43, 'assets/img/product/adidas/Ee7242/e7242.jpg', 7),
(44, 'assets/img/product/adidas/Ee7242/e7242-01.jpg', 7),
(45, 'assets/img/product/adidas/Ee7242/e7242-02.jpg', 7),
(46, 'assets/img/product/adidas/Ee7242/e7242-03.jpg', 7),
(47, 'assets/img/product/adidas/Ee7242/e7242-04.jpg', 7),
(48, 'assets/img/product/adidas/Ee7242/e7242-05.jpg', 7),
(49, 'assets/img/product/adidas/Ee7242/e7242-06.jpg', 7),
(50, 'assets/img/product/nike/DJ4323/dj4323.jpg', 8),
(51, 'assets/img/product/nike/DJ4323/dj4323-01.jpg', 8),
(52, 'assets/img/product/nike/DJ4323/dj4323-02.jpg', 8),
(53, 'assets/img/product/nike/DJ4323/dj4323-03.jpg', 8),
(54, 'assets/img/product/nike/DJ4323/dj4323-04.jpg', 8),
(55, 'assets/img/product/nike/DJ4323/dj4323-05.jpg', 8),
(56, 'assets/img/product/nike/DJ4323/dj4323-06.jpg', 8),
(57, 'assets/img/product/nike/CD3002/cd3002.jpg', 9),
(58, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(59, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(60, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(61, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(62, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(63, 'assets/img/product/nike/CD3002/cd3002-06.jpg', 9),
(64, 'assets/img/product/nike/CW5591/cw5591.jpg', 10),
(65, 'assets/img/product/nike/CW5591/cw5591-01.jpg', 10),
(66, 'assets/img/product/nike/CW5591/cw5591-02.jpg', 10),
(67, 'assets/img/product/nike/CW5591/cw5591-03.jpg', 10),
(68, 'assets/img/product/nike/CW5591/cw5591-04.jpg', 10),
(69, 'assets/img/product/nike/CW5591/cw5591-05.jpg', 10),
(70, 'assets/img/product/nike/CW5591/cw5591-06.jpg', 10),
(71, 'assets/img/product/nike/DJ852542/dj852542.jpg', 11),
(72, 'assets/img/product/nike/DJ852542/dj852542-01.jpg', 11),
(73, 'assets/img/product/nike/DJ852542/dj852542-02.jpg', 11),
(74, 'assets/img/product/nike/DJ852542/dj852542-03.jpg', 11),
(75, 'assets/img/product/nike/DJ852542/dj852542-04.jpg', 11),
(76, 'assets/img/product/nike/DJ852542/dj852542-05.jpg', 11),
(77, 'assets/img/product/nike/DJ852542/dj852542-06.jpg', 11),
(78, 'assets/img/product/mlb/32SHP/32shp.jpg', 12),
(79, 'assets/img/product/mlb/32SHP/32shp-01.jpg', 12),
(80, 'assets/img/product/mlb/32SHP/32shp-02.jpg', 12),
(81, 'assets/img/product/mlb/32SHP/32shp-03.jpg', 12),
(82, 'assets/img/product/mlb/32SHP/32shp-04.jpg', 12),
(83, 'assets/img/product/mlb/32SHP/32shp-04.jpg', 12),
(84, 'assets/img/product/mlb/32SHP/32shp-06.jpg', 12),
(85, 'assets/img/product/mlb/32SHC/32shc.jpg', 13),
(86, 'assets/img/product/mlb/32SHC/32shc-01.jpg', 13),
(87, 'assets/img/product/mlb/32SHC/32shc-02.jpg', 13),
(88, 'assets/img/product/mlb/32SHC/32shc-03.jpg', 13),
(89, 'assets/img/product/mlb/32SHC/32shc-04.jpg', 13),
(90, 'assets/img/product/mlb/32SHC/32shc-04.jpg', 13),
(91, 'assets/img/product/mlb/32SHC/32shc-06.jpg', 13),
(92, 'assets/img/product/mlb/32SHL/32shl.jpg', 14),
(93, 'assets/img/product/mlb/32SHL/32shl-01.jpg', 14),
(94, 'assets/img/product/mlb/32SHL/32shl-02.jpg', 14),
(95, 'assets/img/product/mlb/32SHL/32shl-03.jpg', 14),
(96, 'assets/img/product/mlb/32SHL/32shl-04.jpg', 14),
(97, 'assets/img/product/mlb/32SHL/32shl-05.jpg', 14),
(98, 'assets/img/product/mlb/32SHL/32shl-06.jpg', 14),
(99, 'assets/img/product/mlb/32SHN/32shn.jpg', 15),
(100, 'assets/img/product/mlb/32SHN/32shn-01.jpg', 15),
(101, 'assets/img/product/mlb/32SHN/32shn-02.jpg', 15),
(102, 'assets/img/product/mlb/32SHN/32shn-03.jpg', 15),
(103, 'assets/img/product/mlb/32SHN/32shn-04.jpg', 15),
(104, 'assets/img/product/mlb/32SHN/32shn-05.jpg', 15),
(105, 'assets/img/product/mlb/32SHN/32shn-06.jpg', 15),
(129, 'assets/img/product/upload/Puma/giay-the-thao-puma-rs-x-radiance-mau-trang-5f914fca44aa8-22102020162426.jpeg', 22),
(131, 'assets/img/product/upload/Puma/363129-13-385-1.jpeg', 23),
(133, 'assets/img/product/upload/Puma/mrshopvn-giay-puma-roma-x-godfather-louis-den-370896-01-1.jpeg', 24),
(135, 'assets/img/product/upload/Puma/giay-nam-puma-scuderia-ferrari-r-cat-motorsport-2-jpg-1637123666-17112021113426.jpeg', 25);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_lines`
--

CREATE TABLE `product_lines` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `product_line` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product_lines`
--

INSERT INTO `product_lines` (`id`, `description`, `product_line`) VALUES
(1, 'Low – Top là một trong những thiết kế có phần cổ giày thấp dưới mắt cá chân. Giày sneaker Low – Top thường phù hợp sử dụng vào mùa hè vì mang thiết kế gọn nhẹ, độ nặng vừa phải, dễ dàng tháo ra và mang vào nhanh chóng. Mẫu giày sneaker này phù hợp cho mọi', 'Low – Top'),
(2, 'Mid – Top là một thiết kế có cổ giày nằm giữa và che đi mắt ca chân. Dòng giày sneaker Mid – Top ít được sản xuất nên mẫu mã không đa dạng như Low – Top, nhưng với những fan của sneaker sẽ không bỏ qua những siêu phẩm tiêu biểu của dòng giày này như: Gius', 'Mid – Top'),
(3, 'High – Top là dòng có cổ giày che đi mắt cá chân và cao hơn Mid – Top. Dòng giày sneaker High – Top thường được thiết kế khá thô và nặng so với Low – Top. High – Top được yêu thích sử dụng để chơi những bộ môn thể thao như bóng rổ nhằm bảo vệ chân tránh k', 'High – Top');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rating_and_review`
--

CREATE TABLE `rating_and_review` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `orders_detail_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `rating_and_review`
--

INSERT INTO `rating_and_review` (`id`, `created_at`, `created_by`, `deleted`, `updated_at`, `updated_by`, `rating`, `review`, `orders_detail_id`) VALUES
(2, '2021-12-17 20:32:50', 11, 0, '2021-12-17 20:33:04', 0, 4, 'Sản phẩm chất lượng tốt', 8),
(47, '2021-12-18 23:41:41', 10, 0, '2021-12-18 23:41:41', 10, 5, '', 3),
(49, '2021-12-19 00:05:40', 11, 0, '2021-12-19 00:05:40', 11, 4, '', 55),
(50, '2021-12-19 00:10:07', 12, 0, '2021-12-19 10:50:00', 12, 2, 'Sản phẩm chưa tốt so với giá', 58),
(55, '2021-12-19 17:33:45', 12, 0, '2021-12-19 17:33:45', 12, 3, '', 59),
(56, '2021-12-19 17:34:07', 12, 0, '2021-12-19 17:34:07', 12, 5, 'Sản phẩm chất lượng tốt', 62),
(57, '2021-12-19 17:54:05', 10, 0, '2022-01-02 11:20:28', 10, 4, 'Giày đẹp', 1),
(58, '2021-12-19 19:27:02', 10, 0, '2021-12-19 19:27:02', 10, 5, 'Sản phẩm tốt, giao hàng nhanh', 2),
(59, '2021-12-22 23:17:10', 11, 0, '2021-12-22 23:26:01', 11, 3, '', 67),
(60, '2022-01-01 20:58:29', 10, 0, '2022-01-01 20:58:29', 10, 4, '', 75),
(61, '2022-01-01 20:58:35', 10, 0, '2022-01-01 20:58:35', 10, 5, '', 76),
(62, '2022-01-01 22:22:03', 18, 0, '2022-01-01 22:22:03', 18, 5, '', 77),
(63, '2022-01-01 23:21:52', 18, 0, '2022-01-01 23:21:52', 18, 4, '', 78),
(64, '2022-01-02 10:58:13', 18, 0, '2022-01-02 10:58:13', 18, 5, '', 79),
(65, '2022-01-02 11:19:03', 10, 0, '2022-01-02 11:19:03', 10, 5, '', 80);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_permission`
--

CREATE TABLE `t_permission` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `permission_key` varchar(255) DEFAULT NULL,
  `permission_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_permission`
--

INSERT INTO `t_permission` (`id`, `created_at`, `created_by`, `deleted`, `updated_at`, `updated_by`, `permission_key`, `permission_name`) VALUES
(1, NULL, NULL, 0, NULL, NULL, 'USER_CREATE', 'tạo user'),
(2, NULL, NULL, 0, NULL, NULL, 'USER_READ', 'xem user'),
(3, NULL, NULL, 0, NULL, NULL, 'USER_UPDATE', 'sửa user'),
(4, NULL, NULL, 0, NULL, NULL, 'USER_DELETE', 'xóa user');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_role`
--

CREATE TABLE `t_role` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `role_key` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_role`
--

INSERT INTO `t_role` (`id`, `created_at`, `created_by`, `deleted`, `updated_at`, `updated_by`, `role_key`, `role_name`) VALUES
(1, NULL, NULL, 0, NULL, NULL, 'ROLE_ADMIN', 'Supper User'),
(2, NULL, NULL, 0, NULL, NULL, 'ROLE_CUSTOMER', 'Khách'),
(3, NULL, NULL, 0, NULL, NULL, 'ROLE_MANAGER', 'Quan ly');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_role_permission`
--

CREATE TABLE `t_role_permission` (
  `role_id` bigint(20) NOT NULL,
  `permission_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_role_permission`
--

INSERT INTO `t_role_permission` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(3, 2),
(3, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_token`
--

CREATE TABLE `t_token` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `token` varchar(1000) DEFAULT NULL,
  `token_exp_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_token`
--

INSERT INTO `t_token` (`id`, `created_at`, `created_by`, `deleted`, `updated_at`, `updated_by`, `token`, `token_exp_date`) VALUES
(96, '2021-12-12 09:38:36', 0, 0, '2021-12-12 09:38:36', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNDA3MTYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.3RhP2OqJjLzCIxJsHyl5QS4BJqA5i0nQRRMnBRmC5yU', '2021-12-22 09:38:36'),
(97, '2021-12-12 09:40:44', 0, 0, '2021-12-12 09:40:44', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNDA4NDQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.hKX0kk_9K1XwwDNSC7fjGC3abVWJGwcRV2kNQLRMkcU', '2021-12-22 09:40:44'),
(98, '2021-12-12 09:41:00', 0, 0, '2021-12-12 09:41:00', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNDA4NjAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.dv99_HJ5ql-VfD_8wmTzw9z0VXkgf7Nse9Z-G3eptr8', '2021-12-22 09:41:00'),
(99, '2021-12-12 10:23:35', 0, 0, '2021-12-12 10:23:35', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNDM0MTUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.0E9eGrqgGsfKuMgVJmPpKtrRiiskphHB5w40wpg3dKA', '2021-12-22 10:23:35'),
(100, '2021-12-12 10:35:23', 0, 0, '2021-12-12 10:35:23', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNDQxMjMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.GE1oz20HAtKrYWTIlJqOT5j6ZlPYYv4vmnW-yJKzvBE', '2021-12-22 10:35:23'),
(101, '2021-12-12 12:18:04', 0, 0, '2021-12-12 12:18:04', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNTAyODQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.poavP0Bjmp1x59CMa8cuJsYgZLrWCq5m_qq8jeIjbvM', '2021-12-22 12:18:04'),
(102, '2021-12-12 12:31:07', 0, 0, '2021-12-12 12:31:07', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNTEwNjcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.FX6YvzByaW7lEHdlw8d5ol57d32XH4DYcUSa64k9rJQ', '2021-12-22 12:31:07'),
(103, '2021-12-12 20:06:39', 0, 0, '2021-12-12 20:06:39', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNzgzOTksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.3ewFXQA0pUZEdTHcaZc-JIy8ijB1HzJcKceuRrn3CMA', '2021-12-22 20:06:39'),
(104, '2021-12-12 20:18:40', 0, 0, '2021-12-12 20:18:40', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNzkxMjAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.08hfttf-CHjaEYxBke6U6h4iGuqjeF3FT7c90tJqeGs', '2021-12-22 20:18:40'),
(105, '2021-12-12 20:18:56', 0, 0, '2021-12-12 20:18:56', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNzkxMzYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.ONkjkFqsAX38dDp1PwrN1Ij3v6_PAUHmAzr7Qskhgv8', '2021-12-22 20:18:56'),
(106, '2021-12-12 20:19:18', 0, 0, '2021-12-12 20:19:18', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNzkxNTgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.vwJk-trRpj5dhi9pN-ra4MksjUF7PrrFsbfJKI5cgW0', '2021-12-22 20:19:18'),
(107, '2021-12-12 20:32:22', 0, 0, '2021-12-12 20:32:22', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxNzk5NDIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.Beo5OIwdbCXYfcJ7qoRxeY7wWPEdqktwgI3AANSAosc', '2021-12-22 20:32:22'),
(108, '2021-12-12 21:03:40', 0, 0, '2021-12-12 21:03:40', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODE4MTksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.FRJ_sCsDccmvRzCJtHMIh3XR2soityrYZL2xlZD9vfs', '2021-12-22 21:03:40'),
(109, '2021-12-12 21:05:03', 0, 0, '2021-12-12 21:05:03', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODE5MDMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.YEiAkJCA_jwDURQu6FKMUW2nZ7tsU_6zQnnp2VMlWUc', '2021-12-22 21:05:03'),
(110, '2021-12-12 21:05:21', 0, 0, '2021-12-12 21:05:21', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODE5MjEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.whi_PUqjbtGhGs9ao7UB5UcEi8w_EpRhKanG_wdnxd4', '2021-12-22 21:05:21'),
(111, '2021-12-12 21:13:16', 0, 0, '2021-12-12 21:13:16', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODIzOTYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.OBZUg8WCOatH_o67E9Knj7cjb-52HCwRq0_Y7OT5sas', '2021-12-22 21:13:16'),
(112, '2021-12-12 22:09:53', 0, 0, '2021-12-12 22:09:53', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODU3OTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.jSPf1LdRWHvf7Z0QRuWBIyfJ3vzBkelg7Mi7kF7vg_4', '2021-12-22 22:09:53'),
(113, '2021-12-12 23:19:47', 0, 0, '2021-12-12 23:19:47', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxODk5ODcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.b3NmTHQ7HNHZrhnpD-p07F31bbNyuPidVtPObxD2m10', '2021-12-22 23:19:47'),
(114, '2021-12-12 23:30:06', 0, 0, '2021-12-12 23:30:06', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxOTA2MDYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.-wK4PVi9cvubK3NsRBRukqdwqfHza5ZGoQmcaeOb4YA', '2021-12-22 23:30:06'),
(115, '2021-12-12 23:52:46', 0, 0, '2021-12-12 23:52:46', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxOTE5NjYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.B853niwtd7DUwqhSvuuuiwgy2KzFlb1_q1iErZnKHCk', '2021-12-22 23:52:46'),
(116, '2021-12-12 23:53:58', 0, 0, '2021-12-12 23:53:58', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxOTIwMzgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOltdLCJ1c2VybmFtZSI6InRyYW5ndGgifX0.rk-e9RNHdgvneeHhZKP2c8Iwd-trEVOLYEA6ROTVYBo', '2021-12-22 23:53:58'),
(117, '2021-12-14 20:36:07', 0, 0, '2021-12-14 20:36:07', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAzNTI5NjcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.1CU-OBzryQ1A55xtDW6MqoNcCG_e69_194XPYobd8oY', '2021-12-24 20:36:07'),
(118, '2021-12-15 23:16:39', 0, 0, '2021-12-15 23:16:39', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA0NDg5OTksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.gTJHp6crfj4lz1i9k7_SLI2viNAjyk8aJuuVy1Bcv5Y', '2021-12-25 23:16:39'),
(119, '2021-12-16 22:58:17', 0, 0, '2021-12-16 22:58:17', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA1MzQyOTcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkRXhCSHNZcVhtd1NkWTlBaUk0M0VTZThIWUVwY2s0cGJlMlNiNmkwbmVNUkY3OFBNaExOcGEiLCJ1c2VySWQiOjEyLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoidHVhbm52In19.5CU3CIsJ3Pbkzr3smS7U1eKzfAHIy3-Ok9_hXsjWpro', '2021-12-26 22:58:17'),
(120, '2021-12-18 10:21:54', 0, 0, '2021-12-18 10:21:54', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2NjE3MTQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.PP8dRx5K23FTuMuHtYRXu8Rp5i7iUJOn5MygQF6HUCU', '2021-12-28 10:21:54'),
(121, '2021-12-18 16:12:30', 0, 0, '2021-12-18 16:12:30', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2ODI3NTAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.EZ8tQAZKwbFDGPlUHEQlxeHI_8SZu0ubbptrCg7B6to', '2021-12-28 16:12:30'),
(122, '2021-12-18 18:02:13', 0, 0, '2021-12-18 18:02:13', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2ODkzMzMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6W10sInVzZXJuYW1lIjoiYmluaHRkIn19.l7TWobjpOegg1ln4HGf82wgvxsSDdwgXsvkPEI3eNB4', '2021-12-28 18:02:13'),
(123, '2021-12-18 19:48:15', 0, 0, '2021-12-18 19:48:15', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTU2OTUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.pJ-Jh3EDBwzAqLv8TuSPC7Od0BePi5N4I0sj-Fujl6o', '2021-12-28 19:48:15'),
(124, '2021-12-18 19:48:54', 0, 0, '2021-12-18 19:48:54', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTU3MzQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.E9xgvvjvHdlWUkHhc3QOUT7kEA6DKj68n4zeTgpqPDg', '2021-12-28 19:48:54'),
(125, '2021-12-18 19:50:14', 0, 0, '2021-12-18 19:50:14', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTU4MTQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.Ihjkp7ue_-U6VUyp8eusga0jBkWRKtPNnp4odZ3UhdQ', '2021-12-28 19:50:14'),
(126, '2021-12-18 19:50:23', 0, 0, '2021-12-18 19:50:23', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTU4MjMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.ogh-Tm6j5Up66Lxq4sO35ciPYHM4V5qNVMGdQMldrFk', '2021-12-28 19:50:23'),
(127, '2021-12-18 19:57:18', 0, 0, '2021-12-18 19:57:18', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTYyMzgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.iZrayt9nY5zXtLk8As_DFjSoSEzvTtziDv6XT9FX85Y', '2021-12-28 19:57:18'),
(128, '2021-12-18 19:57:30', 0, 0, '2021-12-18 19:57:30', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTYyNTAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.cCBCmAzBTjk6ivNanlEIfPa5cXrzVlqZEveNxj3OGys', '2021-12-28 19:57:30'),
(129, '2021-12-18 19:57:54', 0, 0, '2021-12-18 19:57:54', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTYyNzQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.MvD9Qh9oCRuHCGhNzgDi5DV3boamAAZlZp6gZXPyk3w', '2021-12-28 19:57:54'),
(130, '2021-12-18 19:59:00', 0, 0, '2021-12-18 19:59:00', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTYzNDAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.OLQknGHFURQc75s9jpxTkFFaV3s9ETSu1DDKaA42slQ', '2021-12-28 19:59:00'),
(131, '2021-12-18 19:59:37', 0, 0, '2021-12-18 19:59:37', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTYzNzcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.gUyYZi2sbxxRTXon6q4AtZbUpaAWnXn53QObfby6RdU', '2021-12-28 19:59:37'),
(132, '2021-12-18 20:01:01', 0, 0, '2021-12-18 20:01:01', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA2OTY0NjEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.s64tOg-scYS6sDYka9FepZmCtNufXRRzmOmw1pxtLSM', '2021-12-28 20:01:01'),
(133, '2021-12-18 23:46:33', 0, 0, '2021-12-18 23:46:33', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MDk5OTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.du8Aq6tm9yqCLFsQAetieab15ayn-O6aeY3zrnX9A_4', '2021-12-28 23:46:33'),
(134, '2021-12-18 23:58:25', 0, 0, '2021-12-18 23:58:25', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MTA3MDUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.PwO0CTPmjZzhUE2W52JbL4SYBaVshfwuGZ0D_64t4iU', '2021-12-28 23:58:25'),
(135, '2021-12-18 23:59:04', 0, 0, '2021-12-18 23:59:04', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MTA3NDQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.gyNBOaMqS3S6adZR3mE4IdF-cHWUPig-AgkU7QVvcwI', '2021-12-28 23:59:04'),
(136, '2021-12-19 00:02:07', 0, 0, '2021-12-19 00:02:07', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MTA5MjcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOltdLCJ1c2VybmFtZSI6InRyYW5ndGgifX0.8I0ITD3bubnOtkSasMxaAeV6WhweqjMDsKvbx7a1vA0', '2021-12-29 00:02:07'),
(137, '2021-12-19 00:05:29', 0, 0, '2021-12-19 00:05:29', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MTExMjksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.WoMVeqXoJGunEdYkzn1xsURCBxfuW1aEHfcrjoXpsjk', '2021-12-29 00:05:29'),
(138, '2021-12-19 00:06:10', 0, 0, '2021-12-19 00:06:10', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3MTExNzAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkRXhCSHNZcVhtd1NkWTlBaUk0M0VTZThIWUVwY2s0cGJlMlNiNmkwbmVNUkY3OFBNaExOcGEiLCJ1c2VySWQiOjEyLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0dWFubnYifX0.n684F9w7dog6lMyiP5wt5gDts8FrkUHPPHFYGyWVY0I', '2021-12-29 00:06:10'),
(139, '2021-12-19 11:28:44', 0, 0, '2021-12-19 11:28:44', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NTIxMjQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.JagcbIbAUK2pikKarFi1um1rpyHOzQTjWaC_VXfhaEg', '2021-12-29 11:28:44'),
(140, '2021-12-19 13:57:50', 0, 0, '2021-12-19 13:57:50', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjEwNzAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.o5GvtXuQXQP2rNLAS_uucM3IrV96iD-qguv4Z3LDlFU', '2021-12-29 13:57:50'),
(141, '2021-12-19 14:29:02', 0, 0, '2021-12-19 14:29:02', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjI5NDIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.Y3DXY_0kaRZ2OcpWdE4SXTds6KOypO6Mi3muRZktZek', '2021-12-29 14:29:02'),
(142, '2021-12-19 14:29:38', 0, 0, '2021-12-19 14:29:38', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjI5NzgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.g6MScKKuRcxFir-wnJEp0B850xRCrffEy_heVBfF8wc', '2021-12-29 14:29:38'),
(143, '2021-12-19 14:45:53', 0, 0, '2021-12-19 14:45:53', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjM5NTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.e6C01kJdacd2goHQbApI834UsfEbAONpHnaW8S7oyBQ', '2021-12-29 14:45:53'),
(144, '2021-12-19 14:52:40', 0, 0, '2021-12-19 14:52:40', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjQzNTksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.iEfO76oSn97VS2HjnGvb2QB3TjgoaxVS4r4-BTbPAHk', '2021-12-29 14:52:39'),
(145, '2021-12-19 15:01:48', 0, 0, '2021-12-19 15:01:48', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjQ5MDgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.CCr6j9WNOfZt4zI318Aym0524OBHVaaqdK_bDv3QJb4', '2021-12-29 15:01:48'),
(146, '2021-12-19 15:06:02', 0, 0, '2021-12-19 15:06:02', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjUxNjIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.U1u72vpoEo4SIKh-fUJlC1StIgSdFfwEkE9GUKW9RNs', '2021-12-29 15:06:02'),
(147, '2021-12-19 15:36:42', 0, 0, '2021-12-19 15:36:42', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NjcwMDIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.ELg_FOeScyGp1i8FU-tP50Yw2txHyduaYCnj7vFgLFA', '2021-12-29 15:36:42'),
(148, '2021-12-19 17:33:13', 0, 0, '2021-12-19 17:33:13', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzM5OTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkRXhCSHNZcVhtd1NkWTlBaUk0M0VTZThIWUVwY2s0cGJlMlNiNmkwbmVNUkY3OFBNaExOcGEiLCJ1c2VySWQiOjEyLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0dWFubnYifX0.Sym1JmJiNXvw6g-DUPiqKfq5V9b5syNLH0j5DEWaGf8', '2021-12-29 17:33:13'),
(149, '2021-12-19 17:36:25', 0, 0, '2021-12-19 17:36:25', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzQxODUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.TAcaOH8wMM1YFxLvTxgLQQf8R0lRd0AVg1lv0pmum2U', '2021-12-29 17:36:25'),
(150, '2021-12-19 17:46:46', 0, 0, '2021-12-19 17:46:46', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzQ4MDYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.2Fr03Ad7luoJVKTmD61kirOUFavGLqk9aKVjzItdqYU', '2021-12-29 17:46:46'),
(151, '2021-12-19 17:48:32', 0, 0, '2021-12-19 17:48:32', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzQ5MTIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.5_FjS2ryNJn_rVkb3oVtRcZU00ZwZyqaN0oEAefKJ7g', '2021-12-29 17:48:32'),
(152, '2021-12-19 17:48:41', 0, 0, '2021-12-19 17:48:41', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzQ5MjEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.8-EHTkGskI0_pV0Ogh_QvsvDuEWGOkhpn3j9Z0ODhUE', '2021-12-29 17:48:41'),
(153, '2021-12-19 17:49:25', 0, 0, '2021-12-19 17:49:25', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzQ5NjUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.R0OpI1FzV823SW_h6-U0KSOMBHqY6Psp9m61tD9LQkU', '2021-12-29 17:49:25'),
(154, '2021-12-19 17:52:05', 0, 0, '2021-12-19 17:52:05', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzUxMjUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.pNzAvb8rHgBnwbez4v8DZfQDf1d7nkj99bdl7RuhtWk', '2021-12-29 17:52:05'),
(155, '2021-12-19 17:53:09', 0, 0, '2021-12-19 17:53:09', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzUxODksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.SrbWbbyUv0MLDE4-sxesvVR-XlmcfMqJwex14zXeX2c', '2021-12-29 17:53:09'),
(156, '2021-12-19 17:53:24', 0, 0, '2021-12-19 17:53:24', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzUyMDQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.Dl60O4HVte8NptNMJ_-4dq5g3rIp6qmIJNwKaC6QIFw', '2021-12-29 17:53:24'),
(157, '2021-12-19 17:53:31', 0, 0, '2021-12-19 17:53:31', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzUyMTEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.rbDceCS05JUzBq199CJIjz5-FvPW4zcHEyKiBoQNd8E', '2021-12-29 17:53:31'),
(158, '2021-12-19 18:00:52', 0, 0, '2021-12-19 18:00:52', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3NzU2NTIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.Z_La_R2CuHf8wLQ9duK2Qw9utHhcaXugD3C0KLBk9Hg', '2021-12-29 18:00:52'),
(159, '2021-12-19 19:20:56', 0, 0, '2021-12-19 19:20:56', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3ODA0NTYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.giHOeOrZa3ZChMf8MDeAtAmeR84UTmLxe2avlsLJpkI', '2021-12-29 19:20:56'),
(160, '2021-12-19 20:14:25', 0, 0, '2021-12-19 20:14:25', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3ODM2NjUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.dhS_d240HOFCCBFWaAuoJPgMbAteJZjNxqn3lSam7g0', '2021-12-29 20:14:25'),
(161, '2021-12-19 20:20:14', 0, 0, '2021-12-19 20:20:14', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3ODQwMTQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.bmWt5kbaRHbUtCE0MhV1wvco_WaJqj68zXvqOHl4bnM', '2021-12-29 20:20:14'),
(162, '2021-12-19 23:06:12', 0, 0, '2021-12-19 23:06:12', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTM5NzEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.MfsSodMJA_cOwv8h3Zto1szC1rBi0NlgOOomQZk9hJ0', '2021-12-29 23:06:12'),
(163, '2021-12-19 23:08:31', 0, 0, '2021-12-19 23:08:31', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTQxMTEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.Zs5MQPYrovmNfwJC5YvSqk_eK1ishlVbi7dtPF4HZTw', '2021-12-29 23:08:31'),
(164, '2021-12-19 23:09:11', 0, 0, '2021-12-19 23:09:11', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTQxNTEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkdjJUemxiT3ZlVkkxMmEuQWhEMXc1ZWxZM3lVcUJWRFBUNTZYUVVoU3RST3hER0R2Lnh5b3EiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.uFSgvfvnW2EuSMmdGmaGNat7BUdc3Cke6r-20a52Z8o', '2021-12-29 23:09:11'),
(165, '2021-12-19 23:12:21', 0, 0, '2021-12-19 23:12:21', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTQzNDEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkN0VGM1I3ODlnaHFRZ1dUbGRBYmtLLld1MVNOZ01IRlJ5dDZlUWVVbHA5eTlQSmRZd1VyT3UiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.RYwHuY1pMM2zOnFMnAbRFhP9Qz5u-KE9gOtcdZ0WnoM', '2021-12-29 23:12:21'),
(166, '2021-12-19 23:53:15', 0, 0, '2021-12-19 23:53:15', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTY3OTUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkN0VGM1I3ODlnaHFRZ1dUbGRBYmtLLld1MVNOZ01IRlJ5dDZlUWVVbHA5eTlQSmRZd1VyT3UiLCJ1c2VySWQiOjEwLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJiaW5odGQifX0.XD4aD0f2x9ohCHUPIh2r4XMrrOR1IS9Ha9NKqSbKfEY', '2021-12-29 23:53:15'),
(167, '2021-12-19 23:54:15', 0, 0, '2021-12-19 23:54:15', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTY4NTUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkTGZxWk9JXC9wM1BGamxCdFwvT1lXYTVlWjRhNEVNanU2VkVaeHBDLnVkbi5PeTVUbkJOZVJpSyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.CnLmrKBIgRgIwi9vgYtyRgsB2jd9nRmaBbXF0E_Tets', '2021-12-29 23:54:15'),
(168, '2021-12-19 23:58:29', 0, 0, '2021-12-19 23:58:29', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTcxMDksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkTGZxWk9JXC9wM1BGamxCdFwvT1lXYTVlWjRhNEVNanU2VkVaeHBDLnVkbi5PeTVUbkJOZVJpSyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.Xh7kNp4W-bgugAuT9NDtU5_Dwyoesh9xO6lMVuPO1JI', '2021-12-29 23:58:29'),
(169, '2021-12-19 23:59:25', 0, 0, '2021-12-19 23:59:25', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTcxNjUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkSkVcL3JySE15ZG1OYWlVLm1hNWM2Rk9rUVM2VFFCVFNwMW4zMG1Wam40T3M0aGhTRlU5bTBTIiwidXNlcklkIjoxMCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoiYmluaHRkIn19.zlFs7HHPVreppNH4lyhAAxUVFhQo72E3QO9rYO9R5XQ', '2021-12-29 23:59:25'),
(170, '2021-12-20 00:04:07', 0, 0, '2021-12-20 00:04:07', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTc0NDcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.e9pLnhFGjMOPV3rSFKZE-xVE4hcwJ5vamRfI3ZE0078', '2021-12-30 00:04:07'),
(171, '2021-12-20 00:04:13', 0, 0, '2021-12-20 00:04:13', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTc0NTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.6b13YOTQnJbBcNd7p9pbBOkRzU7RtbpjGmVcajolvj0', '2021-12-30 00:04:13'),
(172, '2021-12-20 00:05:26', 0, 0, '2021-12-20 00:05:26', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA3OTc1MjYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.6Qg6oozRv1Q3SBN3VSw0TAezdLGGE1JaXJqgfqxZEB0', '2021-12-30 00:05:26'),
(173, '2021-12-20 21:36:45', 0, 0, '2021-12-20 21:36:45', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA4NzUwMDUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.CDrZPxC2V2UOwuFF6TRMpphCkAR-XaKE4Ibm8WKmIcQ', '2021-12-30 21:36:45'),
(174, '2021-12-20 21:40:28', 0, 0, '2021-12-20 21:40:28', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA4NzUyMjgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.BIfG2mbhf0EBnxK6ogugOZZIJ0b6dnKQHwQvz16b6eg', '2021-12-30 21:40:28'),
(175, '2021-12-20 21:48:44', 0, 0, '2021-12-20 21:48:44', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA4NzU3MjQsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.-vau0t30RKc3OcYHgjm0xroX0r2UFhtToG0X-1xXdVc', '2021-12-30 21:48:44'),
(176, '2021-12-22 01:13:48', 0, 0, '2021-12-22 01:13:48', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA5NzQ0MjgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.VMxdvOTq8Sf4O3agCdo6x4k9rCpIU3_zNhtW9AmT5c0', '2022-01-01 01:13:48'),
(177, '2021-12-22 01:21:10', 0, 0, '2021-12-22 01:21:10', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA5NzQ4NzAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.P8hifnRngMYByODuzgi4vegjTpco6GIxyQntLHqnR7c', '2022-01-01 01:21:10'),
(178, '2021-12-22 01:21:30', 0, 0, '2021-12-22 01:21:30', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDA5NzQ4OTAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.gK6nwUtT54ZtMvW-l6_4-5lzS-oWNOTWvBX4rKhDrFc', '2022-01-01 01:21:30'),
(179, '2021-12-22 23:18:16', 0, 0, '2021-12-22 23:18:16', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDEwNTM4OTYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.2LLdM1P7zpCfpSCRrIDb_zl4qxT312JyoPiE76Sn_R0', '2022-01-01 23:18:16'),
(180, '2021-12-22 23:25:08', 0, 0, '2021-12-22 23:25:08', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDEwNTQzMDgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.1DD5et8-XpQNlOxHrw7oweL5cGVMcV-utdNb_nJABt4', '2022-01-01 23:25:08'),
(181, '2021-12-23 01:22:52', 0, 0, '2021-12-23 01:22:52', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDEwNjEzNzIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkRXhCSHNZcVhtd1NkWTlBaUk0M0VTZThIWUVwY2s0cGJlMlNiNmkwbmVNUkY3OFBNaExOcGEiLCJ1c2VySWQiOjEyLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0dWFubnYifX0.hLG0z0LDd5IzHBgsrUib0kSSvqSzlkrXKIojoRHSv-U', '2022-01-02 01:22:52'),
(182, '2021-12-23 20:32:31', 0, 0, '2021-12-23 20:32:31', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExMzAzNTEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkNFMuY1VkNjZLRFd0YUx4M2FLMVRYZWx2YUFkNHZ4dy50XC9zZWRCRVcxb1dNbWZyQzVSY2EyIiwidXNlcklkIjoxMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiIsIlVTRVJfQ1JFQVRFIl0sInVzZXJuYW1lIjoidHJhbmd0aCJ9fQ.aeddfmcf-37ai3wOW4NvGlUUONqSuT47tXZg1S4wLeY', '2022-01-02 20:32:31'),
(183, '2021-12-23 21:24:11', 0, 0, '2021-12-23 21:24:11', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExMzM0NTEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.D2L5IlZ2XhFr5lEu4bCGc4n54NzYMuFMgmMs6HtTTWM', '2022-01-02 21:24:11'),
(184, '2021-12-23 23:09:23', 0, 0, '2021-12-23 23:09:23', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExMzk3NjMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.9DTBMOCpqfAiFU2yobVezhs3mYpJGssPrpcIuFsEaps', '2022-01-02 23:09:23'),
(185, '2021-12-23 23:34:42', 0, 0, '2021-12-23 23:34:42', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExNDEyODIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.WHzM6oGQReWeMMKIUWB3a4BJNLXuM6wUCEuLihlHcUs', '2022-01-02 23:34:42'),
(186, '2021-12-23 23:34:59', 0, 0, '2021-12-23 23:34:59', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExNDEyOTksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.jFh75zDczQHTH3u1KzslXkZQt87w3E6i1lpTm7NMCl4', '2022-01-02 23:34:59'),
(187, '2021-12-24 00:13:01', 0, 0, '2021-12-24 00:13:01', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExNDM1ODEsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkRXhCSHNZcVhtd1NkWTlBaUk0M0VTZThIWUVwY2s0cGJlMlNiNmkwbmVNUkY3OFBNaExOcGEiLCJ1c2VySWQiOjEyLCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0dWFubnYifX0.niHbU2y_sKsm1fO2RMCC53zaeIA9BGl5jzfML5blme0', '2022-01-03 00:13:01'),
(188, '2021-12-24 00:48:06', 0, 0, '2021-12-24 00:48:06', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDExNDU2ODYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.gT9UwHv2dFPUaUb-fUkkGuwSiSq_2isWn_dxoyPuKyw', '2022-01-03 00:48:06'),
(189, '2022-01-01 17:40:45', 0, 0, '2022-01-01 17:40:45', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE4OTc2NDUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.vYf5zcigueuqjo3ejLWS47qSyQQbr46E1PiyP1VecCY', '2022-01-11 17:40:45'),
(190, '2022-01-01 17:41:12', 0, 0, '2022-01-01 17:41:12', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE4OTc2NzIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.hY0jXmqgQB1nAoJlNOSH_bkCK8AjUrBvdjubqulq3sE', '2022-01-11 17:41:12'),
(191, '2022-01-01 20:20:38', 0, 0, '2022-01-01 20:20:38', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5MDcyMzcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.j5I2E9pqgsOkzAdLjUfyM3up-lPeIkT2m7cihnsqcxs', '2022-01-11 20:20:37'),
(192, '2022-01-01 21:46:23', 0, 0, '2022-01-01 21:46:23', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5MTIzODMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.GcYRzjWK97HOOpsKuIn1pkNqcKY1IrZKKdx4piOHSKU', '2022-01-11 21:46:23'),
(193, '2022-01-01 22:16:58', 0, 0, '2022-01-01 22:16:58', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5MTQyMTgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.fEwTso6G7S7pRiRdWrn8N7kz1skibmdGMPHTP-mHTa0', '2022-01-11 22:16:58'),
(194, '2022-01-01 22:21:06', 0, 0, '2022-01-01 22:21:06', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5MTQ0NjYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.0ILMrI33GrM7GPl408goPErmuk_SS6ieJLzV_yfD4rg', '2022-01-11 22:21:06'),
(195, '2022-01-02 08:51:05', 0, 0, '2022-01-02 08:51:05', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTIyNjUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.DQRPmi6Sf-7xPfJQUNHy8v5hERSP48JwHPRrkoWr8mI', '2022-01-12 08:51:05'),
(196, '2022-01-02 09:23:32', 0, 0, '2022-01-02 09:23:32', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTQyMTIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.AIqqxgl3xkWRmW-tAW_I5Ax_OHoNdcG18ZtZcrVCSX8', '2022-01-12 09:23:32'),
(197, '2022-01-02 09:23:59', 0, 0, '2022-01-02 09:23:59', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTQyMzksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.gu0WgtK_73vkNcOKQlL37XPhMxtSHaCCT4CZM6but3c', '2022-01-12 09:23:59'),
(198, '2022-01-02 09:25:18', 0, 0, '2022-01-02 09:25:18', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTQzMTgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.ogfq58js6e4ZiblRL3wQ42eMQEn0ekN0uuZPTyCbTb4', '2022-01-12 09:25:18'),
(199, '2022-01-02 09:46:57', 0, 0, '2022-01-02 09:46:57', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTU2MTcsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.-yJOOklAx2Dh02wgkjpRuC3NtKLBGLLKDGLF7aSC2tI', '2022-01-12 09:46:57'),
(200, '2022-01-02 09:55:00', 0, 0, '2022-01-02 09:55:00', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTYxMDAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.1Rq38_3_pKAkqlz3qCd9YGMlngNNTuum-KApWmoCYEY', '2022-01-12 09:55:00'),
(201, '2022-01-02 09:55:08', 0, 0, '2022-01-02 09:55:08', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTYxMDgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.QIgaI6GBOM1virNW8yoE5q1mkqApx-K3M7pfMXKXEnY', '2022-01-12 09:55:08'),
(202, '2022-01-02 09:57:08', 0, 0, '2022-01-02 09:57:08', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTYyMjgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.5BtJSaAYrPb1TBVHEgjlEOEAjlNCJ81QjqNm3uCiovU', '2022-01-12 09:57:08'),
(203, '2022-01-02 10:02:43', 0, 0, '2022-01-02 10:02:43', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTY1NjMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.ESxWc-FcjveVB8iMwUxgWqlv3Q8xd-T3Hk1qeW1U5VI', '2022-01-12 10:02:43'),
(204, '2022-01-02 10:03:23', 0, 0, '2022-01-02 10:03:23', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTY2MDMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.wivGNTVBdUteyAFgHuWJs9bukrbcqQs0LMDMac91M2E', '2022-01-12 10:03:23'),
(205, '2022-01-02 10:43:26', 0, 0, '2022-01-02 10:43:26', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTkwMDYsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX1VQREFURSIsIlVTRVJfQ1JFQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.4P9b6Br7HGuvfZJfP_5ZT06x6xmRDHjRyEs-JOMGhdM', '2022-01-12 10:43:26'),
(206, '2022-01-02 10:49:39', 0, 0, '2022-01-02 10:49:39', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTkzNzksInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.1P7I9yBUZRmiISBIHkC-Q-KBo702ArVgsDhxEydd7BM', '2022-01-12 10:49:39'),
(207, '2022-01-02 10:55:48', 0, 0, '2022-01-02 10:55:48', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTk3NDgsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.f8wz0_1GbRObRxQKEQ8ucTPPNSCma6gReWJVdSjtnzY', '2022-01-12 10:55:48'),
(208, '2022-01-02 10:57:20', 0, 0, '2022-01-02 10:57:20', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NTk4NDAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.-5VowrsZkgIb_JjzIOLc33LRorlsCCXQEa89GAEeV5Y', '2022-01-12 10:57:20'),
(209, '2022-01-02 11:00:00', 0, 0, '2022-01-02 11:00:00', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NjAwMDAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.lxQUTAlANvbWEWzSOjpt3AbDHermVE7T2Vfx0eujC8s', '2022-01-12 11:00:00'),
(210, '2022-01-02 11:00:32', 0, 0, '2022-01-02 11:00:32', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NjAwMzIsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19._fz5Fswl0gfw8Amqfe1HPGQjumcEg3QtJNP-0ya1YZE', '2022-01-12 11:00:32'),
(211, '2022-01-02 11:04:13', 0, 0, '2022-01-02 11:04:13', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NjAyNTMsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZEV3NTVIZjJ2NkNTMU4uUjE1THlYZW90dXF1YUFcL3dxdS5mczRsT2h6OVwvempKdTR5dHpvaSIsInVzZXJJZCI6MiwiYXV0aG9yaXRpZXMiOlsiVVNFUl9ERUxFVEUiLCJVU0VSX0NSRUFURSIsIlVTRVJfVVBEQVRFIiwiUk9MRV9BRE1JTiIsIlVTRVJfUkVBRCJdLCJ1c2VybmFtZSI6Im5hbW52In19.ElYYywrJrwNKrBQ42zpg2PPJCsl6YyiPvNjbtrzOnFw', '2022-01-12 11:04:13'),
(212, '2022-01-02 11:09:45', 0, 0, '2022-01-02 11:09:45', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NjA1ODUsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkZG52TDh5TEdqWmEudkdRUTdIaG5tTzVSQ3d5TWRBa3F4YlJUeHFxUjdmbTgucGRvRFpXQUMiLCJ1c2VySWQiOjE4LCJhdXRob3JpdGllcyI6WyJST0xFX0NVU1RPTUVSIiwiVVNFUl9DUkVBVEUiXSwidXNlcm5hbWUiOiJ0cnVuZ25kIn19.FGJbC_z7jD4RgDkyZtxfUcIMS8yeqonBp0sWG_gTa_k', '2022-01-12 11:09:45'),
(213, '2022-01-02 11:18:30', 0, 0, '2022-01-02 11:18:30', 0, 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE5NjExMTAsInVzZXIiOnsicGFzc3dvcmQiOiIkMmEkMTAkcGkzbzhjZEJNXC9aQ0x1M1FySjF2UWUwamZJME0zeU9WQ1BkNkpQUEFiYmpCM1daS1wvZGFmRyIsInVzZXJJZCI6MTAsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiLCJVU0VSX0NSRUFURSJdLCJ1c2VybmFtZSI6ImJpbmh0ZCJ9fQ.smlSN7OE5CxKM8CPGJjpvkcufIqlhXlJ2AhEUvEENrA', '2022-01-12 11:18:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_user`
--

CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photos` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_user`
--

INSERT INTO `t_user` (`id`, `created_at`, `created_by`, `deleted`, `updated_at`, `updated_by`, `password`, `photos`, `username`) VALUES
(2, '2021-12-11 16:08:46', 2, 0, '2022-01-02 09:01:45', 0, '$2a$10$dEw55Hf2v6CS1N.R15LyXeotuquaA/wqu.fs4lOhz9/zjJu4ytzoi', 'assets/img/user/upload/namnv/bg-01.jpg', 'namnv'),
(10, '2021-12-12 09:37:54', 10, 0, '2021-12-20 00:03:15', 0, '$2a$10$pi3o8cdBM/ZCLu3QrJ1vQe0jfI0M3yOVCPd6JPPAbbjB3WZK/dafG', 'assets\\img\\user\\upload\\binhtd\\sanjaun.com-ceo-tesla-elon-musk-thoi-gia-bitcoin-03.11.jpg', 'binhtd'),
(11, '2021-12-12 23:53:40', 11, 0, '2021-12-20 00:10:57', 0, '$2a$10$4S.cUd66KDWtaLx3aK1TXelvaAd4vxw.t/sedBEW1oWMmfrC5Rca2', 'assets\\img\\user\\upload\\trangth\\hinh-anh-cua-nu-dien-vien-dich-le-nhiet-ba-e1595000890586.jpeg', 'trangth'),
(12, '2021-12-16 22:58:08', 12, 0, '2021-12-16 22:58:08', 0, '$2a$10$ExBHsYqXmwSdY9AiI43ESe8HYEpck4pbe2Sb6i0neMRF78PMhLNpa', 'assets/img/user/user.jpg', 'tuannv'),
(18, '2022-01-01 22:21:00', 18, 0, '2022-01-01 22:21:00', 0, '$2a$10$dnvL8yLGjZa.vGQQ7HhnmO5RCwyMdAkqxbRTxqqR7fm8.pdoDZWAC', 'assets/img/user/user.jpg', 'trungnd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_user_role`
--

CREATE TABLE `t_user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `t_user_role`
--

INSERT INTO `t_user_role` (`user_id`, `role_id`) VALUES
(2, 1),
(10, 2),
(11, 2),
(12, 2),
(18, 2);

-- --------------------------------------------------------

--
-- Cấu trúc cho view `customermoney`
--
DROP TABLE IF EXISTS `customermoney`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `customermoney`  AS SELECT `t1`.`id` AS `id`, `t1`.`CONCAT(customers.first_name,' ',customers.last_name)` AS `CONCAT(customers.first_name,' ',customers.last_name)`, `t1`.`orderId` AS `orderId`, `t2`.`order_id` AS `order_id`, `t2`.`COUNT(order_id)` AS `COUNT(order_id)`, `t2`.`Tổng tiền` AS `Tổng tiền` FROM ((select `customers`.`id` AS `id`,concat(`customers`.`first_name`,' ',`customers`.`last_name`) AS `CONCAT(customers.first_name,' ',customers.last_name)`,`orders`.`id` AS `orderId` from (`customers` join `orders` on(`customers`.`id` = `orders`.`customer_id`))) `t1` join (select `order_details`.`order_id` AS `order_id`,count(`order_details`.`order_id`) AS `COUNT(order_id)`,sum(`order_details`.`quantity_order` * `order_details`.`price_each`) AS `Tổng tiền` from `order_details` group by `order_details`.`order_id`) `t2` on(`t1`.`orderId` = `t2`.`order_id`)) ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6v6x92wb400iwh6unf5rwiim4` (`phone_number`),
  ADD KEY `FKfarlvhlnr0c5lqy5jr1fa253r` (`user_id`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_j9xgmd0ya5jmus09o0b8pqrpb` (`email`),
  ADD KEY `FKb1dyr1y8ndkw0xypf59c9sdkh` (`user_id`);

--
-- Chỉ mục cho bảng `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpxtb8awmi0dk6smoh2vp1litg` (`customer_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  ADD KEY `FK4q98utpd73imf4yhttm3w0eax` (`product_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK45dp0030s8e3myd8n6ky4e79g` (`customer_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_922x4t23nx64422orei4meb2y` (`product_code`),
  ADD KEY `FK1eicg1yvaxh1gqdp2lsda7vlv` (`product_line_id`);

--
-- Chỉ mục cho bảng `product_img`
--
ALTER TABLE `product_img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpxipianjex7mgbqpg5x6i29ht` (`product_id`);

--
-- Chỉ mục cho bảng `product_lines`
--
ALTER TABLE `product_lines`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rating_and_review`
--
ALTER TABLE `rating_and_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdjymxsl76mfiqo7v81ahwm30u` (`orders_detail_id`);

--
-- Chỉ mục cho bảng `t_permission`
--
ALTER TABLE `t_permission`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_role`
--
ALTER TABLE `t_role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_role_permission`
--
ALTER TABLE `t_role_permission`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `FKjobmrl6dorhlfite4u34hciik` (`permission_id`);

--
-- Chỉ mục cho bảng `t_token`
--
ALTER TABLE `t_token`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_user`
--
ALTER TABLE `t_user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `t_user_role`
--
ALTER TABLE `t_user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKa9c8iiy6ut0gnx491fqx4pxam` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=518;

--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `product_img`
--
ALTER TABLE `product_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT cho bảng `product_lines`
--
ALTER TABLE `product_lines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `rating_and_review`
--
ALTER TABLE `rating_and_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `t_permission`
--
ALTER TABLE `t_permission`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `t_role`
--
ALTER TABLE `t_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `t_token`
--
ALTER TABLE `t_token`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT cho bảng `t_user`
--
ALTER TABLE `t_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `FKfarlvhlnr0c5lqy5jr1fa253r` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`);

--
-- Các ràng buộc cho bảng `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `FKb1dyr1y8ndkw0xypf59c9sdkh` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKpxtb8awmi0dk6smoh2vp1litg` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FK4q98utpd73imf4yhttm3w0eax` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FK45dp0030s8e3myd8n6ky4e79g` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK1eicg1yvaxh1gqdp2lsda7vlv` FOREIGN KEY (`product_line_id`) REFERENCES `product_lines` (`id`);

--
-- Các ràng buộc cho bảng `product_img`
--
ALTER TABLE `product_img`
  ADD CONSTRAINT `FKpxipianjex7mgbqpg5x6i29ht` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `rating_and_review`
--
ALTER TABLE `rating_and_review`
  ADD CONSTRAINT `FKdjymxsl76mfiqo7v81ahwm30u` FOREIGN KEY (`orders_detail_id`) REFERENCES `order_details` (`id`);

--
-- Các ràng buộc cho bảng `t_role_permission`
--
ALTER TABLE `t_role_permission`
  ADD CONSTRAINT `FK90j038mnbnthgkc17mqnoilu9` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`),
  ADD CONSTRAINT `FKjobmrl6dorhlfite4u34hciik` FOREIGN KEY (`permission_id`) REFERENCES `t_permission` (`id`);

--
-- Các ràng buộc cho bảng `t_user_role`
--
ALTER TABLE `t_user_role`
  ADD CONSTRAINT `FKa9c8iiy6ut0gnx491fqx4pxam` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`),
  ADD CONSTRAINT `FKq5un6x7ecoef5w1n39cop66kl` FOREIGN KEY (`user_id`) REFERENCES `t_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
