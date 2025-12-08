import { createContext, useContext, useEffect, useState } from 'react';
import getDictionary from "@/utils/dictionary";
import useLocale from "@/hook/useLocale";

const DataContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [translations, setTranslations] = useState(null);
    const currentLocale = useLocale();

    useEffect(() => {
        getDictionary(currentLocale, ["default"]).then((i18n) => {
            setTranslations(i18n);
        });
    } ,[]);

    if (!translations) {
        // Optionally, you can add a loading state here if needed
        return (
            <html>
            <body>
            <div>Loading...</div>
            </body>
            </html>
        );
    }

    return (
        <DataContext.Provider value={{ $t: translations.t }}>
            {children}
        </DataContext.Provider>
    );
};

export const useTranslation = () => useContext(DataContext);
