import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateToDeclarations1728031447723 implements MigrationInterface {
    name = 'AddDateToDeclarations1728031447723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "declaration" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "declaration" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "createdDate"`);
    }

}
