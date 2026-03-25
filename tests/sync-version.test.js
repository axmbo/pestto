import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';

// Escapes all RegExp special characters in a string so it can be used safely in a pattern.
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

describe('sync-version.js', () => {
  beforeAll(() => {
    execSync('node scripts/sync-version.js');
  });

  it('deve sincronizar a versão do package.json no manifest.json (sem sufixo pre-release)', () => {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    const chromeBase = pkg.version.replace(/-.*$/, '');
    // sync-version.js escreve a versão base (X.Y.Z) no manifest.
    // O 4º dígito de build é responsabilidade do generate-version.sh.
    // Verificamos que a versão começa com a base correta.
    expect(manifest.version).toMatch(
      new RegExp(`^${escapeRegExp(chromeBase)}(\\.\\d+)?$`)
    );
  });

  it('não deve incluir sufixo pre-release na versão do manifest.json', () => {
    const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+(\.\d+)?$/);
  });

  it('deve gerar um manifest.json válido (JSON parseable)', () => {
    const raw = fs.readFileSync('./manifest.json', 'utf-8');
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  it('deve terminar o arquivo com newline', () => {
    const raw = fs.readFileSync('./manifest.json', 'utf-8');
    expect(raw.endsWith('\n')).toBe(true);
  });

  it('deve preservar os demais campos do manifest.json', () => {
    const manifest = JSON.parse(fs.readFileSync('./manifest.json', 'utf-8'));
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.name).toBe('Pestto');
    expect(manifest.content_scripts).toBeDefined();
  });
});
