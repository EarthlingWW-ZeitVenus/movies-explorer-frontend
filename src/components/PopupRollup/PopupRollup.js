import React from 'react';
import './PopupRollup.css';

function PopupRollup({
  component: Component,
  onClose,
  isOpen,
  ...props
}) {
  const popupRef = React.useRef();

  const otherProps = props;

  React.useEffect(() => {
    // debugger;
    if (!isOpen) return;
    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    const handleOverlayClose = (evt) => {
      console.log('Сработал метод handleOverlayClose');
      // console.log(evt);
      // console.log(evt.target);
      // console.log(evt.currentTarget);
      // debugger;
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    };
    // eslint-disable-next-line no-undef
    document.addEventListener('keydown', handleEscapeClose);
    popupRef.current.addEventListener('click', handleOverlayClose);
    // eslint-disable-next-line consistent-return
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <section
    ref={popupRef}
    className={`popup-rollup ${isOpen && 'popup-rollup_opened'} page_format_side-padding`}
  >
      <Component onClose={onClose} isOpen={isOpen} otherProprs={otherProps} />
  </section>
  );
}

export default PopupRollup;
