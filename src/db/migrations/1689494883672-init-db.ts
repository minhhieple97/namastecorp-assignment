import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1689494883672 implements MigrationInterface {
  name = 'InitDb1689494883672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "ip" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "api_key" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_16bfa631de67a4fafe7ce3f2fe" ON "users" ("api_key") `,
    );
    await queryRunner.query(
      `CREATE TABLE "flights" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "from" character varying NOT NULL, "to" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight-requests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, "flight_id" integer, "request_id" integer, CONSTRAINT "PK_b737bdca4b8eaf6658741aabe65" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_b47e72947f83ef5ae0fb34cef5a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight-requests" ADD CONSTRAINT "FK_f627f44ed4456fcec8c8dab0379" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight-requests" ADD CONSTRAINT "FK_3196349b34013bd5266688be55b" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "flight-requests" DROP CONSTRAINT "FK_3196349b34013bd5266688be55b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight-requests" DROP CONSTRAINT "FK_f627f44ed4456fcec8c8dab0379"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_b47e72947f83ef5ae0fb34cef5a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_9e5e2eb56e3837b43e5a547be23"`,
    );
    await queryRunner.query(`DROP TABLE "flight-requests"`);
    await queryRunner.query(`DROP TABLE "flights"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_16bfa631de67a4fafe7ce3f2fe"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "requests"`);
  }
}
