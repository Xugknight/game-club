import Toggle from 'react-toggle';
import { useColorScheme } from "../../hooks/useColorScheme";

export default function DarkModeToggle() {
    const { isDark, setIsDark } = useColorScheme();

    return (
        <Toggle 
            checked={isDark}
            onChange={({ target }) => setIsDark(target.checked)}
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Toggle dark mode"
        />
    );
};