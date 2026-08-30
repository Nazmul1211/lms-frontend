"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, BookOpen, Sparkles, ChevronRight } from "lucide-react";

interface RichContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Helper to render inline markdown: bold (**text**), inline code (`code`), and links ([text](url))
 */
export function renderInlineContent(text: string): React.ReactNode[] {
  if (!text) return [];

  // Regex matches:
  // 1. `code`
  // 2. **bold** or __bold__
  // 3. *italic* or _italic_
  // 4. [label](url)
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="mx-0.5 px-1.5 py-0.5 rounded-md bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] sm:text-xs font-semibold"
        >
          {code}
        </code>
      );
    }

    // Bold (**text** or __text__)
    if (
      (part.startsWith("**") && part.endsWith("**")) ||
      (part.startsWith("__") && part.endsWith("__"))
    ) {
      const boldText = part.slice(2, -2);
      return (
        <strong
          key={index}
          className="font-bold text-slate-900 dark:text-white tracking-tight"
        >
          {boldText}
        </strong>
      );
    }

    // Link ([label](url))
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-0.5"
        >
          {label}
        </a>
      );
    }

    // Strip any stray rogue asterisks that weren't closed
    const sanitized = part.replace(/\*\*/g, "");
    return <span key={index}>{sanitized}</span>;
  });
}

/**
 * Code Block Component with Copy to Clipboard functionality
 */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-lg">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono font-semibold uppercase text-slate-400 pl-2">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px] font-medium"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs leading-relaxed text-slate-200 selection:bg-indigo-500 selection:text-white">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/**
 * Main Rich Content Renderer Component
 */
export default function RichContentRenderer({
  content,
  className = "",
}: RichContentRendererProps) {
  if (!content) return null;

  // Normalize line endings and preprocess
  const rawText = content.trim();

  // Split content into blocks by code fences first, then paragraphs
  const blocks: React.ReactNode[] = [];
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(rawText)) !== null) {
    const textBefore = rawText.slice(lastIndex, match.index);
    if (textBefore.trim()) {
      blocks.push(renderTextChunks(textBefore, `text-${lastIndex}`));
    }

    const language = match[1] || "typescript";
    const codeContent = match[2].trim();
    blocks.push(
      <CodeBlock
        key={`code-${match.index}`}
        code={codeContent}
        language={language}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingText = rawText.slice(lastIndex);
  if (remainingText.trim()) {
    blocks.push(renderTextChunks(remainingText, `text-end-${lastIndex}`));
  }

  return (
    <div className={`space-y-4 text-slate-700 dark:text-slate-300 ${className}`}>
      {blocks}
    </div>
  );
}

/**
 * Render non-code text chunks (headings, lists, blockquotes, paragraphs)
 */
function renderTextChunks(chunk: string, keyPrefix: string): React.ReactNode {
  // Normalize inline numbered lists that might be concatenated: e.g. "1. **A:** ... 2. **B:** ..."
  let preprocessed = chunk.replace(/(\d+\.\s+\*\*)/g, "\n$1");
  const paragraphs = preprocessed.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <React.Fragment key={keyPrefix}>
      {paragraphs.map((para, pIdx) => {
        const pKey = `${keyPrefix}-p-${pIdx}`;

        // 1. Headings (#, ##, ###, ####)
        if (para.startsWith("#")) {
          const levelMatch = para.match(/^(#{1,6})\s+(.+)$/);
          if (levelMatch) {
            const level = levelMatch[1].length;
            const headingText = levelMatch[2];

            if (level === 1) {
              return (
                <h1
                  key={pKey}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-4 pb-1 border-b border-slate-100 dark:border-slate-800 tracking-tight"
                >
                  {renderInlineContent(headingText)}
                </h1>
              );
            }
            if (level === 2) {
              return (
                <h2
                  key={pKey}
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-1 border-b border-slate-100 dark:border-slate-800 tracking-tight flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
                  {renderInlineContent(headingText)}
                </h2>
              );
            }
            return (
              <h3
                key={pKey}
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-3 tracking-tight flex items-center gap-2"
              >
                <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                {renderInlineContent(headingText)}
              </h3>
            );
          }
        }

        // 2. Blockquotes (starts with >)
        if (para.startsWith(">")) {
          const quoteText = para.replace(/^>\s*/gm, "");
          return (
            <div
              key={pKey}
              className="my-3 p-4 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed"
            >
              {renderInlineContent(quoteText)}
            </div>
          );
        }

        // 3. Ordered Lists (1. item, 2. item)
        const isOrderedList = /^\d+\.\s+/.test(para);
        if (isOrderedList) {
          const lines = para.split(/\n(?=\d+\.\s+)/).map((l) => l.trim()).filter(Boolean);
          return (
            <div key={pKey} className="my-3 space-y-2.5">
              {lines.map((line, lIdx) => {
                const itemMatch = line.match(/^(\d+)\.\s+([\s\S]+)$/);
                const number = itemMatch ? itemMatch[1] : `${lIdx + 1}`;
                const rawItemText = itemMatch ? itemMatch[2] : line;

                // Check if item has title like **Title:** description
                const boldTitleMatch = rawItemText.match(/^\*\*([^*]+)\*\*[:\s]*([\s\S]*)$/);

                return (
                  <div
                    key={`${pKey}-item-${lIdx}`}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#131d33]/50 text-xs sm:text-sm"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-[11px] shrink-0 mt-0.5 shadow-sm">
                      {number}
                    </div>
                    <div className="flex-1 space-y-0.5 leading-relaxed text-slate-700 dark:text-slate-300">
                      {boldTitleMatch ? (
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                            {boldTitleMatch[1]}:
                          </span>
                          <span>{renderInlineContent(boldTitleMatch[2])}</span>
                        </div>
                      ) : (
                        renderInlineContent(rawItemText)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }

        // 4. Bullet Lists (- item or * item)
        const isBulletList = /^[-*]\s+/.test(para);
        if (isBulletList) {
          const lines = para.split(/\n(?=[-*]\s+)/).map((l) => l.trim()).filter(Boolean);
          return (
            <ul key={pKey} className="my-3 space-y-2 pl-1">
              {lines.map((line, lIdx) => {
                const cleanItem = line.replace(/^[-*]\s+/, "");
                return (
                  <li
                    key={`${pKey}-b-${lIdx}`}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2" />
                    <span className="flex-1">{renderInlineContent(cleanItem)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 5. Standard Paragraph
        return (
          <p
            key={pKey}
            className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
          >
            {renderInlineContent(para)}
          </p>
        );
      })}
    </React.Fragment>
  );
}
