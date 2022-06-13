import styles from './styles.module.css';
import { scrollToTop } from "../../../helpers/scroll";
import { ArrowIcon } from '../../icons';

const BtnScrollToTop = () => {
    return (
        <button className={styles.btnScrollToTop} onClick={scrollToTop}>
            <ArrowIcon />
        </button>
    );
};

export default BtnScrollToTop;
