'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function Math({ math, block = false, className = '' }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: block,
        throwOnError: false,
        strict: 'ignore',
        output: 'htmlAndMathml',
      });
    } catch (e) {
      console.error('KaTeX rendering error for:', math, e);
      return `<code class="text-rose-600 font-mono text-xs">${math}</code>`;
    }
  }, [math, block]);

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

export function MathText({ text, className = '' }: MathTextProps) {
  const tokens = useMemo(() => {
    if (!text) return [];

    let processed = text;

    // Auto-detect unwrapped \begin{pmatrix}...\end{pmatrix} or similar blocks if not already in $
    if (!processed.includes('$') && !processed.includes('\\(')) {
      processed = processed.replace(
        /(\\begin\{[a-z*]+\}[\s\S]*?\\end\{[a-z*]+\})/g,
        '$$$1$$'
      );
      // Also auto-wrap standalone formulas like \det(...) or \dot{X} = AX or \mu(t) = ...
      processed = processed.replace(
        /(\\det\s*(?:\\begin\{[a-z*]+\}[\s\S]*?\\end\{[a-z*]+\}|\([^)]+\))\s*=\s*[^.,;\s]+)/g,
        '$$$1$$'
      );
    }

    // Split text by LaTeX delimiters:
    // 1) $$ ... $$ (block)
    // 2) \[ ... \] (block)
    // 3) $ ... $ (inline)
    // 4) \( ... \) (inline)
    const delimiterRegex =
      /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$(?:\\\$|[^\$])+?\$|\\\([\s\S]*?\\\))/g;

    const parts = processed.split(delimiterRegex);
    return parts.filter(Boolean);
  }, [text]);

  return (
    <span className={`inline leading-relaxed ${className}`}>
      {tokens.map((token, idx) => {
        if (token.startsWith('$$') && token.endsWith('$$') && token.length >= 4) {
          const math = token.slice(2, -2);
          return <Math key={idx} math={math} block={true} />;
        }
        if (token.startsWith('\\[') && token.endsWith('\\]') && token.length >= 4) {
          const math = token.slice(2, -2);
          return <Math key={idx} math={math} block={true} />;
        }
        if (token.startsWith('$') && token.endsWith('$') && token.length >= 2) {
          const math = token.slice(1, -1);
          return <Math key={idx} math={math} block={false} />;
        }
        if (token.startsWith('\\(') && token.endsWith('\\)') && token.length >= 4) {
          const math = token.slice(2, -2);
          return <Math key={idx} math={math} block={false} />;
        }

        // If a plain text token contains backslashes like \dot{X} or \mu(t) or \le that missed $ delimiters
        if (token.includes('\\') && /\\[a-zA-Z]+/.test(token)) {
          // Replace inline LaTeX tokens matching \[a-zA-Z]+({[^}]*})?
          const subTokens = token.split(/(\\[a-zA-Z]+(?:\{[^}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+)*)/g);
          if (subTokens.length > 1) {
            return (
              <React.Fragment key={idx}>
                {subTokens.map((sub, sIdx) => {
                  if (sub.startsWith('\\') && /^\\[a-zA-Z]+/.test(sub)) {
                    return <Math key={sIdx} math={sub} block={false} />;
                  }
                  return <React.Fragment key={sIdx}>{sub}</React.Fragment>;
                })}
              </React.Fragment>
            );
          }
        }

        return <React.Fragment key={idx}>{token}</React.Fragment>;
      })}
    </span>
  );
}
