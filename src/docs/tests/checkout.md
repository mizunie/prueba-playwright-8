# Feature: Checkout de Compra

Feature: Checkout como invitado
  Como cliente no registrado
  Quiero completar una compra sin crear cuenta
  Para recibir mis productos de forma rápida

  Background:
    Given el usuario está en la página "http://opencart.abstracta.us/index.php"
    And el usuario tiene productos en el carrito

  @happy_path
  Scenario: Happy path - Checkout completo con todos los datos
    Given el usuario selecciona "Guest Checkout"
    When completa todos los campos obligatorios y opcionales
    And acepta los términos y condiciones
    And confirma el pago
    Then se muestra el mensaje "Your order has been placed!"
    And la orden se procesa correctamente

  @datos_invalidos
  Scenario: Datos inválidos - Campos obligatorios vacíos
    Given el usuario inicia el checkout como invitado
    When intenta continuar sin completar campos obligatorios
    Then el sistema no permite avanzar
    And muestra los campos requeridos

  @datos_aleatorios
  Scenario Outline: Checkout con diferentes combinaciones de datos
    Given el usuario está en la sección de facturación
    When ingresa "<campo>" con valor "<valor>"
    And completa el resto de campos obligatorios
    Then puede avanzar al siguiente paso "<resultado>"

    Examples:
      | campo | valor | resultado |
      | company | vacío | sí |
      | address2 | vacío | sí |
      | email | invalid-email | no |
      | telephone | vacío | no |