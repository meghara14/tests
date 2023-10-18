import '@testing-library/jest-dom';
import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        const amounts = [20, 50, 100, 400]

        for (let amount of amounts) {

            render(<ResultBox from="PLN" to="USD" amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${amount}.00 = $${(amount / 3.5).toFixed(2)}`);
            cleanup()
        }
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const amounts = [5, 10, 20, 100];

        for (let amount of amounts) {
            render(<ResultBox from="USD" to="PLN" amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`$${amount}.00 = PLN ${(amount * 3.5).toFixed(2)}`);
            cleanup();
        }
    });
    it('should render proper info about conversion when from is equal to to', () => {
        const amounts = [5, 10, 20, 100];

        for (let amount of amounts) {
            render(<ResultBox from="PLN" to="PLN" amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(`PLN ${amount}.00 = PLN ${amount}.00`);
            cleanup();
        }
    });
    it('should render proper info when amount has negative value', () => {
        render(<ResultBox amount={-100} from='PLN' to='USD'/>);
          const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');
      });



});