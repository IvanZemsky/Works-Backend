import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class NewColumn1752924975068 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
         "vacancy",
         new TableColumn({
            name: "education",
            type: "enum",
            isNullable: false,
         }),
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("vacancy", "education")
   }
}
