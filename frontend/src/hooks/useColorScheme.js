import { useState, useEffect } from 'react';

export function useColorScheme() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('color-scheme');
        if (stored === 'dark') return true;
        if (stored === 'light') return false;
        return window.matchMedia('(prefers-color-scheme: dark)');
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        function onChange(evt) {
            if (localStorage.getItem('color-scheme') ===null ) {
                setIsDark(evt.matches);
            }
        }
        mediaQuery.addEventListener('change', onChange);
        return () => mediaQuery.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        localStorage.setItem('color-scheme', isDark ? 'dark' : 'light');
        document.body.classList.toggle('dark', isDark);
    }, [isDark]);

    return { isDark, setIsDark };
};