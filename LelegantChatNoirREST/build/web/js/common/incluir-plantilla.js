const incluirPlantilla = async () => {
    await fetch('../../includes/plantilla-blur.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('body').innerHTML = data;
        });
}

incluirPlantilla();