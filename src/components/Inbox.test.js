import { render,screen } from "@testing-library/react"
import Inbox from "./Inbox"
import { Provider } from "react-redux";


describe('inbox component',()=>{
    test('rendering inbox text',()=>{
        render(<Provider><Inbox/></Provider>);
        const inboxText=screen.getByText('Inbox');
        expect(inboxText).toBeInTheDocument();
    })
    test('displays received emails', async () => {
        // Mock localStorage.getItem
        const mockLocalStorage = {
          getItem: jest.fn(() => JSON.stringify('receiver@example.com')),
        };
        Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
      
        // Mock fetch response
        const mockData = {
          1: {
            senderMail: 'sender1@example.com',
            subject: 'Test Subject 1',
            content: 'Test Content 1',
            timestamp: '2023-09-10T12:00:00Z',
            recieverMail: 'receiver@example.com',
          },
          2: {
            senderMail: 'sender2@example.com',
            subject: 'Test Subject 2',
            content: 'Test Content 2',
            timestamp: '2023-09-11T14:30:00Z',
            recieverMail: 'receiver@example.com',
          },
        };
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
          })
        );
      
        render(<Inbox />);
        const emails = await screen.findAllByText(/Test Subject/);
        expect(emails.length).toBe(2);
      })
      test('displays the correct timestamp', async () => {
        // Mock localStorage.getItem
        const mockLocalStorage = {
          getItem: jest.fn(() => JSON.stringify('receiver@example.com')),
        };
        Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
      
        // Mock fetch response
        const mockData = {
          1: {
            senderMail: 'sender1@example.com',
            subject: 'Test Subject 1',
            content: 'Test Content 1',
            timestamp: '2023-09-10T12:00:00Z',
            recieverMail: 'receiver@example.com',
          },
        };
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
          })
        );
      
        render(<Inbox />);
        const timestampElement = await screen.findByText('Date:');
        expect(timestampElement).toBeInTheDocument();
      });
      test('displays error message on fetch error', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch emails')));
      
        render(<Inbox />);
        const errorMessage = await screen.findByText('Failed to fetch sent emails');
        expect(errorMessage).toBeInTheDocument();
      });
      test('displays blue dot for unread messages', () => {
        render(<Inbox />);
        
        const blueDotElements = screen.getAllByAltText('bluedot');
        
        // Check that there are blue dot elements for unread messages
        expect(blueDotElements.length).toBe(1); // Assuming one unread message in the mock data
      });
      test('displays "read" badge for read messages', () => {
        render(<Inbox />);
        
        const readBadgeElements = screen.getAllByText('read');
        
        // Check that there are "read" badge elements for read messages
        expect(readBadgeElements.length).toBe(1); // Assuming one read message in the mock data
      });
      test('displays "unread" badge for unread messages', () => {
        render(<Inbox />);
        
        const unreadBadgeElements = screen.getAllByText('unread');
        
        // Check that there are "unread" badge elements for unread messages
        expect(unreadBadgeElements.length).toBe(1); // Assuming one unread message in the mock data
      });
})