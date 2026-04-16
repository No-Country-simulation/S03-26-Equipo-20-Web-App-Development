export const saludar = () => {
    const hora = new Date().getHours();
    const saludo = (hora >= 5 && hora < 12) ? "Buenos días" :
        (hora >= 12 && hora < 18) ? "Buenas tardes" : "Buenas noches";

    return saludo;
};
