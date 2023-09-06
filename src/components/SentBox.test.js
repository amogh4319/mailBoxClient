import { render,screen } from "@testing-library/react"
import SentBox from "./SentBox"
import { BrowserRouter } from "react-router-dom"

describe('sentbox component',()=>{
    test('render sentbox text',()=>{
        render(<BrowserRouter><SentBox/></BrowserRouter>)
        const sentboxText=screen.getByText('Sent Box');
        expect(sentboxText).toBeInTheDocument();
    }),
    test('render subject text',()=>{
        render(<BrowserRouter><SentBox/></BrowserRouter>)
        const subjectText=screen.getByText('Subject:');
        expect(subjectText).toBeInTheDocument();
    }),
    test('render sentbox text',()=>{
        render(<BrowserRouter><SentBox/></BrowserRouter>)
        const recieverText=screen.getByText('Recipient:');
        expect(recieverText).toBeInTheDocument();
    })
})