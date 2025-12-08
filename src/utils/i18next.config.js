export const fallbackLanguage = "ar";
export const defaultNamespace = "default";
export const languages = [fallbackLanguage, "ar"];

export function getI18nOptions(
    lng = fallbackLanguage,
    ns = defaultNamespace
) {
    return {
        supportedLngs: languages,
        fallbackLng: fallbackLanguage,
        lng,
        fallbackNS: defaultNamespace,
        defaultNS: defaultNamespace,
        ns,
    };
}