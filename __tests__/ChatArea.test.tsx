"use client";

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatArea from '@/components/chat/ChatArea';

describe('ChatArea', () => {
  it('renders without crashing', () => {
    render(<ChatArea />);
    
    // Check if the component renders
    expect(screen.getByText(/# general/i)).toBeInTheDocument();
  });
});