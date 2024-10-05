import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1728157336365 implements MigrationInterface {
    name = 'InitialMigration1728157336365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`pointId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`pointId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`point\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`uploaded_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`pointId\` int NULL, \`markerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`marker\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone_number\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medal\` (\`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`required_points\` int NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_points\` (\`id\` int NOT NULL AUTO_INCREMENT, \`points\` int NOT NULL, \`achieved_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`medalName\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`name\` varchar(255) NOT NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_24dd90157d36238dc5472ff063f\` FOREIGN KEY (\`pointId\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_69aa6cab8688a38c29806daf923\` FOREIGN KEY (\`pointId\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`point\` ADD CONSTRAINT \`FK_c01766b92e52572f0b871c24bb6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_feb0d923e2887100ffced5f98ef\` FOREIGN KEY (\`pointId\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_1155b8a97501673db7a1f43b93d\` FOREIGN KEY (\`markerId\`) REFERENCES \`marker\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`marker\` ADD CONSTRAINT \`FK_49d32efa77fb94360f1a3381e8e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_points\` ADD CONSTRAINT \`FK_36ced61a62c66d2844032bdbf40\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_points\` ADD CONSTRAINT \`FK_767648a5c7efebbfdcb08479ab2\` FOREIGN KEY (\`medalName\`) REFERENCES \`medal\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_points\` DROP FOREIGN KEY \`FK_767648a5c7efebbfdcb08479ab2\``);
        await queryRunner.query(`ALTER TABLE \`user_points\` DROP FOREIGN KEY \`FK_36ced61a62c66d2844032bdbf40\``);
        await queryRunner.query(`ALTER TABLE \`marker\` DROP FOREIGN KEY \`FK_49d32efa77fb94360f1a3381e8e\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_1155b8a97501673db7a1f43b93d\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_feb0d923e2887100ffced5f98ef\``);
        await queryRunner.query(`ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_c01766b92e52572f0b871c24bb6\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_69aa6cab8688a38c29806daf923\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_24dd90157d36238dc5472ff063f\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`user_points\``);
        await queryRunner.query(`DROP TABLE \`medal\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`marker\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`point\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
