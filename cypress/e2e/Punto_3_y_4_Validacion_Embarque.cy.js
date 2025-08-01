describe('PUNTO 3 y 4', () => {
  const PIN_CORRECTO = ['5', '5', '6', '9'];
  const BOTON_INGRESAR = 'button[type="submit"]';
  const URL = 'https://www.selaski.com/public/reports/shared?token=1b8140da2164226f7d1ab0626547985903b';
  const INPUTS = ['#digit1', '#digit2', '#digit3', '#digit4'];

  // Constante de ingreso de PIN

  const ingresarPIN = (pinArray) => {
    INPUTS.forEach((selector, index) => {
      cy.get(selector).clear().type(pinArray[index]);
    });
  };
//Antes de cada prueba, visitamos la URL e ingresamos el PIN correcto
  beforeEach(() => {
    cy.visit(URL);
    ingresarPIN(PIN_CORRECTO);
    cy.get(BOTON_INGRESAR).should('be.visible').and('not.be.disabled').click();


    // Abrir filtro maestro
    cy.get('app-atom-filter-tab > .flex').click();

    // Esperar que los filtros dentro del filtro maestro carguen
    cy.wait(5000);

    // Abrir filtro seleccionar
    cy.get('span.items-center > .onclick_emitter > app-atom-select-input > .select-menu > .flex').click();

    // Esperar que se carguen todas las opciones
    cy.wait(5000);

    //Seleccionar la opción "Embarque" forzando el click   
    cy.get('div.search-options').contains('p', 'Embarque').should('be.visible').click({ force: true });

    // Dar click en el buscador
    cy.get('.focus\\:outline-none').click();

  });

  it('Busqueda Prueba 1 y validación que la fila de Embarque "Prueba 1-01" contenga información', () => {
    //Ingresamos lo que se va a buscar (Prueba 1) y hacemos enter
    cy.get('input[placeholder="Escribe aquí tu búsqueda"]').type('Prueba 1{enter}');
    // Verifica existencia del registro
    cy.get('.table-first-element').contains('p', 'Prueba 1-01').should('exist');
    // Valida los datos asociados a la fila
    cy.get('.week-selected').eq(1).contains('p', ' 35 ').should('exist');
    cy.get('.table-row-custom').contains('p', '30/08/2025').should('exist');
    cy.get('.table-row-custom').contains('h5', 'Manaus').should('exist');
  });

  it('Validación busqueda de embarque no existente', () => {
    //Ingresamos busqueda inexistente (Aereo) y hacemos enter
    cy.get('input[placeholder="Escribe aquí tu búsqueda"]').type('Aereo{enter}');
    // Validamos mensaje correcto de no resultados (Sin datos para mostrar)
    cy.get('h3.text-center.text-lg.font-medium.mt-6').should('be.visible').and('contain', 'Sin datos para mostrar');
  });

});

