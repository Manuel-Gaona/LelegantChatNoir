const cambiarTema = () =>{
    let tema = sessionStorage.getItem('tema');

    if (tema === null || tema == 'auto') {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (isDarkMode.matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
        }
        tema = 'auto';
    }else{
        const radios = document.querySelectorAll('input[name="r-tema"]');
        radios.forEach(radio => {
            if (radio.value === tema) {
                radio.checked = true;
            }
        });
        document.documentElement.setAttribute('data-bs-theme', tema);
    }

    sessionStorage.setItem('tema', tema);
}

const seleccionTema = () =>{
    const r_theme = document.querySelectorAll('input[name="r-tema"]');

    r_theme.forEach(radio => {
        radio.addEventListener('change', (event) => {
            sessionStorage.setItem('tema', event.target.value);
            cambiarTema();
        });
    });
}

window.onload = () => {
    cambiarTema();
    seleccionTema();
}