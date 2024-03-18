import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';

describe('Given the component Header, when we render it', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header></Header>
      </MemoryRouter>
    );
  });
  test('Then, it should appear the h1: Cookbook', () => {
    const mainTittle = screen.getAllByText('Cookbook');
    expect(mainTittle[0]).toBeInTheDocument();
  });
});
