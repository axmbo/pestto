import { describe, it, expect } from 'vitest';
import './converter.js'; // Apenas importa o arquivo para ele rodar e registrar a função

// Pegamos a função que foi injetada no ambiente global pelo arquivo acima
const convertMarkdown = globalThis.convertMarkdown;
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

    it('deve converter código em linha corretamente', () => {
        const input = 'Teste de `código` aqui.';
        const expected = 'Teste de ```código``` aqui.';
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
});