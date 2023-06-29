import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersDefault1688013568076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO 
         users (name, api_key)
       VALUES 
        ('John', 'asjdfh23r9u23r9fj'),
        ('Jane', '4r3t5y6u7i8o9p'),
        ('Bob', '5tgb6yhn7ujm8ik9'),
        ('Alice', 'qwertyuiop123456'),
        ('David', 'zxcvbnmasdfghjkl');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
