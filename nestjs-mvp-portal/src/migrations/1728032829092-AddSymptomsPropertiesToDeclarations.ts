import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSymptomsPropertiesToDeclarations1728032829092 implements MigrationInterface {
    name = 'AddSymptomsPropertiesToDeclarations1728032829092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."declaration_symptoms_enum" RENAME TO "declaration_symptoms_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."declaration_symptoms_enum" AS ENUM('COUGH', 'SMELL', 'FEVER', 'BREATHING_DIFFICULTIES', 'BODY_ACHES', 'HEADACHES', 'FATIGUE', 'SORE_THROAT', 'DIARRHEA', 'RUNNY_NOISE')`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" TYPE "public"."declaration_symptoms_enum"[] USING "symptoms"::"text"::"public"."declaration_symptoms_enum"[]`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."declaration_symptoms_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."declaration_symptoms_enum_old" AS ENUM('COUGH', 'SMELL', 'FEVER')`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" TYPE "public"."declaration_symptoms_enum_old"[] USING "symptoms"::"text"::"public"."declaration_symptoms_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "declaration" ALTER COLUMN "symptoms" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."declaration_symptoms_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."declaration_symptoms_enum_old" RENAME TO "declaration_symptoms_enum"`);
    }

}
