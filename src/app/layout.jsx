"use client";
import PluginInit from "@/helper/PluginInit";
import "./font.css";
import "./globals.css";
import I18nProvider from "@/utils/I18nProvider";
import useLocale from "@/hook/useLocale";
import { TranslationProvider } from "@/utils/useTranslation";
import { Providers } from "../redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RootLayout({ children }) {
    const locale = useLocale()
    return (
        <TranslationProvider>
            <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <I18nProvider />
                <PluginInit />
                <body>

                    
                <Providers>{children}</Providers>

                </body>
            </html>
        </TranslationProvider>
    );
}
