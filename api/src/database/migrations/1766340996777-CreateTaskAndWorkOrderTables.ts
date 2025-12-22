import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskAndWorkOrderTables1766340996777 implements MigrationInterface {
    name = 'CreateTaskAndWorkOrderTables1766340996777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "assignedToId" uuid, CONSTRAINT "PK_29f6c1884082ee6f535aed93660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_tasks" ("work_order_id" uuid NOT NULL, "task_id" uuid NOT NULL, CONSTRAINT "PK_6e41762e0bf96d472f5b02360ff" PRIMARY KEY ("work_order_id", "task_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09f4588dbc7ec1e246aeb6ee55" ON "work_order_tasks" ("work_order_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a0d08c55bd9c5402a95e594f98" ON "work_order_tasks" ("task_id") `);
        await queryRunner.query(`ALTER TABLE "work_orders" ADD CONSTRAINT "FK_8f8af903ceea97998c1bd75b24e" FOREIGN KEY ("assignedToId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_tasks" ADD CONSTRAINT "FK_09f4588dbc7ec1e246aeb6ee555" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work_order_tasks" ADD CONSTRAINT "FK_a0d08c55bd9c5402a95e594f980" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_tasks" DROP CONSTRAINT "FK_a0d08c55bd9c5402a95e594f980"`);
        await queryRunner.query(`ALTER TABLE "work_order_tasks" DROP CONSTRAINT "FK_09f4588dbc7ec1e246aeb6ee555"`);
        await queryRunner.query(`ALTER TABLE "work_orders" DROP CONSTRAINT "FK_8f8af903ceea97998c1bd75b24e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0d08c55bd9c5402a95e594f98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09f4588dbc7ec1e246aeb6ee55"`);
        await queryRunner.query(`DROP TABLE "work_order_tasks"`);
        await queryRunner.query(`DROP TABLE "work_orders"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
