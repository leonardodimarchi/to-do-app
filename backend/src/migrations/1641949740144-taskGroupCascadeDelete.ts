import {MigrationInterface, QueryRunner} from "typeorm";

export class taskGroupCascadeDelete1641949740144 implements MigrationInterface {
    name = 'taskGroupCascadeDelete1641949740144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "task-group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d670df4239252dbd7c04ad6e848"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d670df4239252dbd7c04ad6e848" FOREIGN KEY ("groupId") REFERENCES "task-group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
