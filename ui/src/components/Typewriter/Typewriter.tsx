import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import './styles.css';

export interface TypewriterProps {}

export default (() => {
  const currentText = useSelector((state: RootState) => state.typewriter.currentText);
  const delay = useSelector((state: RootState) => state.typewriter.delay);
  const [displayedText, setDisplayedText] = React.useState<string>('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, currentText, delay]);

  return (
    <div className="typewriter-container">
      <div className="typewriter-text">
        {Array.from(displayedText).map((letter, index) => (
          <span key={`${letter}_${index}`} className="typewriter-letter">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
}) as React.FC<TypewriterProps>;
