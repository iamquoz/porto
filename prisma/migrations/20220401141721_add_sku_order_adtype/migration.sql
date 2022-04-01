-- CreateTable
CREATE TABLE "AdType" (
    "AdTypeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdType_pkey" PRIMARY KEY ("AdTypeId")
);

-- CreateTable
CREATE TABLE "Sku" (
    "SkuId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adTypeAdTypeId" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("SkuId")
);

-- CreateTable
CREATE TABLE "Order" (
    "OrderId" SERIAL NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "SkuIds" INTEGER[],
    "count" INTEGER[],
    "active" BOOLEAN[],
    "startDate" TIMESTAMP(3)[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("OrderId")
);

-- AddForeignKey
ALTER TABLE "Sku" ADD CONSTRAINT "Sku_adTypeAdTypeId_fkey" FOREIGN KEY ("adTypeAdTypeId") REFERENCES "AdType"("AdTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
