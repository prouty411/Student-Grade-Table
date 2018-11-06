DROP TABLE if exists `student_data`;


CREATE TABLE `student_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `grade` tinyint(3) UNSIGNED NOT NULL,
  `course_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `student_data`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `student_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;COMMIT;


  INSERT INTO `student_data`(`name`, `grade`, `course_name`) 
  
  VALUES 
  ('greg','80','math'),
  ('stephanie','55','english'),
  ('christopher','87','history'),
  ('alicia','78','writing'),
  ('frankie','13','biology');
