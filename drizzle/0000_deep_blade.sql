CREATE TABLE `todos` (
	`id` varchar(36) NOT NULL,
	`text` varchar(500) NOT NULL,
	`is_completed` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);

CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`firstname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`balance` decimal(10,2) NOT NULL DEFAULT 10000.00,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
