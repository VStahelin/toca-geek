# Progresso do Desenvolvimento

## ✅ Concluído

- [x] Estrutura inicial do projeto
- [x] Configuração de API centralizada (axios)
- [x] Integração com toca-geek-statics
- [x] Componente Gallery básico na landing
- [x] Documentação de guidelines (URL, UI/UX, Progress)
- [x] Página completa de galeria (`/galeria`)
- [x] Carrossel de imagens por projeto
- [x] Integração com Instagram (link em cada projeto)
- [x] Atualização do JSON com campo `instagram_url`
- [x] Componente ProjectCard com todas as informações
- [x] Filtros por categoria na galeria
- [x] Roteamento configurado
- [x] Estrutura JSON para serviços com ordenação e status "em breve"
- [x] Componente Services dinâmico com dados do JSON
- [x] Footer dinâmico via JSON
- [x] Configuração de deploy para GitHub Pages
- [x] Workflows de lint e deploy
- [x] Seção "Empresas que confiaram" na home
- [x] JSON de empresas/clientes com short_description e long_description
- [x] Componente Companies para showcase de empresas
- [x] Página completa de serviços (`/servicos`)
- [x] Seção de projetos em destaque na galeria

## 📋 Planejado

### Fase 1: Galeria Completa ✅
- [x] Criar rota `/galeria`
- [x] Componente de carrossel de imagens
- [x] Card de projeto detalhado
- [x] Filtros por categoria
- [x] Link para Instagram em cada projeto
- [x] Seção de projetos em destaque (com `is_highlighted` no JSON)

### Fase 2: Serviços e Empresas
- [x] JSON de empresas/clientes
- [x] Componente de showcase de empresas
- [x] Pasta `images/empresas/` no statics
- [x] Seção "Empresas que confiaram" na home (card apenas)
- [x] Criar rota `/servicos` (página completa de serviços)
- [ ] Criar rota `/empresas` (página completa de empresas/clientes) - **Futuro**

### Fase 3: Melhorias
- [x] Busca de projetos (título, descrição, tags, categoria)
- [x] Ajustar roteamento para usar hash routing (#) para compatibilidade com páginas estáticas
- [x] Modal de visualização de imagens
- [x] Zoom em imagens
- [x] Compartilhamento de projetos

### Fase 4: Otimizações
- [x] Lazy loading de imagens (loading="lazy" e decoding="async")
- [ ] Otimização de performance
- [ ] SEO improvements
- [ ] Analytics

## 🔄 Mudanças Recentes

### 2024-01-XX
- Criada estrutura de API centralizada
- Adicionado axios para requisições
- Integrado React Query para cache
- Atualizado componente Gallery para usar API
- Criada página completa de galeria (`/galeria`)
- Implementado carrossel de imagens por projeto
- Adicionado campo `instagram_url` no JSON
- Criados componentes ProjectCard e ProjectImageCarousel
- Implementados filtros por categoria
- Documentação completa (guidelines de URL e UI/UX)
- Implementado HashRouter para compatibilidade com GitHub Pages
- Adicionada busca de projetos na galeria (título, descrição, tags, categoria)
- Implementado lazy loading e decoding async em todas as imagens
- Implementada seção de projetos em destaque na galeria (usando `is_highlighted` do JSON)
- Implementado modal de visualização de imagens com zoom e navegação
- Adicionado suporte para zoom em imagens (scroll, botões, drag quando zoom > 1)
- Implementado compartilhamento de projetos (Web Share API + fallback para copiar link)
- Adicionado suporte para abrir modal via URL com parâmetro `?project=id`

### Próximas Alterações
- Adicionar mais imagens aos projetos existentes
- Otimizar performance adicional
- SEO improvements
- Analytics
- Criar página completa de empresas (`/empresas`) - Futuro

## 📝 Notas

- Todos os dados vêm do `toca-geek-statics` via GitHub Pages
- Mudanças no JSON são refletidas automaticamente após deploy
- Site é estático, deployado no GitHub Pages

