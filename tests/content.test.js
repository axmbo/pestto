import { describe, it, expect } from 'vitest';

// =====================================================================
// SETUP: Mocks das APIs do Navegador para o ambiente Node.js / Vitest
// =====================================================================
globalThis.BUILD_INFO = 'Test Env';
globalThis.markdownToWhatsApp = (text) => text; // Mock do conversor

if (typeof globalThis.document === 'undefined') {
  globalThis.document = { addEventListener: () => {} };
}

class MockDataTransfer {
  constructor() {
    this._data = {};
    this.items = {
      _files: [],
      add: (file) => this.items._files.push(file),
    };
  }
  setData(type, val) {
    this._data[type] = val;
  }
  getData(type) {
    return this._data[type];
  }
}
globalThis.DataTransfer = MockDataTransfer;

class MockClipboardEvent {
  constructor(type, init) {
    this.type = type;
    this.clipboardData = init.clipboardData;
    this.bubbles = init.bubbles;
    this.cancelable = init.cancelable;
  }
}
globalThis.ClipboardEvent = MockClipboardEvent;

class MockFile {
  constructor(parts, name) {
    this.name = name;
  }
}
globalThis.File = MockFile;

// =====================================================================
// TESTES
// =====================================================================
await import('../src/content.js');
const createPesttoPasteEvent = globalThis.createPesttoPasteEvent;

describe('createPesttoPasteEvent', () => {
  it('deve sobrescrever apenas o text/plain e preservar o text/html', () => {
    const mockOriginalClipboard = {
      items: [
        { kind: 'string', type: 'text/plain', getAsFile: () => null },
        { kind: 'string', type: 'text/html', getAsFile: () => null },
      ],
      getData: (type) =>
        type === 'text/plain' ? 'markdown puro' : '<p>html puro</p>',
    };

    const event = createPesttoPasteEvent(
      mockOriginalClipboard,
      '*texto convertido*'
    );

    expect(event.isPesttoEvent).toBe(true);
    expect(event.clipboardData.getData('text/plain')).toBe(
      '*texto convertido*'
    );
    expect(event.clipboardData.getData('text/html')).toBe('<p>html puro</p>');
  });

  it('deve preservar arquivos (imagens) copiados simultaneamente com o texto', () => {
    const fakeFile = new globalThis.File([''], 'imagem.png');
    const mockOriginalClipboard = {
      items: [{ kind: 'file', type: 'image/png', getAsFile: () => fakeFile }],
      getData: () => null,
    };

    const event = createPesttoPasteEvent(mockOriginalClipboard, 'novo texto');

    expect(event.clipboardData.items._files).toContain(fakeFile);
  });
});
