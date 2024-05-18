import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
    const [input, setInput] = useState<string>('');

    const handleButtonClick = (value: string) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
    };

    const handleCalculate = () => {
        try {
            // eslint-disable-next-line no-eval
            const result = eval(input);
            setInput(result.toString());
        } catch (error) {
            setInput('Error');
        }
    };

    const handleScientificFunction = (func: string) => {
        try {
            const result = eval(`${func}(${input})`);
            setInput(result.toString());
        } catch (error) {
            setInput('Error');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.display}>{input}</div>
            <div style={styles.buttonRow}>
                <button style={styles.button} onClick={() => handleButtonClick('1')}>1</button>
                <button style={styles.button} onClick={() => handleButtonClick('2')}>2</button>
                <button style={styles.button} onClick={() => handleButtonClick('3')}>3</button>
                <button style={styles.button} onClick={() => handleButtonClick('+')}>+</button>
            </div>
            <div style={styles.buttonRow}>
                <button style={styles.button} onClick={() => handleButtonClick('4')}>4</button>
                <button style={styles.button} onClick={() => handleButtonClick('5')}>5</button>
                <button style={styles.button} onClick={() => handleButtonClick('6')}>6</button>
                <button style={styles.button} onClick={() => handleButtonClick('-')}>-</button>
            </div>
            <div style={styles.buttonRow}>
                <button style={styles.button} onClick={() => handleButtonClick('7')}>7</button>
                <button style={styles.button} onClick={() => handleButtonClick('8')}>8</button>
                <button style={styles.button} onClick={() => handleButtonClick('9')}>9</button>
                <button style={styles.button} onClick={() => handleButtonClick('*')}>*</button>
            </div>
            <div style={styles.buttonRow}>
                <button style={styles.button} onClick={handleClear}>C</button>
                <button style={styles.button} onClick={() => handleButtonClick('0')}>0</button>
                <button style={styles.button} onClick={handleCalculate}>=</button>
                <button style={styles.button} onClick={() => handleButtonClick('/')}>/</button>
            </div>
            <div style={styles.buttonRow}>
                <button style={styles.button} onClick={() => handleScientificFunction('Math.sin')}>sin</button>
                <button style={styles.button} onClick={() => handleScientificFunction('Math.cos')}>cos</button>
                <button style={styles.button} onClick={() => handleScientificFunction('Math.tan')}>tan</button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    display: {
        width: '100%',
        height: '40px',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'right',
        fontSize: '18px',
        backgroundColor: '#f9f9f9',
    },
    buttonRow: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    button: {
        width: '45px',
        height: '45px',
        fontSize: '18px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default ScientificCalculator;