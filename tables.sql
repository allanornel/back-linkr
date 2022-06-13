CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE,
	"picture" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL UNIQUE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"url" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"userId" int NOT NULL REFERENCES users(id)
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);



CREATE TABLE "postsHashtags" (
	"idPost" int NOT NULL REFERENCES posts(id),
	"idHashtag" int NOT NULL REFERENCES hashtags(id),
	"id" serial NOT NULL PRIMARY KEY
);



CREATE TABLE "likes" (
	"id" serial NOT NULL PRIMARY KEY,
	"postId" int NOT NULL REFERENCES posts(id),
	"userId" int NOT NULL REFERENCES users(id)
);