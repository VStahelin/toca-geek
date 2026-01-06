# Guidelines de UI/UX

## Princípios de Design

### Tema e Identidade Visual

- **Cores**: Gradientes roxo/azul (primary/secondary)
- **Tipografia**: Orbitron para títulos, sistema para corpo
- **Estilo**: Moderno, geek, tech-forward
- **Animações**: Suaves, com Framer Motion

### Componentes Padrão

#### Cards de Projeto
- Glass morphism effect
- Hover com scale e glow
- Border gradient animado
- Transições suaves (300ms)

#### Carrosséis
- Navegação por setas e dots
- Touch/swipe support
- Auto-play opcional (pausa no hover)
- Indicadores visuais claros

#### Botões
- Primary: Gradiente com hover effect
- Secondary: Outline com border animado
- Links: Underline on hover
- Estados: Loading, disabled, active

### Espaçamento

- **Seções**: `py-12 sm:py-16 md:py-24`
- **Cards**: Gap de `gap-4 sm:gap-6`
- **Padding interno**: `p-4 sm:p-6 md:p-8`

### Responsividade

- Mobile First: Design para mobile primeiro
- Breakpoints:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Animações

- **Entrada**: Fade in + slide up (0.6s)
- **Hover**: Scale 1.05 + glow (0.3s)
- **Transições**: Ease-in-out padrão
- **Scroll**: Reveal on scroll (viewport once)

### Acessibilidade

- Contraste mínimo 4.5:1
- Focus states visíveis
- Alt text em todas as imagens
- ARIA labels quando necessário
- Navegação por teclado

## Padrões de Componentes

### Galeria de Projetos

```tsx
// Estrutura padrão
<section className="py-12 sm:py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      Título <span className="gradient-text">Destaque</span>
    </h2>
    {/* Grid ou Lista de projetos */}
  </div>
</section>
```

### Cards de Projeto

- Altura mínima consistente
- Imagem com aspect-ratio preservado
- Overlay com gradiente no hover
- Tags visíveis
- Link para Instagram destacado

### Carrossel de Imagens

- Full width em mobile
- Contained em desktop
- Navegação sempre visível
- Thumbnails opcionais
- Zoom on click (futuro)

## Referências

- Magic UI: Componentes animados e modernos
- shadcn/ui: Base de componentes acessíveis
- Framer Motion: Animações fluidas
- Tailwind CSS: Utilitários de estilo

