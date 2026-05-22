'use client';

function inlineFormat(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#eb6753;font-style:normal;font-weight:500">$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px">$1</code>');
}

export function renderMarkdown(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) { i++; continue; }

    // Heading: ## or ###
    if (/^#{1,3}\s/.test(trimmed)) {
      const text = trimmed.replace(/^#{1,3}\s/, '');
      elements.push(
        <div key={i} style={{ fontWeight: 700, fontSize: 15, color: '#111', marginTop: 14, marginBottom: 4 }}
          dangerouslySetInnerHTML={{ __html: inlineFormat(text) }} />
      );
      i++; continue;
    }

    // Bullet point
    if (/^[•\-\*✓✗➤►▸→]\s/.test(trimmed)) {
      const bullets = [];
      while (i < lines.length && /^[•\-\*✓✗➤►▸→]\s/.test(lines[i].trim())) {
        bullets.push(lines[i].trim().replace(/^[•\-\*✓✗➤►▸→]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ margin: '6px 0 6px 4px', padding: 0, listStyle: 'none' }}>
          {bullets.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'flex-start' }}>
              <span style={{ color: '#eb6753', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>•</span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(b) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ margin: '6px 0 6px 4px', padding: 0, listStyle: 'none' }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'flex-start' }}>
              <span style={{
                color: 'white', background: '#eb6753', borderRadius: '50%',
                width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 10, fontWeight: 700, marginTop: 2,
              }}>{ii + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{ margin: '0 0 6px 0', lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }} />
    );
    i++;
  }

  return elements;
}
