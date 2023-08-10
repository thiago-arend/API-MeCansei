CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	cpf TEXT NOT NULL UNIQUE,
	phone TEXT NOT NULL,
	"photoUrl" TEXT NOT NULL DEFAULT 'user_profile_default_img.jpg',
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE session (
	id SERIAL PRIMARY KEY,
	token UUID NOT NULL,
	"userId" INTEGER REFERENCES "user"(id) NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TYPE "enumCategory" AS ENUM ('CD', 'DVD', 'livro');

CREATE TABLE product (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	description TEXT,
	"currentPrice" INTEGER NOT NULL,
	category "enumCategory" NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"sellerId" INTEGER REFERENCES "user"(id) NOT NULL,
	"isAvailable" BOOLEAN NOT NULL DEFAULT false,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- a partir desse ponto são as tabelas bônus

CREATE TABLE message (
	id SERIAL PRIMARY KEY,
	"senderId" INTEGER REFERENCES "user"(id) NOT NULL,
	"recipientId" INTEGER REFERENCES "user"(id) NOT NULL,
	content TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE comment (
	id SERIAL PRIMARY KEY,
	"authorId" INTEGER REFERENCES "user"(id) NOT NULL,
	"productId" INTEGER REFERENCES product(id) NOT NULL,
	content TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE wishlist (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER REFERENCES "user"(id) NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE "wishlistHasProduct" (
	id SERIAL PRIMARY KEY,
	"productId" INTEGER REFERENCES product(id) NOT NULL,
	"wishlistId" INTEGER REFERENCES wishlist(id) NOT NULL,
	"createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);