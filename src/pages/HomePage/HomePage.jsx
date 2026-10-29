import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import FeatureCard from '../../components/modpacks/FeatureCard';
import StepCard from '../../components/modpacks/StepCard';
import Button from '../../components/ui/Button';
import styles from './HomePage.module.css';

const STEPS = [
  {
    stepNumber: 1,
    title: 'Обери версію гри',
    description:
      'Вкажи версію Minecraft та потрібний завантажувач (Fabric, Forge, NeoForge).',
  },
  {
    stepNumber: 2,
    title: 'Додай потрібні моди',
    description: 'Вставляй посилання або знаходь моди за назвою в один клік.',
  },
  {
    stepNumber: 3,
    title: 'Завантаж .zip архів',
    description:
      'Отримай оптимізований архів, готовий для завантаження та розпакування в будь-який лаунчер.',
  },
];

const FEATURES = [
  {
    id: 'versions',
    title: 'Підтримка всіх версій',
    description: 'Швидко налаштовуй збірки під актуальні й legacy-версії гри.',
    icon: (
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
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'loaders',
    title: 'Forge, Fabric, NeoForge',
    description: 'Обирай модлоадер та отримуй сумісні модифікації.',
    icon: (
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
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  },
  {
    id: 'export',
    title: 'Швидкий експорт у .zip',
    description: 'Готовий архів для імпорту в лаунчер.',
    icon: (
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
        <rect width="20" height="5" x="2" y="3" rx="1" />
        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    id: 'cloud',
    title: 'Збереження в акаунті',
    description:
      'Всі створенні збірки зберігаються в аккануті для завантаження на будь якому пристрої.',
    icon: (
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
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
];

function HomePage() {
  const navigate = useNavigate();

  const handleScrollToSteps = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout activePage="home">
      <div className={styles.wrapper}>
        <div className={styles.glow} aria-hidden="true" />

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Легко створюй свої модпаки
            <br />
            Minecraft!
          </h1>
          <p className={styles.heroSubtitle}>
            Обирай версію гри, додавай моди з репозиторіїв та завантажуй готову
            збірку одним архівом.
          </p>
          <div className={styles.heroActions}>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/login')}
            >
              Почати створювати
            </Button>
            <Button variant="secondary" size="md" onClick={handleScrollToSteps}>
              Як це працює
            </Button>
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>Як це працює?</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <StepCard
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Можливості</h2>
          <div className={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default HomePage;
