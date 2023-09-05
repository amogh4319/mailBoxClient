import { render ,screen} from "@testing-library/react"
import MessagePage from "./MessagePage"

describe('message page component',()=>{
    test('rendering number of button',async()=>{
        render(<MessagePage/>)
        const buttonList=await screen.findAllByRole('button')
        expect(buttonList).toHaveLength(2)
    }),
    test('rendering sender text',()=>{
        render(<MessagePage/>)
        const senderText= screen.getByText('Sender:')
        expect(senderText).toBeInTheDocument();
    }),
    test('rendering reciept text',()=>{
        render(<MessagePage/>)
        const recieverText= screen.getByText('Reciept:')
        expect(recieverText).toBeInTheDocument();
    }),
    test('rendering subject text',()=>{
        render(<MessagePage/>)
        const subjectText= screen.getByText('Subject:')
        expect(subjectText).toBeInTheDocument();
    })
})