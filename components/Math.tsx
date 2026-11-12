'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  block?: boolean;
  className?: string;
}

/**
 * Sanitizes a LaTeX math string so KaTeX never throws syntax errors on
 * stray dollar signs or corrupted macros.
 */
export function sanitizeMathString(raw: string): string {
  if (!raw) return '';
  let str = raw.trim();

  // Strip wrapping delimiters if accidentally included
  if (str.startsWith('$$') && str.endsWith('$$') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('$') && str.endsWith('$') && str.length >= 2) {
    str = str.slice(1, -1).trim();
  } else if (str.startsWith('\\[') && str.endsWith('\\]') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  } else if (str.startsWith('\\(') && str.endsWith('\\)') && str.length >= 4) {
    str = str.slice(2, -2).trim();
  }

  // Restore LaTeX commands that lost backslash or got dollar prepended (e.g., $psi -> \psi, $cos -> \cos)
  str = str.replace(/\$([a-zA-Z]+)/g, (match, word) => {
    const knownCommands = [
      'psi', 'mu', 'dot', 'ddot', 'pm', 'cos', 'sin', 'tan', 'cot',
      'alpha', 'beta', 'gamma', 'delta', 'theta', 'phi', 'lambda',
      'times', 'le', 'ge', 'ne', 'implies', 'iff', 'int', 'sum',
      'frac', 'sqrt', 'text', 'partial', 'equiv', 'forall', 'exists',
      'in', 'left', 'right', 'pmatrix', 'bmatrix', 'vmatrix', 'begin',
      'end', 'cases', 'exp', 'det', 'lim', 'to', 'infty', 'hat', 'tilde'
    ];
    if (knownCommands.includes(word)) {
      return '\\' + word;
    }
    return word;
  });

  // Strip any rogue remaining '$' inside math expressions
  str = str.replace(/\$/g, '');

  return str;
}

export function Math({ math, block = false, className = '' }: MathProps) {
  const sanitized = useMemo(() => sanitizeMathString(math), [math]);

  const html = useMemo(() => {
    if (!sanitized) return '';
    try {
      return katex.renderToString(sanitized, {
        displayMode: block,
        throwOnError: false,
        strict: 'ignore',
        output: 'htmlAndMathml',
      });
    } catch (e) {
      console.error('KaTeX rendering error for:', sanitized, e);
      return `<code class="text-rose-600 font-mono text-xs" dir="ltr">${sanitized}</code>`;
    }
  }, [sanitized, block]);

  if (block) {
    return (
      <span
        dir="ltr"
        className={`block my-3 py-2.5 px-3 overflow-x-auto text-center rounded-xl bg-slate-900/5 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 font-sans shadow-xs ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      dir="ltr"
      className={`inline-block px-1 mx-0.5 rounded bg-slate-100/90 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-sans align-middle text-[0.95em] border border-slate-200/50 dark:border-slate-700/50 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MathTextProps {
  text: string;
  className?: string;
}

interface ParsedToken {
  type: 'text' | 'inline' | 'block';
  content: string;
}

export function parseMathTokens(text: string): ParsedToken[] {
  if (!text) return [];

  const tokens: ParsedToken[] = [];
  let i = 0;

  while (i < text.length) {
    // 1. Block $$ ... $$
    if (text.startsWith('$$', i)) {
      const closeIdx = text.indexOf('$$', i + 2);
      if (closeIdx !== -1) {
        tokens.push({ type: 'block', content: text.slice(i + 2, closeIdx) });
        i = closeIdx + 2;
        continue;
      }
    }

    // 2. Block \[ ... \]
    if (text.startsWith('\\[', i)) {
      const closeIdx = text.indexOf('\\]', i + 2);
      if (closeIdx !== -1) {
        tokens.push({ type: 'block', content: text.slice(i + 2, closeIdx) });
        i = closeIdx + 2;
        continue;
      }
    }

    // 3. Inline $ ... $ (ignore escaped \$)
    if (text[i] === '$' && (i === 0 || text[i - 1] !== '\\')) {
      let closeIdx = -1;
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '$' && text[j - 1] !== '\\') {
          closeIdx = j;
          break;
        }
      }
      if (closeIdx !== -1) {
        tokens.push({ type: 'inline', content: text.slice(i + 1, closeIdx) });
        i = closeIdx + 1;
        continue;
      }
    }

    // 4. Inline \( ... \)
    if (text.startsWith('\\(', i)) {
      const closeIdx = text.indexOf('\\)', i + 2);
      if (closeIdx !== -1) {
        tokens.push({ type: 'inline', content: text.slice(i + 2, closeIdx) });
        i = closeIdx + 2;
        continue;
      }
    }

    // 5. Unwrapped environment: \begin{env}...\end{env}
    if (text.startsWith('\\begin{', i)) {
      const envMatch = text.slice(i).match(/^\\begin\{([a-zA-Z*]+)\}/);
      if (envMatch) {
        const envName = envMatch[1];
        const endTag = `\\end{${envName}}`;
        const closeIdx = text.indexOf(endTag, i);
        if (closeIdx !== -1) {
          tokens.push({
            type: 'inline',
            content: text.slice(i, closeIdx + endTag.length),
          });
          i = closeIdx + endTag.length;
          continue;
        }
      }
    }

    // 6. Find next delimiter candidate
    let nextPos = text.length;
    for (const d of ['$$', '\\[', '$', '\\(', '\\begin{']) {
      const idx = text.indexOf(d, i);
      if (idx !== -1 && idx < nextPos) {
        if (d === '$' && idx > 0 && text[idx - 1] === '\\') {
          continue;
        }
        nextPos = idx;
      }
    }

    const plain = text.slice(i, nextPos);
    if (plain) {
      // Check if plain text contains standalone LaTeX expressions like \frac{a}{b}, \alpha, \mu(t), \le, etc.
      // But DO NOT match isolated \begin, \end, \left, \right
      const commandRegex =
        /(\\frac\s*\{[^{}]*\}\s*\{[^{}]*\}|\\(?:sqrt|partial|sum|int|lim|dot|ddot|hat|tilde|vec|mathbf|mathrm|text)\s*\{[^{}]*\}|\\(?!(?:begin|end|left|right)\b)[a-zA-Z]+(?:\{[^{}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+|\([^()]*\))*)/g;
      const subParts = plain.split(commandRegex);
      for (const part of subParts) {
        if (!part) continue;
        if (
          part.startsWith('\\') &&
          /^\\[a-zA-Z]+/.test(part) &&
          !/^\\(?:begin|end|left|right)\b/.test(part)
        ) {
          tokens.push({ type: 'inline', content: part });
        } else {
          tokens.push({ type: 'text', content: part });
        }
      }
    }
    i = nextPos;
  }

  return tokens;
}

export function MathText({ text, className = '' }: MathTextProps) {
  const tokens = useMemo(() => parseMathTokens(text), [text]);

  return (
    <span className={`inline leading-relaxed ${className}`}>
      {tokens.map((token, idx) => {
        if (token.type === 'block') {
          return <Math key={idx} math={token.content} block={true} />;
        }
        if (token.type === 'inline') {
          return <Math key={idx} math={token.content} block={false} />;
        }
        return <React.Fragment key={idx}>{token.content}</React.Fragment>;
      })}
    </span>
  );
}
