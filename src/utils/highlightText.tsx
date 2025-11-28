export function HighlightMarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index}>{part.replace(/\*\*/g, "")}</strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
