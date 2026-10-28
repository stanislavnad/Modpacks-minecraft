import PageLayout from '../../components/layout/PageLayout';
import styles from './AuthPage.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthPage({ mode = 'login' }) {
  return (
    <PageLayout activePage="auth">
      <div className={styles.container}>
        {mode === 'register' ? <RegisterForm /> : <LoginForm />}
      </div>
    </PageLayout>
  );
}

export default AuthPage;

