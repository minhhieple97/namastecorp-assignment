import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1688012962423 implements MigrationInterface {
  name = 'InitDb1688012962423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`ip\` varchar(255) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`name\` varchar(255) NOT NULL, \`api_key\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_16bfa631de67a4fafe7ce3f2fe\` (\`api_key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`flights\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`from\` varchar(255) NOT NULL, \`to\` varchar(255) NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`flight-requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`flight_id\` int NULL, \`request_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_9e5e2eb56e3837b43e5a547be23\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`flights\` ADD CONSTRAINT \`FK_b47e72947f83ef5ae0fb34cef5a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`flight-requests\` ADD CONSTRAINT \`FK_f627f44ed4456fcec8c8dab0379\` FOREIGN KEY (\`flight_id\`) REFERENCES \`flights\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`flight-requests\` ADD CONSTRAINT \`FK_3196349b34013bd5266688be55b\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`flight-requests\` DROP FOREIGN KEY \`FK_3196349b34013bd5266688be55b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`flight-requests\` DROP FOREIGN KEY \`FK_f627f44ed4456fcec8c8dab0379\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`flights\` DROP FOREIGN KEY \`FK_b47e72947f83ef5ae0fb34cef5a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_9e5e2eb56e3837b43e5a547be23\``,
    );
    await queryRunner.query(`DROP TABLE \`flight-requests\``);
    await queryRunner.query(`DROP TABLE \`flights\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_16bfa631de67a4fafe7ce3f2fe\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`requests\``);
  }
}
