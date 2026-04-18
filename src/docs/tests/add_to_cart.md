# Feature: Add to cart

Feature: Add items to shopping cart
  Como cliente de la tienda
  Quiero agregar productos al carrito de compras
  Para poder proceder al checkout y completar mi compra

  Background:
    Given el usuario está en la página "http://opencart.abstracta.us/index.php"
    And el sistema está listo

  @happy_path
  Scenario: Happy path - Agregar dos productos al carrito y proceder al checkout
    Given el usuario está en la página principal de la tienda
    When el usuario hace clic en los dos primeros botones "ADD TO CART"
    And el sistema agrega los productos al carrito con animación
    Then el total del carrito muestra "2 item(s)" con el precio total calculado
    And el usuario hace clic en el ícono del carrito
    Then el sistema redirige a la página de checkout