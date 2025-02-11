const cambiarTema = () =>{
    let tema = sessionStorage.getItem('tema');

    if (tema === null || tema == 'auto') {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        if (isDarkMode.matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
        tema = 'auto';
    }else{
        const radios = document.querySelectorAll('input[name="r-tema"]');
        radios.forEach(radio => {
            if (radio.value === tema) {
                radio.checked = true;
            }
        });
        if(tema == 'dark'){
            document.body.classList.remove('light');
        }else{
            document.body.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-bs-theme', tema);
        document.body.classList.add(tema);

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