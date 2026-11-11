/**
 * Витягує назву мода з введеного рядка або посилання (Modrinth, CurseForge, GitHub)
 */
export function parseModInput(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) return '';

  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const url = new URL(trimmed);
      const segments = url.pathname.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';
      if (lastSegment) {
        return decodeURIComponent(lastSegment)
          .replace(/\.jar$|\.zip$/i, '')
          .replace(/[-_]+/g, ' ');
      }
    }
  } catch {
    // Якщо не валідний URL, повертаємо як звичайну назву
  }

  return trimmed;
}

/**
 * Розраховує приблизний розмір збірки на основі кількості модів
 */
export function calculateModpackSize(modsCount) {
  const count = Math.max(1, Number(modsCount) || 1);
  return `${count * 6} MB`;
}
