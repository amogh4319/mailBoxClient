import { render ,screen} from "@testing-library/react"
import SignUp from "./SignUp"

describe('sign up component',()=>{
    test('renders email address',()=>{
        render(<SignUp/>);
        const emailElement=screen.getByText('Email Address');
        expect(emailElement).toBeInTheDocument();
    })
    test('renders password',()=>{
        render(<SignUp/>);
        const passwordElement=screen.getByText('Password');
        expect(passwordElement).toBeInTheDocument();
    })
    
    test('renders sign in',()=>{
        render(<SignUp/>);
        const signInElement=screen.getByText('SIGN IN',{exact:false});
        expect(signInElement).toBeInTheDocument();
    })
})
