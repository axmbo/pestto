#!/usr/bin/env node

const { execSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');

function getArg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  return process.argv[index + 1];
}

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

function extractFirstJson(text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) {
    throw new Error('Resposta vazia da IA');
  }

  const fenced = trimmed.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fenced && fenced[1]) {
    return fenced[1].trim();
  }

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Nao foi possivel localizar JSON valido na resposta da IA');
  }

  return trimmed.slice(start, end + 1);
}

async function buildWithOpenAI({ prompt }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model =
    process.env.OPENAI_MODEL || process.env.AI_MODEL || 'gpt-4.1-mini';

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: prompt,
      max_output_tokens: 1200,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha na API de IA (${response.status}): ${body}`);
  }

  const data = await response.json();
  const text = data.output_text || '';
  const jsonText = extractFirstJson(text);

  return {
    provider: 'openai',
    model,
    data: JSON.parse(jsonText),
  };
}

async function buildWithGemini({ prompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model =
    process.env.GEMINI_MODEL || process.env.AI_MODEL || 'gemini-1.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1200,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha na API Gemini (${response.status}): ${body}`);
  }

  const payload = await response.json();
  const text = (payload.candidates || [])
    .flatMap((candidate) =>
      (candidate.content?.parts || []).map((part) => part.text || '')
    )
    .join('\n');

  const jsonText = extractFirstJson(text);
  return {
    provider: 'gemini',
    model,
    data: JSON.parse(jsonText),
  };
}

async function buildWithAI(commits) {
  const prompt = [
    'Classifique os commits abaixo em categorias de changelog.',
    'Retorne APENAS JSON valido com o formato:',
    '{"resumo": ["..."], "adicionado": ["..."], "alterado": ["..."], "corrigido": ["..."], "seguranca": ["..."]}',
    'Regras obrigatorias:',
    '- Escreva TUDO em portugues brasileiro (pt-BR), mesmo que os commits estejam em outro idioma.',
    '- Nao use ingles nas frases de saida.',
    '- Use frases curtas e objetivas.',
    '- Nao use markdown, links ou texto fora do JSON.',
    '',
    'Commits:',
    ...commits.map((c) => `- ${c}`),
  ].join('\n');

  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  if (provider === 'openai') {
    return buildWithOpenAI({ prompt });
  }

  if (provider === 'gemini') {
    return buildWithGemini({ prompt });
  }

  throw new Error(
    `AI_PROVIDER invalido: ${provider}. Use "gemini" ou "openai".`
  );
}

const ENGLISH_MARKERS = [
  ' add ',
  ' added ',
  ' change ',
  ' changed ',
  ' update ',
  ' updated ',
  ' fix ',
  ' fixed ',
  ' improve ',
  ' improved ',
  ' remove ',
  ' removed ',
  ' security ',
  ' release ',
  ' notes ',
  ' bump ',
];

const PORTUGUESE_MARKERS = [
  ' de ',
  ' para ',
  ' com ',
  ' sem ',
  ' que ',
  ' em ',
  ' nao ',
  ' seguranca',
  ' versao',
  ' historico',
  ' lancamento',
  ' melhoria',
  ' ajuste',
  ' validacao',
  ' configuracao',
  ' dependencia',
  ' dependencias',
];

function gatherAiValues(aiData) {
  return [
    ...(Array.isArray(aiData?.resumo) ? aiData.resumo : []),
    ...(Array.isArray(aiData?.adicionado) ? aiData.adicionado : []),
    ...(Array.isArray(aiData?.alterado) ? aiData.alterado : []),
    ...(Array.isArray(aiData?.corrigido) ? aiData.corrigido : []),
    ...(Array.isArray(aiData?.seguranca) ? aiData.seguranca : []),
  ]
    .map((item) => String(item || '').trim())
    .filter(Boolean);
}

function seemsPortugueseOutput(aiData) {
  const values = gatherAiValues(aiData);
  if (!values.length) {
    return true;
  }

  const text = ` ${values.join(' ').toLowerCase()} `;
  const englishHits = ENGLISH_MARKERS.filter((marker) =>
    text.includes(marker)
  ).length;
  const portugueseHits = PORTUGUESE_MARKERS.filter((marker) =>
    text.includes(marker)
  ).length;
  const hasPortugueseAccents = /[áéíóúâêôãõç]/i.test(text);

  if (hasPortugueseAccents || portugueseHits >= englishHits) {
    return true;
  }

  return englishHits <= 1;
}

function titleCase(value) {
  return value
    .split(/\s+/)
    .map(
      (token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()
    )
    .join(' ');
}

function sanitizeMessage(message) {
  return message
    .replace(/^\w+(\(.+\))?!?:\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function classifyCommit(message) {
  const lower = message.toLowerCase();
  if (
    /(security|seguranca|vulnerab|cve|dependabot|audit|hardening|permissions?)/.test(
      lower
    )
  ) {
    return 'Seguranca';
  }
  if (/(fix|corrig|bug|hotfix|erro|falha|patch)/.test(lower)) {
    return 'Corrigido';
  }
  if (/(feat|add|novo|nova|implement|introduz|cria)/.test(lower)) {
    return 'Adicionado';
  }
  return 'Alterado';
}

function ensureUnique(messages) {
  return Array.from(new Set(messages));
}

function parseCommits(baseRef, headRef) {
  const raw = run(`git log --pretty=format:%s ${baseRef}..${headRef}`);
  if (!raw) {
    return [];
  }

  return raw
    .split('\n')
    .map((line) => sanitizeMessage(line))
    .filter(Boolean)
    .filter((line) => !/^merge\b/i.test(line));
}

function buildChangelogSection(commits) {
  const groups = {
    Adicionado: [],
    Alterado: [],
    Corrigido: [],
    Seguranca: [],
  };

  for (const commit of commits) {
    const group = classifyCommit(commit);
    groups[group].push(`- ${titleCase(commit)}.`);
  }

  for (const key of Object.keys(groups)) {
    groups[key] = ensureUnique(groups[key]);
  }

  const parts = [];
  for (const [heading, items] of Object.entries(groups)) {
    if (!items.length) {
      continue;
    }
    parts.push(`### ${heading}`);
    parts.push('');
    parts.push(...items);
    parts.push('');
  }

  return parts.join('\n').trim();
}

function buildChangelogSectionFromAI(aiData) {
  const groups = {
    Adicionado: aiData?.adicionado || [],
    Alterado: aiData?.alterado || [],
    Corrigido: aiData?.corrigido || [],
    Seguranca: aiData?.seguranca || [],
  };

  const parts = [];
  for (const [heading, rawItems] of Object.entries(groups)) {
    const items = ensureUnique(
      rawItems
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .map((item) => `- ${item.endsWith('.') ? item : `${item}.`}`)
    );

    if (!items.length) {
      continue;
    }

    parts.push(`### ${heading}`);
    parts.push('');
    parts.push(...items);
    parts.push('');
  }

  return parts.join('\n').trim();
}

function replaceUnreleasedSection(changelog, sectionBody) {
  const startMarker = '## [Nao Lancado]';
  const start = changelog.indexOf(startMarker);
  if (start === -1) {
    throw new Error('Secao [Nao Lancado] nao encontrada no CHANGELOG.md');
  }

  const nextHeader = changelog.indexOf('\n## [', start + startMarker.length);
  if (nextHeader === -1) {
    throw new Error(
      'Nao foi possivel localizar a proxima versao no CHANGELOG.md'
    );
  }

  const before = changelog.slice(0, start + startMarker.length);
  const after = changelog.slice(nextHeader);
  return `${before}\n\n${sectionBody}\n${after}`;
}

function buildReleaseNotesBlock({
  version,
  date,
  baseRef,
  headRef,
  changelogSection,
  aiData,
}) {
  const novidades = extractBullets(changelogSection, 'Adicionado');
  const correcoes = extractBullets(changelogSection, 'Corrigido');
  const seguranca = extractBullets(changelogSection, 'Seguranca');
  const alterado = extractBullets(changelogSection, 'Alterado');

  const resumo = [];
  const aiResumo = Array.isArray(aiData?.resumo)
    ? aiData.resumo
        .map((item) => String(item || '').trim())
        .filter(Boolean)
        .map((item) => `- ${item.endsWith('.') ? item : `${item}.`}`)
    : [];

  if (aiResumo.length) {
    resumo.push(...ensureUnique(aiResumo).slice(0, 3));
  } else {
    resumo.push(
      '- Release preparada automaticamente a partir do historico de commits.'
    );
  }

  resumo.push(`- Base de comparacao: ${baseRef}..${headRef}.`);

  const effectiveNovidades = novidades.length ? novidades : alterado;
  const effectiveCorrecoes = correcoes.length
    ? correcoes
    : ['- Sem correcoes funcionais relevantes detectadas no intervalo.'];
  const effectiveSeguranca = seguranca.length
    ? seguranca
    : [
        '- Sem atualizacoes de seguranca explicitamente identificadas no intervalo.',
      ];
  const roteiroManualPath = 'tests/casos_de_teste.md';

  return [
    `## [${version}] - ${date} (Rascunho)`,
    '',
    '### Resumo',
    '',
    ...resumo,
    '',
    '### Novidades',
    '',
    ...(effectiveNovidades.length
      ? effectiveNovidades
      : ['- Sem novidades funcionais no intervalo.']),
    '',
    '### Correcoes',
    '',
    ...effectiveCorrecoes,
    '',
    '### Seguranca',
    '',
    ...effectiveSeguranca,
    '',
    '### Teste Manual',
    '',
    `- Para testar a nova versão, siga este roteiro de testes manuais: [${roteiroManualPath}](${roteiroManualPath}).`,
    '- Sempre que houver feature importante, atualize o roteiro de testes manuais antes da release.',
    '',
    '### Observacoes de Deploy',
    '',
    '- Validar pipeline de release no GitHub e status do item na Chrome Web Store antes do upload final.',
    '',
  ].join('\n');
}

function extractBullets(section, heading) {
  const marker = `### ${heading}`;
  const index = section.indexOf(marker);
  if (index === -1) {
    return [];
  }
  const next = section.indexOf('\n### ', index + marker.length);
  const slice = section.slice(
    index + marker.length,
    next === -1 ? undefined : next
  );
  return slice
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '));
}

function prependReleaseNotesSection(releaseNotes, newSection) {
  const firstReleaseIndex = releaseNotes.indexOf('\n## [');
  if (firstReleaseIndex === -1) {
    return `${releaseNotes.trim()}\n\n${newSection}\n`;
  }

  const before = releaseNotes.slice(0, firstReleaseIndex).trimEnd();
  const after = releaseNotes.slice(firstReleaseIndex).trimStart();
  return `${before}\n\n${newSection}\n${after}\n`;
}

async function main() {
  const version = getArg('--version');
  if (!version) {
    throw new Error(
      'Uso: npm run release:docs -- --version X.Y.Z [--base vX.Y.Z] [--head HEAD] [--date YYYY-MM-DD]'
    );
  }

  const baseRef = getArg('--base') || run('git describe --tags --abbrev=0');
  const headRef = getArg('--head') || 'HEAD';
  const date = getArg('--date') || new Date().toISOString().slice(0, 10);

  const commits = parseCommits(baseRef, headRef);
  if (!commits.length) {
    throw new Error(`Nenhum commit encontrado em ${baseRef}..${headRef}`);
  }

  const changelogPath = 'CHANGELOG.md';
  const releaseNotesPath = 'RELEASE_NOTES.md';

  const changelog = readFileSync(changelogPath, 'utf8');
  const releaseNotes = readFileSync(releaseNotesPath, 'utf8');

  let aiData = null;
  try {
    const aiResult = await buildWithAI(commits);
    if (aiResult) {
      aiData = aiResult.data;
      console.log(
        `🤖 Rascunho com IA habilitado (${aiResult.provider}/${aiResult.model}).`
      );
      if (!seemsPortugueseOutput(aiData)) {
        console.log(
          '⚠️ Aviso: a saida da IA parece conter ingles. Revise o texto antes do merge.'
        );
      }
    }
  } catch (error) {
    console.log(
      `⚠️ IA indisponivel, seguindo com fallback heuristico: ${error.message}`
    );
  }

  const sectionBody = aiData
    ? buildChangelogSectionFromAI(aiData)
    : buildChangelogSection(commits);
  const updatedChangelog = replaceUnreleasedSection(changelog, sectionBody);
  writeFileSync(changelogPath, updatedChangelog);

  const releaseNotesBlock = buildReleaseNotesBlock({
    version,
    date,
    baseRef,
    headRef,
    changelogSection: sectionBody,
    aiData,
  });

  const updatedReleaseNotes = prependReleaseNotesSection(
    releaseNotes,
    releaseNotesBlock
  );
  writeFileSync(releaseNotesPath, updatedReleaseNotes);

  console.log(
    `✅ CHANGELOG.md atualizado com commits de ${baseRef}..${headRef}`
  );
  console.log(`✅ RELEASE_NOTES.md recebeu o rascunho da versao ${version}`);
}

main().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});
