import styles from '../styles/Footer.module.css';

export const Footer = () => {
    const date = new Date().getFullYear()
    return (<footer className={styles.parent}>
            © Copyright {date}. Jesse Constante. All Rights Reserved.
            </footer>  
        )
}
