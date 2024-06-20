import { validateCpf } from '../validateCpf';

describe('validateCpf function', () => {
  it('returns true for valid CPFs', () => {
    expect(validateCpf('529.982.247-25')).toBe(true);
    expect(validateCpf('52998224725')).toBe(true);
  });

  it('returns false for invalid CPFs', () => {
    // CPF com todos os dígitos iguais
    expect(validateCpf('111.111.111-11')).toBe(false);

    // CPF com formato inválido (menos de 11 dígitos)
    expect(validateCpf('1234567890')).toBe(false);

    // CPF com dígito verificador inválido
    expect(validateCpf('529.982.247-24')).toBe(false);

    // CPF vazio
    expect(validateCpf('')).toBe(false);

    // CPF com caracteres não numéricos
    expect(validateCpf('abc')).toBe(false);
  });

  it('handles edge cases for rest calculation in validateCpf', () => {
    let cpf = '529.982.247-24';
    expect(validateCpf(cpf)).toBeFalsy();

    cpf = '123.456.789-09';
    expect(validateCpf(cpf)).toBeTruthy();
  });
});
