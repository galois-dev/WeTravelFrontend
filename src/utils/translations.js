export function LT(from, lang, key) {
    if (from !== undefined && lang !== undefined && key !== undefined &&
        from[key] !== undefined && from[key][lang] !== undefined) {
        return from[key][lang] ? from[key][lang] : "Missing translation"
    }
    return "Translation failed"
}


export function buildComputedProperty(store, from, key) {
    const lang = store.state.renderingHints.lang;
    if (lang != undefined) return LT(from, lang, key);
    return "";
}

export const travelListView = {
    UpcommingAdventuresTitle: {
        "EN": "Upcomming adventures",
        "DK": "Fremtidige rejser"

    },
    DreamVacationsTitle: {
        "EN": "Dream vacations",
        "DK": "Drømme rejser"
    },
    MemoriesVacationsTitle: {
        "EN": "Memories",
        "DK": "Gamle rejser",
    },
    SavedVacationsTitle: {
        "EN": "Saved vacations",
        "DK": "Gemte rejser",
    },
    _CreateYour: {
        "EN": "Create Your",
        "DK": "Skab Din",
    },
    _TravelPlan: {
        "EN": "Travel Plan!",
        "DK": "Rejseplan!",
    },
    _GetStarted: {
        "EN": "Get Started",
        "DK": "Kom godt igang",
    },
}

export const inspireView = {
    searchPlaceholderLabel: {
        "EN": "Search",
        "DK": "Søg",
    },
}

export const settingsView = {

}
export const settingsform = {
    firstNameLabel: {
        "EN": "This is the field for your first name, as it appears on your profile.",
        "DK": "Dette er feltet for dit navn som vist på din profil."
    },
    lastNameLabel: {
        "EN": "This is the field for your last name, as it appears on your profile",
        "DK": "Dette er feltet for dit efternavn som vist på din profil"
    },
    emailLabel: {
        "EN": "This is the field for your email, we will use this to notify you of important changes to your account.",
        "DK": "Dette er feltet for din email adresse, vi bruger den som udgangspunkt kun i tilfælde af vigtige ændringer af din konto"
    },
    countryLabel: {
        "EN": "This is the field for your country as shown on your public profile.",
        "DK": "Dette er feltet for det land, som fremstår på din offentlige profil."
    },
    countrySubLabel: {
        "EN": "Select country",
        "DK": "Vælg land$"
    },
    emailSubLabel: {
        "EN": "Email",
        "DK": "Email"
    },
    nameSubLabel: {
        "EN": "First Name",
        "DK": "Fornavn",
    },
    lastNameSubLabel: {
        "EN": "last Name",
        "DK": "Efternavn",
    },
    genderLabel: {
        "EN": "This is the field for your gender as shown on your public profile.",
        "DK": "Dette er feltet for det køn, som fremstår på din offentlige profil."
    },
    selectGender: {
        "EN": "Select Gender",
        "DK": "Vælg køn"
    },
    genderMale: {
        "EN": "Male",
        "DK": "Mand",
    },
    genderFemale: {
        "EN": "Female",
        "DK": "Kvinde"
    },
    genderOther: {
        "EN": "Other",
        "DK": "Andet",
    },

}