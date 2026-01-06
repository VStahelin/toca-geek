# API Service Layer

Camada de serviço centralizada para comunicação com o repositório de estáticos.

## Estrutura

```
lib/api/
├── config.ts          # Configurações (URL base, endpoints)
├── client.ts          # Cliente Axios configurado
├── types.ts           # Tipos TypeScript
├── galeria.service.ts # Serviços da galeria
└── index.ts           # Barrel exports
```

## Uso

### Em Componentes

```tsx
import { useGaleria } from "@/hooks/useGaleria";

function MyComponent() {
  const { data, isLoading, error } = useGaleria();
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <div>{/* usar data */}</div>;
}
```

### Diretamente no Serviço

```tsx
import { getGaleria, getProjetosDestaque } from "@/lib/api";

// Em um useEffect ou função assíncrona
const projetos = await getGaleria();
const destaques = await getProjetosDestaque();
```

## Vantagens

- ✅ **Centralização**: Todas as URLs em um único lugar
- ✅ **Type Safety**: TypeScript garante tipos corretos
- ✅ **Manutenibilidade**: Mudanças de endpoint em um só lugar
- ✅ **Cache**: React Query gerencia cache automaticamente
- ✅ **Error Handling**: Tratamento centralizado de erros

## Adicionar Novo Endpoint

1. Adicione o endpoint em `config.ts`:
```ts
export const API_ENDPOINTS = {
  // ... existentes
  NOVO_ENDPOINT: "/data/novo.json",
};
```

2. Crie a função no serviço apropriado:
```ts
export const getNovoDado = async (): Promise<NovoTipo> => {
  const response = await apiClient.get<NovoTipo>(API_ENDPOINTS.NOVO_ENDPOINT);
  return response.data;
};
```

3. Crie um hook se necessário:
```ts
export const useNovoDado = () => {
  return useQuery({
    queryKey: ["novo"],
    queryFn: getNovoDado,
  });
};
```

