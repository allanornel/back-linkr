CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"picture" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"url" TEXT NOT NULL,
	"description" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"userId" int NOT NULL REFERENCES users(id),
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


CREATE TABLE "followers" (
	"id" serial NOT NULL PRIMARY KEY,
	"followingId" int NOT NULL REFERENCES users(id),
	"followerId" int NOT NULL REFERENCES users(id)
);

CREATE TABLE "shares"(
	"id" serial NOT NULL PRIMARY KEY,
	"postId" int NOT NULL REFERENCES posts(id),
	"userId" int NOT NULL REFERENCES users(id),
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "comments"(
	"id" serial NOT NULL PRIMARY KEY,
	"postId" int NOT NULL REFERENCES posts(id),
	"userId" int NOT NULL REFERENCES users(id),
	"comment" text NOT NULL,
	"createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);