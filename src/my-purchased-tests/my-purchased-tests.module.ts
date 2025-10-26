import { Module } from "@nestjs/common";
import { MyPurchasedTestsService } from "./my-purchased-tests.service.js";
import { MyPurchasedTestsController } from "./my-purchased-tests.controller.js";
import { AuthModule } from "../auth/auth.module.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { MyPurchasedTest } from "./entities/my-purchased-test.entity.js";
import { User } from "../users/entities/user.entity.js";

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([MyPurchasedTest, User])],
  controllers: [MyPurchasedTestsController],
  providers: [MyPurchasedTestsService],
  exports: [MyPurchasedTestsService],
})
export class MyPurchasedTestsModule {}
