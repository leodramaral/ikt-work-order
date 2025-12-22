import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTasks1766341048381 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO tasks (id, title, description, created_at, updated_at)
            VALUES 
                (uuid_generate_v4(), 'Revisar código', 'Fazer code review do PR', NOW(), NOW()),
                (uuid_generate_v4(), 'Atualizar documentação', 'Atualizar README com novas features', NOW(), NOW()),
                (uuid_generate_v4(), 'Testes unitários', 'Criar testes para novos endpoints', NOW(), NOW()),
                (uuid_generate_v4(), 'Deploy em produção', 'Fazer deploy da versão 1.0', NOW(), NOW()),
                (uuid_generate_v4(), 'Configurar CI/CD', 'Configurar pipeline de integração contínua', NOW(), NOW())
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM tasks WHERE title IN (
            'Revisar código', 
            'Atualizar documentação', 
            'Testes unitários',
            'Deploy em produção',
            'Configurar CI/CD'
        )`);
    }
}
