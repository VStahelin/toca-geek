import { ReactNode } from "react";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

/**
 * Componente simples para renderizar markdown básico
 * Suporta: **negrito**, *itálico*, quebras de linha (\n), e listas com bullet points (•)
 */
export const MarkdownText = ({ children, className = "" }: MarkdownTextProps) => {
  if (!children) return null;

  // Processa uma linha individual com negrito e itálico
  const processInlineMarkdown = (line: string, keyPrefix: string): ReactNode[] => {
    const processedLine: ReactNode[] = [];
    let lastIndex = 0;
    let lineKey = 0;

    // Regex para **negrito** e *itálico*
    const boldRegex = /\*\*(.+?)\*\*/g;
    const italicRegex = /\*(.+?)\*/g;

    // Encontra todos os matches de negrito e itálico
    const matches: Array<{ type: "bold" | "italic"; start: number; end: number; content: string }> = [];
    
    let match;
    while ((match = boldRegex.exec(line)) !== null) {
      matches.push({
        type: "bold",
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }
    
    boldRegex.lastIndex = 0; // Reset regex
    
    while ((match = italicRegex.exec(line)) !== null) {
      // Ignora se já está dentro de um negrito
      const isInsideBold = matches.some(
        (m) => m.type === "bold" && match!.index >= m.start && match!.index < m.end
      );
      if (!isInsideBold) {
        matches.push({
          type: "italic",
          start: match.index,
          end: match.index + match[0].length,
          content: match[1],
        });
      }
    }

    // Ordena matches por posição
    matches.sort((a, b) => a.start - b.start);

    // Processa a linha com os matches
    matches.forEach((match) => {
      // Adiciona texto antes do match
      if (match.start > lastIndex) {
        processedLine.push(
          <span key={`${keyPrefix}-text-${lineKey++}`}>
            {line.substring(lastIndex, match.start)}
          </span>
        );
      }

      // Adiciona o match formatado
      if (match.type === "bold") {
        processedLine.push(
          <strong key={`${keyPrefix}-bold-${lineKey++}`} className="font-semibold text-foreground">
            {match.content}
          </strong>
        );
      } else {
        processedLine.push(
          <em key={`${keyPrefix}-italic-${lineKey++}`} className="italic">
            {match.content}
          </em>
        );
      }

      lastIndex = match.end;
    });

    // Adiciona texto restante
    if (lastIndex < line.length) {
      processedLine.push(
        <span key={`${keyPrefix}-text-${lineKey++}`}>
          {line.substring(lastIndex)}
        </span>
      );
    }

    return processedLine.length > 0 ? processedLine : [<span key={`${keyPrefix}-plain`}>{line}</span>];
  };

  // Processa o texto markdown completo
  const processMarkdown = (text: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    const lines = text.split("\n");
    let key = 0;
    let lastWasEmpty = false;
    
    lines.forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      
      // Trata linhas vazias - cria espaçamento menor
      if (!trimmedLine) {
        if (lineIndex > 0 && !lastWasEmpty) {
          parts.push(<div key={`spacer-${key++}`} className="h-1" />);
          lastWasEmpty = true;
        }
        return;
      }
      
      lastWasEmpty = false;
      
      // Adiciona quebra de linha compacta antes (exceto na primeira linha)
      if (lineIndex > 0) {
        const prevLine = lines[lineIndex - 1].trim();
        if (prevLine) {
          // Não adiciona <br> se a linha anterior não estava vazia
          // O espaçamento será controlado pelo container
        }
      }
      
      // Detecta lista com bullet point (•)
      if (trimmedLine.startsWith("•")) {
        const listItem = trimmedLine.substring(1).trim();
        parts.push(
          <div key={`list-${key++}`} className="flex items-start gap-2 mt-0.5 mb-0.5">
            <span className="text-primary mt-1 shrink-0">•</span>
            <span className="flex-1">
              {processInlineMarkdown(listItem, `list-${lineIndex}`)}
            </span>
          </div>
        );
      } else if (trimmedLine.match(/^\s+-/)) {
        // Detecta subitem com "-" (indentado)
        const subItem = trimmedLine.replace(/^\s+-/, "").trim();
        parts.push(
          <div key={`subitem-${key++}`} className="flex items-start gap-2 mt-0.5 mb-0.5 ml-6">
            <span className="text-muted-foreground mt-1 shrink-0">-</span>
            <span className="flex-1">
              {processInlineMarkdown(subItem, `subitem-${lineIndex}`)}
            </span>
          </div>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        // Detecta lista numerada
        const match = trimmedLine.match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          const [, number, content] = match;
          parts.push(
            <div key={`num-list-${key++}`} className="flex items-start gap-2 mt-0.5 mb-0.5">
              <span className="text-primary font-semibold shrink-0">{number}.</span>
              <span className="flex-1">
                {processInlineMarkdown(content, `num-list-${lineIndex}`)}
              </span>
            </div>
          );
        } else {
          // Linha normal
          parts.push(
            <div key={`line-${key++}`} className="mt-0.5 mb-0.5">
              {processInlineMarkdown(trimmedLine, `line-${lineIndex}`)}
            </div>
          );
        }
      } else if (trimmedLine) {
        // Linha normal (não vazia)
        parts.push(
          <div key={`line-${key++}`} className="mt-0.5 mb-0.5">
            {processInlineMarkdown(trimmedLine, `line-${lineIndex}`)}
          </div>
        );
      }
    });

    return parts;
  };

  return (
    <div className={`${className} leading-normal`}>
      {processMarkdown(children)}
    </div>
  );
};

