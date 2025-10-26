import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateMyPurchasedTestDto } from "./dto/create-my-purchased-test.dto.js";
import { UpdateMyPurchasedTestDto } from "./dto/update-my-purchased-test.dto.js";
import { InjectModel } from "@nestjs/sequelize";
import { MyPurchasedTest } from "./entities/my-purchased-test.entity.js";
import { User } from "../users/entities/user.entity.js";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class MyPurchasedTestsService {
  constructor(
    @InjectModel(MyPurchasedTest)
    private readonly myPurchasedTestModel: typeof MyPurchasedTest,
    @InjectModel(User)
    private readonly userModel: typeof User,
    private sequelize: Sequelize
  ) {}

  async create(
    createMyPurchasedTestDto: CreateMyPurchasedTestDto
  ): Promise<MyPurchasedTest> {
    const { user_id, cost, ...testData } = createMyPurchasedTestDto;

    return await this.sequelize.transaction(async (transaction) => {
      // Find the user
      const user = await this.userModel.findByPk(user_id, { transaction });
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      // Check if user has sufficient balance
      if (user.balance < cost) {
        throw new BadRequestException(
          `Insufficient balance. Current balance: ${user.balance}, Required: ${cost}`
        );
      }

      // Decrement user balance
      await user.update(
        { balance: user.balance - cost },
        { transaction }
      );

      // Create the purchased test
      const purchasedTest = await this.myPurchasedTestModel.create(
        {
          user_id,
          ...testData,
        },
        { transaction }
      );

      return purchasedTest;
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
