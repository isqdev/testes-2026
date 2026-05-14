package com.atv;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ValidarIRTest {

    @Test
    void validarFaixaZero() {
        assertTrue(ValidarIR.validarFaixaZero(1903.98, 0));
    }

    @Test
    void invalidarFaixaZero() {
        assertFalse(ValidarIR.validarFaixaZero(1903.99, 0));
    }

    @Test
    void validarFaixaSete() {
        assertTrue(ValidarIR.validarFaixaSete(1903.99, 7.5));
    }

    @Test
    void invalidarFaixaSete() {
        assertFalse(ValidarIR.validarFaixaSete(2826.66, 7.5));
    }

    @Test
    void validarFaixaQuinze() {
        assertTrue(ValidarIR.validarFaixaQuinze(2826.66, 15));
    }

    @Test
    void invalidarFaixaQuinze() {
        assertFalse(ValidarIR.validarFaixaQuinze(3751.06, 15));
    }

    @Test
    void validarFaixaVinteDois() {
        assertTrue(ValidarIR.validarFaixaVinteDois(3751.06, 22.5));
    }

    @Test
    void invalidarFaixaVinteDois() {
        assertFalse(ValidarIR.validarFaixaVinteDois(4664.69, 22.5));
    }

    @Test
    void validarFaixaVinteSete() {
        assertTrue(ValidarIR.validarFaixaVinteSete(4664.69, 27.5));
    }

    @Test
    void invalidarFaixaVinteSete() {
        assertFalse(ValidarIR.validarFaixaVinteSete(4664.68, 27.5));
    }
}

