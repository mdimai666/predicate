-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Мар 29 2016 г., 07:15
-- Версия сервера: 10.1.8-MariaDB
-- Версия PHP: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dmss`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `comment_author_id` bigint(20) NOT NULL,
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_news_id` bigint(20) NOT NULL DEFAULT '0',
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_status` varchar(20) NOT NULL DEFAULT 'publish'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) NOT NULL,
  `post_author_id` bigint(20) NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `post_comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(20) NOT NULL,
  `post_name` varchar(200) NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_parent` bigint(20) NOT NULL DEFAULT '0',
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_comment_count` bigint(20) NOT NULL DEFAULT '0',
  `post_seen_count` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `posts`
--

INSERT INTO `posts` (`id`, `post_author_id`, `post_date`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `post_comment_status`, `ping_status`, `post_password`, `post_name`, `post_modified`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_comment_count`, `post_seen_count`) VALUES
(9, 1, '2016-03-23 22:09:03', '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\nawdawd\n</body>\n</html>', 'Заголовок 1', '', 'publish', 'open', 'open', '', '', '2016-03-23 22:09:03', 0, '', 0, 'post', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(64) NOT NULL DEFAULT '',
  `user_pass_original` varchar(64) NOT NULL,
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(60) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `user_display_name` varchar(250) NOT NULL DEFAULT '',
  `user_time_zone` int(2) NOT NULL DEFAULT '0',
  `user_when_loginTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_when_LoginServerTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_time_different` varchar(50) NOT NULL DEFAULT '+0 day +00 hour +00 minute +00 second'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `user_login`, `user_pass`, `user_pass_original`, `user_nicename`, `user_email`, `user_registered`, `user_activation_key`, `user_status`, `user_display_name`, `user_time_zone`, `user_when_loginTime`, `user_when_LoginServerTime`, `user_time_different`) VALUES
(1, '1', '28c8edde3d61a0411511d3b1866f0636', '1', 'mdimai', '', '0000-00-00 00:00:00', '', 0, '', 0, '2016-03-24 08:44:47', '2016-03-23 23:44:47', '+09 hour +00 minute');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`post_author_id`,`post_date`,`post_status`,`post_name`,`post_parent`,`post_type`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_login` (`user_login`,`user_nicename`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
