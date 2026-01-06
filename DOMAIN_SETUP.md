# Configuração de Domínio Personalizado

Este documento explica como configurar o site para funcionar com o domínio personalizado `https://tocageek.com.br/`.

## Estrutura de Domínios

- **Site Principal**: `https://tocageek.com.br/` → `toca-geek-launchpad` (GitHub Pages com domínio customizado)
- **Estáticos**: `https://vstahelin.github.io/toca-geek-statics` → `toca-geek-statics` (GitHub Pages original, sem domínio customizado)

## Configuração

### 1. Frontend (toca-geek-launchpad)

O site principal está configurado para buscar os estáticos do GitHub Pages original. A URL base está em `src/lib/api/config.ts`:

```typescript
const STATICS_BASE_URL = 
  import.meta.env.VITE_STATICS_BASE_URL || 
  "https://vstahelin.github.io/toca-geek-statics";
```

**Valor padrão**: `https://vstahelin.github.io/toca-geek-statics`

Para desenvolvimento local, você pode sobrescrever via variável de ambiente:

```bash
# Criar arquivo .env na raiz do projeto (opcional, apenas para dev)
VITE_STATICS_BASE_URL=http://localhost:3000
```

### 2. Estáticos (toca-geek-statics)

Os estáticos continuam no GitHub Pages original e não precisam de configuração adicional. O script `map_generator.py` sempre gera URLs apontando para `https://vstahelin.github.io/toca-geek-statics`.

### 3. GitHub Pages - Configuração de Domínio

#### Para o site principal (toca-geek-launchpad):
1. Vá em Settings > Pages
2. Em "Custom domain", adicione: `tocageek.com.br`
3. Marque "Enforce HTTPS"
4. O GitHub criará automaticamente um arquivo `CNAME` na branch de deploy

#### Para os estáticos (toca-geek-statics):
- Não é necessário configurar domínio customizado
- Continuam acessíveis em `https://vstahelin.github.io/toca-geek-statics`

### 4. DNS

Configure os registros DNS no seu provedor de domínio:

```
A     @           185.199.108.153
A     @           185.199.109.153
A     @           185.199.110.153
A     @           185.199.111.153
```

Ou use CNAME (se suportado):

```
CNAME @           vstahelin.github.io
```

## Build e Deploy

Após o build, o site estará configurado para buscar os estáticos do GitHub Pages original automaticamente. Não é necessária nenhuma configuração adicional no processo de build.

## Verificação

Após configurar, verifique:

1. ✅ Site principal acessível em `https://tocageek.com.br/`
2. ✅ Estáticos acessíveis em `https://vstahelin.github.io/toca-geek-statics/data/galeria.json`
3. ✅ Site carregando dados dos estáticos corretamente (verificar no console do navegador)
4. ✅ HTTPS funcionando (certificado Let's Encrypt automático do GitHub Pages)

