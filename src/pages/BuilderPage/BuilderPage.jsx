import PageLayout from '../../components/layout/PageLayout';
import BuilderForm from '../../components/modpacks/BuilderForm';
import styles from './BuilderPage.module.css';

function BuilderPage() {
  return (
    <PageLayout activePage="builder">
      <div className={styles.container}>
        <BuilderForm />
      </div>
    </PageLayout>
  );
}

export default BuilderPage;

