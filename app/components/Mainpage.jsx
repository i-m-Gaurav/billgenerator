'use client'
import React, { useState } from 'react'

const Mainpage = () => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleGenerateClick = async () => {
        try {      
          const response = await fetch('/api/generatePdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputValue }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const buffer = await response.arrayBuffer();
          const blob = new Blob([buffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
      
          // Open the PDF in a new tab
          const newWindow = window.open('', '_blank');
          newWindow.location.href = url;
      
          // Clean up the temporary URL
          setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
          console.error('Error generating PDF:', error);
          // Handle any errors that occurred during the request
        }
      };
    

    return (
        <div>
            <input type="text" className = "text-black" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleGenerateClick}>Generate</button>
        </div>
    )
}

export default Mainpage