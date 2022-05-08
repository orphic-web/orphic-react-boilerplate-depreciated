import './Spinner.css';
import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/react';

interface ContainerProps {
  show: boolean,
}

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner: React.FC<ContainerProps> = ({
  show,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [activeClass, setActiveClass] = useState('');

  useEffect(() => {
    try {
      if (show) {
        // Prevent the spinner from stuttering if load time is not enough
        const fadeInTimer = setTimeout(() => {
          setShowSpinner(true);
          setActiveClass('active');
        }, 600);
        return () => clearTimeout(fadeInTimer);
      }

      setActiveClass('');
      const fadeOutTimer = setTimeout(() => {
        setShowSpinner(false);
      }, 600);
      return () => clearTimeout(fadeOutTimer);
    } catch (e: any) {
      setShowSpinner(false);
      setActiveClass('');
      console.error(e);
      return e;
    }
  }, [show]);

  return (
    <div className={`spinner__container ${activeClass}`}>
      <DotLoader css={override} loading={showSpinner} size={150}/>
    </div>
  );
};

export default Spinner;
