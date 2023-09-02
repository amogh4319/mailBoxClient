import { render ,screen,fireEvent} from "@testing-library/react"
import SignUp from "./SignUp"
import { BrowserRouter } from "react-router-dom";


describe('sign up component',()=>{
   
    test('renders email address',()=>{
        render(<BrowserRouter>
        <SignUp/>
        </BrowserRouter>
        );
        const emailElement=screen.getByText('Email Address');
        expect(emailElement).toBeInTheDocument();
    })
    test('renders password',()=>{
        render(<BrowserRouter>
            <SignUp/>
            </BrowserRouter>
            );
        const passwordElement=screen.getByText('Password');
        expect(passwordElement).toBeInTheDocument();
    })
    test('typing in the email input field', () => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const emailInput = screen.getByPlaceholderText('EMAIL');
        
        expect(emailInput).toBeInTheDocument();
      });
      test('typing in the password input field', () => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const passwordInput = screen.getByPlaceholderText('PASSWORD');
        
        expect(passwordInput).toBeInTheDocument();
      });
      test('renders SignUp component',() => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        console.log(screen.debug);
        const signUpElement = screen.queryAllByText('SIGN UP');
        expect(signUpElement.length).toBeGreaterThan(0);
      })
      test('to be in email input field',() => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const emailInput = screen.getByPlaceholderText('EMAIL');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        expect(emailInput.value).toBe('test@test.com');
      });
      test('to be in password input field',() => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const passwordInput = screen.getByPlaceholderText('PASSWORD');
        fireEvent.change(passwordInput, { target: { value: '1234567' } });
        expect(passwordInput.value).toBe('1234567');
      });
      test('to check number of buttons',async()=>{
        render(<BrowserRouter><SignUp /></BrowserRouter>)
        const buttonList=await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(2);
      })
      test('to be in email input field',() => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const emailInput = screen.getByPlaceholderText('EMAIL');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
      });
      test('to be in email input field',() => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const emailInput = screen.getByPlaceholderText('EMAIL');
        fireEvent.change(emailInput, { target: { value: 'testtest.com' } });
        expect(emailInput.value).not.toBe('test@test.com');
      });
      
                
                
            
                
    
   
})
