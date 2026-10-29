import Footer from './Footer';
import Header from './Header';
import styles from './PageLayout.module.css';

function PageLayout({ activePage = 'home', children }) {
  return (
    <div className={styles.page}>
      <Header activePage={activePage} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;

