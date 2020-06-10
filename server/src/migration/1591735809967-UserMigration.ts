import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1591735809967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "url" TO "lru"`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "lru" TO "url"`);
  }
}
