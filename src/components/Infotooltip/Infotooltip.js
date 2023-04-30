import './Infotooltip.css';
import closeButton from '../../images/close-button.svg';

function Infotooltip({ isOpen, onClose, otherProprs }) {
  // console.log(otherProprs);
  // console.log(onClose);
  const { infotooltipData: { message, isError } } = otherProprs;
  // console.log(message);
  // console.log(isError);
  return (
      <div className={`infotooltip-rollup ${isOpen && 'infotooltip-rollup_active'}`}>
        <button
          className='infotooltip-rollup__close-button'
          type="button"
          onClick={onClose}>
          <img
            className="burger-menu-rollup__close-button-image"
            src={closeButton}
            alt="Логотип заголовка страницы"/>
        </button>
        <p className={`infotooltip-rollup__text ${isError && 'infotooltip-rollup__text_error'}`}>{message}</p>
      </div>
  );
}

export default Infotooltip;
