import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMyPurchasedTestDto } from "./dto/create-my-purchased-test.dto.js";
import { UpdateMyPurchasedTestDto } from "./dto/update-my-purchased-test.dto.js";
import { InjectModel } from "@nestjs/sequelize";
import { MyPurchasedTest } from "./entities/my-purchased-test.entity.js";

@Injectable()
export class MyPurchasedTestsService {
  constructor(
    @InjectModel(MyPurchasedTest)
    private readonly myPurchasedTestModel: typeof MyPurchasedTest
  ) {}

  async create(
    createMyPurchasedTestDto: CreateMyPurchasedTestDto
  ): Promise<MyPurchasedTest> {
    return await this.myPurchasedTestModel.create({
      ...createMyPurchasedTestDto,
    });
  }

  async findAll(): Promise<MyPurchasedTest[]> {
    return await this.myPurchasedTestModel.findAll();
  }

  async findByUserId(userId: string): Promise<MyPurchasedTest[]> {
    return await this.myPurchasedTestModel.findAll({
      where: {
        user_id: userId,
        status: "new",
      },
    });
  }

  async findOne(id: string): Promise<MyPurchasedTest> {
    const myPurchasedTest = await this.myPurchasedTestModel.findOne({
      where: {
        id,
      },
    });

    if (!myPurchasedTest) {
      throw new NotFoundException(`MyPurchasedTest with ID ${id} not found`);
    }

    return myPurchasedTest;
  }

  async update(
    id: string,
    updateMyPurchasedTestDto: UpdateMyPurchasedTestDto
  ): Promise<MyPurchasedTest> {
    const [numberOfAffectedRows, [updatedMyPurchasedTest]] =
      await this.myPurchasedTestModel.update(
        { ...updateMyPurchasedTestDto },
        {
          where: { id },
          returning: true,
        }
      );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`MyPurchasedTest with ID ${id} not found`);
    }

    return updatedMyPurchasedTest;
  }

  async remove(id: string): Promise<void> {
    const numberOfDeletedRows = await this.myPurchasedTestModel.destroy({
      where: { id },
    });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`MyPurchasedTest with ID ${id} not found`);
    }
  }
}
