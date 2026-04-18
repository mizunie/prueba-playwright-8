# Playwright - Pruebas Automatizadas

![CI](https://github.com/mizunie/prueba-playwright-8/actions/workflows/playwright.yml/badge.svg)

## 📋 Descripción

Este proyecto contiene pruebas automatizadas end-to-end utilizando Playwright sobre el sitio de pruebas OpenCart.

Se implementó el patrón Page Object Model (POM) para mantener una estructura clara, reutilizable y mantenible.

---

## ⚙️ Requisitos

* Node.js 18 o superior
* pnpm instalado
* Navegadores de Playwright

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/mizunie/prueba-playwright-8.git
cd prueba-playwright-8
```

2. Instalar dependencias:

```bash
pnpm install
```

3. Instalar navegadores:

```bash
npx playwright install
```

---

## 🚀 Ejecución de pruebas

### Ejecutar todos los tests

```bash
pnpm playwright test
```

---

### Ejecutar en modo UI (debug)

```bash
pnpm playwright test --ui
```

---

### Ejecutar en modo headed (ver navegador)

```bash
pnpm playwright test --headed
```

---

## 📊 Reportes

Para visualizar el reporte:

```bash
npx playwright show-report
```

El reporte incluye:

* Resultados de ejecución
* Trazas
* Screenshots
* Pasos detallados

---

## 🧪 Estructura del proyecto

```
src/
├── pages/     → Page Objects
├── tests/     → Casos de prueba
├── data/      → Datos de prueba
└── docs/      → Casos en formato Gherkin
```

---

## ⚠️ Notas

* Las pruebas se ejecutan en modo headless por defecto.
* Playwright maneja esperas automáticas, reduciendo la necesidad de waits explícitos.
* Se priorizó estabilidad y simplicidad en los escenarios (happy path).

---

## 🧑‍💻 Autor

Proyecto desarrollado como ejercicio técnico de automatización.
