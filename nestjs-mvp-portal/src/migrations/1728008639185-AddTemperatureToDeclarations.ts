import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTemperatureToDeclarations1728008639185 implements MigrationInterface {
    name = 'AddTemperatureToDeclarations1728008639185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "declaration" ADD "has_contact" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "declaration" ADD "temperature" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "declaration" ADD "temperature" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "declaration" DROP COLUMN "has_contact"`);
        await queryRunner.query(`ALTER TABLE "declaration" ADD "status" character varying NOT NULL`);
    }

}
