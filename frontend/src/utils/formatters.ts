export const saludar = () => {
    const hora = new Date().getHours();
    const saludo = (hora >= 5 && hora < 12) ? "Buenos días" :
        (hora >= 12 && hora < 18) ? "Buenas tardes" : "Buenas noches";

    return saludo;
};

export function tiempoAtras(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3_600_000);
    const d = Math.floor(diff / 86_400_000);
    if (h < 1) return "Hace un momento";
    if (h < 24) return `Hace ${h}h`;
    if (d === 1) return "Ayer";
    return `Hace ${d} días`;
}

export function truncar(texto: string, max: number) {
    return texto.length > max ? texto.slice(0, max) + "…" : texto;
}

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};