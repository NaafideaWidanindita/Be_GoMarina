-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 02:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_marina`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `provinsi` varchar(150) NOT NULL,
  `city` varchar(250) NOT NULL,
  `kecamatan` varchar(250) NOT NULL,
  `kode_pos` int(50) NOT NULL,
  `street` varchar(1000) NOT NULL,
  `detail` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `role_id`, `provinsi`, `city`, `kecamatan`, `kode_pos`, `street`, `detail`) VALUES
(3, 2, 'kepulauan riau', 'batam', 'sekupang', 29425, 'jl. raya marina city', 'gang delima');

-- --------------------------------------------------------

--
-- Table structure for table `agenda`
--

CREATE TABLE `agenda` (
  `id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `deskripsi` varchar(2000) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agenda`
--

INSERT INTO `agenda` (`id`, `name`, `deskripsi`, `image`) VALUES
(1, 'Pesta olahan jambu dari kebun langsung!', 'Nikmati pengalaman unik menikmati jambu segar langsung dari Kebun Jambu Marina! Dalam acara ini, Anda akan diajak untuk mencicipi berbagai olahan jambu yang lezat dan kreatif, seperti jus segar, manisan, salad, hingga makanan penutup berbahan dasar jambu. Selain itu, Anda juga bisa memetik langsung jambu pilihan dan belajar membuat olahan jambu sendiri bersama ahli kuliner lokal. Mari rayakan kelezatan alami dari kebun ke meja, sambil menikmati suasana asri kebun jambu yang hijau dan segar. Cocok untuk keluarga, teman, dan pecinta kuliner! 🌿🍈', 'src/assets/7-manfaat-jambu-kristal-yang-jarang-diketahui.jpg'),
(2, 'Pesta olahan jambu dari kebun langsung!', 'Nikmati pengalaman unik menikmati jambu segar langsung dari Kebun Jambu Marina! Dalam acara ini, Anda akan diajak untuk mencicipi berbagai olahan jambu yang lezat dan kreatif, seperti jus segar, manisan, salad, hingga makanan penutup berbahan dasar jambu. Selain itu, Anda juga bisa memetik langsung jambu pilihan dan belajar membuat olahan jambu sendiri bersama ahli kuliner lokal. Mari rayakan kelezatan alami dari kebun ke meja, sambil menikmati suasana asri kebun jambu yang hijau dan segar. Cocok untuk keluarga, teman, dan pecinta kuliner! 🌿🍈', 'src/assets/7-manfaat-jambu-kristal-yang-jarang-diketahui.jpg'),
(3, 'Pesta olahan jambu dari kebun langsung!', 'Nikmati pengalaman unik menikmati jambu segar langsung dari Kebun Jambu Marina, Batam! Dalam acara ini, Anda akan diajak untuk mencicipi berbagai olahan jambu yang lezat dan kreatif, seperti jus segar, manisan, salad, hingga makanan penutup berbahan dasar jambu. Selain itu, Anda juga bisa memetik langsung jambu pilihan dan belajar membuat olahan jambu sendiri bersama ahli kuliner lokal. Mari rayakan kelezatan alami dari kebun ke meja, sambil menikmati suasana asri kebun jambu yang hijau dan segar. Cocok untuk keluarga, teman, dan pecinta kuliner! 🌿🍈', 'src/assets/7-manfaat-jambu-kristal-yang-jarang-diketahui.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `produk_id` bigint(20) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `option` enum('JNT','JNE','Langsung','') NOT NULL,
  `status` enum('Pending','Diproses','Dikirim','Sampai') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galeri`
--

CREATE TABLE `galeri` (
  `id` bigint(20) NOT NULL,
  `image` varchar(500) NOT NULL,
  `option` enum('Galeri Jambu','Galeri Kuda','Galeri Spot Foto','Galeri Lainnya') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `galeri`
--

INSERT INTO `galeri` (`id`, `image`, `option`) VALUES
(1, 'src/assets/Aprenda a fazer lassi de goiaba, bebida típica indiana.jfif', 'Galeri Jambu'),
(2, 'src/assets/Closeup na goiaba vermelha fatiada com folhas verdes na mesa de madeira rústica _ Foto Premium.jfif', 'Galeri Jambu'),
(3, 'src/assets/GUAVA TREE.jfif', 'Galeri Jambu'),
(4, 'src/assets/9 Best Red and Pink Guava Varieties.jfif', 'Galeri Jambu'),
(5, 'src/assets/14 Amazing Health Benefits Of Eating Guava During Pregnancy.jfif', 'Galeri Jambu'),
(6, 'src/assets/GUAVA TREE.jfif', 'Galeri Jambu'),
(7, 'src/assets/14 Amazing Health Benefits Of Eating Guava During Pregnancy.jfif', 'Galeri Jambu'),
(8, 'src/assets/9 Best Red and Pink Guava Varieties.jfif', 'Galeri Jambu'),
(9, 'src/assets/Aprenda a fazer lassi de goiaba, bebida típica indiana.jfif', 'Galeri Jambu');

-- --------------------------------------------------------

--
-- Table structure for table `konten`
--

CREATE TABLE `konten` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description_garden` text NOT NULL,
  `description_add` text NOT NULL,
  `visi` text NOT NULL,
  `misi` text NOT NULL,
  `address` varchar(500) NOT NULL,
  `contact` char(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `konten`
--

INSERT INTO `konten` (`id`, `title`, `description_garden`, `description_add`, `visi`, `misi`, `address`, `contact`) VALUES
(1, 'Temukan Pesona Alami di Kebun Jambu Marina!', 'Kebun Jambu Marina menawarkan berbagai kegiatan seru dan edukatif untuk semua kalangan. Mulai dari memetik jambu merah segar langsung dari kebunnya, berkuda mengelilingi perkebunan yang asri, hingga berburu spot foto instagramable di antara hamparan hijau yang mempesona.', 'Lokasinya strategis, hanya 20 menit dari pusat Kota Batam, membuatnya cocok untuk rekreasi keluarga atau gathering komunitas. Datang dan nikmati agrowisata penuh petualangan di Kebun Jambu Marina!', 'Menjadi destinasi agrowisata terdepan di Batam yang memadukan keindahan alam, edukasi pertanian, dan pelestarian kearifan lokal untuk menciptakan pengalaman wisata yang berkesan dan berkelanjutan.', 'Menyediakan pengalaman wisata edukatif\r\nMelestarikan kearifan lokal pertanian \r\nMendorong pelestarian lingkungan \r\nMenawarkan produk jambu merah berkualitas tinggi \r\nMenciptakan ruang rekreasi yang inklusif dan ramah keluarga', 'Jl. Raya Marina City, Tj. Riau, Kec. Sekupang, Kota Batam, Kepulauan Riau 29425', '081270108778');

-- --------------------------------------------------------

--
-- Table structure for table `mitra`
--

CREATE TABLE `mitra` (
  `id` bigint(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mitra`
--

INSERT INTO `mitra` (`id`, `name`, `image`) VALUES
(1, 'Go Marina', 'src/assets/WhatsApp Image 2024-11-13 at 13.26.17_4fa9581e 3.png'),
(2, 'Go Marina', 'src/assets/WhatsApp Image 2024-11-13 at 13.26.17_4fa9581e 3.png'),
(3, 'Go Marina', 'src/assets/WhatsApp Image 2024-11-13 at 13.26.17_4fa9581e 3.png'),
(4, 'Go Marina', 'src/assets/WhatsApp Image 2024-11-13 at 13.26.17_4fa9581e 3.png');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` bigint(20) NOT NULL,
  `address_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `total` varchar(500) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `delete_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `address_id`, `role_id`, `total`, `notes`, `created_at`, `delete_at`) VALUES
(1, 3, 2, 'Rp77.000', 'Jangan pakai gula', '2024-11-25 05:48:44', '2024-11-25 05:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `cart_item_id` bigint(20) NOT NULL,
  `jumlah_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `image` varchar(500) NOT NULL,
  `option` enum('Mandiri') NOT NULL,
  `status` enum('Menunggu Konfirmasi','Telah Dikonfirmasi','Tidak Valid') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `order_id`, `image`, `option`, `status`) VALUES
(2, 1, '/uploads/images/product1.jpg', 'Mandiri', '');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` bigint(20) NOT NULL,
  `name` varchar(300) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(65,0) NOT NULL,
  `stok` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `role` enum('admin','user','','') NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(300) NOT NULL,
  `telp` char(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`, `username`, `password`, `name`, `telp`) VALUES
(1, 'admin', 'admin', '$2y$10$UuO6MGURwKbOV5B1moxx9eYjALBZOYcUJo', 'Admin', '081123456789'),
(2, 'user', 'user', '$bwjxbu', 'user', '087123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galeri`
--
ALTER TABLE `galeri`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konten`
--
ALTER TABLE `konten`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mitra`
--
ALTER TABLE `mitra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `cart_item_id` (`cart_item_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galeri`
--
ALTER TABLE `galeri`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `konten`
--
ALTER TABLE `konten`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mitra`
--
ALTER TABLE `mitra`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_item` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
