import { calculateModpackSize } from '../utils/modpackUtils';

const STORAGE_KEYS = {
  USERS: 'modpacks_mock_users',
  SESSION: 'modpacks_mock_session',
  MODPACKS: 'modpacks_mock_items',
};

const INITIAL_USERS = [
  {
    id: 'user-1',
    username: 'alex_crafter',
    email: 'alex@example.com',
    password: 'password1234',
  },
];

const INITIAL_MODPACKS = [
  {
    id: 'rpg-adventure',
    title: 'RPG Adventure 1.20.1',
    loader: 'Fabric',
    version: '1.20.1',
    mods: ['JEI', 'Sodium', 'Iris Shaders', 'Better Combat', 'Travelers Backpack'],
    modsCount: 34,
    size: '180 MB',
    updatedAt: 'сьогодні',
  },
  {
    id: 'tech-factory',
    title: 'Tech Factory Skyblock',
    loader: 'Forge',
    version: '1.19.2',
    mods: ['Create', 'Mekanism', 'Applied Energistics 2', 'JEI'],
    modsCount: 42,
    size: '246 MB',
    updatedAt: '2 дні тому',
  },
  {
    id: 'vanilla-plus',
    title: 'Vanilla+ Performance',
    loader: 'Fabric',
    version: '1.21.1',
    mods: ['Sodium', 'Lithium', 'Iris Shaders', 'FerriteCore'],
    modsCount: 21,
    size: '94 MB',
    updatedAt: 'вчора',
  },
];

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ігноруємо помилки переповнення або приватного режиму
  }
}

function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    writeStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MODPACKS)) {
    writeStorage(STORAGE_KEYS.MODPACKS, INITIAL_MODPACKS);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

async function handleApiRequest(pathname, method, bodyText) {
  ensureSeedData();
  await new Promise((resolve) => setTimeout(resolve, 180));

  let body = {};
  if (bodyText) {
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = {};
    }
  }

  // --- AUTH ROUTES ---
  if (pathname === '/api/auth/me' && method === 'GET') {
    const session = readStorage(STORAGE_KEYS.SESSION, null);
    if (!session || !session.user) {
      return jsonResponse({ message: 'Не авторизовано' }, 401);
    }
    return jsonResponse(session);
  }

  if (pathname === '/api/auth/login' && method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    const users = readStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    const found = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    );

    if (!found) {
      return jsonResponse({ message: 'Невірний email або пароль' }, 401);
    }

    const sessionData = {
      user: sanitizeUser(found),
      token: `mock-jwt-token-${found.id}`,
    };
    writeStorage(STORAGE_KEYS.SESSION, sessionData);
    return jsonResponse(sessionData);
  }

  if (pathname === '/api/auth/register' && method === 'POST') {
    const username = (body.username || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!username || !email || !password) {
      return jsonResponse({ message: 'Заповніть усі обов’язкові поля' }, 400);
    }

    const users = readStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
    const exists = users.some((u) => u.email.toLowerCase() === email);
    if (exists) {
      return jsonResponse(
        { message: 'Користувач з таким email вже зареєстрований' },
        400,
      );
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    writeStorage(STORAGE_KEYS.USERS, updatedUsers);

    const sessionData = {
      user: sanitizeUser(newUser),
      token: `mock-jwt-token-${newUser.id}`,
    };
    writeStorage(STORAGE_KEYS.SESSION, sessionData);
    return jsonResponse(sessionData, 201);
  }

  if (pathname === '/api/auth/github' && method === 'POST') {
    const githubUser = {
      id: 'user-github',
      username: 'github_crafter',
      email: 'github@example.com',
    };
    const sessionData = {
      user: githubUser,
      token: 'mock-jwt-token-github',
    };
    writeStorage(STORAGE_KEYS.SESSION, sessionData);
    return jsonResponse(sessionData);
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    return jsonResponse({ success: true });
  }

  // --- MODPACKS ROUTES ---
  if (pathname === '/api/modpacks' && method === 'GET') {
    const modpacks = readStorage(STORAGE_KEYS.MODPACKS, INITIAL_MODPACKS);
    return jsonResponse(modpacks);
  }

  if (pathname === '/api/modpacks' && method === 'POST') {
    const title = (body.title || '').trim();
    const version = body.version || '1.21.1';
    const loader = body.loader || 'Fabric';
    const mods = Array.isArray(body.mods) ? body.mods : [];

    if (!title) {
      return jsonResponse({ message: 'Введіть назву збірки' }, 400);
    }

    const modpacks = readStorage(STORAGE_KEYS.MODPACKS, INITIAL_MODPACKS);
    const modsCount = body.modsCount || mods.length || 1;
    const newPack = {
      id: `pack-${Date.now()}`,
      title,
      version,
      loader,
      mods,
      modsCount,
      size: body.size || calculateModpackSize(modsCount),
      updatedAt: 'сьогодні',
    };

    const updated = [newPack, ...modpacks];
    writeStorage(STORAGE_KEYS.MODPACKS, updated);
    return jsonResponse(newPack, 201);
  }

  if (pathname.startsWith('/api/modpacks/')) {
    const id = decodeURIComponent(pathname.replace('/api/modpacks/', ''));
    const modpacks = readStorage(STORAGE_KEYS.MODPACKS, INITIAL_MODPACKS);
    const index = modpacks.findIndex((item) => item.id === id);

    if (method === 'GET') {
      if (index === -1) {
        return jsonResponse({ message: 'Збірку не знайдено' }, 404);
      }
      return jsonResponse(modpacks[index]);
    }

    if (method === 'PUT') {
      if (index === -1) {
        return jsonResponse({ message: 'Збірку не знайдено' }, 404);
      }
      const existing = modpacks[index];
      const mods = Array.isArray(body.mods) ? body.mods : existing.mods || [];
      const modsCount = body.modsCount ?? mods.length;
      const updatedPack = {
        ...existing,
        ...body,
        id: existing.id,
        mods,
        modsCount,
        size: body.size || calculateModpackSize(modsCount),
        updatedAt: 'сьогодні',
      };
      const updatedList = [...modpacks];
      updatedList[index] = updatedPack;
      writeStorage(STORAGE_KEYS.MODPACKS, updatedList);
      return jsonResponse(updatedPack);
    }

    if (method === 'DELETE') {
      if (index === -1) {
        return jsonResponse({ message: 'Збірку не знайдено' }, 404);
      }
      const updatedList = modpacks.filter((item) => item.id !== id);
      writeStorage(STORAGE_KEYS.MODPACKS, updatedList);
      return jsonResponse({ id, deleted: true });
    }
  }

  return jsonResponse({ message: `Маршрут ${method} ${pathname} не знайдено` }, 404);
}

let isInitialized = false;

export function setupMockServer() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;
  ensureSeedData();

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init = {}) => {
    const urlString = typeof input === 'string' ? input : input?.url || '';
    let pathname = urlString;

    try {
      if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
        pathname = new URL(urlString).pathname;
      }
    } catch {
      pathname = urlString;
    }

    if (pathname.startsWith('/api/')) {
      const method = (init.method || 'GET').toUpperCase();
      const bodyText = typeof init.body === 'string' ? init.body : '';
      return handleApiRequest(pathname, method, bodyText);
    }

    return originalFetch(input, init);
  };
}

export function getStoredSession() {
  ensureSeedData();
  return readStorage(STORAGE_KEYS.SESSION, null);
}
