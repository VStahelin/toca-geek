# Guidelines de URL e Roteamento

## Estrutura de URLs

### Páginas Principais

- `/` - Página inicial (landing page)
- `/galeria` - Galeria completa de projetos
- `/projetos/:id` - Detalhes de um projeto específico (futuro)

### API Endpoints (Estáticos)

Todos os dados estáticos são servidos via GitHub Pages:

- Base URL: `https://vstahelin.github.io/toca-geek-statics` (configurável via `VITE_STATICS_BASE_URL`)
- Galeria JSON: `/data/galeria.json`
- Site Map: `/data/site_map.json`
- Imagens: `/images/{nome-arquivo}.{ext}`

## Convenções

### Rotas
- Use kebab-case para rotas: `/galeria`, `/projetos`
- Rotas devem ser descritivas e em português
- Evite rotas aninhadas profundas (máximo 2 níveis)

### Parâmetros
- Use query params para filtros: `/galeria?categoria=colecionavel`
- Use path params para recursos específicos: `/projetos/123`

### Redirecionamentos
- Sempre use rotas absolutas para navegação interna
- Links externos devem abrir em nova aba (`target="_blank"`)

## Exemplos

```tsx
// ✅ Correto
<Link to="/galeria">Ver Galeria</Link>
<Link to="/galeria?categoria=props">Props</Link>

// ❌ Evitar
<Link to="./galeria">Ver Galeria</Link>
```

