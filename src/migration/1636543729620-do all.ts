import {MigrationInterface, QueryRunner} from "typeorm";

export class doAll1636543729620 implements MigrationInterface {
    name = 'doAll1636543729620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "celeb" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_905009d455512cf02a091de707e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "brand" character varying NOT NULL, "mainCategory" character varying NOT NULL, "subCategory" character varying NOT NULL, "color" character varying NOT NULL, "price" integer NOT NULL, "link" character varying NOT NULL, "celebId" integer, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "postId" integer NOT NULL, "isCeleb" boolean NOT NULL, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_968f0ac23917c090655aa987183" FOREIGN KEY ("celebId") REFERENCES "celeb"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_968f0ac23917c090655aa987183"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "celeb"`);
    }

}
