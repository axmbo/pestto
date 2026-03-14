import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

describe('generate-version.sh', () => {
    // Salva o version.js original (se existir) para restaurar depois
    let originalContent = null;

    beforeAll(() => {
        if (fs.existsSync('./version.js')) {
            originalContent = fs.readFileSync('./version.js', 'utf-8');
        }
    });

    afterAll(() => {
        if (originalContent !== null) {
            fs.writeFileSync('./version.js', originalContent);
        }
    });

    it('deve gerar version.js com parâmetros do CI', () => {
        execSync('./generate-version.sh "99" "abc1234"');
        const content = fs.readFileSync('./version.js', 'utf-8');
        expect(content).toContain('const BUILD_INFO =');
        expect(content).toContain('(99)');
        expect(content).toContain('[abc1234]');
    });

    it('deve gerar version.js com defaults locais (sem parâmetros)', () => {
        execSync('./generate-version.sh');
        const content = fs.readFileSync('./version.js', 'utf-8');
        expect(content).toContain('const BUILD_INFO =');
        expect(content).toMatch(/Pestto v\d+\.\d+\.\d+/);
    });

    it('deve incluir a versão do package.json', () => {
        execSync('./generate-version.sh');
        const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        const content = fs.readFileSync('./version.js', 'utf-8');
        expect(content).toContain(`v${pkg.version}`);
    });
});
