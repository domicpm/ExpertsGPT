// app.test.js

const {add} = require('./app');

describe('add', () => {
  it('returns the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('returns the second number if the first number is zero', () => {
    expect(add(0, 5)).toBe(5);
  });

  it('returns the second number if the first number is negative', () => {
    expect(add(-2, 6)).toBe(6);
  });

  it('returns NaN if the first argument is not a number', () => {
    expect(add('2', 3)).toBe(NaN);
  });

  it('returns NaN if the second argument is not a number', () => {
    expect(add(2, '3')).toBe(NaN);
  });

  it('returns NaN if both arguments are not numbers', () => {
    expect(add('2', '3')).toBe(NaN);
  });
});