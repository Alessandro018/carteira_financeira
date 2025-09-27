export const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
export const formatarData = (data: string, localidade?: 'pt-BR' | 'en-US') => new Date(data).toLocaleDateString(localidade ?? 'pt-BR');
export const formatarHora = (data: string) => new Date(data).toLocaleTimeString('pt-BR').substring(0, 5);