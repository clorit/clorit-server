import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyRelation1636547153472 implements MigrationInterface {
    name = 'modifyRelation1636547153472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."media" ADD "boardId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."media" ADD CONSTRAINT "FK_cb73ef8510722fbb0d40194e1f6" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."media" DROP CONSTRAINT "FK_cb73ef8510722fbb0d40194e1f6"`);
        await queryRunner.query(`ALTER TABLE "public"."media" DROP COLUMN "boardId"`);
    }

}
