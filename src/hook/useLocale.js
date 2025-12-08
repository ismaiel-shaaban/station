"use client";

import {useMemo} from "react";
import {useParams, usePathname} from "next/navigation";
import {fallbackLanguage, languages} from "@/utils/i18next.config";

export default function useLocale() {
    const params = useParams();
    const pathname = usePathname();

    const localeFromParams = useMemo(() => {
        return params?.locale ;
    }, [params.locale]);

    const localeFromPathname = useMemo(() => {
        return pathname?.split?.("/")?.[1] ;
    }, [pathname]);

    return useMemo(() => {
        const decision = localeFromParams ?? localeFromPathname;
        if (!!decision && languages.includes(decision)) return decision;
        return fallbackLanguage;
    }, [localeFromParams, localeFromPathname]);
}