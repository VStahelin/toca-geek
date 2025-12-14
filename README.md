# Toca Geek Launchpad

Site institucional da Toca Geek - Landing page moderna e responsiva para apresentação dos serviços de impressão 3D.

## Sobre o Projeto

Este é o site institucional da Toca Geek, desenvolvido para apresentar os serviços de impressão 3D, incluindo:

- Figuras e colecionáveis personalizados
- Props de cosplay
- Peças de engenharia e protótipos
- Comunicação visual e displays

## Tecnologias

Este projeto foi construído com:

- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React 18** - Biblioteca UI
- **shadcn-ui** - Componentes UI
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **React Router** - Roteamento

## Instalação

### Pré-requisitos

- Node.js 18+ e npm (ou yarn/pnpm)

### Setup Local

```bash
# 1. Clone o repositório
git clone <repository-url>
cd toca-geek-launchpad

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run build:dev` - Gera build de desenvolvimento
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
toca-geek-launchpad/
├── src/
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes shadcn-ui
│   │   ├── Hero.tsx    # Seção hero
│   │   ├── Services.tsx # Seção de serviços
│   │   ├── Gallery.tsx  # Galeria de projetos
│   │   ├── Stats.tsx    # Estatísticas
│   │   ├── QuoteCalculator.tsx # Calculadora de orçamento
│   │   ├── Navbar.tsx   # Navegação
│   │   └── Footer.tsx   # Rodapé
│   ├── pages/          # Páginas
│   ├── assets/         # Imagens e recursos
│   ├── lib/            # Utilitários
│   └── App.tsx         # Componente principal
├── public/             # Arquivos estáticos
└── package.json        # Dependências
```

## Deploy

O projeto pode ser deployado em qualquer plataforma que suporte aplicações Vite/React:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

### Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça o deploy
vercel
```

## Personalização

### Cores e Tema

As cores podem ser personalizadas em `src/index.css` através das variáveis CSS:

- `--primary`: Cor primária (roxo)
- `--secondary`: Cor secundária (azul)
- `--background`: Cor de fundo
- `--foreground`: Cor do texto

### Conteúdo

Os textos e informações podem ser atualizados diretamente nos componentes em `src/components/`.

## Licença

[Adicione sua licença aqui]
