describe('Limite de intentos fallidos y bloqueo de pin', () => {
    // Definición constantes de prueba pin incorrecto

    const PIN_INCORRECTO_NUMERICO = ['0', '0', '0', '0'];
    const INPUTS = ['#digit1', '#digit2', '#digit3', '#digit4'];
    const BOTON_INGRESAR = 'button[type="submit"]';
    const URL = 'https://www.selaski.com/public/reports/shared?token=1b8140da2164226f7d1ab0626547985903b';
    const ingresarPIN = (pinArray) => {
            INPUTS.forEach((selector, index) => {
                cy.get(selector).clear().type(pinArray[index]);
            });
    };

    beforeEach(() => {
        cy.visit(URL);
    });

    it('Repetir intento con PIN incorrecto 4 veces', () => {
    Cypress._.times(3, (i) => {
        cy.log(`Intento #${i + 1}`);

        ingresarPIN(PIN_INCORRECTO_NUMERICO);
        cy.get(BOTON_INGRESAR).click();

        cy.get('.text-red-500.text-sm')
        .should('be.visible')
        .and('contain', 'Código incorrecto. Por favor ingresa el código correcto para tener acceso');
        });
        
        ingresarPIN(PIN_INCORRECTO_NUMERICO);
        cy.get(BOTON_INGRESAR).click();
        // Validación de mensaje de error
        cy.get('.text-red-500')
            .should('be.visible')
                .and('contain', 'Has excedido el número de intentos permitidos. Por favor intenta más tarde');
    });
});
    
     
