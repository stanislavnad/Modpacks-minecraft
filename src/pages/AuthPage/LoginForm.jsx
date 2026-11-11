import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pickIcon from '../../assets/fluent-emoji-flat--pick.svg';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import styles from './AuthPage.module.css';

function LoginForm() {
  const navigate = useNavigate();
  const { login, loginWithGithub, loading, error: authError, clearError } = useAuth();

  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password1234');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [forgotHint, setForgotHint] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    setForgotHint(false);
    clearError();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setLocalError('Введіть коректну адресу Email');
      return;
    }
    if (password.length < 6) {
      setLocalError('Пароль має містити щонайменше 6 символів');
      return;
    }

    try {
      await login({ email: trimmedEmail, password, rememberMe });
      navigate('/modpacks');
    } catch {
      // Помилка вже збережена в authError
    }
  };

  const handleGithubLogin = async () => {
    setLocalError('');
    clearError();
    try {
      await loginWithGithub();
      navigate('/modpacks');
    } catch {
      // Помилка вже збережена в authError
    }
  };

  const eyeIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const githubIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );

  const activeError = localError || authError;

  return (
    <section className={styles.card}>
      <div className={styles.topHeader}>
        <div className={styles.logoBadge} aria-hidden="true">
          <img src={pickIcon} alt="" width="24" height="24" />
        </div>
        <h1 className={styles.title}>Вхід в акаунт</h1>
        <p className={styles.subtitle}>
          Керуйте своїми збірками з будь-якого пристрою
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {activeError && (
          <div className={styles.errorBox} role="alert">
            {activeError}
          </div>
        )}

        {forgotHint && (
          <div className={styles.infoBox}>
            Демо-доступ: alex@example.com / password1234
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@example.com"
        />

        <Input
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={eyeIcon}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />

        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkboxInput}
            />
            <span className={styles.customCheckbox}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Запам&apos;ятати мене</span>
          </label>
          <button
            type="button"
            className={`${styles.accentLink} ${styles.linkBtn}`}
            onClick={() => setForgotHint((prev) => !prev)}
          >
            Забули пароль?
          </button>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          type="submit"
          disabled={loading}
        >
          {loading ? 'Вхід...' : 'Увійти'}
        </Button>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>або продовжити через</span>
          <span className={styles.dividerLine} />
        </div>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          icon={githubIcon}
          onClick={handleGithubLogin}
          disabled={loading}
        >
          GitHub
        </Button>
      </form>

      <p className={styles.bottomPrompt}>
        Немає акаунту?{' '}
        <Link to="/register" className={styles.accentLink}>
          Зареєструватися
        </Link>
      </p>
    </section>
  );
}

export default LoginForm;
