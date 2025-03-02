export function extractCode(htmlContent) {
    const code = Array.from(htmlContent)
      .map((line) => line.textContent || '')
      .join('\n');
  
    return code;
}