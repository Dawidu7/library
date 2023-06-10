-- CreateEnum
CREATE TYPE "Function" AS ENUM ('PD', 'S');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('K', 'M');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employerId" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "dateOfEmployment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "signature" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publicationPlace" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("signature")
);

-- CreateTable
CREATE TABLE "Reader" (
    "number" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "signUpDate" TIMESTAMP(3) NOT NULL,
    "deletionDate" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "function" "Function" NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Reader_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Rental" (
    "transaction" SERIAL NOT NULL,
    "signature" INTEGER NOT NULL,
    "employerId" TEXT NOT NULL,
    "readerNumber" INTEGER NOT NULL,
    "dateOfRental" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfReturn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("transaction")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_employerId_key" ON "Account"("employerId");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_name_surname_key" ON "Employer"("name", "surname");

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_surname_key" ON "Author"("name", "surname");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Reader_id_key" ON "Reader"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reader_name_surname_key" ON "Reader"("name", "surname");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_signature_fkey" FOREIGN KEY ("signature") REFERENCES "Book"("signature") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_readerNumber_fkey" FOREIGN KEY ("readerNumber") REFERENCES "Reader"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
