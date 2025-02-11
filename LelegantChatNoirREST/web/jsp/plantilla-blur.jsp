<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html data-bs-theme="light" lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="libs/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="libs/bootstrap-icons-1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="css/common/sidebar-blur.css">
    <link rel="stylesheet" href="libs/fontello-05f6a74c/css/fontello.css">
</head>

<body>
<nav class="sidebar blur border-end shadow" id="sidebar">
    <a class="navbar-brand sidebar-header border-bottom d-flex align-items-center">
        <i class="icon-logo_completo icon-large"></i>
    </a>
    <div class="overflow-auto modulos">
        <a class="sidebar-link p-2 m-2 rounded ${path == '/empleados' ? 'sidebar-link-active' : ''}" href="./empleados">
            <i class="bi bi-person-circle" aria-hidden="true"></i>
            Empleados
        </a>
        <a class="sidebar-link p-2 m-2 rounded ${path == '/productos' ? 'sidebar-link-active' : ''}" href="./productos">
            <i class="bi bi-box-seam" aria-hidden="true"></i>
            Productos
        </a>
        <a class="sidebar-link p-2 m-2 rounded position-relative ${path == '/compras' ? 'sidebar-link-active' : ''}" href="./compras">
            <i class="bi bi-building-down"></i>
            Compras
        </a>
        <a class="sidebar-link p-2 m-2 rounded position-relative ${path == '/ventas' ? 'sidebar-link-active' : ''}" href="./ventas">
            <i class="bi bi-cart" aria-hidden="true"></i>
            Ventas
        </a>
    </div>
    <div class="btn-group p-0 position-absolute bottom-0 w-100 border" role="group" aria-label="Vertical radio toggle button group">
        <input value="auto" type="radio" class="btn-check" name="r-tema" id="r-auto" autocomplete="off" checked>
        <label class="btn btn-outline rounded-0" for="r-auto">
            <i class="bi bi-brilliance"></i>
        </label>
        <input value="light" type="radio" class="btn-check" name="r-tema" id="r-claro" autocomplete="off">
        <label class="btn btn-outline" for="r-claro">
            <i class="bi bi-sun"></i>
        </label>
        <input value="dark" type="radio" class="btn-check" name="r-tema" id="r-oscuro" autocomplete="off">
        <label class="btn btn-outline rounded-0" for="r-oscuro">
            <i class="bi bi-moon"></i>
        </label>
    </div>
</nav>

<!-- Sidebar backdrop -->
<div id="sidebarBackdrop" class="sidebar-backdrop d-none"></div>

<!-- Main content -->
<main class="main-content" id="main-content">
    <!-- Header -->
    <header class="header sticky-top p-0 blur shadow">
        <nav class="navbar px-2 border-bottom">
            <div class="container-fluid align-content-center">
                <button class="btn btn-outline" id="sidebarToggle">
                    <i class="bi bi-layout-sidebar"></i>
                </button>
                <i class="icon-logo_letra"></i>
                <ul class="list-inline m-0 align-content-center">
                    <li class="list-inline-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="bi bi-person-circle" aria-hidden="true"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="./perfil">
                                <i class="bi bi-person-circle" aria-hidden="true"></i>
                                Perfil
                            </a></li>
                            <li><a class="dropdown-item" href="./">
                                <i class="bi bi-box-arrow-left"></i>
                                Cerrar sesión
                            </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Main Content Area -->
    <div class="container-fluid mt-4 " id="module-content">
        <h1 class="text-center p-2 blur rounded mb-4 placeholder-glow">
            ${tituloModulo}
        </h1>
        <div class="container-md">
            <div class="d-flex rounded justify-content-between mb-3">
                <div class="input-group w-50">
                    <input type="text" class="form-control" placeholder="Buscar..." aria-label="Example text with button addon" aria-describedby="btnBuscar">
                    <button class="btn btn-outline-primary blur" type="button" id="btnBuscar">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
                <button id="btnAgregar" type="button" class="btn btn-outline-success blur" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="bi bi-file-earmark-plus"></i>
                    Agregar
                </button>
            </div>
            <div class="table-responsive">
                <table id="table" class="table table-bordered table-hover" aria-hidden="true">
                    <thead>
                    <tr class="placeholder-glow">
                        <th>
                            <span class="placeholder col-12"></span>
                        </th>
                        <th>
                            <span class="placeholder col-12"></span>
                        </th>
                        <th>
                            <span class="placeholder col-12"></span>
                        </th>
                        <th>
                            <span class="placeholder col-12"></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="placeholder-glow">
                        <td>
                            <span class="placeholder col-12"></span>
                        </td>
                        <td>
                            <span class="placeholder col-12"></span>
                        </td>
                        <td>
                            <span class="placeholder col-12"></span>
                        </td>
                        <td>
                            <span class="placeholder col-12"></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<!-- Scrollable modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel"></h1>
         <button id="btnCerrarModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body" id="contenido-modal">

       </div>
     </div>
   </div>
 </div>

<script src="libs/bootstrap/js/bootstrap.bundle.js"></script>
<script src="js/common/sidebar.js"></script>
<script src="js/common/theme.js"></script>
<script src="${script}"></script>
</body>
</html>
