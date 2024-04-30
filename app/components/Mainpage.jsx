'use client'
import React, { useState } from 'react'

const Mainpage = () => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleGenerateClick = () => {
        fetch('/api/generatePdf')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                // Create a Blob from the array buffer
                const blob = new Blob([buffer], { type: 'application/pdf' });
    
                // Create a temporary URL for the blob
                const url = URL.createObjectURL(blob);
    
                // Create a link element and set its attributes
                const link = document.createElement('a');
                link.href = url;
                link.download = 'generated.pdf';
    
                // Programmatically click the link to trigger the download
                link.click();
    
                // Clean up the temporary URL
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    }
    

    return (
        <div>
            <input type="text" className = "text-black" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleGenerateClick}>Generate</button>
        </div>
    )
}

export default Mainpage