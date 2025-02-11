document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const moduleContent = document.getElementById('module-content');

    const applySidebarState = () => {
        if (window.innerWidth > 768) {
            sidebar.classList.add('sidebar-active');
            mainContent.classList.add('sidebar-active');
            moduleContent.classList.add('px-4');
        } else {
            sidebar.classList.remove('sidebar-active');
            mainContent.classList.remove('sidebar-active');
            moduleContent.classList.remove('px-4');
        }
    };

    // Apply the initial sidebar state based on screen size
    applySidebarState();

    // Listen for resize events to adjust the sidebar state
    window.addEventListener('resize', applySidebarState);

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar-active');
        mainContent.classList.toggle('sidebar-active');
        if (window.innerWidth <= 768) {
            sidebarBackdrop.classList.toggle('d-none');
        }else{
            moduleContent.classList.toggle('px-4');
        }
    });

    sidebarBackdrop.addEventListener('click', function() {
        sidebar.classList.remove('sidebar-active');
        mainContent.classList.remove('sidebar-active');
        sidebarBackdrop.classList.add('d-none');
    });


});