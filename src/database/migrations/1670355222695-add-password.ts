import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPassword1670355222695 implements MigrationInterface {
  name = 'addPassword1670355222695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
