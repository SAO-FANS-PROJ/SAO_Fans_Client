export function is90Degree () {

    let orientation = (window.screen.orientation || {}).type

    if (orientation === "landscape-primary") {
        console.log("That looks good.")
        return false
    } else if (orientation === "landscape-secondary") {
        console.log("Mmmh... the screen is upside down!")
        return true
    } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
        console.log("Mmmh... you should rotate your device to landscape")
        return true
    } else if (orientation === undefined) {
        console.log("The orientation API isn't supported in this browser :(");
        return true
    } else {
        return true
    }
}

export function is180Degree () {
    let orientation = (window.screen.orientation || {}).type

    if (orientation === "landscape-primary") {
        console.log("That looks good.")
        return true
    } else if (orientation === "landscape-secondary") {
        console.log("Mmmh... the screen is upside down!")
        return false
    } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
        console.log("Mmmh... you should rotate your device to landscape")
        return false
    } else if (orientation === undefined) {
        console.log("The orientation API isn't supported in this browser :(");
        return true
    } else {
        return true
    }
}

