package com.atv;

public class ValidarIR {

    public static boolean validarFaixaZero(double salario, double imposto) {
        return salario <= 1903.98 && imposto == 0;
    }

    public static boolean validarFaixaSete(double salario, double imposto) {
        return salario >= 1903.99 && salario <= 2826.65 && imposto == 7.5;
    }

    public static boolean validarFaixaQuinze(double salario, double imposto) {
        return salario >= 2826.66 && salario <= 3751.05 && imposto == 15;
    }

    public static boolean validarFaixaVinteDois(double salario, double imposto) {
        return salario >= 3751.06 && salario <= 4664.68 && imposto == 22.5;
    }

    public static boolean validarFaixaVinteSete(double salario, double imposto) {
        return salario > 4664.68 && imposto == 27.5;
    }
}