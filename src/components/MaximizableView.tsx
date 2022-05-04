import { Children, useEffect, useRef } from 'react';

interface ContainerProps {
  defaultState: boolean;
}

const MaximizableView: React.FC<ContainerProps> = ({ defaultState, children }) => {
  const maximizableElement = useRef<any>(null);

  const handleEnterFullscreen = () => {
    maximizableElement.current
      .requestFullscreen()
      .then(() => {
        console.log('is full screen');
      })
      .catch(() => {
        console.log('Could not set to full screen');
      });
  };

  const handleExitFullscreen = () => {
    document.exitFullscreen();
  };

  useEffect(() => {
    console.log('asd');
  }, []);

  return (
    <div ref={maximizableElement} className="container">
      <strong></strong>
      {/* <button onClick={() => handleEnterFullscreen()}>Enter fullScreen</button>
      <button onClick={() => handleExitFullscreen()}>Exit fullScreen</button> */}
    </div>
  );
};

export default MaximizableView;
