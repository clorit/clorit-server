import {MigrationInterface, QueryRunner} from "typeorm";

export class modify1636552363669 implements MigrationInterface {
    name = 'modify1636552363669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."celeb" ADD "group" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."celeb" DROP COLUMN "group"`);
    }

}
