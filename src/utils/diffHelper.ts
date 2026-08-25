import { diffWords, Change } from 'diff';

export function renderInlineDiff(oldText: string, newText: string): string {
  if (!oldText && !newText) return '<span class="text-slate-400">No content available for diff.</span>';
  if (!oldText) return `<span class="bg-emerald-100 text-emerald-950 p-1 rounded">${escapeHtml(newText)}</span>`;
  if (!newText) return `<span class="bg-rose-100 text-rose-950 p-1 rounded line-through">${escapeHtml(oldText)}</span>`;

  const changes: Change[] = diffWords(oldText, newText);

  return changes
    .map((part) => {
      const escaped = escapeHtml(part.value);
      if (part.added) {
        return `<ins class="bg-emerald-100 text-emerald-950 px-0.5 rounded border-b-2 border-emerald-500 font-medium no-underline">${escaped}</ins>`;
      }
      if (part.removed) {
        return `<del class="bg-rose-100 text-rose-900 line-through px-0.5 rounded border-b border-rose-400 opacity-70">${escaped}</del>`;
      }
      return `<span>${escaped}</span>`;
    })
    .join('');
}

export function renderSideBySideDiff(oldText: string, newText: string) {
  return {
    oldHtml: escapeHtml(oldText),
    newHtml: escapeHtml(newText),
  };
}

export function generateCleanHtml(markdown: string): string {
  if (!markdown) return '';
  const lines = markdown.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith('# ')) {
      html += `<h1>${escapeHtml(trimmed.substring(2))}</h1>\n`;
    } else if (trimmed.startsWith('## ')) {
      html += `<h2>${escapeHtml(trimmed.substring(3))}</h2>\n`;
    } else if (trimmed.startsWith('### ')) {
      html += `<h3>${escapeHtml(trimmed.substring(4))}</h3>\n`;
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `  <li>${parseFormatting(trimmed.substring(2))}</li>\n`;
    } else if (trimmed.startsWith('[IMAGE:')) {
      html += `<div class="image-placeholder">${escapeHtml(trimmed)}</div>\n`;
    } else {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<p>${parseFormatting(trimmed)}</p>\n`;
    }
  }

  if (inList) {
    html += '</ul>\n';
  }

  return html;
}

function parseFormatting(text: string): string {
  let escaped = escapeHtml(text);
  // Bold
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Links: [Text](url)
  escaped = escaped.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return escaped;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
