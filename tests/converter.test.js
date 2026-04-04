import { describe, it, expect } from 'vitest';
import '../src/converter.js'; // Apenas importa o arquivo para ele rodar e registrar a função

// Pegamos a função que foi injetada no ambiente global pelo arquivo acima
const convertMarkdown = globalThis.markdownToWhatsApp;
describe('Conversor Markdown -> WhatsApp', () => {
  it('deve converter negrito corretamente', () => {
    const input = 'Teste de **negrito** aqui.';
    const expected = 'Teste de *negrito* aqui.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('deve converter itálico corretamente', () => {
    const input = 'Teste de *itálico* aqui.';
    const expected = 'Teste de _itálico_ aqui.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('deve converter tachado corretamente', () => {
    const input = 'Teste de ~~tachado~~ aqui.';
    const expected = 'Teste de ~tachado~ aqui.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('deve não converter código em linha', () => {
    const input = 'Teste de `código` aqui.';
    const expected = 'Teste de `código` aqui.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('deve lidar com o caso do falso itálico no negrito (substituição em cascata)', () => {
    const input = 'Texto com **negrito** e *itálico*.';
    const expected = 'Texto com *negrito* e _itálico_.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('não deve alterar texto sem formatação', () => {
    const input = 'Texto normal sem formatação.';
    expect(convertMarkdown(input)).toBe(input);
  });

  it('deve proteger código inline de conversões', () => {
    const input = 'Aqui temos um `código com **negrito** falso` no meio.';
    const output = 'Aqui temos um `código com **negrito** falso` no meio.';
    expect(convertMarkdown(input)).toBe(output);
  });

  it('deve proteger blocos de código de conversões', () => {
    const input = 'Um bloco:\n```\n**negrito** e *itálico*\n```\nFim.';
    const output = 'Um bloco:\n```\n**negrito** e *itálico*\n```\nFim.';
    expect(convertMarkdown(input)).toBe(output);
  });

  it('deve converter negrito e itálico juntos (aninhados)', () => {
    const input = 'Texto ***aninhado*** aqui.';
    const expected = 'Texto _*aninhado*_ aqui.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('não deve converter formatação multilinha (devido a restrição do WhatsApp)', () => {
    const input = '**linha1\nlinha2**';
    const expected = '**linha1\nlinha2**';
    expect(convertMarkdown(input)).toBe(expected);
  });

  it('não deve converter asteriscos matemáticos soltos', () => {
    const input = 'A conta é 2 * 3 = 6 e 4 * 5 = 20.';
    const expected = 'A conta é 2 * 3 = 6 e 4 * 5 = 20.';
    expect(convertMarkdown(input)).toBe(expected);
  });

  // Bug conhecido: 2**3 é negrito sem espaço separador antes do marcador.
  // O Markdown renderiza "3" em negrito; o WhatsApp exige espaço antes do "*".
  // Solução planejada: inserir U+FEFF (ZWNBSP) entre o dígito e o asterisco.
  // Rastreado em: https://github.com/axmbo/pestto/issues/18
  it.fails(
    'deve inserir separador invisível (U+FEFF) em negrito colado sem espaço (2**3)',
    () => {
      const input = '2**3 + 4**2';
      // U+FEFF posicionado antes do primeiro * e após o último * de cada par,
      // para que o WhatsApp reconheça o marcador sem exibir os asteriscos.
      const expected = '2\uFEFF*3 + 4*\uFEFF2';
      expect(convertMarkdown(input)).toBe(expected);
    }
  );

  it('não deve alterar formatação incompleta', () => {
    const input = 'Um **negrito aberto mas não fechado';
    const expected = 'Um **negrito aberto mas não fechado';
    expect(convertMarkdown(input)).toBe(expected);
  });
});
