import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { MyPurchasedTestsService } from "./my-purchased-tests.service.js";
import { CreateMyPurchasedTestDto } from "./dto/create-my-purchased-test.dto.js";
import { UpdateMyPurchasedTestDto } from "./dto/update-my-purchased-test.dto.js";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";

@Controller("my-purchased-tests")
export class MyPurchasedTestsController {
  constructor(
    private readonly myPurchasedTestsService: MyPurchasedTestsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMyPurchasedTestDto: CreateMyPurchasedTestDto,
    @Request() req
  ) {
    // You can access the user from the request
    const userId = req.user.sub;
    return this.myPurchasedTestsService.create({
      ...createMyPurchasedTestDto,
      user_id: userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.myPurchasedTestsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  findMyPurchasedTests(@Request() req) {
    const userId = req.user.sub;
    return this.myPurchasedTestsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.myPurchasedTestsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMyPurchasedTestDto: UpdateMyPurchasedTestDto
  ) {
    return this.myPurchasedTestsService.update(id, updateMyPurchasedTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.myPurchasedTestsService.remove(id);
  }
}
