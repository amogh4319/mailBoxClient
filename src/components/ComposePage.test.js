import {render,screen} from '@testing-library/react';
import ComposePage from './ComposePage';
import { BrowserRouter } from 'react-router-dom';

describe('compose page component',()=>{
    test('rendering to text',()=>{
        render(<BrowserRouter><ComposePage/></BrowserRouter>);
        const totext=screen.getByText('To');
        expect(totext).toBeInTheDocument();
    })
    test('rendering subject text',()=>{
        render(<ComposePage/>);
        const subjecttext=screen.getByText('Subject');
        expect(subjecttext).toBeInTheDocument();
    })
    test('rendering to placeholder text',()=>{
        render(<ComposePage/>);
        const toplaceHoldertext=screen.getByPlaceholderText('example@gmail.com');
        expect(toplaceHoldertext).toBeInTheDocument();
    })
    test('rendering number of buttons', async() => {
        render(<ComposePage />);
        const buttonList = await screen.findAllByRole('button');
        expect(buttonList).toHaveLength(13);
      })
      test('submitting the form', () => {
        render(<ComposePage />);
        const sendButton = screen.getByRole('button', { name: 'Send' });
        expect(sendButton).toBeInTheDocument();
      })
      
   
})