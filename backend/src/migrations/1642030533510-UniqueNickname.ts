import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueNickname1642030533510 implements MigrationInterface {
    name = 'UniqueNickname1642030533510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname")`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "task-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "task-group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
