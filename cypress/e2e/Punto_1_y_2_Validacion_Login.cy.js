describe('Validacion Login', () => {
    // Definición constantes de prueba Login y Validaciones de PIN

    const PIN_INCORRECTO_NUMERICO = ['0', '0', '0', '0'];
    const PIN_INCORRECTO_CARACTERES = ['#', '*', '+', '%'];
    const PIN_INCORRECTO_LETRAS = ['A', 'B', 'C', 'D'];
    const PIN_INCORRECTO_ALFANUMERICO_CON_ESPACIOS = ['1', 'D', ' ', ' '];
    const PIN_INCORRECTO_ESPACIOS = [' ', ' ', ' ', ' '];
    const PIN_CORRECTO = ['5', '5', '6', '9'];

    const INPUTS = ['#digit1', '#digit2', '#digit3', '#digit4'];
    const BOTON_INGRESAR = 'button[type="submit"]';
    const URL = 'https://www.selaski.com/public/reports/shared?token=1b8140da2164226f7d1ab0626547985903b';

    beforeEach(() => {
        cy.visit(URL);
    });
        // CONSTANTE PARA INGRESAR PIN
        const ingresarPIN = (pinArray) => {
            INPUTS.forEach((selector, index) => {
                cy.get(selector).clear().type(pinArray[index]);
            });
        };

        //PRUEBAS ERROR DE INGRESO A SELASKI CON PIN INCORRECTO
       
        it('Ingreso con PIN incorrecto (0000)', () => {
            ingresarPIN(PIN_INCORRECTO_NUMERICO);
            cy.get(BOTON_INGRESAR).click();
            // Validación de mensaje de error
            cy.get('.text-red-500.text-sm')
                .should('be.visible')
                .and('contain', 'Código incorrecto. Por favor ingresa el código correcto para tener acceso');
        });

        it('Ingreso con caracteres especiales (#*+%)', () => {
            ingresarPIN(PIN_INCORRECTO_CARACTERES);
            // Validar que el botón de ingresar no este habilitado
            cy.get(BOTON_INGRESAR).should('be.disabled');
        });

        it('Ingreso con letras (ABCD)', () => {
            ingresarPIN(PIN_INCORRECTO_LETRAS);
            // Validar que el botón de ingresar no este habilitado
            cy.get(BOTON_INGRESAR).should('be.disabled');
        });

        it('Ingreso con combinación inválida (1D  )', () => {
            ingresarPIN(PIN_INCORRECTO_ALFANUMERICO_CON_ESPACIOS);
            // Validar que el botón de ingresar no este habilitado
            cy.get(BOTON_INGRESAR).should('be.disabled');
        });

        it('Ingreso solo con espacios', () => {
            ingresarPIN(PIN_INCORRECTO_ESPACIOS);
            // Validar que el botón de ingresar no este habilitado  
            cy.get(BOTON_INGRESAR).should('be.disabled');
        });

        it('Ingreso con PIN correcto (5569)', () => {
            ingresarPIN(PIN_CORRECTO);
            // Boton visible y habilitado que permita el ingreso
            cy.get(BOTON_INGRESAR).should('not.be.disabled').click();
        });
  
});
   