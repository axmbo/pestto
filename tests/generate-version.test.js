import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

describe('generate-version.sh', () => {
  // Salva os arquivos gerados para restaurar depois
  let originalVersionContent = null;
  let originalManifestContent = null;

  beforeAll(() => {
    if (fs.existsSync('./src/version.js')) {
      originalVersionContent = fs.readFileSync('./src/version.js', 'utf-8');
    }
    originalManifestContent = fs.readFileSync('./manifest.json', 'utf-8');
  });

  afterAll(() => {
    if (originalVersionContent !== null) {
      fs.writeFileSync('./src/version.js', originalVersionContent);
    }
    fs.writeFileSync('./manifest.json', originalManifestContent);
  });

  it('deve gerar version.js com parâmetros do CI', () => {
    execSync('./scripts/generate-version.sh "99" "abc1234"');
    const content = fs.readFileSync('./src/version.js', 'utf-8');
    expect(content).toContain('const BUILD_INFO =');
    expect(content).toContain('(99)');
    expect(content).toContain('[abc1234]');
  });

  it('deve gerar version.js com defaults locais (sem parâmetros)', () => {
    execSync('./scripts/generate-version.sh');
    const content = fs.readFileSync('./src/version.js', 'utf-8');
    expect(content).toContain('const BUILD_INFO =');
    expect(content).toMatch(/Pestto v\d+\.\d+\.\d+/);
  });

  it('deve incluir a versão do package.json (sem sufixo pre-release)', () => {
    execSync('./scripts/generate-version.sh');
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const chromeVersion = pkg.version.replace(/-.*$/, '');
    const content = fs.readFileSync('./src/version.js', 'utf-8');
    expect(content).toContain(`v${chromeVersion}`);
  });

  it('deve atualizar o manifest.json com o run_number do CI no 4º dígito', () => {
    const savedManifest = fs.readFileSync('./manifest.json', 'utf-8');
    execSync('./scripts/generate-version.sh "42" "abc1234"');
    const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+\.42$/);
    fs.writeFileSync('./manifest.json', savedManifest);
  });

  it('não deve modificar o manifest.json em build local (sem argumentos)', () => {
    const before = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    execSync('./scripts/generate-version.sh');
    const after = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    expect(after).toEqual(before);
  });
});
